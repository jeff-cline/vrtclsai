"use client";

import { FormEvent, useMemo, useState } from "react";
import { Section } from "@/components/ui/section";
import { Card, CardLabel } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { submitDemoRequest } from "@/app/actions/demo";
import { formatNumber } from "@/lib/utils";
import {
  DEMOGRAPHICS,
  RECENCY_PRESETS,
  VOLUME_MIN,
  VOLUME_MAX,
  ORDER_MINIMUM,
  FLOOR_PRICE_PER_LEAD,
  PREMIUM_PRICE_PER_LEAD,
  quoteLeads,
  type DemographicKey,
} from "@/lib/lead-pricing";

function fmtMoney(n: number, fractional = false) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractional ? 2 : 0,
    maximumFractionDigits: fractional ? 2 : 0,
  }).format(n);
}

const DEFAULT_DEMOS: DemographicKey[] = ["age", "zip", "income", "homeowner"];

export function LeadValueCalculator() {
  const [recencyDays, setRecencyDays] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(500);
  const [demographics, setDemographics] = useState<DemographicKey[]>(DEFAULT_DEMOS);
  const [quoteUnlocked, setQuoteUnlocked] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const quote = useMemo(
    () => quoteLeads({ recencyDays, demographics, quantity }),
    [recencyDays, demographics, quantity]
  );

  const toggleDemo = (k: DemographicKey) =>
    setDemographics((s) =>
      s.includes(k) ? s.filter((x) => x !== k) : [...s, k]
    );

  async function unlockPricing(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUnlocking(true);
    setUnlockError(null);
    const fd = new FormData(e.currentTarget);
    fd.set("source", "quote-calculator-lock");
    fd.set(
      "message",
      `Calculator unlock request: recency=${recencyDays} days, quantity=${quantity}, demographics=${demographics.join(",")}`
    );
    const res = await submitDemoRequest(fd);
    setUnlocking(false);
    if (res.ok) setQuoteUnlocked(true);
    else setUnlockError(res.error ?? "Unable to submit. Please try again.");
  }

  return (
    <Section
      id="calculator"
      eyebrow="Interactive · Lead pricing calculator"
      title="Price your lead pull in real time."
      intro="Tune freshness, demographic depth, and quantity. The model updates live while your team configures recency, depth, and volume. Submit your details to unlock full quote visibility."
    >
      <Card className="overflow-hidden p-0">
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          {/* Inputs */}
          <div className="space-y-8 border-r border-platinum/5 p-8 lg:p-10">
            {/* Recency */}
            <div>
              <div className="flex items-baseline justify-between">
                <CardLabel>Lead recency</CardLabel>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/55">
                  Fresher → higher intent → higher value
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {RECENCY_PRESETS.map((p) => {
                  const active = recencyDays === p.days;
                  return (
                    <button
                      key={p.days}
                      type="button"
                      onClick={() => setRecencyDays(p.days)}
                      className={`flex flex-col rounded-md border px-3 py-3 text-left transition-colors ${
                        active
                          ? "border-ai-cyan/60 bg-ai-cyan/10 text-white"
                          : "border-platinum/10 bg-navy-700/40 text-platinum/70 hover:border-platinum/30"
                      }`}
                    >
                      <span className="font-display text-sm font-semibold">{p.label}</span>
                      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-platinum/55">
                        {p.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Demographics */}
            <div>
              <div className="flex items-baseline justify-between">
                <CardLabel>Demographic depth</CardLabel>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/55">
                  {demographics.length} selected
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {DEMOGRAPHICS.map((d) => {
                  const active = demographics.includes(d.key);
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => toggleDemo(d.key)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                        active
                          ? "border-ai-cyan/60 bg-ai-cyan/10 text-white"
                          : "border-platinum/10 bg-navy-700/40 text-platinum/70 hover:border-platinum/30"
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-platinum/45">
                Richer demographics carry higher market value — pricing reflects
                the cumulative cost of appended data.
              </p>
            </div>

            {/* Quantity */}
            <div>
              <div className="flex items-baseline justify-between">
                <CardLabel>Order quantity</CardLabel>
                <span className="font-mono text-sm text-white num">
                  {formatNumber(quantity)} leads
                </span>
              </div>
              <input
                aria-label="Order quantity"
                type="range"
                min={VOLUME_MIN}
                max={VOLUME_MAX}
                step={50}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-3 w-full accent-ai-cyan"
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/45">
                <span>{formatNumber(VOLUME_MIN)} · premium</span>
                <span>10k</span>
                <span>{formatNumber(VOLUME_MAX)} · bulk</span>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-6 bg-navy-900/40 p-8 lg:p-10">
            <div className="relative">
              <div className={!quoteUnlocked ? "pointer-events-none select-none" : ""}>
                <div className="rounded-lg border border-platinum/10 bg-navy-800/60 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ai-cyan">
                      {quote.tier}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-platinum/55">
                      Range {fmtMoney(FLOOR_PRICE_PER_LEAD, true)} – {fmtMoney(PREMIUM_PRICE_PER_LEAD)}
                    </span>
                  </div>
                  <div className="mt-3 font-display text-5xl font-semibold text-white num">
                    {fmtMoney(quote.pricePerLead, true)}
                    <span className="ml-2 align-baseline font-mono text-xs uppercase tracking-[0.2em] text-platinum/50">
                      / lead
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-platinum/65">
                    {quote.tier === "Real-time premium" &&
                      "Real-time delivery on high-intent records. Daily push, freshest available, full demographic stack."}
                    {quote.tier === "Performance" &&
                      "Recent records with rich appends — strong fit for active outbound and qualified retargeting cohorts."}
                    {quote.tier === "Volume" &&
                      "Mid-aged records at scale. Optimized for nurture sequences and look-alike modeling."}
                    {quote.tier === "Archive bulk" &&
                      "Older, lightly-appended records at the platform floor — bulk targeting and broad-reach campaigns."}
                  </p>
                </div>

                <div className="mt-6 space-y-6">
                  <ResultRow
                    label="Per-lead price"
                    value={fmtMoney(quote.pricePerLead, true)}
                  />
                  <ResultRow
                    label="Subtotal"
                    value={fmtMoney(quote.subtotal)}
                    dim={quote.minimumApplied}
                  />
                  <ResultRow
                    label="Order total"
                    value={fmtMoney(quote.orderTotal)}
                    accent="cyan"
                  />
                  {quote.minimumApplied ? (
                    <ResultRow
                      label="Effective per-lead"
                      value={fmtMoney(quote.effectivePerLead, true)}
                      accent="gold"
                    />
                  ) : null}

                  {quote.minimumApplied && (
                    <div className="rounded-md border border-ai-gold/40 bg-ai-gold/10 p-4 text-sm text-ai-gold">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em]">
                        {fmtMoney(ORDER_MINIMUM)} order minimum
                      </div>
                      <p className="mt-1.5 text-platinum/75">
                        Pulling {formatNumber(quantity)} leads costs us the same operational
                        effort as pulling thousands. Orders below {fmtMoney(ORDER_MINIMUM)}{" "}
                        are billed at the minimum — increase quantity to lower your effective
                        per-lead price.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {!quoteUnlocked && (
                <div className="absolute inset-0 z-20 rounded-xl border border-ai-cyan/40 bg-navy-950/70 p-4 backdrop-blur-[2px] sm:p-5">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ai-cyan">
                    Unlock Live Quote
                  </div>
                  <p className="mb-4 text-sm text-platinum/80">
                    Price updates are running in real time behind this gate. Enter your details to reveal full pricing and order totals.
                  </p>
                  <form onSubmit={unlockPricing} className="grid gap-3 sm:grid-cols-2">
                    <input
                      name="name"
                      required
                      placeholder="Full name"
                      className="w-full rounded-md border border-platinum/20 bg-navy-900/80 px-3 py-2 text-sm text-white placeholder:text-platinum/35 focus:border-ai-cyan/60 focus:outline-none"
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Business email"
                      className="w-full rounded-md border border-platinum/20 bg-navy-900/80 px-3 py-2 text-sm text-white placeholder:text-platinum/35 focus:border-ai-cyan/60 focus:outline-none"
                    />
                    <input
                      name="company"
                      placeholder="Company"
                      className="w-full rounded-md border border-platinum/20 bg-navy-900/80 px-3 py-2 text-sm text-white placeholder:text-platinum/35 focus:border-ai-cyan/60 focus:outline-none"
                    />
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Phone"
                      className="w-full rounded-md border border-platinum/20 bg-navy-900/80 px-3 py-2 text-sm text-white placeholder:text-platinum/35 focus:border-ai-cyan/60 focus:outline-none"
                    />
                    <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                      <Button type="submit" size="sm" disabled={unlocking}>
                        {unlocking ? "Unlocking…" : "Get Quote to Unlock"}
                      </Button>
                      {unlockError ? (
                        <span className="text-xs text-ai-gold">{unlockError}</span>
                      ) : (
                        <span className="text-xs text-platinum/55">We respond within one business day.</span>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-platinum/10 bg-navy-800/60 p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ai-cyan">
                Ready to move
              </div>
              <p className="mt-2 text-sm text-platinum/65">
                Lock in this configuration as a formal quote, or talk to the team
                about enterprise volume and recurring delivery.
              </p>
              <div className="mt-4 flex gap-2">
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
  dim,
}: {
  label: string;
  value: string;
  accent?: "cyan" | "green" | "gold";
  dim?: boolean;
}) {
  const color =
    accent === "cyan"
      ? "text-ai-cyan"
      : accent === "green"
        ? "text-ai-green"
        : accent === "gold"
          ? "text-ai-gold"
          : "text-white";
  return (
    <div
      className={`flex items-baseline justify-between border-b border-platinum/5 pb-3 ${
        dim ? "opacity-60" : ""
      }`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-platinum/60">
        {label}
      </span>
      <span className={`font-display text-xl font-semibold num ${color}`}>{value}</span>
    </div>
  );
}
