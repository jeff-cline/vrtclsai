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
  {
    q: "What does 'decay-aware' actually mean technically?",
    a: "Each signal class has an empirically-fit decay curve (typically modeled as a Hawkes process with category-specific self-excitation). At score time, signals are weighted by their decay-adjusted value rather than treated as binary present/absent. A 60-day-old signal is not discarded — it is down-weighted to reflect its diminished predictive contribution.",
  },
  {
    q: "How quickly can a new customer be onboarded?",
    a: "Standard enterprise onboarding is 14–30 days end-to-end: contract, identity-graph integration, sandbox calibration against the customer's first-party audience, model governance review, then production access. Faster onboarding is possible for customers with mature data infrastructure.",
  },
  {
    q: "Do you support European customers under GDPR?",
    a: "Yes. The platform's hashed-first identity architecture and consent-provenance design support GDPR compliance. EU-resident data is processed in EU infrastructure under DPA terms. Article 17 (right to erasure) is supported at the entity level within contractual SLA.",
  },
  {
    q: "What is a probability cohort versus a lead list?",
    a: "A lead list is a static enumeration: names, emails, phones. A probability cohort is a dynamic, probability-weighted, decay-adjusted set of individuals filtered by predicted likelihood of a specific behavior within a defined window. Cohorts refresh continuously; members enter and leave as their predicted probability crosses thresholds.",
  },
  {
    q: "Can I bring my own first-party data?",
    a: "Yes. First-party data integration is encouraged. Customer data is integrated under DPA terms, used to enrich the customer's own cohorts, and is never cross-pollinated into other customers' outputs. First-party signals materially improve model output for the contributing customer.",
  },
  {
    q: "How does pricing work without a checkout?",
    a: "Pricing is contracted at onboarding through your account team. Enterprise customers operate on annual commitments with included credit allocations and tier-dependent overage pricing. Credits are issued to your organization in the admin portal after each invoice or wire is received.",
  },
  {
    q: "What is the difference between tier pricing levels?",
    a: "Optimized tier is for customers running probability cohorts across one or two industry verticals with standard enrichment. Enterprise tier adds dedicated infrastructure, model governance reviews, and faster enrichment SLAs. Strategic tier adds multi-vertical deployment with cross-cohort intelligence. Intelligence Partner tier is reserved for portfolio operators and platform partners with custom commercials.",
  },
  {
    q: "Is identity resolution stable over time for the same individual?",
    a: "Identity nodes are persistent across observations; underlying identifier sets evolve (new devices, address changes, contact updates) but node identity is stable. This is what allows historical signal weighting and longitudinal cohort analysis to work.",
  },
  {
    q: "Can I see how a specific score was computed?",
    a: "Yes. Enterprise and Strategic tier customers can request per-score feature-contribution breakdowns. The platform's model governance documentation includes the contribution decomposition methodology and per-vertical examples.",
  },
  {
    q: "What if the model is wrong?",
    a: "Models are wrong individually all the time — that is what probability means. The relevant metric is calibration, not individual prediction accuracy. A well-calibrated 70% probability score should produce a 70% observed conversion rate across the cohort. Calibration is monitored continuously and re-fit when drift exceeds threshold.",
  },
  {
    q: "Does the platform handle B2B and consumer signals in the same architecture?",
    a: "The infrastructure is shared; the models are not. B2B models operate at the account entity level with committee resolution; consumer models operate at the individual or household entity level. The feature engineering, decay structure, and calibration are all separately tuned.",
  },
  {
    q: "How are audiences delivered to ad platforms?",
    a: "Audiences can be delivered via direct API push to major ad platforms (Meta, Google, LinkedIn, TikTok, X, major DSPs), via CSV/Parquet export, or via webhook to customer-side automation. Refresh cadence is configurable per audience.",
  },
  {
    q: "What is the difference between the platform's score and a third-party intent vendor?",
    a: "Third-party intent vendors typically deliver a binary or low-resolution flag indicating interest. The platform's score is a calibrated probability with confidence interval, decay-adjusted, identity-graph weighted, and tied to a specific conversion window. The two products do different things; the platform supplements (rather than replaces) third-party intent in most stacks.",
  },
  {
    q: "How does the platform handle attribution back to source spend?",
    a: "Closed-loop attribution requires customer-side conversion tracking. The platform exposes cohort membership and predicted-probability bands; combining those with the customer's conversion data produces the attribution analysis. Customers using major MMM/MTA stacks can ingest cohort-level data directly.",
  },
  {
    q: "Can the platform be used for retention, not just acquisition?",
    a: "Yes. Retention scoring uses the same model architecture against existing-customer behavior, predicting churn probability and identifying intervention windows. Retention modeling typically achieves higher calibration accuracy than acquisition modeling because the customer has direct historical observation of the individual.",
  },
  {
    q: "What does 'panel-calibrated' mean?",
    a: "A panel is a labeled, consented reference population for which ground-truth outcomes are known. Calibrating against a panel means comparing model output to observed outcomes in the panel and adjusting the model so that predicted probabilities match observed frequencies. Panels are refreshed periodically to track drift.",
  },
  {
    q: "How do you handle bot and fraud signals?",
    a: "Bot/fraud detection runs at ingestion. Signals failing integrity checks are quarantined; sources exceeding fraud thresholds are demoted in the supplier weighting. The platform publishes signal-integrity metrics quarterly to enterprise customers.",
  },
  {
    q: "What infrastructure does the platform run on?",
    a: "The platform runs on dedicated cloud infrastructure with EU-resident processing available for EU-customer data. Customer-facing services are CDN-fronted; scoring APIs run in dedicated cells per tier. SOC 2 Type II audited annually.",
  },
  {
    q: "Can the platform integrate with Snowflake / BigQuery?",
    a: "Yes. Snowflake Data Sharing, BigQuery Data Sharing, and direct table push are supported. Customers operating their analytics in cloud data warehouses can receive cohort outputs natively without ETL.",
  },
  {
    q: "What is the typical contract length?",
    a: "Standard enterprise contracts are annual. Quarterly pilots are available for qualified accounts. Multi-year commitments are common for strategic-tier engagements and include preferential pricing.",
  },
  {
    q: "Does the platform store customer first-party PII?",
    a: "First-party PII is hashed at the boundary and used only to enrich the customer's own cohorts. Raw PII is not stored in the identity graph and is not used to build the platform's general models.",
  },
  {
    q: "How is the platform's signal supply diversified?",
    a: "No single supplier is permitted to exceed a capped share of any signal class. Diversification is enforced at the supplier-onboarding contract level and monitored in production. This protects against single-source bias and signal-supply disruption.",
  },
  {
    q: "Does the platform support multi-touch attribution?",
    a: "The platform produces cohort-level outputs that feed naturally into customer-side multi-touch attribution. Direct attribution products are roadmap; current customers using MTA stacks (e.g., Northbeam, Triple Whale, custom in-house) ingest cohort-level data.",
  },
  {
    q: "What is the latency of the scoring API?",
    a: "Sub-100ms p50 latency for single-record scoring. Batch scoring runs at higher throughput with per-record latency in the tens of milliseconds. Enterprise tier customers have dedicated capacity guarantees.",
  },
  {
    q: "Can I exclude specific cohorts (suppression)?",
    a: "Yes. Customer-defined suppression lists are applied at delivery; suppressed individuals are excluded from audience outputs and from re-targeting. Suppression supports both individual identifiers and behavioral cohort-level exclusions.",
  },
  {
    q: "How does the platform price overage usage?",
    a: "Overage above contracted credit allocation is billed at tier-dependent rates. Customers receive real-time visibility into credit consumption in the portal; automated alerts at configurable thresholds prevent unexpected overage.",
  },
  {
    q: "What happens when an individual revokes consent?",
    a: "Consent revocation propagates from the consent source through the identity graph to all derived signals and cohort memberships within the contractual SLA window. Revoked individuals are excluded from all subsequent outputs.",
  },
  {
    q: "Can the platform be deployed in customer infrastructure (on-prem / VPC)?",
    a: "VPC-deployment is available for Strategic and Intelligence Partner tier engagements. The platform's identity graph and scoring services can run inside customer infrastructure under appropriate contractual frameworks. This is most commonly used for HIPAA-bound healthcare deployments.",
  },
  {
    q: "What is the model retraining cadence?",
    a: "Production models are retrained on a rolling 90-day window. Calibration is monitored continuously; calibration drift triggers re-fit (without full retraining) within hours. Full model version increments are released on a quarterly cadence with documented governance.",
  },
  {
    q: "How does the platform measure customer success?",
    a: "Three measurement layers: (1) calibration accuracy against the customer's own conversion data, (2) downstream business KPIs — CAC, ROAS, conversion lift — calculated against contractual baselines, and (3) operational metrics — credit utilization, API latency, audience refresh times. Enterprise customers receive monthly performance reports.",
  },
  {
    q: "What is the platform's stance on broadcast media targeting (CTV, linear)?",
    a: "Predictive cohorts are deliverable to programmatic CTV via standard ad-platform integrations. Linear TV targeting via household-resolution cohorts is supported through audience licensing partners. The platform's value compounds in addressable channels where targeting precision converts directly to outcome.",
  },
];
