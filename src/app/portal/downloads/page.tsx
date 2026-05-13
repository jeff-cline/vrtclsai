import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stubs = [
  { name: "healthcare-hnw-2026q2.csv", size: "4.2 MB", date: "2026-05-08", credits: 320, status: "READY" },
  { name: "tx-migration-cohort-04.parquet", size: "12.4 MB", date: "2026-05-04", credits: 460, status: "READY" },
  { name: "finance-prime-switching.csv", size: "2.8 MB", date: "2026-04-29", credits: 280, status: "READY" },
];

export default function DownloadsPage() {
  return (
    <div>
      <PortalHeader
        eyebrow="Download center · Delivered intelligence"
        title="Audience downloads"
        subtitle="Delivered audience files. Each download consumes credits at your tier rate."
      />
      <div className="grid gap-4">
        {stubs.map((d) => (
          <Card key={d.name}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardLabel>{d.date}</CardLabel>
                <CardTitle className="mt-1">{d.name}</CardTitle>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/55">
                  {d.size} · {d.credits} credits
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone="green">{d.status}</Badge>
                <Button size="sm" variant="outline">
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
