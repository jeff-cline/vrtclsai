import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { CacReductionChart } from "@/components/charts/cac-reduction";
import { ConversionVelocityChart } from "@/components/charts/conversion-velocity";
import { IntentClusterChart } from "@/components/charts/intent-cluster";

export default function AdminAnalyticsPage() {
  return (
    <div>
      <PortalHeader
        eyebrow="Admin · Analytics"
        title="Platform analytics"
        subtitle="Blended platform-wide performance, behavioral clustering, and model health."
        tone="gold"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card glow>
          <CardLabel>CAC reduction</CardLabel>
          <CardTitle className="mt-2">Blended cohort · 9-month</CardTitle>
          <div className="mt-4">
            <CacReductionChart />
          </div>
        </Card>
        <Card glow>
          <CardLabel>Conversion velocity</CardLabel>
          <CardTitle className="mt-2">Predictive vs. cold list</CardTitle>
          <div className="mt-4">
            <ConversionVelocityChart />
          </div>
        </Card>
      </div>
      <div className="mt-6">
        <Card glow>
          <CardLabel>Behavioral clustering · platform-wide</CardLabel>
          <CardTitle className="mt-2">Predictive score × signal index</CardTitle>
          <div className="mt-4">
            <IntentClusterChart />
          </div>
        </Card>
      </div>
    </div>
  );
}
