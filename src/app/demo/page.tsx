import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { DemoRequestForm } from "@/components/marketing/demo-form";

export const metadata: Metadata = {
  title: "Request Enterprise Demo",
  description:
    "Engage your enterprise account team for a calibrated intelligence estimate, methodology walkthrough, and a sandbox environment scored against your own audience.",
};

export default function DemoPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section
          eyebrow="Enterprise · Onboarding · Sandbox"
          title="Request an enterprise intelligence demo."
          intro="A calibrated intelligence estimate, methodology walkthrough, and a sandbox environment scored against your own first-party audience. Sales-led, no self-serve checkout."
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Card>
              <DemoRequestForm />
            </Card>
            <Card>
              <CardLabel>What you'll get</CardLabel>
              <CardTitle className="mt-2">A 45-minute working session</CardTitle>
              <ul className="mt-5 space-y-3 text-sm text-platinum/70 leading-relaxed">
                <li>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">01 ·</span>{" "}
                  Intelligence estimate for your specific industry, geography, and target audience.
                </li>
                <li>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">02 ·</span>{" "}
                  Methodology walkthrough — decay modeling, identity-graph confidence, calibration framework.
                </li>
                <li>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">03 ·</span>{" "}
                  Sandbox environment scored against a sample of your first-party audience (under NDA).
                </li>
                <li>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">04 ·</span>{" "}
                  Commercial structure, credit tiers, and onboarding timeline.
                </li>
              </ul>
              <p className="mt-6 text-xs text-platinum/50">
                Enterprise engagements only. No self-serve subscription. Annual commitments are standard; quarterly pilots available for qualified accounts.
              </p>
            </Card>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
