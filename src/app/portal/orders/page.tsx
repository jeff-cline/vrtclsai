import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card } from "@/components/ui/card";
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

export const metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

export default async function OrdersPage() {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  const orders = orgId
    ? await prisma.order.findMany({
        where: { organizationId: orgId },
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { files: true } } },
      })
    : [];

  return (
    <div>
      <PortalHeader
        eyebrow="Orders · Pipeline"
        title="Your data orders"
        subtitle="Every order placed against your credit balance, with status, files, and delivery information."
      />
      <div className="mb-6 flex items-center justify-between">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/55">
          {orders.length} orders
        </div>
        <Button href="/portal/order" size="sm">
          + New order
        </Button>
      </div>
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-platinum/5 bg-navy-800/70 text-left">
            <tr>
              <Th>Order</Th>
              <Th>Industry</Th>
              <Th>Records</Th>
              <Th>Credits</Th>
              <Th>Delivery</Th>
              <Th>Files</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th>{" "}</Th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-platinum/5 last:border-0">
                <Td className="font-mono text-[11px] text-platinum/70">{o.id.slice(0, 12)}</Td>
                <Td className="text-white">
                  {o.industry}
                  {o.region ? <span className="text-platinum/50"> · {o.region}</span> : null}
                </Td>
                <Td className="num">{formatNumber(o.volume)}</Td>
                <Td className="num text-ai-cyan">{formatNumber(o.creditCost)}</Td>
                <Td className="text-platinum/65">{prettyMethod(o.deliveryMethod)}</Td>
                <Td className="num">{o._count.files}</Td>
                <Td>
                  <Badge tone={statusTone[o.status] ?? "neutral"}>{o.status.toLowerCase()}</Badge>
                </Td>
                <Td className="text-platinum/55">
                  {new Date(o.createdAt).toISOString().slice(0, 10)}
                </Td>
                <Td>
                  <Link
                    href={`/portal/orders/${o.id}`}
                    className="text-xs text-ai-cyan hover:underline"
                  >
                    View →
                  </Link>
                </Td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td className="px-5 py-8 text-center text-platinum/55" colSpan={9}>
                  No orders yet.{" "}
                  <Link href="/portal/order" className="text-ai-cyan hover:underline">
                    Place your first order →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function prettyMethod(m: string) {
  return (
    {
      FILE_DOWNLOAD: "File download",
      PING_POST: "Ping-post",
      SFTP: "SFTP",
      API_PULL: "API pull",
      CUSTOM: "Custom",
    } as Record<string, string>
  )[m] ?? m;
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/55">
      {children}
    </th>
  );
}
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-5 py-3 align-middle ${className ?? ""}`}>{children}</td>;
}
