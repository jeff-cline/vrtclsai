import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CaseStudies } from "@/components/marketing/case-studies";
import { CtaBlock } from "@/components/marketing/cta-block";

export const metadata: Metadata = {
  title: "Case Studies — Verified Predictive Intelligence Deployments",
  description:
    "Verified case studies across regenerative medicine, luxury real estate, consumer finance, luxury travel, and political — with third-party KPIs.",
};

export default function CaseStudiesIndex() {
  return (
    <>
      <SiteHeader />
      <main>
        <CaseStudies />
        <CtaBlock />
      </main>
      <SiteFooter />
    </>
  );
}
