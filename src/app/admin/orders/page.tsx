import Link from "next/link";
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
  title: "Admin · Orders",
  robots: { index: false, follow: false },
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const where = status && status !== "ALL" ? { status: status as never } : {};
  const orders = await prisma.order.findMany({
    where,
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      organization: true,
      requestedBy: true,
      _count: { select: { files: true } },
    },
    take: 100,
  });

  const filters: { key: string; label: string }[] = [
    { key: "ALL", label: "All" },
    { key: "PENDING", label: "Pending" },
    { key: "IN_PROGRESS", label: "In progress" },
    { key: "DELIVERED", label: "Delivered" },
    { key: "CANCELED", label: "Canceled" },
  ];

  return (
    <div>
      <PortalHeader
        eyebrow="Admin · Order queue"
        title="Fulfillment queue"
        subtitle="Every customer order across all organizations. Upload files, set status, add notes."
        tone="gold"
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = (status ?? "ALL") === f.key;
          return (
            <Link
              key={f.key}
              href={f.key === "ALL" ? "/admin/orders" : `/admin/orders?status=${f.key}`}
              className={`rounded-md border px-3 py-1.5 text-xs font-mono uppercase tracking-[0.14em] transition-colors ${
                active
                  ? "border-ai-cyan/60 bg-ai-cyan/10 text-white"
                  : "border-platinum/10 bg-navy-800/50 text-platinum/70 hover:border-platinum/30"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-platinum/5 bg-navy-800/70 text-left">
            <tr>
              <Th>Order</Th>
              <Th>Org</Th>
              <Th>Requested by</Th>
              <Th>Industry</Th>
              <Th>Records</Th>
              <Th>Credits</Th>
              <Th>Delivery</Th>
              <Th>Files</Th>
              <Th>Status</Th>
              <Th>Placed</Th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-platinum/5 last:border-0">
                <Td>
                  <Link href={`/admin/orders/${o.id}`} className="font-mono text-[11px] text-ai-cyan hover:underline">
                    {o.id.slice(0, 12)}
                  </Link>
                </Td>
                <Td className="text-white">{o.organization.name}</Td>
                <Td className="text-platinum/65">{o.requestedBy.email}</Td>
                <Td>
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
                  {o.acceptedAt ? new Date(o.acceptedAt).toISOString().slice(0, 10) : "—"}
                </Td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={10} className="px-5 py-8 text-center text-platinum/55">
                  No orders match this filter.
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
