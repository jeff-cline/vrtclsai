import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/portal");
  return (
    <PortalShell
      role={((session.user as { role?: string }).role as "ADMIN" | "MANAGER" | "CUSTOMER") ?? "CUSTOMER"}
      email={session.user.email ?? ""}
    >
      {children}
    </PortalShell>
  );
}
