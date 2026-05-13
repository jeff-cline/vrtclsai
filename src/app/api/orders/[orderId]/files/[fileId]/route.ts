import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { readOrderFile } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ orderId: string; fileId: string }> }
) {
  const { orderId, fileId } = await ctx.params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const role = (session.user as { role?: string }).role;
  const userOrgId = (session.user as { organizationId?: string | null }).organizationId;

  const file = await prisma.orderFile.findUnique({
    where: { id: fileId },
    include: { order: true },
  });
  if (!file || file.orderId !== orderId) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  if (role !== "ADMIN" && file.order.organizationId !== userOrgId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  try {
    const bytes = await readOrderFile(file.storagePath);
    return new NextResponse(bytes, {
      headers: {
        "content-type": file.mimeType || "application/octet-stream",
        "content-disposition": `attachment; filename="${file.filename}"`,
        "content-length": String(bytes.byteLength),
        "cache-control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "file unavailable" }, { status: 410 });
  }
}
