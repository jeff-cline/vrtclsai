import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalShell } from "@/components/portal/portal-shell";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/portal");
  const userId = (session.user as { id?: string }).id;
  if (userId) {
    const u = await prisma.user.findUnique({
      where: { id: userId },
      select: { mustChangePassword: true },
    });
    if (u?.mustChangePassword) redirect("/account/password");
  }
  return (
    <PortalShell
      role={((session.user as { role?: string }).role as "ADMIN" | "MANAGER" | "CUSTOMER") ?? "CUSTOMER"}
      email={session.user.email ?? ""}
    >
      {children}
    </PortalShell>
  );
}
