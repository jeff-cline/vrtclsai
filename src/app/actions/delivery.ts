"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const schema = z.object({
  method: z.enum(["FILE_DOWNLOAD", "PING_POST", "SFTP", "API_PULL", "CUSTOM"]),
  endpoint: z.string().max(500).optional(),
  notes: z.string().max(2000).optional(),
});

export async function saveDeliveryPreference(formData: FormData) {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  if (!orgId) throw new Error("customer account required");

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) throw new Error("invalid input");

  await prisma.deliveryPreference.upsert({
    where: { organizationId: orgId },
    update: {
      method: parsed.data.method,
      endpoint: parsed.data.endpoint?.trim() || null,
      notes: parsed.data.notes?.trim() || null,
    },
    create: {
      organizationId: orgId,
      method: parsed.data.method,
      endpoint: parsed.data.endpoint?.trim() || null,
      notes: parsed.data.notes?.trim() || null,
    },
  });

  revalidatePath("/portal/delivery");
  revalidatePath("/portal");
}
