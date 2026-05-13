import { Section } from "@/components/ui/section";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { CacReductionChart } from "@/components/charts/cac-reduction";
import { RoiAccelerationChart } from "@/components/charts/roi-acceleration";
import { ConfidenceRadarChart } from "@/components/charts/confidence-radar";

export function ResearchBlock() {
  return (
    <Section
      id="research"
      eyebrow="Research · Whitepaper · Methodology"
      title="Methodology is not theater. It is institutional discipline."
      intro="Predictive scoring combines four model families: behavioral propensity, identity-graph confidence, decay-aware signal weighting, and demographic + psychographic overlays. Every score ships with a calibrated confidence interval."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card glow className="lg:col-span-2">
          <CardLabel>CAC reduction · 9-month rollout</CardLabel>
          <CardTitle className="mt-2">
            Traditional acquisition vs. predictive intelligence cohort
          </CardTitle>
          <div className="mt-5">
            <CacReductionChart />
          </div>
          <p className="mt-5 text-sm text-platinum/65 leading-relaxed">
            Anonymized data from a 14-clinic regenerative medicine network.
            Predictive cohort entered production in February; full curve
            steady-state by month seven. Traditional curve continued drift
            consistent with national category CAC inflation.
          </p>
        </Card>
        <Card>
          <CardLabel>Confidence by vertical</CardLabel>
          <CardTitle className="mt-2">Calibration vs. ground truth panel</CardTitle>
          <div className="mt-4">
            <ConfidenceRadarChart />
          </div>
          <p className="mt-3 text-xs text-platinum/55">
            Higher = closer alignment between predicted probability and observed conversion rate across the panel.
          </p>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardLabel>Foundations · Citations</CardLabel>
          <CardTitle className="mt-2">Selected research</CardTitle>
          <ul className="mt-4 space-y-3 text-sm text-platinum/70">
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                Behavioral economics
              </span>
              <div className="mt-0.5">
                Kahneman & Tversky · prospect theory under uncertainty in purchase decisions.
              </div>
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                Decay modeling
              </span>
              <div className="mt-0.5">
                Hawkes processes for self-exciting behavioral signals (Liniger, 2009).
              </div>
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                Identity resolution
              </span>
              <div className="mt-0.5">
                Probabilistic linkage at scale (Fellegi-Sunter framework, panel-calibrated).
              </div>
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                Calibration
              </span>
              <div className="mt-0.5">
                Brier-score evaluation + isotonic regression for predictive probability outputs.
              </div>
            </li>
          </ul>
        </Card>
        <Card glow className="lg:col-span-2">
          <CardLabel>ROI acceleration · 24-week cohort</CardLabel>
          <CardTitle className="mt-2">
            Cumulative ROAS — predictive vs. traditional baseline
          </CardTitle>
          <div className="mt-5">
            <RoiAccelerationChart />
          </div>
          <p className="mt-5 text-sm text-platinum/65 leading-relaxed">
            Cumulative return on ad spend across a 24-week predictive cohort
            versus baseline cold-list acquisition. The compounding gap is the
            value of decay-aware scoring + identity-graph resolution.
          </p>
        </Card>
      </div>
    </Section>
  );
}
