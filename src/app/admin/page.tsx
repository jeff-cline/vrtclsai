import Link from "next/link";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CacReductionChart } from "@/components/charts/cac-reduction";
import { formatNumber } from "@/lib/utils";

const statusTone: Record<string, "cyan" | "green" | "gold" | "neutral"> = {
  DRAFT: "neutral",
  PENDING: "gold",
  IN_PROGRESS: "cyan",
  DELIVERED: "green",
  CANCELED: "neutral",
};

export default async function AdminDashboard() {
  const [userCount, orgCount, inboxCount, openOrderCount, pendingOrders, recentTxns, recentInbox] =
    await Promise.all([
      prisma.user.count(),
      prisma.organization.count(),
      prisma.demoRequest.count(),
      prisma.order.count({ where: { status: { in: ["PENDING", "IN_PROGRESS"] } } }),
      prisma.order.findMany({
        where: { status: { in: ["PENDING", "IN_PROGRESS"] } },
        orderBy: { acceptedAt: "asc" },
        take: 8,
        include: { organization: true, requestedBy: true, _count: { select: { files: true } } },
      }),
      prisma.creditTxn.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        include: { organization: true, grantedBy: true },
      }),
      prisma.demoRequest.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    ]);

  return (
    <div>
      <PortalHeader
        eyebrow="Admin · Control plane"
        title="System overview"
        subtitle="Inbound leads, fulfillment queue, credit ledger, and platform-wide state."
        tone="gold"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Users" value={formatNumber(userCount)} />
        <Stat label="Organizations" value={formatNumber(orgCount)} />
        <Stat label="Open orders" value={formatNumber(openOrderCount)} accent="cyan" />
        <Stat label="Lead inbox" value={formatNumber(inboxCount)} accent="green" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <CardLabel>Fulfillment queue</CardLabel>
              <CardTitle className="mt-1">Pending + in-progress orders</CardTitle>
            </div>
            <Button href="/admin/orders" size="sm" variant="outline">
              All orders →
            </Button>
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {pendingOrders.map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between border-b border-platinum/5 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="text-white hover:text-ai-cyan"
                  >
                    {o.organization.name} · {o.industry}
                  </Link>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-platinum/55">
                    {formatNumber(o.volume)} records · {formatNumber(o.creditCost)} cr ·{" "}
                    {prettyMethod(o.deliveryMethod)} · {o._count.files} file{o._count.files === 1 ? "" : "s"} ·{" "}
                    {o.requestedBy.email}
                  </div>
                </div>
                <Badge tone={statusTone[o.status] ?? "neutral"}>{o.status.toLowerCase()}</Badge>
              </li>
            ))}
            {pendingOrders.length === 0 && (
              <li className="text-platinum/55">No open orders.</li>
            )}
          </ul>
        </Card>

        <Card>
          <CardLabel>Recent ledger activity</CardLabel>
          <CardTitle className="mt-1">Credit movements</CardTitle>
          <ul className="mt-5 space-y-3 text-sm">
            {recentTxns.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between border-b border-platinum/5 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <div className="text-white">{t.organization.name}</div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-platinum/55">
                    {t.kind.toLowerCase()} · {t.grantedBy?.email ?? "system"}
                  </div>
                </div>
                <div
                  className={`font-display text-base num ${
                    t.amount > 0 ? "text-ai-green" : "text-ai-gold"
                  }`}
                >
                  {t.amount > 0 ? "+" : ""}
                  {formatNumber(t.amount)}
                </div>
              </li>
            ))}
            {recentTxns.length === 0 && <li className="text-platinum/55">No txns.</li>}
          </ul>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card glow>
          <CardLabel>Blended platform CAC reduction</CardLabel>
          <CardTitle className="mt-1">9-month rolling cohort</CardTitle>
          <div className="mt-4">
            <CacReductionChart />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <CardLabel>Lead inbox · latest</CardLabel>
              <CardTitle className="mt-1">Quote + demo requests</CardTitle>
            </div>
            <Button href="/admin/inbox" size="sm" variant="outline">
              Open inbox →
            </Button>
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {recentInbox.map((d) => (
              <li key={d.id} className="border-b border-platinum/5 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="text-white">{d.name}</div>
                  <Badge tone={d.source === "quote" ? "cyan" : "green"}>
                    {d.source ?? "demo"}
                  </Badge>
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-platinum/55">
                  {d.company ?? "—"} · {d.industry ?? "—"} · {d.email}
                </div>
              </li>
            ))}
            {recentInbox.length === 0 && (
              <li className="text-platinum/55">No inbound yet.</li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "cyan" | "green";
}) {
  const color =
    accent === "cyan" ? "text-ai-cyan" : accent === "green" ? "text-ai-green" : "text-white";
  return (
    <Card>
      <CardLabel>{label}</CardLabel>
      <div className={`mt-3 font-display text-3xl font-semibold num ${color}`}>{value}</div>
    </Card>
  );
}

function prettyMethod(m: string) {
  return (
    {
      FILE_DOWNLOAD: "File",
      PING_POST: "Ping-post",
      SFTP: "SFTP",
      API_PULL: "API pull",
      CUSTOM: "Custom",
    } as Record<string, string>
  )[m] ?? m;
}
