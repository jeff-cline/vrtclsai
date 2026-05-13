import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalShell } from "@/components/portal/portal-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if (role !== "ADMIN") redirect("/portal");
  const userId = (session.user as { id?: string }).id;
  if (userId) {
    const u = await prisma.user.findUnique({
      where: { id: userId },
      select: { mustChangePassword: true },
    });
    if (u?.mustChangePassword) redirect("/account/password");
  }
  return (
    <PortalShell role="ADMIN" email={session.user.email ?? ""}>
      {children}
    </PortalShell>
  );
}
