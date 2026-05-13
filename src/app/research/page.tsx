import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { industries } from "@/content/industries";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research Hub — Predictive Intelligence Methodology",
  description:
    "Calibrated methodology, decay modeling, identity resolution, behavioral propensity, and category benchmarks. Whitepaper-grade research with full citations.",
};

const topicSilos = [
  {
    slug: "predictive-methodology",
    label: "Predictive Methodology",
    intro: "Calibration, propensity modeling, decay-aware scoring, isotonic regression, Brier-score evaluation.",
  },
  {
    slug: "identity-graphing",
    label: "Identity Graphing",
    intro: "Probabilistic linkage at scale. Panel-calibrated accuracy. Household resolution and confidence intervals.",
  },
  {
    slug: "behavioral-economics",
    label: "Behavioral Economics",
    intro: "Prospect theory, anchoring, decision-window heuristics, applied to predictive conversion modeling.",
  },
  {
    slug: "compliance",
    label: "Data Compliance & Privacy",
    intro: "Consent provenance, GDPR / CCPA / TCPA frameworks, SOC 2 controls, HIPAA-aware architecture.",
  },
];

export default function ResearchHubPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section
          eyebrow="Research Hub · Methodology · Citations"
          title="Institutional research, not marketing collateral."
          intro="The research hub is where the methodology lives. Every claim made on the platform traces back to a calibration curve, a citation, or a verifiable benchmark."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            {topicSilos.map((t) => (
              <Link key={t.slug} href={`/research/${t.slug}`} className="group">
                <Card className="h-full transition-all duration-200 group-hover:border-ai-cyan/40 group-hover:shadow-glow">
                  <Badge tone="cyan">Topic silo</Badge>
                  <CardTitle className="mt-4 text-xl">{t.label}</CardTitle>
                  <p className="mt-2 text-sm text-platinum/65 leading-relaxed">{t.intro}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Section>

        <Section eyebrow="Industry research" title="By vertical">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="group">
                <Card className="h-full transition-all duration-200 group-hover:border-ai-cyan/40">
                  <CardLabel>{i.label}</CardLabel>
                  <CardTitle className="mt-2 text-[17px] leading-snug">{i.hero}</CardTitle>
                  <ul className="mt-4 space-y-1.5 text-sm text-platinum/65">
                    {i.clusterTopics.slice(0, 4).map((c) => (
                      <li key={c} className="capitalize">
                        · {c.replace(/-/g, " ")}
                      </li>
                    ))}
                  </ul>
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
