"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { quotePrice } from "@/lib/pricing";

const enrichmentSet = new Set(["demographic", "psychographic", "identity", "behavioral"]);

const placeSchema = z.object({
  industry: z.string().min(1).max(80),
  region: z.string().max(200).optional(),
  volume: z.coerce.number().int().min(100).max(2_000_000),
  decayWindowHours: z.coerce.number().int().min(12).max(720).default(72),
  ageMin: z.coerce.number().int().min(0).max(120).optional(),
  ageMax: z.coerce.number().int().min(0).max(120).optional(),
  incomeMin: z.coerce.number().int().min(0).max(10_000_000).optional(),
  notes: z.string().max(2000).optional(),
  deliveryMethod: z
    .enum(["FILE_DOWNLOAD", "PING_POST", "SFTP", "API_PULL", "CUSTOM"])
    .default("FILE_DOWNLOAD"),
  deliveryEndpoint: z.string().max(500).optional(),
  enrichments: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => {
      const arr = Array.isArray(v) ? v : v ? [v] : [];
      return arr.filter((s) => enrichmentSet.has(s));
    }),
});

export async function placeOrder(formData: FormData) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  if (!userId || !orgId) throw new Error("customer account required");

  const data: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
  for (const k of new Set(Array.from(formData.keys()))) {
    const all = formData.getAll(k);
    data[k] = all.length > 1 ? all : all[0];
  }
  const parsed = placeSchema.safeParse(data);
  if (!parsed.success) throw new Error("invalid input");

  const cost = quotePrice({
    volume: parsed.data.volume,
    enrichments: parsed.data.enrichments,
    decayWindowHours: parsed.data.decayWindowHours,
    industry: parsed.data.industry,
  });

  const org = await prisma.organization.findUnique({ where: { id: orgId } });
  if (!org) throw new Error("organization not found");
  if (org.creditBalance < cost) {
    throw new Error(
      `Insufficient credits — order costs ${cost.toLocaleString()} credits, current balance is ${org.creditBalance.toLocaleString()}. Contact your account team for additional credits.`
    );
  }

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        organizationId: orgId,
        requestedById: userId,
        industry: parsed.data.industry,
        region: parsed.data.region ?? null,
        volume: parsed.data.volume,
        filters: {
          ageRange: [parsed.data.ageMin ?? null, parsed.data.ageMax ?? null],
          incomeMin: parsed.data.incomeMin ?? null,
          decayWindowHours: parsed.data.decayWindowHours,
          enrichments: parsed.data.enrichments,
          notes: parsed.data.notes ?? null,
        },
        creditCost: cost,
        status: "PENDING",
        deliveryMethod: parsed.data.deliveryMethod,
        deliveryEndpoint: parsed.data.deliveryEndpoint ?? null,
        acceptedAt: new Date(),
      },
    });
    await tx.organization.update({
      where: { id: orgId },
      data: { creditBalance: { decrement: cost } },
    });
    await tx.creditTxn.create({
      data: {
        organizationId: orgId,
        amount: -cost,
        kind: "CONSUME",
        note: `order ${created.id} · ${parsed.data.volume.toLocaleString()} records · ${parsed.data.industry}`,
        orderId: created.id,
      },
    });
    return created;
  });

  revalidatePath("/portal");
  revalidatePath("/portal/orders");
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  redirect(`/portal/orders/${order.id}`);
}

const adminStatusSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(["PENDING", "IN_PROGRESS", "DELIVERED", "CANCELED"]),
  adminNotes: z.string().max(2000).optional(),
});

export async function updateOrderStatus(formData: FormData) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") throw new Error("admin only");

  const parsed = adminStatusSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) throw new Error("invalid input");

  const prev = await prisma.order.findUnique({ where: { id: parsed.data.orderId } });
  if (!prev) throw new Error("order not found");

  const patch: Parameters<typeof prisma.order.update>[0]["data"] = {
    status: parsed.data.status,
    adminNotes: parsed.data.adminNotes ?? prev.adminNotes,
  };
  if (parsed.data.status === "DELIVERED" && !prev.deliveredAt) {
    patch.deliveredAt = new Date();
  }

  // Refund credits if canceled and not already canceled
  if (parsed.data.status === "CANCELED" && prev.status !== "CANCELED") {
    await prisma.$transaction([
      prisma.order.update({ where: { id: prev.id }, data: patch }),
      prisma.organization.update({
        where: { id: prev.organizationId },
        data: { creditBalance: { increment: prev.creditCost } },
      }),
      prisma.creditTxn.create({
        data: {
          organizationId: prev.organizationId,
          amount: prev.creditCost,
          kind: "REFUND",
          note: `refund · order ${prev.id} canceled`,
          orderId: prev.id,
          grantedById: ((session?.user as { id?: string } | undefined)?.id) ?? null,
        },
      }),
    ]);
  } else {
    await prisma.order.update({ where: { id: prev.id }, data: patch });
  }

  revalidatePath(`/admin/orders/${prev.id}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  revalidatePath("/portal/orders");
  revalidatePath(`/portal/orders/${prev.id}`);
}
