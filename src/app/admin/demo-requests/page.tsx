import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card } from "@/components/ui/card";

export default async function DemoRequestsPage() {
  const items = await prisma.demoRequest.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <PortalHeader
        eyebrow="Admin · Inbound"
        title="Demo request inbox"
        subtitle="Inbound enterprise demo requests captured from the marketing site."
        tone="gold"
      />
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-platinum/5 bg-navy-800/70 text-left">
            <tr>
              <Th>When</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Company</Th>
              <Th>Industry</Th>
              <Th>Volume</Th>
              <Th>Phone</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id} className="border-b border-platinum/5 last:border-0 align-top">
                <Td className="text-platinum/55">
                  {new Date(d.createdAt).toISOString().slice(0, 16).replace("T", " ")}
                </Td>
                <Td className="text-white">{d.name}</Td>
                <Td>{d.email}</Td>
                <Td>{d.company ?? "—"}</Td>
                <Td>{d.industry ?? "—"}</Td>
                <Td>{d.volume ?? "—"}</Td>
                <Td className="text-platinum/55">{d.phone ?? "—"}</Td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="px-5 py-6 text-center text-platinum/55" colSpan={7}>
                  No demo requests yet.
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
  return <td className={`px-5 py-3 ${className ?? ""}`}>{children}</td>;
}
