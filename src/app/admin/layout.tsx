import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if (role !== "ADMIN") redirect("/portal");
  return (
    <PortalShell role="ADMIN" email={session.user.email ?? ""}>
      {children}
    </PortalShell>
  );
}
