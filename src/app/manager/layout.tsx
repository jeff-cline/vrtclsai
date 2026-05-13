import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";

export default async function ManagerLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user) redirect("/login?callbackUrl=/manager");
  if (role !== "ADMIN" && role !== "MANAGER") redirect("/portal");
  return (
    <PortalShell role="MANAGER" email={session.user.email ?? ""}>
      {children}
    </PortalShell>
  );
}
