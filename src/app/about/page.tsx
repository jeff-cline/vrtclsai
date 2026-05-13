import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { CtaBlock } from "@/components/marketing/cta-block";

export const metadata: Metadata = {
  title: "About — Predictive Intelligence Infrastructure",
  description:
    "Predictive intelligence infrastructure, built for institutional buyers. Our mandate, our methodology, and why this category exists.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section
          eyebrow="About · Mandate"
          title="A predictive intelligence company, built for institutional buyers."
          intro="We exist because list-buying produces wasted spend. Probability-buying produces compounding return. The category is new; the discipline that powers it is institutional."
        >
          <article className="prose prose-invert max-w-3xl">
            <p>
              The platform's mandate is straightforward: replace the
              twenty-year-old practice of buying static lead lists with a
              real-time probability layer. Behavioral signals are observed at
              scale; identity is resolved probabilistically; signals are
              weighted by decay; and the resulting probability is delivered as
              a calibrated score with a confidence interval.
            </p>
            <p>
              Every claim made on this platform — every chart, every KPI, every
              percentage — is anchored to a calibration framework. Generic
              marketing assertions are explicitly absent. The audience for this
              platform is institutional: senior operators, investors, and
              enterprise sponsors. The product, the writing, and the
              methodology are all calibrated to that audience.
            </p>
          </article>
        </Section>
        <CtaBlock />
      </main>
      <SiteFooter />
    </>
  );
}
