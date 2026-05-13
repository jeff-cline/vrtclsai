import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { CacReductionChart } from "@/components/charts/cac-reduction";
import { RoiAccelerationChart } from "@/components/charts/roi-acceleration";

export default function UsagePage() {
  return (
    <div>
      <PortalHeader
        eyebrow="Manager · Usage analytics"
        title="Organization usage"
        subtitle="Credit consumption, query volume, and downstream conversion metrics."
        tone="cyan"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card glow>
          <CardLabel>CAC reduction</CardLabel>
          <CardTitle className="mt-2">Your cohort vs. baseline</CardTitle>
          <div className="mt-4">
            <CacReductionChart />
          </div>
        </Card>
        <Card glow>
          <CardLabel>ROAS acceleration</CardLabel>
          <CardTitle className="mt-2">Cumulative · 24 weeks</CardTitle>
          <div className="mt-4">
            <RoiAccelerationChart />
          </div>
        </Card>
      </div>
    </div>
  );
}
