import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/storage";
import { formatNumber } from "@/lib/utils";
import { updateOrderStatus } from "@/app/actions/orders";
import { uploadOrderFile, deleteUploadedFile } from "@/app/actions/files";

const statusTone: Record<string, "cyan" | "green" | "gold" | "neutral"> = {
  DRAFT: "neutral",
  PENDING: "gold",
  IN_PROGRESS: "cyan",
  DELIVERED: "green",
  CANCELED: "neutral",
};

export const metadata = {
  title: "Admin · Order detail",
  robots: { index: false, follow: false },
};

export default async function AdminOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      organization: { include: { delivery: true } },
      requestedBy: true,
      files: { include: { uploadedBy: true }, orderBy: { createdAt: "desc" } },
    },
  });
  if (!order) notFound();
  const filters = (order.filters ?? {}) as Record<string, unknown>;

  return (
    <div>
      <PortalHeader
        eyebrow={`Admin · Order ${order.id.slice(0, 12)}`}
        title={`${order.organization.name} · ${order.industry}`}
        subtitle={`Requested by ${order.requestedBy.email} · ${formatNumber(order.volume)} records · ${formatNumber(order.creditCost)} credits`}
        tone="gold"
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card>
            <div className="flex items-baseline justify-between">
              <div>
                <CardLabel>Status</CardLabel>
                <CardTitle className="mt-2 capitalize">{order.status.toLowerCase()}</CardTitle>
              </div>
              <Badge tone={statusTone[order.status] ?? "neutral"}>{order.status.toLowerCase()}</Badge>
            </div>

            <form action={updateOrderStatus} className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input type="hidden" name="orderId" value={order.id} />
              <div className="space-y-2">
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                    Set status
                  </span>
                  <select
                    name="status"
                    defaultValue={order.status === "DRAFT" ? "PENDING" : order.status}
                    className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none focus:border-ai-cyan/50"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In progress</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELED">Canceled (refund credits)</option>
                  </select>
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                    Admin notes (visible to customer)
                  </span>
                  <textarea
                    name="adminNotes"
                    rows={3}
                    defaultValue={order.adminNotes ?? ""}
                    placeholder="Update the customer on progress, schema, etc."
                    className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-platinum/30 focus:border-ai-cyan/50"
                  />
                </label>
              </div>
              <div className="flex items-end">
                <Button type="submit">Update →</Button>
              </div>
            </form>
            <p className="mt-3 text-xs text-platinum/45">
              Canceling refunds the full credit cost ({formatNumber(order.creditCost)}) to the customer's organization and writes a REFUND ledger entry.
            </p>
          </Card>

          <Card>
            <CardLabel>Upload data file</CardLabel>
            <CardTitle className="mt-2">Attach a delivery file</CardTitle>
            <p className="mt-2 text-sm text-platinum/65 leading-relaxed">
              Upload the delivered data file for this order. Customers see the file
              instantly in their order detail and can download it directly.
              Uploading auto-advances the order from PENDING to IN_PROGRESS.
            </p>
            <form
              action={uploadOrderFile}
              encType="multipart/form-data"
              className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]"
            >
              <input type="hidden" name="orderId" value={order.id} />
              <input
                name="file"
                type="file"
                required
                className="block w-full text-sm text-platinum/70 file:mr-3 file:rounded-md file:border-0 file:bg-navy-700 file:px-3 file:py-2 file:text-xs file:font-mono file:uppercase file:tracking-[0.14em] file:text-ai-cyan hover:file:bg-navy-600"
              />
              <Button type="submit">Upload →</Button>
            </form>
            <p className="mt-3 text-xs text-platinum/45">
              Files are stored on the application server in <code className="font-mono">uploads/{order.organizationId}/{order.id}/</code>.
              Use object storage (Vultr Object Storage / S3) for scale beyond a single host.
            </p>
          </Card>

          <Card>
            <CardLabel>Files attached</CardLabel>
            <CardTitle className="mt-2">
              {order.files.length} file{order.files.length === 1 ? "" : "s"}
            </CardTitle>
            {order.files.length === 0 ? (
              <p className="mt-4 text-sm text-platinum/60">No files attached yet.</p>
            ) : (
              <ul className="mt-4 space-y-2 text-sm">
                {order.files.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center justify-between rounded-md border border-platinum/10 bg-navy-900/60 px-4 py-3"
                  >
                    <div>
                      <div className="text-white">{f.filename}</div>
                      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-platinum/50">
                        {f.mimeType} · {formatBytes(f.sizeBytes)} ·{" "}
                        {new Date(f.createdAt).toISOString().slice(0, 16).replace("T", " ")} ·{" "}
                        {f.uploadedBy?.email ?? "system"}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={`/api/orders/${order.id}/files/${f.id}`}
                        className="text-xs text-ai-cyan hover:underline"
                      >
                        Download
                      </a>
                      <form action={deleteUploadedFile}>
                        <input type="hidden" name="fileId" value={f.id} />
                        <button className="text-xs text-ai-gold hover:underline">
                          Delete
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardLabel>Customer delivery</CardLabel>
            <CardTitle className="mt-2">{prettyMethod(order.deliveryMethod)}</CardTitle>
            {order.deliveryEndpoint && (
              <p className="mt-2 break-all text-xs font-mono text-platinum/60">
                {order.deliveryEndpoint}
              </p>
            )}
            {order.deliveryMethod === "CUSTOM" && (
              <div className="mt-3 rounded-md border border-ai-gold/40 bg-ai-gold/10 px-3 py-2 text-xs text-ai-gold leading-relaxed">
                3rd-party-mediated · third-party delivery cost is billed separately and is not included in this order.
              </div>
            )}
            <div className="mt-4 border-t border-platinum/5 pt-4 text-xs text-platinum/55">
              Organization default:{" "}
              <span className="text-platinum/80">
                {order.organization.delivery
                  ? prettyMethod(order.organization.delivery.method)
                  : "not set"}
              </span>
              {order.organization.delivery?.endpoint && (
                <div className="mt-1 font-mono break-all">{order.organization.delivery.endpoint}</div>
              )}
              {order.organization.delivery?.notes && (
                <p className="mt-2 text-platinum/65">{order.organization.delivery.notes}</p>
              )}
            </div>
          </Card>

          <Card>
            <CardLabel>Customer-supplied notes</CardLabel>
            <p className="mt-2 text-sm text-platinum/70">
              {(filters.notes as string | undefined)?.trim() || "No notes."}
            </p>
          </Card>

          <Card>
            <CardLabel>Filters</CardLabel>
            <CardTitle className="mt-2">Order parameters</CardTitle>
            <dl className="mt-4 space-y-2 text-sm">
              <DLRow label="Industry" value={order.industry} />
              <DLRow label="Region" value={order.region ?? "—"} />
              <DLRow label="Records" value={formatNumber(order.volume)} />
              <DLRow
                label="Age range"
                value={
                  Array.isArray(filters.ageRange)
                    ? `${(filters.ageRange as unknown[])[0] ?? "—"}–${(filters.ageRange as unknown[])[1] ?? "—"}`
                    : "—"
                }
              />
              <DLRow
                label="Min household income"
                value={filters.incomeMin ? `$${formatNumber(Number(filters.incomeMin))}` : "—"}
              />
              <DLRow
                label="Decay window"
                value={filters.decayWindowHours ? `${String(filters.decayWindowHours)}h` : "—"}
              />
              <DLRow
                label="Enrichments"
                value={
                  Array.isArray(filters.enrichments) && filters.enrichments.length
                    ? (filters.enrichments as string[]).join(", ")
                    : "—"
                }
              />
            </dl>
          </Card>

          <Card>
            <CardLabel>Credit ledger</CardLabel>
            <CardTitle className="mt-2">{formatNumber(order.creditCost)} credits deducted</CardTitle>
            <p className="mt-2 text-sm text-platinum/65">
              Org balance after this order: see{" "}
              <Link href="/admin/credits" className="text-ai-cyan hover:underline">
                credits ledger
              </Link>
              .
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function DLRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-platinum/5 pb-2 last:border-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/55">
        {label}
      </span>
      <span className="text-right text-platinum/80">{value}</span>
    </div>
  );
}

function prettyMethod(m: string) {
  return (
    {
      FILE_DOWNLOAD: "File download (portal)",
      PING_POST: "Ping-post (HTTPS)",
      SFTP: "SFTP push",
      API_PULL: "API pull",
      CUSTOM: "Custom · 3rd-party-mediated",
    } as Record<string, string>
  )[m] ?? m;
}
