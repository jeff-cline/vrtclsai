"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  company: z.string().max(200).optional(),
  phone: z.string().max(40).optional(),
  industry: z.string().max(80).optional(),
  volume: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().max(120).optional(),
});

export async function submitDemoRequest(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "Please complete the required fields." };
  }
  try {
    await prisma.demoRequest.create({ data: parsed.data });
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: "Service temporarily unavailable." };
  }
}
