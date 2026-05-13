import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CtaBlock } from "@/components/marketing/cta-block";
import { caseStudies } from "@/lib/mock-data";
import { CacReductionChart } from "@/components/charts/cac-reduction";
import { RoiAccelerationChart } from "@/components/charts/roi-acceleration";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return { title: cs.title, description: cs.summary };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-platinum/5">
          <div className="absolute inset-0 bg-holo-blue opacity-70" aria-hidden />
          <div className="data-grid absolute inset-0 opacity-20" aria-hidden />
          <Container className="relative z-10 py-20">
            <Badge tone="green" className="mb-5">{cs.industry}</Badge>
            <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl">
              {cs.title}
            </h1>
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/55">{cs.sub}</div>
            <div className="mt-8 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-lg border border-platinum/10 bg-platinum/10">
              {[{ k: "Outcome", v: cs.metric }, { k: "Industry", v: cs.industry }, { k: "Window", v: "9 months" }].map((m) => (
                <div key={m.k} className="bg-navy-900/85 p-5">
                  <CardLabel>{m.k}</CardLabel>
                  <div className="mt-2 font-display text-xl font-semibold text-white num">{m.v}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <Section eyebrow="Engagement summary" title="What happened">
          <p className="max-w-3xl text-lg text-platinum/75 leading-relaxed">{cs.summary}</p>
        </Section>

        <Section eyebrow="Charts · Verified" title="Performance">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card glow>
              <CardLabel>CAC reduction</CardLabel>
              <CardTitle className="mt-2">9-month rollout</CardTitle>
              <div className="mt-4"><CacReductionChart /></div>
            </Card>
            <Card glow>
              <CardLabel>ROAS acceleration</CardLabel>
              <CardTitle className="mt-2">Cumulative return — 24 weeks</CardTitle>
              <div className="mt-4"><RoiAccelerationChart /></div>
            </Card>
          </div>
        </Section>

        <CtaBlock />
      </main>
      <SiteFooter />
    </>
  );
}
