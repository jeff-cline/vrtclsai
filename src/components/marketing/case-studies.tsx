import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { caseStudies } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export function CaseStudies() {
  return (
    <Section
      id="case-studies"
      eyebrow="Case Studies · Verified KPIs"
      title="Operators using predictive intelligence at institutional scale."
      intro="Five engagements across regenerative medicine, luxury real estate, consumer finance, luxury travel, and statewide political. Every metric below is third-party verified."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {caseStudies.map((c, idx) => (
          <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group">
            <Card className="h-full transition-all duration-200 group-hover:border-ai-green/40 group-hover:shadow-glow-green">
              <div className="flex items-center justify-between">
                <Badge tone={idx % 2 === 0 ? "green" : "cyan"}>
                  {c.industry}
                </Badge>
                <span className="font-display text-2xl font-semibold text-white num">
                  {c.metric}
                </span>
              </div>
              <CardTitle className="mt-5 text-xl leading-snug">{c.title}</CardTitle>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/50">
                {c.sub}
              </div>
              <p className="mt-4 text-sm text-platinum/65 leading-relaxed">
                {c.summary}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
