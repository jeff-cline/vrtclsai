import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, "ok" | "fail"> = { app: "ok" };
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.db = "ok";
  } catch {
    checks.db = "fail";
  }
  const ok = Object.values(checks).every((v) => v === "ok");
  return NextResponse.json(
    { status: ok ? "ok" : "degraded", checks, timestamp: new Date().toISOString() },
    { status: ok ? 200 : 503 }
  );
}
