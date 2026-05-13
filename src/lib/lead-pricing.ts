// Public lead-pricing model for the homepage calculator.
//
// Pricing axes:
//   • Recency (lead age, in days):  fresher == higher intent == more $/lead
//   • Demographic depth:            more rich attributes == more $/lead
//   • Order quantity:               larger pulls == lower $/lead (operational
//                                   leverage on our fulfillment side)
//
// Anchor points the model is calibrated to:
//   • Premium real-time pull, low volume, full demographic stack    →  $25.00 / lead
//   • Worst-case stale + minimal demos + very large pull             →  $0.44 / lead floor
//   • Single-order minimum (fulfillment break-even)                  →  $3,000 per order
//
// The per-demographic weights below reflect public industry pricing for data
// appends (Acxiom / Experian / L2 / public broker price sheets). We do NOT
// expose these to end users — the UI just shows total moving as they pick
// more demos.

export const PREMIUM_PRICE_PER_LEAD = 25;
export const FLOOR_PRICE_PER_LEAD = 0.44;
export const ORDER_MINIMUM = 3000;

export type DemographicKey =
  | "age"
  | "gender"
  | "zip"
  | "marital"
  | "education"
  | "children"
  | "homeowner"
  | "carOwner"
  | "income"
  | "netWorth"
  | "investor"
  | "donor"
  | "interests"
  | "emailVerified"
  | "mobilePhone";

export type DemographicOption = {
  key: DemographicKey;
  label: string;
  // Relative weight reflecting data-append market value. Hidden from UI.
  // These are normalized against the sum so the depth multiplier is [0, 1].
  weight: number;
};

export const DEMOGRAPHICS: DemographicOption[] = [
  { key: "age", label: "Age", weight: 1.0 },
  { key: "gender", label: "Gender", weight: 0.8 },
  { key: "zip", label: "ZIP / geo", weight: 1.0 },
  { key: "marital", label: "Marital status", weight: 1.0 },
  { key: "education", label: "Education", weight: 1.2 },
  { key: "children", label: "Children in home", weight: 1.3 },
  { key: "homeowner", label: "Homeowner status", weight: 1.8 },
  { key: "carOwner", label: "Auto owner", weight: 1.6 },
  { key: "income", label: "Income band", weight: 2.5 },
  { key: "netWorth", label: "Net worth tier", weight: 2.8 },
  { key: "investor", label: "Investor signal", weight: 2.6 },
  { key: "donor", label: "Donor history", weight: 2.2 },
  { key: "interests", label: "Interest categories", weight: 2.0 },
  { key: "emailVerified", label: "Verified email", weight: 1.5 },
  { key: "mobilePhone", label: "Mobile phone", weight: 1.8 },
];

const TOTAL_WEIGHT = DEMOGRAPHICS.reduce((s, d) => s + d.weight, 0);

// Recency presets the UI snaps to.
export const RECENCY_PRESETS: { days: number; label: string; sub: string }[] = [
  { days: 1, label: "Real-time", sub: "≤ 24h · daily delivery" },
  { days: 7, label: "7 days", sub: "weekly cohort" },
  { days: 30, label: "30 days", sub: "monthly cohort" },
  { days: 365, label: "1 year", sub: "archive · bulk targeting" },
];

export const VOLUME_MIN = 50;
export const VOLUME_MAX = 100_000;

// Recency multiplier: 1.0 at 1 day → 0 at 365 days (log scale, clamped).
export function recencyMultiplier(days: number): number {
  if (days <= 1) return 1;
  if (days >= 365) return 0.05;
  return Math.max(0.05, 1 - Math.log10(days) / Math.log10(365));
}

// Depth multiplier: 0 with nothing selected → 1.0 with every demo selected.
export function depthMultiplier(selected: DemographicKey[]): number {
  const weight = selected.reduce(
    (s, k) => s + (DEMOGRAPHICS.find((d) => d.key === k)?.weight ?? 0),
    0
  );
  return weight / TOTAL_WEIGHT;
}

// Volume multiplier: 1.0 at floor (premium small pull) → 0 at the cap (bulk).
export function volumeMultiplier(quantity: number): number {
  const v = Math.max(VOLUME_MIN, Math.min(VOLUME_MAX, quantity));
  if (v <= VOLUME_MIN) return 1;
  return Math.max(0, 1 - Math.log10(v / VOLUME_MIN) / Math.log10(VOLUME_MAX / VOLUME_MIN));
}

export type LeadQuote = {
  pricePerLead: number;       // raw, before the order minimum kicks in
  subtotal: number;           // pricePerLead × quantity
  orderTotal: number;         // max(subtotal, ORDER_MINIMUM)
  effectivePerLead: number;   // orderTotal ÷ quantity (what they actually pay)
  minimumApplied: boolean;
  tier: "Real-time premium" | "Performance" | "Volume" | "Archive bulk";
};

export function quoteLeads(input: {
  recencyDays: number;
  demographics: DemographicKey[];
  quantity: number;
}): LeadQuote {
  const r = recencyMultiplier(input.recencyDays);
  const d = depthMultiplier(input.demographics);
  const v = volumeMultiplier(input.quantity);

  const raw = PREMIUM_PRICE_PER_LEAD * r * d * v;
  const pricePerLead = Math.max(FLOOR_PRICE_PER_LEAD, raw);
  const qty = Math.max(1, Math.round(input.quantity));
  const subtotal = pricePerLead * qty;
  const orderTotal = Math.max(ORDER_MINIMUM, subtotal);
  const effectivePerLead = orderTotal / qty;
  const minimumApplied = subtotal < ORDER_MINIMUM;

  let tier: LeadQuote["tier"];
  if (pricePerLead >= 15) tier = "Real-time premium";
  else if (pricePerLead >= 5) tier = "Performance";
  else if (pricePerLead >= 1.5) tier = "Volume";
  else tier = "Archive bulk";

  return {
    pricePerLead,
    subtotal,
    orderTotal,
    effectivePerLead,
    minimumApplied,
    tier,
  };
}
