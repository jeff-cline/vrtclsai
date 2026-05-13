"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const filterSchema = z.object({
  industry: z.string().min(1).max(80),
  region: z.string().max(120).optional(),
  ageMin: z.coerce.number().int().min(0).max(120).optional(),
  ageMax: z.coerce.number().int().min(0).max(120).optional(),
  incomeMin: z.coerce.number().int().min(0).max(10_000_000).optional(),
  decayWindowHours: z.coerce.number().int().min(1).max(720).default(72),
  enrichments: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => (Array.isArray(v) ? v : v ? [v] : [])),
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
});

export async function createAudience(formData: FormData) {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  if (!orgId) throw new Error("Customer account required");

  const data: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
  for (const k of new Set(Array.from(formData.keys()))) {
    const all = formData.getAll(k);
    data[k] = all.length > 1 ? all : all[0];
  }
  const parsed = filterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid filter input");
  }

  // Mock size + confidence estimation (deterministic based on inputs)
  const baseSize =
    35000 -
    (parsed.data.decayWindowHours - 72) * 80 +
    (parsed.data.incomeMin ?? 0) / -50 +
    parsed.data.enrichments.length * 1800;
  const size = Math.max(420, Math.round(baseSize + Math.random() * 4000));
  const confidence = Math.min(
    0.98,
    0.72 + parsed.data.enrichments.length * 0.05 - Math.max(0, (parsed.data.decayWindowHours - 72) / 600)
  );

  await prisma.audience.create({
    data: {
      organizationId: orgId,
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      filters: {
        industry: parsed.data.industry,
        region: parsed.data.region ?? null,
        ageRange: [parsed.data.ageMin ?? null, parsed.data.ageMax ?? null],
        incomeMin: parsed.data.incomeMin ?? null,
        decayWindowHours: parsed.data.decayWindowHours,
        enrichments: parsed.data.enrichments,
      },
      size,
      confidence,
    },
  });

  revalidatePath("/portal/audiences");
  revalidatePath("/portal");
}
