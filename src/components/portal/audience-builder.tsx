"use client";

import { useMemo, useState, useTransition } from "react";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatPercent } from "@/lib/utils";
import { createAudience } from "@/app/actions/audiences";

const industries = [
  "Healthcare",
  "Real Estate",
  "Finance",
  "Insurance",
  "Legal",
  "Luxury Travel",
  "Political",
  "B2B SaaS",
  "Automotive",
  "Wellness & Longevity",
  "Home Services",
];

const enrichmentOptions = [
  { key: "demographic", label: "Demographic" },
  { key: "psychographic", label: "Psychographic" },
  { key: "identity", label: "Identity graph" },
  { key: "behavioral", label: "Behavioral propensity" },
];

export function AudienceBuilder() {
  const [industry, setIndustry] = useState("Healthcare");
  const [region, setRegion] = useState("");
  const [ageMin, setAgeMin] = useState(35);
  const [ageMax, setAgeMax] = useState(65);
  const [incomeMin, setIncomeMin] = useState(150000);
  const [decayWindow, setDecayWindow] = useState(72);
  const [enrichments, setEnrichments] = useState<string[]>(["demographic", "identity"]);
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const estimate = useMemo(() => {
    const base = 35000 - (decayWindow - 72) * 80 + incomeMin / -50 + enrichments.length * 1800;
    const size = Math.max(420, Math.round(base));
    const confidence = Math.min(
      0.98,
      0.72 + enrichments.length * 0.05 - Math.max(0, (decayWindow - 72) / 600)
    );
    const credits = Math.round(size * 0.06 + enrichments.length * 40);
    return { size, confidence, credits };
  }, [decayWindow, incomeMin, enrichments]);

  function toggleEnrichment(key: string) {
    setEnrichments((s) =>
      s.includes(key) ? s.filter((k) => k !== key) : [...s, key]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaved(false);
    const fd = new FormData(e.currentTarget);
    enrichments.forEach((k) => fd.append("enrichments", k));
    startTransition(async () => {
      try {
        await createAudience(fd);
        setSaved(true);
        setName("");
      } catch {
        // ignored — UI stays as-is; production would surface a toast
      }
    });
  }

  return (
    <Card className="p-0">
      <form onSubmit={onSubmit} className="grid lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6 border-r border-platinum/5 p-8">
          <div>
            <CardLabel>Predictive audience builder</CardLabel>
            <CardTitle className="mt-2 text-xl">Define a probability cohort</CardTitle>
            <p className="mt-2 text-sm text-platinum/65">
              Filters configure the underlying model. Size and confidence are
              recomputed in real time.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Industry
              </span>
              <select
                name="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none focus:border-ai-cyan/50"
              >
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Region
              </span>
              <input
                name="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. AZ, NV, TX, FL or DMA"
                className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-platinum/30 focus:border-ai-cyan/50"
              />
            </label>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Age range
              </span>
              <span className="font-mono text-sm text-white num">
                {ageMin}–{ageMax}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <input
                name="ageMin"
                type="range"
                min={18}
                max={90}
                value={ageMin}
                onChange={(e) => setAgeMin(Number(e.target.value))}
                className="w-full accent-ai-cyan"
              />
              <input
                name="ageMax"
                type="range"
                min={18}
                max={90}
                value={ageMax}
                onChange={(e) => setAgeMax(Number(e.target.value))}
                className="w-full accent-ai-cyan"
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Minimum household income
              </span>
              <span className="font-mono text-sm text-white num">
                ${formatNumber(incomeMin)}
              </span>
            </div>
            <input
              name="incomeMin"
              type="range"
              min={0}
              max={1000000}
              step={10000}
              value={incomeMin}
              onChange={(e) => setIncomeMin(Number(e.target.value))}
              className="mt-2 w-full accent-ai-cyan"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Signal decay window
              </span>
              <span className="font-mono text-sm text-white num">{decayWindow}h</span>
            </div>
            <input
              name="decayWindowHours"
              type="range"
              min={12}
              max={336}
              step={6}
              value={decayWindow}
              onChange={(e) => setDecayWindow(Number(e.target.value))}
              className="mt-2 w-full accent-ai-cyan"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/45">
              <span>12h · live</span>
              <span>72h · fresh</span>
              <span>2w · stale</span>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
              Enrichment layers
            </span>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {enrichmentOptions.map((e) => {
                const active = enrichments.includes(e.key);
                return (
                  <button
                    key={e.key}
                    type="button"
                    onClick={() => toggleEnrichment(e.key)}
                    className={`flex items-center justify-between rounded-md border px-3 py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "border-ai-cyan/50 bg-ai-cyan/10 text-white"
                        : "border-platinum/10 bg-navy-700/40 text-platinum/70 hover:border-platinum/30"
                    }`}
                  >
                    <span>{e.label}</span>
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

        <div className="space-y-5 bg-navy-900/40 p-8">
          <CardLabel>Live estimate</CardLabel>
          <CardTitle className="text-xl">Cohort preview</CardTitle>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-platinum/10 bg-platinum/10">
            <div className="bg-navy-900/80 p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Size
              </span>
              <div className="mt-1 font-display text-2xl font-semibold text-white num">
                {formatNumber(estimate.size)}
              </div>
            </div>
            <div className="bg-navy-900/80 p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Confidence
              </span>
              <div className="mt-1 font-display text-2xl font-semibold text-ai-cyan num">
                {formatPercent(estimate.confidence)}
              </div>
            </div>
            <div className="bg-navy-900/80 p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Credit cost (est.)
              </span>
              <div className="mt-1 font-display text-2xl font-semibold text-ai-green num">
                {formatNumber(estimate.credits)}
              </div>
            </div>
            <div className="bg-navy-900/80 p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Decay window
              </span>
              <div className="mt-1 font-display text-2xl font-semibold text-white num">
                {decayWindow}h
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Audience name
              </span>
              <input
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Regenerative HNW · 4-state cohort"
                className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-platinum/30 focus:border-ai-cyan/50"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Description
              </span>
              <textarea
                name="description"
                rows={2}
                placeholder="Optional"
                className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-platinum/30 focus:border-ai-cyan/50"
              />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={pending || !name.trim()}>
              {pending ? "Saving…" : "Save cohort →"}
            </Button>
            {saved && (
              <Badge tone="green" className="text-[10px]">
                Saved
              </Badge>
            )}
          </div>
          <p className="text-xs text-platinum/45">
            Credit consumption occurs when the cohort is requested for delivery,
            not at save time.
          </p>
        </div>
      </form>
    </Card>
  );
}
