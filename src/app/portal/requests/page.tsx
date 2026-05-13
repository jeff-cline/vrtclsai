import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatPercent } from "@/lib/utils";

const statusTone: Record<string, "cyan" | "green" | "gold" | "neutral"> = {
  DRAFT: "neutral",
  PENDING: "gold",
  APPROVED: "cyan",
  DELIVERED: "green",
  REJECTED: "neutral",
};

export default async function RequestsPage() {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  const requests = orgId
    ? await prisma.leadRequest.findMany({
        where: { organizationId: orgId },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div>
      <PortalHeader
        eyebrow="Lead requests · Pipeline"
        title="Intelligence requests"
        subtitle="Track every audience query, enrichment run, and delivery through the platform."
      />
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-platinum/5 bg-navy-800/70 text-left">
            <tr>
              <Th>Request</Th>
              <Th>Industry</Th>
              <Th>Size</Th>
              <Th>Confidence</Th>
              <Th>Credits</Th>
              <Th>Status</Th>
              <Th>Created</Th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-platinum/5 last:border-0">
                <Td className="text-white">{r.audienceName}</Td>
                <Td>{r.industry}</Td>
                <Td className="num">{formatNumber(r.estimatedSize)}</Td>
                <Td className="num text-ai-cyan">{formatPercent(r.confidence)}</Td>
                <Td className="num">{r.creditCost}</Td>
                <Td>
                  <Badge tone={statusTone[r.status] ?? "neutral"}>
                    {r.status.toLowerCase()}
                  </Badge>
                </Td>
                <Td className="text-platinum/55">
                  {new Date(r.createdAt).toISOString().slice(0, 10)}
                </Td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <Td className="text-platinum/55" colSpan={7}>
                  No requests yet. Build an audience and request intelligence.
                </Td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/55">
      {children}
    </th>
  );
}

function Td({
  children,
  className,
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td colSpan={colSpan} className={`px-5 py-3 align-middle ${className ?? ""}`}>
      {children}
    </td>
  );
}
