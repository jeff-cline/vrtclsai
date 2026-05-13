import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

export default async function ManagerPage() {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  const [org, users, recentReq] = orgId
    ? await Promise.all([
        prisma.organization.findUnique({ where: { id: orgId } }),
        prisma.user.findMany({ where: { organizationId: orgId } }),
        prisma.leadRequest.findMany({
          where: { organizationId: orgId },
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
      ])
    : [null, [], []];

  return (
    <div>
      <PortalHeader
        eyebrow="Manager · Team oversight"
        title={`${org?.name ?? "Organization"} overview`}
        subtitle="Team utilization, approval queue, and intelligence consumption."
        tone="cyan"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Team size" value={formatNumber(users.length)} />
        <Stat label="Credits available" value={formatNumber(org?.creditBalance ?? 0)} accent="cyan" />
        <Stat label="Active requests" value={formatNumber(recentReq.length)} />
        <Stat label="Tier" value={(org?.tier ?? "—").toUpperCase()} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardLabel>Team members</CardLabel>
          <CardTitle className="mt-2">Active users</CardTitle>
          <ul className="mt-4 space-y-2 text-sm">
            {users.map((u) => (
              <li key={u.id} className="flex items-center justify-between border-b border-platinum/5 pb-2 last:border-0">
                <div>
                  <div className="text-white">{u.name ?? u.email}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/50">
                    {u.role.toLowerCase()}
                  </div>
                </div>
                <div className="text-xs text-platinum/55">
                  {u.lastLoginAt ? new Date(u.lastLoginAt).toISOString().slice(0, 10) : "—"}
                </div>
              </li>
            ))}
            {users.length === 0 && (
              <li className="text-platinum/55">No team members yet.</li>
            )}
          </ul>
        </Card>
        <Card>
          <CardLabel>Approval queue</CardLabel>
          <CardTitle className="mt-2">Pending requests</CardTitle>
          <ul className="mt-4 space-y-2 text-sm">
            {recentReq.map((r) => (
              <li key={r.id} className="flex items-center justify-between border-b border-platinum/5 pb-2 last:border-0">
                <div>
                  <div className="text-white">{r.audienceName}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/55">
                    {r.industry} · {r.status.toLowerCase()}
                  </div>
                </div>
                <div className="font-display text-sm text-ai-cyan num">{r.estimatedSize}</div>
              </li>
            ))}
            {recentReq.length === 0 && (
              <li className="text-platinum/55">No requests in queue.</li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: "cyan" }) {
  const color = accent === "cyan" ? "text-ai-cyan" : "text-white";
  return (
    <Card>
      <CardLabel>{label}</CardLabel>
      <div className={`mt-3 font-display text-3xl font-semibold num ${color}`}>{value}</div>
    </Card>
  );
}
