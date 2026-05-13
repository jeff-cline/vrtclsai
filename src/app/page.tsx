import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { LiveTicker } from "@/components/site/live-ticker";
import { Hero } from "@/components/site/hero";
import { StatGrid } from "@/components/site/stat-grid";
import { WhyPredictive } from "@/components/marketing/why-predictive";
import { LeadValueCalculator } from "@/components/marketing/calculator";
import { IndustryGrid } from "@/components/marketing/industry-grid";
import { CaseStudies } from "@/components/marketing/case-studies";
import { ResearchBlock } from "@/components/marketing/research-block";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBlock } from "@/components/marketing/cta-block";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LiveTicker />
        <Section
          eyebrow="Trust · Scale · Integrity"
          title="Institutional scale, measured in signals — not promises."
          intro="The platform processes behavioral signals at institutional scale and reports against calibrated ground-truth. These numbers refresh daily."
        >
          <StatGrid />
        </Section>
        <WhyPredictive />
        <LeadValueCalculator />
        <IndustryGrid />
        <CaseStudies />
        <ResearchBlock />
        <FaqSection limit={12} />
        <CtaBlock />
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: site.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description: site.description,
          }),
        }}
      />
    </>
  );
}
