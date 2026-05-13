// Transparent, deterministic credit pricing for orders.
// Coefficients can be tuned without touching call sites.

const PREMIUM_INDUSTRIES = new Set([
  "Finance",
  "Real Estate",
  "Healthcare",
  "Private Equity",
  "Wellness & Longevity",
]);

export function quotePrice(input: {
  volume: number;
  enrichments: string[];
  decayWindowHours: number;
  industry: string;
}) {
  const base = input.volume * 0.32;
  const enrichmentMultiplier = 1 + input.enrichments.length * 0.18;
  const freshnessMultiplier =
    input.decayWindowHours <= 48 ? 1.25 : input.decayWindowHours <= 96 ? 1.1 : 1;
  const industryMultiplier = PREMIUM_INDUSTRIES.has(input.industry) ? 1.15 : 1;
  const credits = Math.round(
    base * enrichmentMultiplier * freshnessMultiplier * industryMultiplier
  );
  return Math.max(credits, 50);
}
