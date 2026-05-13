import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Section } from "@/components/ui/section";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { DemoRequestForm } from "@/components/marketing/demo-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Engage your enterprise intelligence team.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section
          eyebrow="Contact · Enterprise"
          title="Talk to your intelligence team."
          intro="Enterprise onboarding only. We respond within one business day."
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Card>
              <DemoRequestForm />
            </Card>
            <Card>
              <CardLabel>Direct</CardLabel>
              <CardTitle className="mt-2">Intelligence desk</CardTitle>
              <ul className="mt-4 space-y-2 text-sm text-platinum/70">
                <li>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                    Email
                  </span>
                  <div>{site.email}</div>
                </li>
                <li>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                    Hours
                  </span>
                  <div>Mon–Fri · 9:00–18:00 CT</div>
                </li>
              </ul>
            </Card>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
