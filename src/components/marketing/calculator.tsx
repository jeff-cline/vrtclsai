"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/ui/section";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

type EnrichmentKey = "demographic" | "psychographic" | "identity" | "behavioral";

const enrichmentLabels: Record<EnrichmentKey, { label: string; lift: number; cost: number }> = {
  demographic: { label: "Demographic enrichment", lift: 0.12, cost: 0.35 },
  psychographic: { label: "Psychographic overlay", lift: 0.18, cost: 0.55 },
  identity: { label: "Identity graph resolution", lift: 0.22, cost: 0.7 },
  behavioral: { label: "Behavioral propensity scoring", lift: 0.27, cost: 0.95 },
};

export function LeadValueCalculator() {
  const [leadAge, setLeadAge] = useState(24); // hours
  const [volume, setVolume] = useState(2500); // leads/mo
  const [enrichment, setEnrichment] = useState<Record<EnrichmentKey, boolean>>({
    demographic: true,
    psychographic: false,
    identity: true,
    behavioral: false,
  });

  const result = useMemo(() => {
    const baseScore = Math.exp(-leadAge / 36); // 0-1
    const enrichmentLift = (Object.keys(enrichment) as EnrichmentKey[])
      .filter((k) => enrichment[k])
      .reduce((s, k) => s + enrichmentLabels[k].lift, 0);
    const enrichmentCost = (Object.keys(enrichment) as EnrichmentKey[])
      .filter((k) => enrichment[k])
      .reduce((s, k) => s + enrichmentLabels[k].cost, 0);

    const probability = Math.min(0.95, baseScore * (1 + enrichmentLift));
    const baseCostPerLead = 2.25 + enrichmentCost;
    const monthlyCost = baseCostPerLead * volume;
    const cacReduction = 0.18 + enrichmentLift * 0.8; // %
    const expectedRoi = 1 + (probability * 3.4 + enrichmentLift * 1.6);
    const confidence = Math.min(0.98, 0.62 + enrichmentLift);

    let tier: "Inefficient" | "Optimized" | "Enterprise";
    if (monthlyCost < 3000) tier = "Inefficient";
    else if (monthlyCost < 10000) tier = "Optimized";
    else tier = "Enterprise";

    return {
      probability,
      monthlyCost,
      costPerLead: baseCostPerLead,
      cacReduction,
      expectedRoi,
      confidence,
      tier,
    };
  }, [leadAge, volume, enrichment]);

  return (
    <Section
      id="calculator"
      eyebrow="Interactive · Intelligence estimator"
      title="Run a predictive intelligence estimate."
      intro="Adjust the parameters that govern probability — lead freshness, volume, enrichment. The model returns conversion probability, projected CAC reduction, and expected ROI in real time."
    >
      <Card className="overflow-hidden p-0">
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-8 border-r border-platinum/5 p-8 lg:p-10">
            <div>
              <div className="flex items-baseline justify-between">
                <CardLabel>Lead age</CardLabel>
                <span className="font-mono text-sm text-white num">
                  {leadAge}h
                </span>
              </div>
              <input
                aria-label="Lead age in hours"
                type="range"
                min={0}
                max={168}
                value={leadAge}
                onChange={(e) => setLeadAge(Number(e.target.value))}
                className="mt-3 w-full accent-ai-cyan"
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/45">
                <span>0h · live</span>
                <span>72h · decaying</span>
                <span>168h · stale</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <CardLabel>Monthly lead volume</CardLabel>
                <span className="font-mono text-sm text-white num">
                  {formatNumber(volume)}
                </span>
              </div>
              <input
                aria-label="Monthly lead volume"
                type="range"
                min={250}
                max={50000}
                step={250}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="mt-3 w-full accent-ai-cyan"
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/45">
                <span>250</span>
                <span>10k</span>
                <span>50k</span>
              </div>
            </div>

            <div>
              <CardLabel>Enrichment layers</CardLabel>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {(Object.keys(enrichmentLabels) as EnrichmentKey[]).map((k) => {
                  const active = enrichment[k];
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() =>
                        setEnrichment((s) => ({ ...s, [k]: !s[k] }))
                      }
                      className={`flex items-center justify-between rounded-md border px-3 py-2.5 text-left text-sm transition-colors ${
                        active
                          ? "border-ai-cyan/50 bg-ai-cyan/10 text-white"
                          : "border-platinum/10 bg-navy-700/40 text-platinum/70 hover:border-platinum/30"
                      }`}
                    >
                      <span>{enrichmentLabels[k].label}</span>
                      <span
                        className={`font-mono text-[10px] ${
                          active ? "text-ai-cyan" : "text-platinum/40"
                        }`}
                      >
                        {active ? "ON" : "OFF"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6 bg-navy-900/40 p-8 lg:p-10">
            <ResultRow
              label="Conversion probability"
              value={formatPercent(result.probability)}
              accent="cyan"
            />
            <ResultRow
              label="Predictive confidence"
              value={formatPercent(result.confidence)}
            />
            <ResultRow
              label="Projected CAC reduction"
              value={formatPercent(result.cacReduction)}
              accent="green"
            />
            <ResultRow
              label="Expected ROAS"
              value={`${result.expectedRoi.toFixed(2)}x`}
              accent="green"
            />
            <ResultRow
              label="Cost per lead (est.)"
              value={formatCurrency(result.costPerLead)}
            />
            <ResultRow
              label="Estimated monthly spend"
              value={formatCurrency(result.monthlyCost)}
            />

            <div className="rounded-lg border border-platinum/10 bg-navy-800/60 p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ai-cyan">
                Tier recommendation
              </div>
              <div className="mt-2 font-display text-2xl font-semibold text-white">
                {result.tier} tier
              </div>
              <p className="mt-2 text-sm text-platinum/65">
                {result.tier === "Inefficient" &&
                  "This spend profile under-utilizes the platform. Increase volume or layer in identity + behavioral enrichment to unlock probability scoring at scale."}
                {result.tier === "Optimized" &&
                  "Strong fit. Layered enrichment + predictive scoring unlocks meaningful CAC reduction with manageable variance."}
                {result.tier === "Enterprise" &&
                  "Enterprise scale. Engage your account team for dedicated infrastructure, custom model governance, and quarterly intelligence reviews."}
              </p>
              <div className="mt-5 flex gap-2">
                <Button href="/quote" size="sm">
                  Get a Quote
                </Button>
                <Button href="/demo" variant="outline" size="sm">
                  Enterprise Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

function ResultRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "cyan" | "green";
}) {
  const color =
    accent === "cyan" ? "text-ai-cyan" : accent === "green" ? "text-ai-green" : "text-white";
  return (
    <div className="flex items-baseline justify-between border-b border-platinum/5 pb-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/60">
        {label}
      </span>
      <span className={`font-display text-xl font-semibold num ${color}`}>{value}</span>
    </div>
  );
}
