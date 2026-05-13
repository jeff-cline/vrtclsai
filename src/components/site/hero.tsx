import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroCanvas } from "./hero-canvas";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="data-grid absolute inset-0 opacity-30" aria-hidden />
      <div className="absolute inset-0 bg-holo-blue" aria-hidden />
      <HeroCanvas />
      <Container className="relative z-10 py-28 sm:py-36 lg:py-44">
        <Badge tone="cyan" className="mb-8">
          Predictive Intelligence · v4.7 Live
        </Badge>
        <h1 className="max-w-5xl font-display text-5xl font-semibold tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
          Predict consumer intent{" "}
          <span className="holo-text">before your competitors</span> do.
        </h1>
        <p className="mt-7 max-w-2xl text-lg text-platinum/75 leading-relaxed">
          AI-powered predictive intelligence infrastructure delivering real-time
          behavioral signals, conversion probability modeling, and
          enterprise-grade acquisition intelligence at institutional scale.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={site.cta.primary.href} size="lg">
            {site.cta.primary.label} →
          </Button>
          <Button href={site.cta.secondary.href} variant="outline" size="lg">
            {site.cta.secondary.label}
          </Button>
        </div>

        <div className="mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-platinum/10 bg-platinum/10 sm:grid-cols-4">
          {[
            { k: "Probability", v: "92.4%", l: "in-window conversion" },
            { k: "Latency", v: "84ms", l: "p50 scoring" },
            { k: "Coverage", v: "32", l: "industries modeled" },
            { k: "Signal velocity", v: "14.7M", l: "events / day" },
          ].map((m) => (
            <div key={m.k} className="bg-navy-900/85 p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ai-cyan">
                {m.k}
              </div>
              <div className="mt-2 font-display text-2xl font-semibold text-white num">
                {m.v}
              </div>
              <div className="text-[11px] text-platinum/55">{m.l}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
