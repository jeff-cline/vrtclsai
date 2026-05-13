import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CtaBlock } from "@/components/marketing/cta-block";
import { DecayCurveChart } from "@/components/charts/decay-curve";
import { ConversionVelocityChart } from "@/components/charts/conversion-velocity";
import { getArticle } from "@/content/cluster-articles";
import { industries } from "@/content/industries";

export function generateStaticParams() {
  const slugs = new Set<string>();
  slugs.add("predictive-methodology");
  slugs.add("identity-graphing");
  slugs.add("behavioral-economics");
  slugs.add("compliance");
  for (const i of industries) for (const c of i.clusterTopics) slugs.add(c);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return {
    title: `${article.title} — Predictive Intelligence Research`,
    description: article.intro,
    keywords: article.keywords,
    openGraph: { title: article.title, description: article.intro, type: "article" },
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  // Lateral links within silo — other clusters in the same industry, if any.
  const parentIndustry = industries.find((i) => i.clusterTopics.includes(slug));
  const lateralClusters = parentIndustry?.clusterTopics.filter((c) => c !== slug).slice(0, 5) ?? [];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-platinum/5">
          <div className="absolute inset-0 bg-holo-blue opacity-70" aria-hidden />
          <div className="data-grid absolute inset-0 opacity-20" aria-hidden />
          <Container className="relative z-10 py-20">
            <Badge tone="cyan" className="mb-5">
              {article.category} · Research
            </Badge>
            <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-platinum/70 leading-relaxed">
              {article.intro}
            </p>
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/50">
              Updated {new Date().toISOString().slice(0, 10)} · v4.7 model
            </div>
          </Container>
        </section>

        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <article className="prose prose-invert max-w-none">
              {article.sections.map((s) => (
                <div key={s.heading} className="mb-10">
                  <h2 className="font-display text-2xl font-semibold text-white">
                    {s.heading}
                  </h2>
                  <p className="mt-3 text-base text-platinum/75 leading-relaxed">{s.body}</p>
                </div>
              ))}

              <div className="my-10 not-prose">
                <Card glow>
                  <CardLabel>Calibrated decay reference</CardLabel>
                  <CardTitle className="mt-2">Signal half-life — production model</CardTitle>
                  <div className="mt-4">
                    <DecayCurveChart />
                  </div>
                </Card>
              </div>

              <div className="my-10 not-prose">
                <Card glow>
                  <CardLabel>Conversion velocity reference</CardLabel>
                  <CardTitle className="mt-2">Predictive cohort vs. cold list</CardTitle>
                  <div className="mt-4">
                    <ConversionVelocityChart />
                  </div>
                </Card>
              </div>

              <h2 className="mt-10 font-display text-2xl font-semibold text-white">
                Citations
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-platinum/70">
                {article.citations.map((c) => (
                  <li key={c}>· {c}</li>
                ))}
              </ul>
            </article>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              {parentIndustry && (
                <Card>
                  <CardLabel>Silo pillar</CardLabel>
                  <CardTitle className="mt-2 text-[15px] leading-snug">
                    {parentIndustry.label}
                  </CardTitle>
                  <Link
                    href={`/industries/${parentIndustry.slug}`}
                    className="mt-3 inline-flex text-xs text-ai-cyan hover:underline"
                  >
                    Read the pillar →
                  </Link>
                </Card>
              )}

              {lateralClusters.length > 0 && (
                <Card>
                  <CardLabel>Related clusters</CardLabel>
                  <ul className="mt-3 space-y-2 text-sm">
                    {lateralClusters.map((c) => (
                      <li key={c}>
                        <Link
                          href={`/research/${c}`}
                          className="text-platinum/70 hover:text-white capitalize"
                        >
                          {c.replace(/-/g, " ")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              <Card>
                <CardLabel>Topic pillars</CardLabel>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/research/predictive-methodology"
                      className="text-platinum/70 hover:text-white"
                    >
                      Predictive methodology
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/research/identity-graphing"
                      className="text-platinum/70 hover:text-white"
                    >
                      Identity graphing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/research/behavioral-economics"
                      className="text-platinum/70 hover:text-white"
                    >
                      Behavioral economics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/research/compliance"
                      className="text-platinum/70 hover:text-white"
                    >
                      Data compliance & privacy
                    </Link>
                  </li>
                </ul>
              </Card>
            </aside>
          </div>
        </Section>

        <CtaBlock />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.intro,
              keywords: article.keywords.join(", "),
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
