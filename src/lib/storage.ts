import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.env.UPLOADS_DIR ?? path.join(process.cwd(), "uploads");

export type StoredFile = {
  storagePath: string; // relative to ROOT
  absolutePath: string;
  filename: string;
  sizeBytes: number;
  mimeType: string;
};

function sanitize(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 200);
}

export async function saveOrderFile(opts: {
  orgId: string;
  orderId: string;
  file: File;
}): Promise<StoredFile> {
  const { orgId, orderId, file } = opts;
  const safeName = sanitize(file.name || "data.bin");
  const uniq = crypto.randomBytes(6).toString("hex");
  const rel = path.join(orgId, orderId, `${uniq}-${safeName}`);
  const abs = path.join(ROOT, rel);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(abs, buf);
  return {
    storagePath: rel,
    absolutePath: abs,
    filename: safeName,
    sizeBytes: buf.byteLength,
    mimeType: file.type || "application/octet-stream",
  };
}

export async function readOrderFile(storagePath: string) {
  const abs = path.join(ROOT, storagePath);
  // Defense in depth — refuse paths that escape ROOT.
  const normalized = path.normalize(abs);
  if (!normalized.startsWith(path.normalize(ROOT) + path.sep)) {
    throw new Error("invalid storage path");
  }
  return fs.readFile(normalized);
}

export async function deleteOrderFile(storagePath: string) {
  const abs = path.join(ROOT, storagePath);
  const normalized = path.normalize(abs);
  if (!normalized.startsWith(path.normalize(ROOT) + path.sep)) return;
  try {
    await fs.unlink(normalized);
  } catch {
    // ignore missing
  }
}

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
