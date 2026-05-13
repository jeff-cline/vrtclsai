// Mock data for charts and demos. All numbers are illustrative.

export const trustStats = [
  { label: "Behavioral Signals Processed", value: "2.4B", note: "rolling 90d" },
  { label: "Predictive Profiles", value: "148M", note: "active graph nodes" },
  { label: "Industries Modeled", value: "32", note: "verticals" },
  { label: "Real-Time Intent Events / Day", value: "14.7M", note: "median" },
  { label: "Identity Resolution Accuracy", value: "97.4%", note: "vs. ground truth panel" },
  { label: "Median Response Latency", value: "84ms", note: "p50 scoring API" },
];

// Lead-quality decay over hours since first intent signal
export const decayCurve = Array.from({ length: 73 }, (_, i) => {
  const hours = i;
  // Simulated exponential decay with weekly seasonality dip
  const base = Math.exp(-hours / 28) * 100;
  const noise = Math.sin(hours / 6) * 1.5;
  return {
    hour: hours,
    quality: Math.max(0, Math.round((base + noise) * 10) / 10),
    competitor: Math.max(0, Math.round((Math.exp(-hours / 14) * 100 + noise) * 10) / 10),
  };
});

// Conversion velocity: % converted vs days from first contact
export const conversionVelocity = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  predictive: Math.round(100 * (1 - Math.exp(-i / 4)) * 10) / 10,
  cold: Math.round(100 * (1 - Math.exp(-i / 22)) * 10) / 10,
}));

// CAC reduction over months
export const cacReduction = [
  { month: "Jan", traditional: 412, predictive: 412 },
  { month: "Feb", traditional: 418, predictive: 364 },
  { month: "Mar", traditional: 421, predictive: 298 },
  { month: "Apr", traditional: 430, predictive: 244 },
  { month: "May", traditional: 438, predictive: 198 },
  { month: "Jun", traditional: 445, predictive: 162 },
  { month: "Jul", traditional: 452, predictive: 138 },
  { month: "Aug", traditional: 458, predictive: 121 },
  { month: "Sep", traditional: 461, predictive: 109 },
];

// ROI acceleration: cumulative return on ad spend
export const roiAcceleration = Array.from({ length: 24 }, (_, i) => {
  const week = i + 1;
  return {
    week,
    traditional: Math.round((1 + 0.04 * week) * 100) / 100,
    predictive: Math.round((1 + 0.14 * week - 0.001 * week * week) * 100) / 100,
  };
});

// Confidence distribution by industry
export const confidenceDistribution = [
  { industry: "Healthcare", confidence: 92, volume: 38 },
  { industry: "Real Estate", confidence: 88, volume: 28 },
  { industry: "Finance", confidence: 94, volume: 45 },
  { industry: "Insurance", confidence: 86, volume: 22 },
  { industry: "Travel", confidence: 81, volume: 18 },
  { industry: "Political", confidence: 79, volume: 14 },
  { industry: "B2B SaaS", confidence: 90, volume: 31 },
  { industry: "Automotive", confidence: 84, volume: 19 },
];

// Behavioral cluster (for radial / scatter)
export const behavioralClusters = Array.from({ length: 120 }, (_, i) => ({
  x: Math.round(20 + Math.random() * 80),
  y: Math.round(20 + Math.random() * 80),
  z: Math.round(2 + Math.random() * 18),
  cluster: ["Intent Active", "Pre-Intent", "Comparison", "Dormant"][i % 4],
}));

// Live event ticker
export const liveEvents = [
  "Healthcare intent surge detected · Phoenix MSA",
  "Identity graph refresh complete · 148.2M nodes",
  "Behavioral cluster shift · Luxury Travel Q2 cohort",
  "Predictive score model v4.7 deployed",
  "Migration signal · CA → TX HNW cohort +12.4%",
  "Political sentiment realignment · Midwest swing",
  "B2B SaaS switching intent · ERP segment +8.1%",
  "Real-time enrichment · 14,402 records / min",
  "Conversion lift verified · cohort 244 · +37%",
  "Compliance audit pass · SOC 2 Type II",
];

// Industry tile metadata
export const industryTiles = [
  {
    slug: "healthcare",
    label: "Healthcare",
    headline: "Patient intent at predictive scale",
    kpi: "+42% conversion lift",
  },
  {
    slug: "real-estate",
    label: "Real Estate",
    headline: "Migration intelligence for HNW relocation",
    kpi: "-58% CAC",
  },
  {
    slug: "finance",
    label: "Finance",
    headline: "Behavioral risk + intent scoring",
    kpi: "+3.1x ROAS",
  },
  {
    slug: "insurance",
    label: "Insurance",
    headline: "Predictive policy switching signals",
    kpi: "+29% bind rate",
  },
  {
    slug: "legal",
    label: "Legal",
    headline: "High-intent case acquisition",
    kpi: "+47% qualified leads",
  },
  {
    slug: "travel",
    label: "Luxury Travel",
    headline: "Destination intent + booking probability",
    kpi: "+62% upmarket bookings",
  },
  {
    slug: "political",
    label: "Political",
    headline: "Voter sentiment & behavioral targeting",
    kpi: "+38% engagement",
  },
  {
    slug: "b2b-saas",
    label: "B2B SaaS",
    headline: "Software switching intent acceleration",
    kpi: "-44% sales cycle",
  },
  {
    slug: "automotive",
    label: "Automotive",
    headline: "In-market buyer probability",
    kpi: "+33% test drive rate",
  },
  {
    slug: "private-equity",
    label: "Private Equity",
    headline: "Operational intelligence for portfolio cos.",
    kpi: "Cross-portfolio uplift",
  },
  {
    slug: "wellness",
    label: "Wellness & Longevity",
    headline: "Predictive patient acquisition for premium care",
    kpi: "+51% qualified intake",
  },
  {
    slug: "home-services",
    label: "Home Services",
    headline: "Geo-temporal demand prediction",
    kpi: "-39% wasted spend",
  },
] as const;

export const caseStudies = [
  {
    slug: "healthcare-predictive-targeting",
    industry: "Healthcare",
    title: "Regenerative medicine network reduces CAC 58% with predictive intent targeting",
    metric: "-58% CAC",
    sub: "9 months · 14 clinics · $4.2M media spend redirected",
    summary:
      "A multi-state regenerative medicine network replaced broad-match list buys with predictive intent cohorts. Behavioral scoring re-prioritized media on a rolling 72-hour intent window, eliminating $2.4M in low-conversion impressions while increasing qualified intake by 51%.",
  },
  {
    slug: "luxury-real-estate-migration",
    industry: "Real Estate",
    title: "Luxury brokerage captures $312M GMV using HNW migration prediction",
    metric: "+312M GMV",
    sub: "12 months · CA→TX/FL corridor · 1,840 qualified buyers",
    summary:
      "Identity-graph signals identified high-net-worth households in active relocation consideration 90+ days before MLS activity. Targeted intent campaigns produced a 4.1x lift in qualified buyer registrations and contributed to $312M in tracked GMV.",
  },
  {
    slug: "finance-behavioral-scoring",
    industry: "Finance",
    title: "Mid-market lender lifts ROAS 3.1x with behavioral risk + intent overlay",
    metric: "+3.1x ROAS",
    sub: "6 months · consumer finance · $1.8M monthly spend",
    summary:
      "Behavioral risk scoring integrated with intent signals produced cleaner top-of-funnel for a consumer lender. The combined model reduced underwriting waste 38% and lifted return on ad spend 3.1x within two quarters.",
  },
  {
    slug: "travel-intent-prediction",
    industry: "Travel",
    title: "Luxury travel brand books 2,400 incremental high-value stays via destination intent",
    metric: "+62% upmarket",
    sub: "8 months · 11 properties · 2.4k incremental bookings",
    summary:
      "Destination intent signals combined with booking probability modeling shifted media toward in-market guests within a 28-day window, producing a 62% increase in upmarket bookings.",
  },
  {
    slug: "political-sentiment-intelligence",
    industry: "Political",
    title: "Statewide campaign realigns $4.6M media plan with behavioral sentiment intelligence",
    metric: "+38% engagement",
    sub: "Election cycle · statewide · 38% engagement lift",
    summary:
      "Behavioral sentiment clustering surfaced persuadable cohorts that traditional polling missed. Media plan was reallocated mid-cycle; engagement rose 38% and persuasion-target reach improved 2.3x.",
  },
];

export const faqEntries = [
  {
    q: "What is predictive intelligence and how is it different from intent data?",
    a: "Predictive intelligence is the modeling layer that sits on top of intent data. Intent data observes that a person has shown interest; predictive intelligence forecasts the probability they will convert, when, and at what value. It combines behavioral signals, identity graphing, demographic enrichment, and psychographic overlays to produce a probability score rather than a binary flag.",
  },
  {
    q: "How fresh is the data and how does decay work?",
    a: "Behavioral signals decay non-linearly. The half-life of meaningful intent varies by category — for B2B SaaS purchase intent it can be 14 days; for high-velocity consumer categories (travel, automotive) it can be 48–72 hours. Our scoring model adjusts in real time and stale signals are weighted down rather than discarded, preserving them for retrospective modeling.",
  },
  {
    q: "What is identity graphing?",
    a: "An identity graph is a probabilistic mapping of devices, accounts, addresses, and behaviors to unified individuals or households. It allows a signal from one touchpoint (a mobile session, an email open) to be associated with the right person across every other channel. Accuracy is measured against panel ground truth.",
  },
  {
    q: "How do you handle compliance?",
    a: "We operate under SOC 2 Type II controls. Consumer data is sourced from consented, opt-in panels and licensed publisher networks; identity resolution is hashed-first by default. We support GDPR, CCPA, and TCPA workflows including verifiable consent provenance per record.",
  },
  {
    q: "Why is conversion probability more valuable than a lead list?",
    a: "A list is a snapshot of who exists in a category. Probability is a forecast of who is going to act. Lists generate volume; probability concentrates spend on the people most likely to convert within a defined window. Customers replacing lists with probability typically see 30–60% CAC reduction in the first quarter.",
  },
  {
    q: "How does AI scoring work?",
    a: "Scoring combines several models: a behavioral propensity model trained on millions of historical conversion events, identity-graph confidence (how sure we are this is the right person), demographic and psychographic overlays, and decay-aware signal weighting. The output is a single 0–100 score with a confidence interval.",
  },
  {
    q: "Can you integrate with my existing stack?",
    a: "Yes. Native exports to Salesforce, HubSpot, Marketo, Snowflake, BigQuery, and Segment; webhook delivery for real-time scoring; and a REST API for custom pipelines. Audience exports support CSV, Parquet, and direct push to ad platforms (Meta, Google, LinkedIn).",
  },
  {
    q: "What is psychographic targeting?",
    a: "Psychographics describe attitudes, values, motivations, and lifestyle — the 'why' behind a behavior. Combined with demographics (the 'who') and behavioral data (the 'what'), psychographics dramatically improve conversion modeling, especially in high-consideration verticals like financial services, luxury, healthcare, and political.",
  },
  {
    q: "How is healthcare data sourced and is it HIPAA-compliant?",
    a: "Healthcare-vertical signals are derived from non-PHI sources: declared interest, consented panel behavior, search-pattern analysis, and patient-journey signals collected under opt-in. We do not transact on PHI. Use cases requiring PHI integration are handled via BAA and run inside customer infrastructure.",
  },
  {
    q: "What does enrichment add to a lead?",
    a: "Enrichment layers add: verified contact data, household composition, wealth and credit indicators, employment and firmographic context (for B2B), behavioral cluster membership, psychographic overlay, and predictive score with confidence. Enrichment typically lifts downstream conversion 1.4–2.1x.",
  },
  {
    q: "How do you measure data accuracy?",
    a: "Three ways: (1) identity resolution accuracy against a calibrated panel; (2) score calibration — how often a 70% probability actually converts 70% of the time; and (3) downstream business impact — CAC, ROAS, conversion lift. We publish calibration curves on request.",
  },
  {
    q: "What is the difference between B2B intent and consumer intent?",
    a: "B2B intent typically operates over weeks-to-months, has a buying-committee structure (5–11 people), and is best captured through firmographic + behavioral signals. Consumer intent operates over hours-to-days, is individual, and is driven by behavioral and contextual signals. The platform supports both with separate model families.",
  },
  {
    q: "Can predictive intelligence be used for political campaigns?",
    a: "Yes. Behavioral and sentiment intelligence are foundational for modern persuasion, GOTV, and donor identification. We support persuasion-target modeling, sentiment shift detection, and cohort-level engagement forecasting under election-period compliance frameworks.",
  },
  {
    q: "How is financial risk scoring integrated?",
    a: "Risk scoring overlays intent and behavioral models with credit, transaction, and behavioral-risk signals (where consented). For consumer finance, this dramatically improves top-of-funnel quality. For insurance, it improves bind probability. For wealth management, it identifies in-market liquidity events.",
  },
  {
    q: "What is the enrichment API and what does it return?",
    a: "The enrichment API accepts a hashed identifier (email, phone, device, or address hash) and returns a normalized record: verified contact, demographics, household, behavioral cluster, predictive score, and confidence. Sub-100ms p50 latency. Rate-limited per tier.",
  },
  {
    q: "How does the credit system work for customers?",
    a: "Customers operate on a credit balance. Queries, enrichment calls, and audience downloads consume credits at tier-dependent rates. Credits are granted by your account team based on contract terms — there is no in-product checkout. Usage is real-time visible in the customer portal.",
  },
  {
    q: "Do you offer enterprise SLAs?",
    a: "Yes. Enterprise tier includes 99.95% uptime SLA, sub-100ms p50 scoring latency, dedicated infrastructure, named technical account team, and quarterly model governance reviews.",
  },
  {
    q: "How do you protect against signal manipulation?",
    a: "Multiple defenses: source diversification (no single supplier exceeds a capped share of any signal class), bot/fraud detection at ingestion, panel-calibrated ground truth, and adversarial monitoring of score drift. We publish a quarterly signal-integrity report to enterprise customers.",
  },
  {
    q: "What is intent decay and why does it matter?",
    a: "Intent decay describes how quickly the predictive value of a signal degrades over time. A 24-hour-old shopping signal is worth multiples of a 30-day-old signal. Acquisition strategies that ignore decay over-spend on stale prospects. Our scoring is decay-aware by design.",
  },
  {
    q: "Can I export audiences directly to ad platforms?",
    a: "Yes. Direct push to Meta, Google, LinkedIn, TikTok, X, and major DSPs. Audiences refresh automatically based on the schedule you set; expired members are removed, new members added in real time.",
  },
];
