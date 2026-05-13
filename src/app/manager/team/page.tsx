import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function TeamPage() {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  const users = orgId ? await prisma.user.findMany({ where: { organizationId: orgId } }) : [];

  return (
    <div>
      <PortalHeader
        eyebrow="Manager · Team"
        title="Team management"
        subtitle="Members, roles, and recent activity."
        tone="cyan"
      />
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-platinum/5 bg-navy-800/70 text-left">
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Last login</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-platinum/5 last:border-0">
                <Td className="text-white">{u.name ?? "—"}</Td>
                <Td>{u.email}</Td>
                <Td>
                  <Badge tone={u.role === "MANAGER" ? "cyan" : "green"}>{u.role.toLowerCase()}</Badge>
                </Td>
                <Td className="text-platinum/55">
                  {u.lastLoginAt ? new Date(u.lastLoginAt).toISOString().slice(0, 10) : "—"}
                </Td>
              </tr>
            ))}
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
