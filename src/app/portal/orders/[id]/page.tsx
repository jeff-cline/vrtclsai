import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatBytes } from "@/lib/storage";
import { formatNumber } from "@/lib/utils";

const statusTone: Record<string, "cyan" | "green" | "gold" | "neutral"> = {
  DRAFT: "neutral",
  PENDING: "gold",
  IN_PROGRESS: "cyan",
  DELIVERED: "green",
  CANCELED: "neutral",
};

export const metadata = {
  title: "Order detail",
  robots: { index: false, follow: false },
};

export default async function CustomerOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  if (!orgId) notFound();
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      files: { orderBy: { createdAt: "desc" } },
      requestedBy: true,
    },
  });
  if (!order || order.organizationId !== orgId) notFound();

  const filters = (order.filters ?? {}) as Record<string, unknown>;

  return (
    <div>
      <PortalHeader
        eyebrow={`Order · ${order.id.slice(0, 12)}`}
        title={`${order.industry} · ${formatNumber(order.volume)} records`}
        subtitle={`Placed ${new Date(order.createdAt).toISOString().slice(0, 10)} · ${formatNumber(order.creditCost)} credits`}
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Card>
            <div className="flex items-baseline justify-between">
              <div>
                <CardLabel>Status</CardLabel>
                <CardTitle className="mt-2 capitalize">{order.status.toLowerCase()}</CardTitle>
              </div>
              <Badge tone={statusTone[order.status] ?? "neutral"}>{order.status.toLowerCase()}</Badge>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-platinum/10 bg-platinum/10">
              <Mini label="Placed" value={fmt(order.acceptedAt)} />
              <Mini label="Delivered" value={fmt(order.deliveredAt)} />
              <Mini label="Records" value={formatNumber(order.volume)} />
              <Mini label="Credit cost" value={formatNumber(order.creditCost)} tone="cyan" />
            </div>
          </Card>

          <Card>
            <CardLabel>Files delivered</CardLabel>
            <CardTitle className="mt-2">{order.files.length} file{order.files.length === 1 ? "" : "s"}</CardTitle>
            {order.files.length === 0 ? (
              <p className="mt-4 text-sm text-platinum/60">
                {order.status === "DELIVERED" ? "Delivery completed — see delivery details on the right." : "No files have been uploaded yet. The fulfillment team will upload your data here when ready."}
              </p>
            ) : (
              <ul className="mt-4 space-y-3 text-sm">
                {order.files.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center justify-between rounded-md border border-platinum/10 bg-navy-900/60 px-4 py-3"
                  >
                    <div>
                      <div className="text-white">{f.filename}</div>
                      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-platinum/50">
                        {f.mimeType} · {formatBytes(f.sizeBytes)} ·{" "}
                        {new Date(f.createdAt).toISOString().slice(0, 16).replace("T", " ")}
                      </div>
                    </div>
                    <a
                      href={`/api/orders/${order.id}/files/${f.id}`}
                      className="text-xs text-ai-cyan hover:underline"
                    >
                      Download →
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <CardLabel>Notes from fulfillment team</CardLabel>
            <p className="mt-2 text-sm text-platinum/70">
              {order.adminNotes?.trim() ?? "No notes yet."}
            </p>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardLabel>Delivery</CardLabel>
            <CardTitle className="mt-2">{prettyMethod(order.deliveryMethod)}</CardTitle>
            {order.deliveryEndpoint && (
              <p className="mt-2 break-all text-xs font-mono text-platinum/60">
                {order.deliveryEndpoint}
              </p>
            )}
            {order.deliveryMethod === "CUSTOM" && (
              <div className="mt-4 rounded-md border border-ai-gold/40 bg-ai-gold/10 px-3 py-2 text-xs text-ai-gold leading-relaxed">
                Custom / 3rd-party-mediated delivery may require additional
                third-party services. Those costs are billed separately and are
                not included in this order's credit price.
              </div>
            )}
            <Link
              href="/portal/delivery"
              className="mt-4 inline-flex text-xs text-ai-cyan hover:underline"
            >
              Update default preferences →
            </Link>
          </Card>

          <Card>
            <CardLabel>Filters</CardLabel>
            <CardTitle className="mt-2">Order parameters</CardTitle>
            <dl className="mt-4 space-y-2 text-sm">
              <DLRow label="Industry" value={order.industry} />
              <DLRow label="Region" value={order.region ?? "—"} />
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
                value={
                  filters.incomeMin ? `$${formatNumber(Number(filters.incomeMin))}` : "—"
                }
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
              {filters.notes ? (
                <DLRow label="Your notes" value={String(filters.notes)} />
              ) : null}
            </dl>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function Mini({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "cyan";
}) {
  const color = tone === "cyan" ? "text-ai-cyan" : "text-white";
  return (
    <div className="bg-navy-900/85 p-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
        {label}
      </span>
      <div className={`mt-1 font-display text-xl font-semibold num ${color}`}>{value}</div>
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

function fmt(d: Date | null | undefined) {
  return d ? new Date(d).toISOString().slice(0, 16).replace("T", " ") : "—";
}

function prettyMethod(m: string) {
  return (
    {
      FILE_DOWNLOAD: "File download (portal)",
      PING_POST: "Ping-post (HTTPS endpoint)",
      SFTP: "SFTP push",
      API_PULL: "API pull",
      CUSTOM: "Custom · 3rd-party-mediated",
    } as Record<string, string>
  )[m] ?? m;
}
