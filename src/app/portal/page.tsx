import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";

const statusTone: Record<string, "cyan" | "green" | "gold" | "neutral"> = {
  DRAFT: "neutral",
  PENDING: "gold",
  IN_PROGRESS: "cyan",
  DELIVERED: "green",
  CANCELED: "neutral",
};

export default async function CustomerDashboard() {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  const [org, recentOrders, delivery] = orgId
    ? await Promise.all([
        prisma.organization.findUnique({ where: { id: orgId } }),
        prisma.order.findMany({
          where: { organizationId: orgId },
          orderBy: { createdAt: "desc" },
          take: 6,
          include: { _count: { select: { files: true } } },
        }),
        prisma.deliveryPreference.findUnique({ where: { organizationId: orgId } }),
      ])
    : [null, [], null];

  const balance = org?.creditBalance ?? 0;
  const tier = org?.tier ?? "—";

  return (
    <div>
      <PortalHeader
        eyebrow={`Welcome · ${session?.user?.name ?? session?.user?.email ?? ""}`}
        title={org?.name ?? "Your dashboard"}
        subtitle="Place orders against your credit balance, track fulfillment, and manage delivery preferences."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardLabel>Credit balance</CardLabel>
          <div className="mt-3 font-display text-3xl font-semibold text-white num">
            {formatNumber(balance)}
          </div>
          <div className="mt-1 text-xs text-platinum/55">
            tier · <span className="capitalize">{tier}</span>
          </div>
        </Card>
        <Card>
          <CardLabel>Open orders</CardLabel>
          <div className="mt-3 font-display text-3xl font-semibold text-white num">
            {recentOrders.filter((o) => o.status === "PENDING" || o.status === "IN_PROGRESS").length}
          </div>
          <div className="mt-1 text-xs text-platinum/55">awaiting fulfillment</div>
        </Card>
        <Card>
          <CardLabel>Delivered (lifetime)</CardLabel>
          <div className="mt-3 font-display text-3xl font-semibold text-ai-green num">
            {recentOrders.filter((o) => o.status === "DELIVERED").length}
          </div>
          <div className="mt-1 text-xs text-platinum/55">last six shown below</div>
        </Card>
        <Card>
          <CardLabel>Default delivery</CardLabel>
          <div className="mt-3 font-display text-base font-semibold text-white">
            {prettyMethod(delivery?.method ?? "FILE_DOWNLOAD")}
          </div>
          <Link href="/portal/delivery" className="mt-1 inline-flex text-xs text-ai-cyan hover:underline">
            Edit preferences →
          </Link>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <CardLabel>Recent orders</CardLabel>
              <CardTitle className="mt-1">Activity</CardTitle>
            </div>
            <Button href="/portal/order" size="sm">
              + New order
            </Button>
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {recentOrders.map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between border-b border-platinum/5 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <Link
                    href={`/portal/orders/${o.id}`}
                    className="text-white hover:text-ai-cyan"
                  >
                    {o.industry}
                    {o.region ? <span className="text-platinum/55"> · {o.region}</span> : null}
                  </Link>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-platinum/55">
                    {formatNumber(o.volume)} records · {formatNumber(o.creditCost)} credits ·{" "}
                    {prettyMethod(o.deliveryMethod)} · {o._count.files} file{o._count.files === 1 ? "" : "s"}
                  </div>
                </div>
                <Badge tone={statusTone[o.status] ?? "neutral"}>{o.status.toLowerCase()}</Badge>
              </li>
            ))}
            {recentOrders.length === 0 && (
              <li className="text-sm text-platinum/55">
                No orders yet.{" "}
                <Link href="/portal/order" className="text-ai-cyan hover:underline">
                  Place your first →
                </Link>
              </li>
            )}
          </ul>
        </Card>

        <Card>
          <CardLabel>How ordering works</CardLabel>
          <CardTitle className="mt-2">Workflow</CardTitle>
          <ol className="mt-4 space-y-3 text-sm text-platinum/70 leading-relaxed">
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">01 ·</span>{" "}
              Configure filters at <Link href="/portal/order" className="text-ai-cyan hover:underline">/portal/order</Link>.
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">02 ·</span>{" "}
              See instant credit quote · credits deduct on placement.
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">03 ·</span>{" "}
              Fulfillment team prepares data per your delivery preference.
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">04 ·</span>{" "}
              File appears in your order; or data is pushed to your endpoint.
            </li>
          </ol>
          <p className="mt-5 rounded-md border border-platinum/10 bg-navy-900/60 px-3 py-2 text-xs text-platinum/60 leading-relaxed">
            Need more credits? Your account team manages credit issuance — no
            self-serve checkout. Contact them and credits will appear in your balance.
          </p>
        </Card>
      </div>
    </div>
  );
}

function prettyMethod(m: string) {
  return (
    {
      FILE_DOWNLOAD: "File download",
      PING_POST: "Ping-post",
      SFTP: "SFTP push",
      API_PULL: "API pull",
      CUSTOM: "Custom · 3rd-party",
    } as Record<string, string>
  )[m] ?? m;
}
