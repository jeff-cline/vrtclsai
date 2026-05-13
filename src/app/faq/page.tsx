import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBlock } from "@/components/marketing/cta-block";

export const metadata: Metadata = {
  title: "FAQ — Predictive Intelligence Questions Answered",
  description:
    "Twenty-plus FAQs on predictive intelligence, intent data, behavioral modeling, identity graphing, compliance, AI scoring, and enterprise integration.",
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <FaqSection />
        <CtaBlock />
      </main>
      <SiteFooter />
    </>
  );
}
