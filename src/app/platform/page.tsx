import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { ConfidenceRadarChart } from "@/components/charts/confidence-radar";
import { IntentClusterChart } from "@/components/charts/intent-cluster";
import { CtaBlock } from "@/components/marketing/cta-block";

export const metadata: Metadata = {
  title: "Platform — Predictive Intelligence Infrastructure",
  description:
    "Predictive intelligence infrastructure: behavioral propensity scoring, identity graph resolution, decay-aware modeling, enrichment APIs, and real-time signal delivery.",
};

const layers = [
  {
    name: "Predictive Scoring",
    body: "Behavioral propensity, calibrated against panel ground truth. 0–100 score per individual with confidence interval. v4.7 model in production.",
  },
  {
    name: "Identity Graph",
    body: "Probabilistic linkage of signals to unified individuals or households. 97.4% accuracy vs. panel. Hashed-first by default.",
  },
  {
    name: "Decay-Aware Signal Engine",
    body: "Signal half-life modeled per category. Stale signals are down-weighted rather than discarded — preserved for retrospective modeling.",
  },
  {
    name: "Enrichment APIs",
    body: "Sub-100ms p50 latency. Demographic, psychographic, behavioral, identity overlays. Hashed input → normalized record output.",
  },
  {
    name: "Audience Builder",
    body: "Cohort assembly across signals. Real-time size estimation. Probability-weighted, decay-adjusted outputs.",
  },
  {
    name: "Delivery + Integrations",
    body: "Native exports to Salesforce, HubSpot, Marketo, Snowflake, BigQuery, Segment. Direct push to ad platforms. Webhook delivery.",
  },
];

export default function PlatformPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-platinum/5">
          <div className="absolute inset-0 bg-holo-blue opacity-70" aria-hidden />
          <div className="data-grid absolute inset-0 opacity-20" aria-hidden />
          <Container className="relative z-10 py-24 sm:py-32">
            <Badge tone="cyan" className="mb-6">
              Platform · Architecture · v4.7
            </Badge>
            <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
              Six layers of{" "}
              <span className="holo-text">predictive intelligence infrastructure</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-platinum/70 leading-relaxed">
              From raw behavioral signals to delivered probability — every layer
              of the stack designed for institutional-grade enterprise
              acquisition.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.cta.secondary.href}>{site.cta.secondary.label}</Button>
              <Button href="/research" variant="outline">
                Methodology
              </Button>
            </div>
          </Container>
        </section>

        <Section eyebrow="Stack · Architecture" title="The intelligence stack">
          <div className="grid gap-5 lg:grid-cols-3">
            {layers.map((l, i) => (
              <Card key={l.name}>
                <div className="font-mono text-3xl font-semibold text-ai-cyan">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <CardTitle className="mt-3">{l.name}</CardTitle>
                <p className="mt-2 text-sm text-platinum/65 leading-relaxed">{l.body}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section eyebrow="Calibration · Live" title="Model health">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card glow>
              <CardLabel>Confidence calibration</CardLabel>
              <CardTitle className="mt-2">By industry vs. ground truth panel</CardTitle>
              <div className="mt-4">
                <ConfidenceRadarChart />
              </div>
            </Card>
            <Card glow>
              <CardLabel>Behavioral cluster · platform-wide</CardLabel>
              <CardTitle className="mt-2">Predictive score × signal index</CardTitle>
              <div className="mt-4">
                <IntentClusterChart />
              </div>
            </Card>
          </div>
        </Section>

        <CtaBlock />
      </main>
      <SiteFooter />
    </>
  );
}
