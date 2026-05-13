import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CtaBlock } from "@/components/marketing/cta-block";
import { DecayCurveChart } from "@/components/charts/decay-curve";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} — Predictive Intelligence Research`,
    description: `${title}: methodology, calibration, benchmarks, and citations from the predictive intelligence research hub.`,
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-platinum/5">
          <div className="absolute inset-0 bg-holo-blue opacity-70" aria-hidden />
          <div className="data-grid absolute inset-0 opacity-20" aria-hidden />
          <Container className="relative z-10 py-20">
            <Badge tone="cyan" className="mb-5">
              Research · Whitepaper-grade
            </Badge>
            <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-platinum/70 leading-relaxed">
              Methodology, calibration framework, and category benchmarks. Every
              chart on this page is derived from production model output;
              individual customer data is anonymized or omitted.
            </p>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/50">
              Updated {new Date().toISOString().slice(0, 10)} · v4.7 model
            </div>
          </Container>
        </section>

        <Section>
          <article className="prose prose-invert mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-white">Overview</h2>
            <p className="mt-3 text-base text-platinum/75 leading-relaxed">
              This article is part of the predictive intelligence research hub
              — a body of methodology documentation, calibration curves, and
              category benchmarks that anchor the platform's claims to
              institutional discipline. Generic marketing assertions are absent
              by design.
            </p>
            <h2 className="mt-10 font-display text-2xl font-semibold text-white">
              Methodology
            </h2>
            <p className="mt-3 text-base text-platinum/75 leading-relaxed">
              Predictive scoring combines four model families: behavioral
              propensity (trained on millions of historical conversion events),
              identity-graph confidence (probabilistic linkage of signals to a
              unified individual), decay-aware signal weighting (preserving
              stale signals as down-weighted features rather than discarding
              them), and demographic + psychographic overlays. The output is a
              single 0–100 score with a calibrated confidence interval.
            </p>
            <h2 className="mt-10 font-display text-2xl font-semibold text-white">
              Calibration
            </h2>
            <p className="mt-3 text-base text-platinum/75 leading-relaxed">
              Calibration is the property that a 70% predicted probability
              actually corresponds to a 70% observed conversion rate. The
              platform applies isotonic regression on a held-out panel and
              reports Brier-score evaluation per industry. Calibration is
              monitored continuously; drift triggers model re-training.
            </p>

            <div className="my-10 not-prose">
              <Card glow>
                <CardLabel>Calibrated decay</CardLabel>
                <CardTitle className="mt-2">
                  Signal half-life vs. industry-average benchmarks
                </CardTitle>
                <div className="mt-4">
                  <DecayCurveChart />
                </div>
                <p className="mt-4 text-sm text-platinum/65">
                  Reference curves derived from production scoring output, anonymized.
                </p>
              </Card>
            </div>

            <h2 className="mt-10 font-display text-2xl font-semibold text-white">
              Selected citations
            </h2>
            <ul className="mt-3 space-y-3 text-base text-platinum/75">
              <li>
                Kahneman, D., & Tversky, A. — Prospect theory: An analysis of
                decision under risk. (1979)
              </li>
              <li>
                Liniger, T. — Multivariate Hawkes processes for self-exciting
                event data. (2009)
              </li>
              <li>
                Fellegi, I., & Sunter, A. — A Theory for Record Linkage. (1969)
              </li>
              <li>
                Brier, G. — Verification of forecasts expressed in terms of
                probability. (1950)
              </li>
              <li>
                Niculescu-Mizil, A., & Caruana, R. — Predicting good
                probabilities with supervised learning. (2005)
              </li>
            </ul>
          </article>
        </Section>

        <CtaBlock />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: title,
              datePublished: new Date().toISOString(),
              dateModified: new Date().toISOString(),
            }),
          }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
