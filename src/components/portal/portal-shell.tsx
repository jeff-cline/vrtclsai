import Link from "next/link";
import { signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function PortalShell({
  role,
  email,
  children,
}: {
  role: "ADMIN" | "MANAGER" | "CUSTOMER";
  email: string;
  children: React.ReactNode;
}) {
  const nav =
    role === "ADMIN"
      ? [
          { href: "/admin", label: "Dashboard" },
          { href: "/admin/orders", label: "Orders" },
          { href: "/admin/users", label: "Users" },
          { href: "/admin/credits", label: "Credits" },
          { href: "/admin/inbox", label: "Lead inbox" },
          { href: "/admin/analytics", label: "Analytics" },
        ]
      : role === "MANAGER"
      ? [
          { href: "/manager", label: "Overview" },
          { href: "/manager/team", label: "Team" },
          { href: "/manager/orders", label: "Team orders" },
          { href: "/manager/usage", label: "Usage" },
        ]
      : [
          { href: "/portal", label: "Dashboard" },
          { href: "/portal/order", label: "Place order" },
          { href: "/portal/orders", label: "My orders" },
          { href: "/portal/delivery", label: "Delivery" },
          { href: "/portal/api", label: "API access" },
        ];

  const accent =
    role === "ADMIN"
      ? "text-ai-gold"
      : role === "MANAGER"
      ? "text-ai-cyan"
      : "text-ai-green";

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-platinum/5 bg-navy-900/70 p-6 lg:block">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-data-glow shadow-glow">
            <span className="h-2.5 w-2.5 rounded-sm bg-navy-900" />
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-white">
            VRTCLS<span className="text-ai-cyan">.AI</span>
          </span>
        </Link>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-platinum/40">
          <span className={accent}>●</span> {role.toLowerCase()} portal
        </div>
        <nav className="mt-10 space-y-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm text-platinum/70 transition-colors hover:bg-white/5 hover:text-white"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-12 rounded-md border border-platinum/10 bg-navy-800/60 p-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/45">
            Signed in
          </div>
          <div className="mt-1 truncate text-sm text-white">{email}</div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="mt-2 text-xs text-ai-gold hover:underline">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 lg:p-12">{children}</main>
    </div>
  );
}
