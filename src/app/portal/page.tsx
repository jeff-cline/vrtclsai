import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { ConversionVelocityChart } from "@/components/charts/conversion-velocity";
import { IntentClusterChart } from "@/components/charts/intent-cluster";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";

export default async function CustomerDashboard() {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  const org = orgId
    ? await prisma.organization.findUnique({
        where: { id: orgId },
        include: {
          audiences: { take: 5, orderBy: { createdAt: "desc" } },
          leadRequests: { take: 5, orderBy: { createdAt: "desc" } },
        },
      })
    : null;

  const balance = org?.creditBalance ?? 0;
  const tier = org?.tier ?? "optimized";

  return (
    <div>
      <PortalHeader
        eyebrow={`Welcome · ${session?.user?.name ?? session?.user?.email ?? ""}`}
        title="Intelligence dashboard"
        subtitle="Real-time predictive intelligence, audience activity, and credit posture."
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
          <CardLabel>Avg. lead freshness</CardLabel>
          <div className="mt-3 font-display text-3xl font-semibold text-white num">
            14h
          </div>
          <div className="mt-1 text-xs text-platinum/55">rolling 30d cohort</div>
        </Card>
        <Card>
          <CardLabel>Predictive confidence</CardLabel>
          <div className="mt-3 font-display text-3xl font-semibold text-white num">
            92.4%
          </div>
          <div className="mt-1 text-xs text-platinum/55">v4.7 model</div>
        </Card>
        <Card>
          <CardLabel>Estimated lift</CardLabel>
          <div className="mt-3 font-display text-3xl font-semibold text-ai-green num">
            +37%
          </div>
          <div className="mt-1 text-xs text-platinum/55">cohort 244 · verified</div>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card glow className="lg:col-span-2">
          <CardLabel>Conversion velocity · last 30 days</CardLabel>
          <CardTitle className="mt-2">Predictive cohort vs. baseline</CardTitle>
          <div className="mt-4">
            <ConversionVelocityChart />
          </div>
        </Card>
        <Card>
          <CardLabel>AI recommendations</CardLabel>
          <CardTitle className="mt-2">Optimization queue</CardTitle>
          <ul className="mt-4 space-y-3 text-sm text-platinum/70 leading-relaxed">
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                · ENRICHMENT
              </span>
              <div className="mt-0.5">
                Add psychographic overlay to Audience "HNW migration · TX corridor" — projected +18% conversion lift.
              </div>
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                · DECAY
              </span>
              <div className="mt-0.5">
                Reduce signal age threshold from 72h to 48h on healthcare audiences — projected -22% wasted spend.
              </div>
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                · SCORING
              </span>
              <div className="mt-0.5">
                Switch to behavioral propensity score v4.7 — 3.4pt confidence lift on B2B SaaS cohorts.
              </div>
            </li>
          </ul>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card glow className="lg:col-span-2">
          <CardLabel>Behavioral cluster · live</CardLabel>
          <CardTitle className="mt-2">Predictive score × behavioral signal</CardTitle>
          <div className="mt-4">
            <IntentClusterChart />
          </div>
        </Card>
        <Card>
          <CardLabel>Recent requests</CardLabel>
          <CardTitle className="mt-2">Lead pipeline</CardTitle>
          <ul className="mt-4 space-y-3 text-sm">
            {(org?.leadRequests ?? []).slice(0, 5).map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between border-b border-platinum/5 pb-2"
              >
                <div>
                  <div className="text-white">{r.audienceName}</div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-platinum/50">
                    {r.industry} · {r.status.toLowerCase()}
                  </div>
                </div>
                <span className="font-display text-sm text-ai-cyan num">
                  {formatNumber(r.estimatedSize)}
                </span>
              </li>
            ))}
            {!org?.leadRequests?.length && (
              <li className="text-sm text-platinum/55">
                No active requests. Build an audience to get started.
              </li>
            )}
          </ul>
          <Button href="/portal/audiences" variant="outline" size="sm" className="mt-5 w-full">
            Build an audience →
          </Button>
        </Card>
      </div>
    </div>
  );
}
