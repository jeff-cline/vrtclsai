import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CtaBlock } from "@/components/marketing/cta-block";
import { DecayCurveChart } from "@/components/charts/decay-curve";

const known: Record<string, { title: string; intro: string }> = {
  scoring: {
    title: "AI Scoring",
    intro: "Behavioral propensity scoring, calibrated against ground truth and decay-aware by design.",
  },
  "identity-graph": {
    title: "Identity Graph",
    intro: "Probabilistic linkage of signals to unified individuals and households at 97.4% panel-verified accuracy.",
  },
  enrichment: {
    title: "Enrichment",
    intro: "Demographic, psychographic, behavioral, and identity overlays. Sub-100ms p50 enrichment API.",
  },
  api: {
    title: "API",
    intro: "REST endpoints for scoring, enrichment, audience creation, and delivery. Webhook + batch supported.",
  },
};

export function generateStaticParams() {
  return Object.keys(known).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const k = known[slug];
  if (!k) return {};
  return { title: `${k.title} — Platform`, description: k.intro };
}

export default async function PlatformSubpage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const k = known[slug] ?? {
    title: slug.replace(/-/g, " "),
    intro: "Component of the predictive intelligence platform.",
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-platinum/5">
          <div className="absolute inset-0 bg-holo-blue opacity-70" aria-hidden />
          <div className="data-grid absolute inset-0 opacity-20" aria-hidden />
          <Container className="relative z-10 py-20">
            <Badge tone="cyan" className="mb-6">
              Platform
            </Badge>
            <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl">
              {k.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-platinum/70 leading-relaxed">{k.intro}</p>
          </Container>
        </section>
        <Section>
          <Card glow>
            <CardLabel>Calibration reference</CardLabel>
            <CardTitle className="mt-2">Decay-aware modeling</CardTitle>
            <div className="mt-4">
              <DecayCurveChart />
            </div>
          </Card>
        </Section>
        <CtaBlock />
      </main>
      <SiteFooter />
    </>
  );
}
