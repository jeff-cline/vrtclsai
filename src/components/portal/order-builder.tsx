"use client";

import { useMemo, useState, useTransition } from "react";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { placeOrder } from "@/app/actions/orders";
import { quotePrice } from "@/lib/pricing";

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
  "Private Equity",
  "Wellness & Longevity",
  "Home Services",
];

const enrichmentOptions = [
  { key: "demographic", label: "Demographic" },
  { key: "psychographic", label: "Psychographic" },
  { key: "identity", label: "Identity graph" },
  { key: "behavioral", label: "Behavioral propensity" },
];

const deliveryMethods = [
  { key: "FILE_DOWNLOAD", label: "File download (CSV / Parquet) from portal" },
  { key: "PING_POST", label: "Ping-post · HTTPS endpoint" },
  { key: "SFTP", label: "SFTP push · customer server" },
  { key: "API_PULL", label: "API pull · customer fetches" },
  { key: "CUSTOM", label: "Custom · 3rd-party-mediated" },
];

export function OrderBuilder({
  creditBalance,
  defaultDeliveryMethod,
  defaultDeliveryEndpoint,
}: {
  creditBalance: number;
  defaultDeliveryMethod?: string;
  defaultDeliveryEndpoint?: string | null;
}) {
  const [industry, setIndustry] = useState("Healthcare");
  const [region, setRegion] = useState("");
  const [volume, setVolume] = useState(2500);
  const [ageMin, setAgeMin] = useState(35);
  const [ageMax, setAgeMax] = useState(65);
  const [incomeMin, setIncomeMin] = useState(150000);
  const [decayWindow, setDecayWindow] = useState(72);
  const [enrichments, setEnrichments] = useState<string[]>(["demographic", "identity"]);
  const [deliveryMethod, setDeliveryMethod] = useState<string>(
    defaultDeliveryMethod ?? "FILE_DOWNLOAD"
  );
  const [deliveryEndpoint, setDeliveryEndpoint] = useState<string>(
    defaultDeliveryEndpoint ?? ""
  );
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const cost = useMemo(
    () => quotePrice({ volume, enrichments, decayWindowHours: decayWindow, industry }),
    [volume, enrichments, decayWindow, industry]
  );
  const insufficient = cost > creditBalance;
  const needsEndpoint = deliveryMethod === "PING_POST" || deliveryMethod === "SFTP" || deliveryMethod === "API_PULL";

  function toggleEnrichment(key: string) {
    setEnrichments((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    enrichments.forEach((k) => fd.append("enrichments", k));
    startTransition(async () => {
      try {
        await placeOrder(fd);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Order failed");
      }
    });
  }

  return (
    <Card className="p-0">
      <form onSubmit={onSubmit} className="grid lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6 border-r border-platinum/5 p-8">
          <div>
            <CardLabel>Quote & order</CardLabel>
            <CardTitle className="mt-2 text-xl">Configure your data order</CardTitle>
            <p className="mt-2 text-sm text-platinum/65">
              Filters determine cost. Pricing is computed instantly. Order is
              placed against your credit balance; delivery is handled by our
              team based on your delivery preference.
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
                Region / Geo
              </span>
              <input
                name="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. AZ, NV, TX, FL · or DMA · or ZIP list"
                className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-platinum/30 focus:border-ai-cyan/50"
              />
            </label>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Record volume
              </span>
              <span className="font-mono text-sm text-white num">{formatNumber(volume)}</span>
            </div>
            <input
              name="volume"
              type="range"
              min={100}
              max={250000}
              step={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="mt-2 w-full accent-ai-cyan"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/45">
              <span>100</span>
              <span>50k</span>
              <span>250k</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
                  Minimum HH income
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
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Signal freshness window
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

          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
              Notes for fulfillment team
            </span>
            <textarea
              name="notes"
              rows={3}
              placeholder="Anything our team should know — schema preferences, suppression lists, urgency."
              className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-platinum/30 focus:border-ai-cyan/50"
            />
          </label>
        </div>

        <div className="space-y-5 bg-navy-900/40 p-8">
          <CardLabel>Live quote</CardLabel>
          <CardTitle className="text-xl">Order summary</CardTitle>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-platinum/10 bg-platinum/10">
            <div className="bg-navy-900/80 p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Records
              </span>
              <div className="mt-1 font-display text-2xl font-semibold text-white num">
                {formatNumber(volume)}
              </div>
            </div>
            <div className="bg-navy-900/80 p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Credit cost
              </span>
              <div
                className={`mt-1 font-display text-2xl font-semibold num ${
                  insufficient ? "text-ai-gold" : "text-ai-cyan"
                }`}
              >
                {formatNumber(cost)}
              </div>
            </div>
            <div className="bg-navy-900/80 p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Your balance
              </span>
              <div className="mt-1 font-display text-2xl font-semibold text-white num">
                {formatNumber(creditBalance)}
              </div>
            </div>
            <div className="bg-navy-900/80 p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                After this order
              </span>
              <div
                className={`mt-1 font-display text-2xl font-semibold num ${
                  insufficient ? "text-ai-gold" : "text-ai-green"
                }`}
              >
                {formatNumber(Math.max(0, creditBalance - cost))}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Delivery method
              </span>
              <select
                name="deliveryMethod"
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none focus:border-ai-cyan/50"
              >
                {deliveryMethods.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>

            {needsEndpoint && (
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                  Endpoint / Server
                </span>
                <input
                  name="deliveryEndpoint"
                  value={deliveryEndpoint}
                  onChange={(e) => setDeliveryEndpoint(e.target.value)}
                  placeholder={
                    deliveryMethod === "SFTP"
                      ? "sftp://server.example.com/incoming"
                      : "https://endpoint.example.com/intake"
                  }
                  className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-platinum/30 focus:border-ai-cyan/50"
                />
              </label>
            )}

            {deliveryMethod === "CUSTOM" && (
              <div className="rounded-md border border-ai-gold/40 bg-ai-gold/10 px-3 py-2 text-xs text-ai-gold leading-relaxed">
                Custom / 3rd-party-mediated delivery may require additional
                third-party services (e.g., delivery middleware, secure
                exchanges). Those costs are billed separately and are not
                included in this credit price.
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-md border border-ai-gold/40 bg-ai-gold/10 px-3 py-2 text-sm text-ai-gold">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={pending || insufficient}>
              {pending ? "Placing…" : insufficient ? "Insufficient credits" : `Place order · ${formatNumber(cost)} credits →`}
            </Button>
            {insufficient && (
              <Badge tone="gold" className="text-[10px]">
                Contact your account team for additional credits
              </Badge>
            )}
          </div>
          <p className="text-xs text-platinum/45">
            Credits are deducted at order placement. Refunds are issued on cancellation.
          </p>
        </div>
      </form>
    </Card>
  );
}
