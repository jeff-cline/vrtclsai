import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { grantCredits } from "@/app/actions/admin";

export default async function AdminCreditsPage() {
  const session = await auth();
  const [orgs, txns] = await Promise.all([
    prisma.organization.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.creditTxn.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
      include: { organization: true, grantedBy: true },
    }),
  ]);
  const adminEmail = session?.user?.email ?? "";

  return (
    <div>
      <PortalHeader
        eyebrow="Admin · Credits"
        title="Credit ledger"
        subtitle="Issue, revoke, and audit credits. No internal payment processor — credits are granted manually after offline payment."
        tone="gold"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardLabel>Issue credits</CardLabel>
          <CardTitle className="mt-2">Manual grant</CardTitle>
          <p className="mt-2 text-sm text-platinum/65">
            Grant credits to an organization after payment is received offline.
            All grants are audit-logged.
          </p>
          <form action={grantCredits} className="mt-5 space-y-3">
            <input type="hidden" name="grantedByEmail" value={adminEmail} />
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Organization
              </span>
              <select
                name="organizationId"
                required
                className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none focus:border-ai-cyan/50"
              >
                <option value="">Select…</option>
                {orgs.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} · {o.creditBalance} cr.
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                  Amount
                </span>
                <input
                  name="amount"
                  type="number"
                  required
                  className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none focus:border-ai-cyan/50"
                  placeholder="positive grants, negative revokes"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                  Kind
                </span>
                <select
                  name="kind"
                  className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none focus:border-ai-cyan/50"
                  defaultValue="GRANT"
                >
                  <option value="GRANT">Grant</option>
                  <option value="REVOKE">Revoke</option>
                  <option value="ADJUSTMENT">Adjustment</option>
                  <option value="REFUND">Refund</option>
                </select>
              </label>
            </div>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Note (audit log)
              </span>
              <input
                name="note"
                type="text"
                className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none focus:border-ai-cyan/50"
                placeholder="e.g. wire received 2026-05-13"
              />
            </label>
            <Button type="submit" className="w-full">
              Apply credit transaction →
            </Button>
          </form>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="border-b border-platinum/5 p-5">
            <CardLabel>Recent ledger activity</CardLabel>
            <CardTitle className="mt-1">Last 25 transactions</CardTitle>
          </div>
          <table className="w-full text-sm">
            <thead className="border-b border-platinum/5 bg-navy-800/70 text-left">
              <tr>
                <Th>When</Th>
                <Th>Org</Th>
                <Th>Kind</Th>
                <Th>Amount</Th>
                <Th>By</Th>
                <Th>Note</Th>
              </tr>
            </thead>
            <tbody>
              {txns.map((t) => (
                <tr key={t.id} className="border-b border-platinum/5 last:border-0">
                  <Td className="text-platinum/55">
                    {new Date(t.createdAt).toISOString().slice(0, 16).replace("T", " ")}
                  </Td>
                  <Td className="text-white">{t.organization.name}</Td>
                  <Td>
                    <Badge
                      tone={
                        t.kind === "GRANT" || t.kind === "REFUND" ? "green" : t.kind === "REVOKE" ? "gold" : "cyan"
                      }
                    >
                      {t.kind.toLowerCase()}
                    </Badge>
                  </Td>
                  <Td className={`num font-display ${t.amount > 0 ? "text-ai-green" : "text-ai-gold"}`}>
                    {t.amount > 0 ? "+" : ""}
                    {formatNumber(t.amount)}
                  </Td>
                  <Td className="text-platinum/55">{t.grantedBy?.email ?? "system"}</Td>
                  <Td className="text-platinum/65">{t.note ?? ""}</Td>
                </tr>
              ))}
              {txns.length === 0 && (
                <tr>
                  <td className="px-5 py-6 text-center text-platinum/55" colSpan={6}>
                    No transactions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
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
