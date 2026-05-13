import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { organization: true },
  });

  return (
    <div>
      <PortalHeader
        eyebrow="Admin · Identity"
        title="Users"
        subtitle="All users across all organizations. Roles, organizations, last login."
        tone="gold"
      />
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-platinum/5 bg-navy-800/70 text-left">
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Organization</Th>
              <Th>Last login</Th>
              <Th>Created</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-platinum/5 last:border-0">
                <Td className="text-white">{u.name ?? "—"}</Td>
                <Td className="text-platinum/80">{u.email}</Td>
                <Td>
                  <Badge tone={u.role === "ADMIN" ? "gold" : u.role === "MANAGER" ? "cyan" : "green"}>
                    {u.role.toLowerCase()}
                  </Badge>
                </Td>
                <Td>{u.organization?.name ?? "—"}</Td>
                <Td className="text-platinum/55">
                  {u.lastLoginAt ? new Date(u.lastLoginAt).toISOString().slice(0, 10) : "—"}
                </Td>
                <Td className="text-platinum/55">
                  {new Date(u.createdAt).toISOString().slice(0, 10)}
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
  return <td className={`px-5 py-3 align-middle ${className ?? ""}`}>{children}</td>;
}
