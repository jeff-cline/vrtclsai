import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { ConfidenceRadarChart } from "@/components/charts/confidence-radar";
import { RoiAccelerationChart } from "@/components/charts/roi-acceleration";
import { formatNumber } from "@/lib/utils";

export default async function AdminDashboard() {
  const [userCount, orgCount, demoCount, recentDemo, recentCredit] = await Promise.all([
    prisma.user.count(),
    prisma.organization.count(),
    prisma.demoRequest.count(),
    prisma.demoRequest.findMany({ take: 6, orderBy: { createdAt: "desc" } }),
    prisma.creditTxn.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { organization: true, grantedBy: true },
    }),
  ]);

  return (
    <div>
      <PortalHeader
        eyebrow="Admin · Control plane"
        title="System overview"
        subtitle="Real-time state of users, organizations, demo inbox, credits, and platform analytics."
        tone="gold"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Users" value={formatNumber(userCount)} />
        <Stat label="Organizations" value={formatNumber(orgCount)} />
        <Stat label="Demo inbox" value={formatNumber(demoCount)} accent="cyan" />
        <Stat label="Credits issued · 30d" value="184,200" accent="green" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card glow className="lg:col-span-2">
          <CardLabel>Platform ROAS acceleration</CardLabel>
          <CardTitle className="mt-2">Blended cohort · cumulative</CardTitle>
          <div className="mt-4">
            <RoiAccelerationChart />
          </div>
        </Card>
        <Card>
          <CardLabel>Confidence by vertical</CardLabel>
          <CardTitle className="mt-2">Calibration vs. panel</CardTitle>
          <div className="mt-4">
            <ConfidenceRadarChart height={260} />
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardLabel>Demo inbox · latest</CardLabel>
          <CardTitle className="mt-2">Inbound requests</CardTitle>
          <ul className="mt-4 space-y-3 text-sm">
            {recentDemo.map((d) => (
              <li
                key={d.id}
                className="flex items-center justify-between border-b border-platinum/5 pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <div className="text-white">{d.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-platinum/55">
                    {d.company ?? "—"} · {d.industry ?? "—"}
                  </div>
                </div>
                <div className="text-right text-xs text-platinum/55">
                  {new Date(d.createdAt).toISOString().slice(0, 10)}
                </div>
              </li>
            ))}
            {recentDemo.length === 0 && (
              <li className="text-platinum/55">No inbound requests yet.</li>
            )}
          </ul>
        </Card>
        <Card>
          <CardLabel>Credit ledger · latest</CardLabel>
          <CardTitle className="mt-2">Recent transactions</CardTitle>
          <ul className="mt-4 space-y-3 text-sm">
            {recentCredit.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between border-b border-platinum/5 pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <div className="text-white">{t.organization.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-platinum/55">
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
            {recentCredit.length === 0 && (
              <li className="text-platinum/55">No transactions yet.</li>
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
