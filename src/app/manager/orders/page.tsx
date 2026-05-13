import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

const statusTone: Record<string, "cyan" | "green" | "gold" | "neutral"> = {
  DRAFT: "neutral",
  PENDING: "gold",
  IN_PROGRESS: "cyan",
  DELIVERED: "green",
  CANCELED: "neutral",
};

export const metadata = {
  title: "Manager · Team orders",
  robots: { index: false, follow: false },
};

export default async function ManagerOrdersPage() {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  const orders = orgId
    ? await prisma.order.findMany({
        where: { organizationId: orgId },
        orderBy: { createdAt: "desc" },
        include: { requestedBy: true, _count: { select: { files: true } } },
      })
    : [];

  return (
    <div>
      <PortalHeader
        eyebrow="Manager · Team orders"
        title="All team orders"
        subtitle="Read-only view of every order placed by your team."
        tone="cyan"
      />
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-platinum/5 bg-navy-800/70 text-left">
            <tr>
              <Th>Order</Th>
              <Th>Requester</Th>
              <Th>Industry</Th>
              <Th>Records</Th>
              <Th>Credits</Th>
              <Th>Files</Th>
              <Th>Status</Th>
              <Th>Placed</Th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-platinum/5 last:border-0">
                <Td>
                  <Link
                    href={`/portal/orders/${o.id}`}
                    className="font-mono text-[11px] text-ai-cyan hover:underline"
                  >
                    {o.id.slice(0, 12)}
                  </Link>
                </Td>
                <Td className="text-platinum/65">{o.requestedBy.email}</Td>
                <Td className="text-white">
                  {o.industry}
                  {o.region ? <span className="text-platinum/50"> · {o.region}</span> : null}
                </Td>
                <Td className="num">{formatNumber(o.volume)}</Td>
                <Td className="num text-ai-cyan">{formatNumber(o.creditCost)}</Td>
                <Td className="num">{o._count.files}</Td>
                <Td>
                  <Badge tone={statusTone[o.status] ?? "neutral"}>{o.status.toLowerCase()}</Badge>
                </Td>
                <Td className="text-platinum/55">
                  {o.acceptedAt ? new Date(o.acceptedAt).toISOString().slice(0, 10) : "—"}
                </Td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-8 text-center text-platinum/55">
                  No orders in this organization yet.
                </td>
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
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-5 py-3 align-middle ${className ?? ""}`}>{children}</td>;
}
