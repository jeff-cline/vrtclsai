import { Section } from "@/components/ui/section";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { DecayCurveChart } from "@/components/charts/decay-curve";
import { ConversionVelocityChart } from "@/components/charts/conversion-velocity";

export function WhyPredictive() {
  return (
    <Section
      id="why"
      eyebrow="Research · Decay · Velocity"
      title={
        <>
          Most companies buy stale lists.{" "}
          <span className="holo-text">Elite companies buy probability.</span>
        </>
      }
      intro="Lead quality decays non-linearly from the moment a behavioral signal is generated. Acquisition strategies that ignore decay over-spend on prospects who are already gone. The math is not subtle."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <Card glow>
          <div className="flex items-baseline justify-between">
            <div>
              <CardLabel>Lead-quality decay</CardLabel>
              <CardTitle className="mt-2">Hours since first intent signal</CardTitle>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ai-green">
              ● Live model
            </span>
          </div>
          <div className="mt-6">
            <DecayCurveChart />
          </div>
          <p className="mt-5 text-sm text-platinum/65 leading-relaxed">
            The predictive cohort retains usable probability past 48 hours
            because the model decays signal weight rather than discarding it.
            Industry-average leads (stale list vendors) lose ~80% of usable
            signal in the same window.
          </p>
        </Card>

        <Card glow>
          <div className="flex items-baseline justify-between">
            <div>
              <CardLabel>Conversion velocity</CardLabel>
              <CardTitle className="mt-2">Days from first contact</CardTitle>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ai-cyan">
              ● Calibrated
            </span>
          </div>
          <div className="mt-6">
            <ConversionVelocityChart />
          </div>
          <p className="mt-5 text-sm text-platinum/65 leading-relaxed">
            Probability-targeted cohorts hit 70%+ of their lifetime conversion
            value within 14 days. Cold list-based outreach takes 90+ days to
            reach the same level — at multiples of the spend.
          </p>
        </Card>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          {
            n: "1",
            t: "Signals are not lists",
            b: "Lists describe who exists. Signals describe who is acting. Probability ranks signals by what will happen next.",
          },
          {
            n: "2",
            t: "Decay is the moat",
            b: "Most vendors sell records. We sell probability-weighted records, decay-aware, with confidence intervals. That is a different product.",
          },
          {
            n: "3",
            t: "Identity unifies it",
            b: "An identity graph resolves signals from every channel to the same individual or household. Without it, the math degrades into noise.",
          },
        ].map((p) => (
          <Card key={p.n}>
            <div className="font-mono text-3xl font-semibold text-ai-cyan">
              0{p.n}
            </div>
            <CardTitle className="mt-3">{p.t}</CardTitle>
            <p className="mt-2 text-sm text-platinum/65 leading-relaxed">{p.b}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
