import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatPercent } from "@/lib/utils";

export default async function AudiencesPage() {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  const audiences = orgId
    ? await prisma.audience.findMany({
        where: { organizationId: orgId },
        orderBy: { updatedAt: "desc" },
      })
    : [];

  return (
    <div>
      <PortalHeader
        eyebrow="Audience builder · Predictive"
        title="Audiences"
        subtitle="Predictive cohorts assembled from behavioral, demographic, psychographic, and identity-graph signals."
      />
      <div className="mb-6 flex items-center justify-between">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/55">
          {audiences.length} saved audiences
        </div>
        <Button size="sm">+ New audience</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((a) => (
          <Card key={a.id}>
            <Badge tone="cyan">Audience</Badge>
            <CardTitle className="mt-3">{a.name}</CardTitle>
            {a.description && (
              <p className="mt-2 text-sm text-platinum/65">{a.description}</p>
            )}
            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-platinum/10 bg-platinum/10">
              <div className="bg-navy-900/80 p-3">
                <CardLabel>Size</CardLabel>
                <div className="mt-1 font-display text-lg text-white num">
                  {formatNumber(a.size)}
                </div>
              </div>
              <div className="bg-navy-900/80 p-3">
                <CardLabel>Confidence</CardLabel>
                <div className="mt-1 font-display text-lg text-ai-cyan num">
                  {formatPercent(a.confidence)}
                </div>
              </div>
            </div>
          </Card>
        ))}
        {audiences.length === 0 && (
          <div className="col-span-full">
            <Card>
              <CardLabel>Empty</CardLabel>
              <CardTitle className="mt-2">No saved audiences yet.</CardTitle>
              <p className="mt-2 text-sm text-platinum/65">
                Build your first predictive cohort to begin running intelligence
                queries and downloads.
              </p>
              <Button size="sm" className="mt-5">
                Build first audience →
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
