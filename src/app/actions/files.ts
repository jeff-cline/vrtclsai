"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { saveOrderFile, deleteOrderFile } from "@/lib/storage";

export async function uploadOrderFile(formData: FormData) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (role !== "ADMIN") throw new Error("admin only");

  const orderId = String(formData.get("orderId") ?? "");
  const file = formData.get("file");
  if (!orderId || !(file instanceof File) || file.size === 0) {
    throw new Error("orderId and a file are required");
  }
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("order not found");

  const stored = await saveOrderFile({
    orgId: order.organizationId,
    orderId: order.id,
    file,
  });

  await prisma.orderFile.create({
    data: {
      orderId: order.id,
      filename: stored.filename,
      storagePath: stored.storagePath,
      mimeType: stored.mimeType,
      sizeBytes: stored.sizeBytes,
      uploadedById: userId ?? null,
    },
  });

  // If the order is still PENDING when admin uploads a file, advance it.
  if (order.status === "PENDING") {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "IN_PROGRESS" },
    });
  }

  revalidatePath(`/admin/orders/${order.id}`);
  revalidatePath(`/portal/orders/${order.id}`);
  revalidatePath("/admin/orders");
}

export async function deleteUploadedFile(formData: FormData) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") throw new Error("admin only");

  const fileId = String(formData.get("fileId") ?? "");
  if (!fileId) throw new Error("fileId required");
  const file = await prisma.orderFile.findUnique({ where: { id: fileId } });
  if (!file) return;

  await deleteOrderFile(file.storagePath);
  await prisma.orderFile.delete({ where: { id: fileId } });

  revalidatePath(`/admin/orders/${file.orderId}`);
  revalidatePath(`/portal/orders/${file.orderId}`);
}
