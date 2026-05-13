import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { industries, getIndustry } from "@/content/industries";
import { caseStudies } from "@/lib/mock-data";
import { CacReductionChart } from "@/components/charts/cac-reduction";
import { ConversionVelocityChart } from "@/components/charts/conversion-velocity";
import { DecayCurveChart } from "@/components/charts/decay-curve";
import { CtaBlock } from "@/components/marketing/cta-block";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    title: ind.label,
    description: ind.intro,
    keywords: ind.keywords,
    openGraph: { title: ind.label, description: ind.intro },
  };
}

export default async function IndustryPillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const cs = caseStudies.find((c) => c.slug === ind.caseStudySlug);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-platinum/5">
          <div className="absolute inset-0 bg-holo-blue opacity-70" aria-hidden />
          <div className="data-grid absolute inset-0 opacity-20" aria-hidden />
          <Container className="relative z-10 py-24 sm:py-32">
            <Badge tone="cyan" className="mb-6">
              {ind.label}
            </Badge>
            <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
              {ind.hero}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-platinum/70 leading-relaxed">
              {ind.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.cta.secondary.href}>{site.cta.secondary.label}</Button>
              <Button href="#methodology" variant="outline">
                Methodology
              </Button>
            </div>

            <div className="mt-14 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-platinum/10 bg-platinum/10 sm:grid-cols-3">
              {ind.metrics.map((m) => (
                <div key={m.label} className="bg-navy-900/85 p-6">
                  <CardLabel>{m.label}</CardLabel>
                  <div className="mt-3 font-display text-3xl font-semibold text-white num">
                    {m.value}
                  </div>
                  <div className="mt-1 text-[11px] text-platinum/50">{m.note}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <Section
          id="methodology"
          eyebrow="Methodology · Signals"
          title={`What makes ${ind.label.split(" ")[0]} different.`}
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {ind.signals.map((s) => (
              <Card key={s.title}>
                <CardTitle>{s.title}</CardTitle>
                <p className="mt-3 text-sm text-platinum/65 leading-relaxed">{s.body}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Charts · Calibrated"
          title="Decay, velocity, and cost — measured."
          intro="Per-vertical curves derived from the platform's calibrated model output. Industry averages overlaid for reference."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <Card glow className="lg:col-span-2">
              <CardLabel>Lead-quality decay</CardLabel>
              <CardTitle className="mt-2">Hours since first intent signal</CardTitle>
              <div className="mt-4">
                <DecayCurveChart />
              </div>
            </Card>
            <Card>
              <CardLabel>Conversion velocity</CardLabel>
              <CardTitle className="mt-2">Days from first contact</CardTitle>
              <div className="mt-4">
                <ConversionVelocityChart height={220} />
              </div>
            </Card>
          </div>
          <div className="mt-6">
            <Card glow>
              <CardLabel>CAC reduction · 9-month rollout</CardLabel>
              <CardTitle className="mt-2">
                Traditional vs. predictive within the vertical
              </CardTitle>
              <div className="mt-4">
                <CacReductionChart />
              </div>
            </Card>
          </div>
        </Section>

        {cs && (
          <Section eyebrow="Case Study · Verified" title="Inside a deployment">
            <Card glow>
              <div className="flex items-center justify-between">
                <Badge tone="green">{cs.industry}</Badge>
                <span className="font-display text-3xl font-semibold text-white num">
                  {cs.metric}
                </span>
              </div>
              <CardTitle className="mt-5 text-2xl leading-snug">{cs.title}</CardTitle>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/55">
                {cs.sub}
              </div>
              <p className="mt-5 text-base text-platinum/70 leading-relaxed">{cs.summary}</p>
            </Card>
          </Section>
        )}

        <Section eyebrow="Topical depth · Cluster" title="Supporting research & guides">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ind.clusterTopics.map((t) => (
              <Link key={t} href={`/research/${t}`} className="group">
                <Card className="h-full transition-all duration-200 group-hover:border-ai-cyan/40">
                  <CardLabel>Cluster article</CardLabel>
                  <CardTitle className="mt-2 capitalize">
                    {t.replace(/-/g, " ")}
                  </CardTitle>
                  <div className="mt-3 text-xs text-platinum/55">Methodology · benchmarks · citations</div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>

        <Section eyebrow="FAQ · Schema-marked" title="Common questions">
          <div className="grid gap-3">
            {ind.faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-lg border border-platinum/10 bg-navy-800/40 p-5"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <span className="font-display text-base font-medium text-white">{f.q}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-platinum/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: ind.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </Section>

        <CtaBlock />
      </main>
      <SiteFooter />
    </>
  );
}
