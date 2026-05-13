import Link from "next/link";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-platinum/5 bg-navy-900/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-data-glow shadow-glow">
            <span className="h-2.5 w-2.5 rounded-sm bg-navy-900" />
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-white">
            VRTCLS<span className="text-ai-cyan">.AI</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-platinum/70 transition-colors hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/login" variant="ghost" size="sm">
            Sign in
          </Button>
          <Button href={site.cta.secondary.href} size="sm" className="hidden sm:inline-flex">
            {site.cta.secondary.label}
          </Button>
        </div>
      </Container>
    </header>
  );
}
