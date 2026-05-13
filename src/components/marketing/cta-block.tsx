import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function CtaBlock() {
  return (
    <Section className="pt-0">
      <div className="relative overflow-hidden rounded-2xl border border-platinum/10 bg-navy-800/60 p-10 sm:p-16">
        <div className="absolute inset-0 bg-holo-blue opacity-60" aria-hidden />
        <div className="data-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ai-cyan">
            Predictive intelligence · enterprise onboarding
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Move from list-buying to{" "}
            <span className="holo-text">probability-buying</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-platinum/75 leading-relaxed">
            Engage your account team for a calibrated intelligence estimate,
            methodology walkthrough, and a sandbox environment scored against
            your own audience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.cta.primary.href} size="lg">
              {site.cta.primary.label} →
            </Button>
            <Button href={site.cta.secondary.href} variant="outline" size="lg">
              {site.cta.secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
