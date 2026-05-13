"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const grantSchema = z.object({
  organizationId: z.string().min(1),
  amount: z.coerce.number().int().refine((n) => n !== 0, "amount cannot be zero"),
  kind: z.enum(["GRANT", "REVOKE", "ADJUSTMENT", "REFUND", "CONSUME"]).default("GRANT"),
  note: z.string().max(500).optional(),
});

export async function grantCredits(formData: FormData) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") throw new Error("Unauthorized");
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const data = Object.fromEntries(formData.entries());
  const parsed = grantSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid input");

  let amount = parsed.data.amount;
  if (parsed.data.kind === "REVOKE" && amount > 0) amount = -amount;
  if (parsed.data.kind === "GRANT" && amount < 0) amount = Math.abs(amount);

  await prisma.$transaction([
    prisma.creditTxn.create({
      data: {
        organizationId: parsed.data.organizationId,
        amount,
        kind: parsed.data.kind,
        note: parsed.data.note ?? null,
        grantedById: userId ?? null,
      },
    }),
    prisma.organization.update({
      where: { id: parsed.data.organizationId },
      data: { creditBalance: { increment: amount } },
    }),
  ]);

  revalidatePath("/admin/credits");
  revalidatePath("/admin");
}
