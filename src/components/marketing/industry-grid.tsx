import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { industryTiles } from "@/lib/mock-data";
import { ArrowUpRight } from "lucide-react";

export function IndustryGrid() {
  return (
    <Section
      id="industries"
      eyebrow="Industries · Predictive verticals"
      title="Predictive intelligence, mapped to every vertical."
      intro="Each vertical has its own decay curve, identity-resolution profile, and conversion psychology. Models are tuned per industry — not flattened into a single one-size product."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industryTiles.map((t) => (
          <Link key={t.slug} href={`/industries/${t.slug}`} className="group">
            <Card className="h-full transition-all duration-200 group-hover:border-ai-cyan/40 group-hover:shadow-glow">
              <div className="flex items-start justify-between">
                <CardLabel>{t.label}</CardLabel>
                <ArrowUpRight className="h-4 w-4 text-platinum/40 transition-all group-hover:text-ai-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <CardTitle className="mt-3 text-[17px] leading-snug">
                {t.headline}
              </CardTitle>
              <div className="mt-5 flex items-center gap-3 border-t border-platinum/5 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-green">
                  ● Live
                </span>
                <span className="font-mono text-sm text-white num">{t.kpi}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
