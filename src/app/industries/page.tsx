import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { industries } from "@/content/industries";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries — Predictive Intelligence by Vertical",
  description:
    "Predictive intelligence verticals: healthcare, real estate, finance, insurance, legal, travel, political, B2B SaaS, automotive, private equity, wellness, home services.",
};

export default function IndustriesIndex() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section
          eyebrow="Industries · Verticals · Pillar pages"
          title="Predictive intelligence, modeled per vertical."
          intro="Every industry has its own decay curve, identity profile, and conversion psychology. Pick a vertical for the full methodology, calibration, and KPI breakdown."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="group">
                <Card className="h-full transition-all duration-200 group-hover:border-ai-cyan/40 group-hover:shadow-glow">
                  <div className="flex items-start justify-between">
                    <Badge tone="cyan">{i.label.replace(" Predictive Intelligence", "").replace(" Intent Intelligence", "")}</Badge>
                    <ArrowUpRight className="h-4 w-4 text-platinum/40 transition-all group-hover:text-ai-cyan" />
                  </div>
                  <CardTitle className="mt-4 text-[17px] leading-snug">{i.hero}</CardTitle>
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-platinum/5 pt-4">
                    {i.metrics.slice(0, 3).map((m) => (
                      <div key={m.label}>
                        <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-platinum/45">
                          {m.label}
                        </div>
                        <div className="mt-1 font-display text-base font-semibold text-white num">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
