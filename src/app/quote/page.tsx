import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { DemoRequestForm } from "@/components/marketing/demo-form";

export const metadata: Metadata = {
  title: "Get a Quote — Predictive Intelligence Data",
  description:
    "Request a quote for predictive intelligence data — industry, geography, volume, delivery. We respond within one business day.",
};

export default function QuotePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section
          eyebrow="Get a quote · Enterprise data"
          title="Tell us what you need. We'll price it."
          intro="Quotes are tailored to industry, geography, audience, and delivery. After acceptance, credits are issued to your account; orders are placed against credits in the customer portal."
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Card>
              <DemoRequestForm source="quote" submitLabel="Request quote →" />
            </Card>
            <div className="space-y-6">
              <Card>
                <CardLabel>How quoting works</CardLabel>
                <CardTitle className="mt-2">Four steps</CardTitle>
                <ol className="mt-4 space-y-3 text-sm text-platinum/70 leading-relaxed">
                  <li>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                      01 ·
                    </span>{" "}
                    Submit the form. Your account team reviews within one business day.
                  </li>
                  <li>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                      02 ·
                    </span>{" "}
                    We confirm scope, recommend enrichments, and quote in credits + USD.
                  </li>
                  <li>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                      03 ·
                    </span>{" "}
                    On acceptance and payment, credits are issued to your portal account.
                  </li>
                  <li>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                      04 ·
                    </span>{" "}
                    Your team places orders against credits, receives data via your chosen delivery method.
                  </li>
                </ol>
              </Card>

              <Card>
                <CardLabel>Disclaimer · 3rd-party delivery</CardLabel>
                <CardTitle className="mt-2 text-base leading-snug">
                  Some delivery methods may require additional third-party services
                </CardTitle>
                <p className="mt-3 text-sm text-platinum/65 leading-relaxed">
                  Quote pricing covers data acquisition and standard delivery to
                  the customer portal. Delivery into customer-owned
                  infrastructure (ping-post endpoints, SFTP servers, custom
                  routing) may require additional third-party connectors or
                  exchange services. Those costs are billed separately and{" "}
                  <span className="text-white">are not included</span> in this
                  quote.
                </p>
              </Card>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
