import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-platinum/5 bg-navy-900/60 py-16">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-data-glow">
                <span className="h-2.5 w-2.5 rounded-sm bg-navy-900" />
              </span>
              <span className="font-display text-base font-semibold text-white">
                VRTCLS<span className="text-ai-cyan">.AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-platinum/60 leading-relaxed">
              Predictive Intelligence Infrastructure for enterprise customer
              acquisition. Behavioral signals, conversion probability, identity
              graphing — institutional-grade.
            </p>
          </div>
          <FooterCol
            title="Platform"
            links={[
              { href: "/platform", label: "Overview" },
              { href: "/platform/scoring", label: "AI Scoring" },
              { href: "/platform/identity-graph", label: "Identity Graph" },
              { href: "/platform/enrichment", label: "Enrichment" },
              { href: "/platform/api", label: "API" },
            ]}
          />
          <FooterCol
            title="Industries"
            links={site.industries.slice(0, 6).map((i) => ({
              href: `/industries/${i.slug}`,
              label: i.label,
            }))}
          />
          <FooterCol
            title="Research"
            links={[
              { href: "/research", label: "Research Hub" },
              { href: "/case-studies", label: "Case Studies" },
              { href: "/faq", label: "FAQ" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ]}
          />
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-platinum/5 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-platinum/40">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-platinum/40">
            <span className="text-ai-green">●</span> Live · {formatTime()}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ai-cyan">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-platinum/70 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatTime() {
  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
}
