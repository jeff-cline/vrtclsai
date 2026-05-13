import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin · Lead inbox",
  robots: { index: false, follow: false },
};

export default async function LeadInboxPage() {
  const items = await prisma.demoRequest.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <PortalHeader
        eyebrow="Admin · Inbound"
        title="Lead inbox"
        subtitle="Quote requests and enterprise demo requests captured from the public marketing site."
        tone="gold"
      />
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-platinum/5 bg-navy-800/70 text-left">
            <tr>
              <Th>When</Th>
              <Th>Source</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Company</Th>
              <Th>Industry</Th>
              <Th>Volume</Th>
              <Th>Phone</Th>
              <Th>Message</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id} className="border-b border-platinum/5 last:border-0 align-top">
                <Td className="whitespace-nowrap text-platinum/55">
                  {new Date(d.createdAt).toISOString().slice(0, 16).replace("T", " ")}
                </Td>
                <Td>
                  <Badge tone={d.source === "quote" ? "cyan" : "green"}>
                    {d.source ?? "demo"}
                  </Badge>
                </Td>
                <Td className="text-white">{d.name}</Td>
                <Td>{d.email}</Td>
                <Td>{d.company ?? "—"}</Td>
                <Td>{d.industry ?? "—"}</Td>
                <Td>{d.volume ?? "—"}</Td>
                <Td className="text-platinum/55">{d.phone ?? "—"}</Td>
                <Td className="max-w-md text-platinum/70">
                  {d.message ? <span className="line-clamp-3">{d.message}</span> : "—"}
                </Td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="px-5 py-6 text-center text-platinum/55" colSpan={9}>
                  No inbound requests yet.
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
