// Industry pillar content. Pillar pages target high-intent commercial keywords
// at the silo head; supporting cluster pages link up to these pillars.

export type IndustryPillar = {
  slug: string;
  label: string;
  hero: string;
  intro: string;
  keywords: string[];
  metrics: { label: string; value: string; note: string }[];
  signals: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  caseStudySlug: string;
  clusterTopics: string[];
};

export const industries: IndustryPillar[] = [
  {
    slug: "healthcare",
    label: "Healthcare Predictive Intelligence",
    hero:
      "Patient acquisition, modeled with institutional discipline.",
    intro:
      "Predictive intelligence for healthcare networks, regenerative medicine, longevity clinics, and elective specialties. Decay-aware patient intent signals, identity-graph resolution, and behavioral propensity scoring — combined into a single conversion probability per prospect.",
    keywords: [
      "healthcare predictive analytics",
      "patient intent data",
      "regenerative medicine leads",
      "stem cell leads",
      "wellness lead generation",
      "longevity patient acquisition",
    ],
    metrics: [
      { label: "Median CAC reduction", value: "-58%", note: "9-month cohort" },
      { label: "Qualified intake lift", value: "+51%", note: "panel-verified" },
      { label: "Identity resolution", value: "97.4%", note: "vs. ground truth" },
    ],
    signals: [
      {
        title: "Real-time symptom + treatment intent",
        body: "Search, content, and behavioral signals correlated with active treatment consideration — captured under opt-in panels and de-identified at ingestion.",
      },
      {
        title: "Specialty-specific decay curves",
        body: "Half-life of intent varies dramatically across regenerative medicine, cosmetic, longevity, and chronic-care specialties. Models are tuned per specialty.",
      },
      {
        title: "HIPAA-aware architecture",
        body: "We transact on non-PHI signals. PHI integrations are handled via BAA inside customer infrastructure when required.",
      },
    ],
    faqs: [
      {
        q: "Is healthcare predictive intelligence HIPAA-compliant?",
        a: "Yes. Standard product operates on non-PHI behavioral signals. PHI-bound integrations are run under BAA inside customer infrastructure.",
      },
      {
        q: "What specialties produce the strongest conversion lift?",
        a: "Regenerative medicine, longevity, fertility, cosmetic surgery, and concierge primary care show the largest measured lift — these are high-consideration, high-LTV verticals where probability scoring concentrates spend efficiently.",
      },
      {
        q: "How do you handle consent and compliance documentation?",
        a: "Every record carries consent provenance. Customers can audit consent state per-record via the enrichment API or portal.",
      },
    ],
    caseStudySlug: "healthcare-predictive-targeting",
    clusterTopics: [
      "regenerative-medicine-lead-generation",
      "stem-cell-patient-acquisition",
      "longevity-clinic-marketing",
      "hipaa-compliant-targeting",
      "concierge-medicine-intent-data",
      "wellness-vertical-predictive-modeling",
    ],
  },
  {
    slug: "real-estate",
    label: "Real Estate Predictive Intelligence",
    hero: "Migration prediction, mapped to high-net-worth corridors.",
    intro:
      "Identity-graph signals identify HNW households in active relocation consideration 60–90 days before MLS activity. Combined with intent scoring and behavioral overlays, predictive real estate intelligence transforms acquisition economics for luxury brokerages and developers.",
    keywords: [
      "luxury real estate leads",
      "migration prediction",
      "high net worth leads",
      "relocation intent data",
      "predictive real estate analytics",
    ],
    metrics: [
      { label: "Tracked GMV uplift", value: "+$312M", note: "12-month cohort" },
      { label: "Qualified buyer registrations", value: "+4.1x", note: "vs. baseline" },
      { label: "Predictive window", value: "60–90d", note: "pre-MLS" },
    ],
    signals: [
      {
        title: "HNW migration signals",
        body: "Behavioral, search, and identity-graph indicators of active relocation consideration — useful for both buy-side acquisition and listing pipeline.",
      },
      {
        title: "Corridor-level intelligence",
        body: "Migration is corridor-driven. CA→TX, NY→FL, Bay Area→Mountain West each have distinct decay curves and conversion windows.",
      },
      {
        title: "Wealth + intent overlay",
        body: "Liquidity-event signals overlaid with property intent dramatically improve qualified-buyer concentration.",
      },
    ],
    faqs: [
      {
        q: "How early can you identify HNW relocation intent?",
        a: "60–90 days before MLS activity for the majority of cohorts. Earlier in some corridors with strong outbound signals (e.g., school-search behavior, executive moves).",
      },
      {
        q: "Do you support buy-side and listing-side acquisition?",
        a: "Yes. Both sides are derived from the same migration model — buy-side is conversion probability, listing-side is decision-window timing.",
      },
    ],
    caseStudySlug: "luxury-real-estate-migration",
    clusterTopics: [
      "hnw-migration-data",
      "ca-to-tx-relocation-intent",
      "ny-to-fl-migration-signals",
      "luxury-broker-lead-generation",
      "developer-pre-sales-targeting",
    ],
  },
  {
    slug: "finance",
    label: "Finance Predictive Intelligence",
    hero: "Behavioral risk and intent, fused into a single score.",
    intro:
      "Consumer finance, wealth management, and lending operators use predictive intelligence to fuse behavioral risk indicators with intent signals. The combined score concentrates top-of-funnel spend on the cohort most likely to convert and least likely to charge off.",
    keywords: [
      "financial leads",
      "investor intent data",
      "wealth management leads",
      "lending predictive analytics",
      "consumer finance intelligence",
    ],
    metrics: [
      { label: "ROAS lift", value: "+3.1x", note: "6-month cohort" },
      { label: "Underwriting waste reduction", value: "-38%", note: "qualified flow" },
      { label: "Bind/approval improvement", value: "+27%", note: "blended" },
    ],
    signals: [
      {
        title: "Behavioral risk + intent",
        body: "Risk signals layered with intent identify high-probability prospects who also pass underwriting — the combination matters more than either alone.",
      },
      {
        title: "Liquidity-event detection",
        body: "Wealth-event signals (inheritance, exits, RSU vesting) surface in-market wealth-management prospects.",
      },
      {
        title: "Tier-aware credit modeling",
        body: "Prime, near-prime, and subprime each have distinct behavioral profiles. Models are tier-segmented.",
      },
    ],
    faqs: [
      {
        q: "Is this compliant with FCRA and ECOA?",
        a: "Yes. We operate as a marketing intelligence layer; decisioning use cases are handled with the appropriate consumer reporting frameworks via approved partners.",
      },
      {
        q: "Can you integrate with our underwriting?",
        a: "Yes. Real-time scoring API, batch enrichment, and direct CRM/LOS integrations are supported.",
      },
    ],
    caseStudySlug: "finance-behavioral-scoring",
    clusterTopics: [
      "wealth-management-lead-generation",
      "consumer-lending-intent-data",
      "fintech-buyer-signals",
      "investor-prospecting-data",
      "behavioral-risk-scoring",
    ],
  },
  {
    slug: "insurance",
    label: "Insurance Predictive Intelligence",
    hero: "Policy switching and bind probability, at signal speed.",
    intro:
      "Property, casualty, life, and health insurers use predictive intelligence to identify in-market switchers and tier prospects by bind probability. Predictive scoring reduces wasted underwriting and dramatically improves cost-per-bind economics.",
    keywords: [
      "insurance leads",
      "policy switching intent",
      "auto insurance predictive data",
      "home insurance leads",
      "life insurance intelligence",
    ],
    metrics: [
      { label: "Bind rate improvement", value: "+29%", note: "blended P&C" },
      { label: "Cost per bind reduction", value: "-34%", note: "vs. baseline" },
      { label: "Switching intent recall", value: "82%", note: "90d window" },
    ],
    signals: [
      {
        title: "Switching intent",
        body: "Behavioral signals correlated with renewal-window evaluation and active comparison shopping.",
      },
      {
        title: "Life-event triggers",
        body: "New home, new vehicle, new family member, retirement — life-event signals materially change insurance demand.",
      },
      {
        title: "Bind-probability scoring",
        body: "Top-of-funnel filtering by probability of binding, not just by lead presence.",
      },
    ],
    faqs: [
      {
        q: "Which lines work best with predictive intelligence?",
        a: "Auto, home, life, and small-commercial show the largest measured lift. Health is supported but governed by additional compliance overlays.",
      },
    ],
    caseStudySlug: "finance-behavioral-scoring",
    clusterTopics: [
      "auto-insurance-switching-intent",
      "home-insurance-renewal-signals",
      "life-insurance-life-event-data",
      "commercial-insurance-prospecting",
    ],
  },
  {
    slug: "legal",
    label: "Legal Predictive Intelligence",
    hero: "High-intent case acquisition at predictive scale.",
    intro:
      "Personal injury, mass tort, family law, immigration, and corporate firms use predictive intelligence to identify high-intent prospects within the active decision window. Combined with identity-graph resolution, the result is a dramatic improvement in qualified case acquisition.",
    keywords: [
      "legal lead generation",
      "personal injury leads",
      "mass tort intent data",
      "family law predictive marketing",
      "law firm acquisition intelligence",
    ],
    metrics: [
      { label: "Qualified case lift", value: "+47%", note: "blended verticals" },
      { label: "Intake cost reduction", value: "-41%", note: "vs. broad media" },
      { label: "Conversion window recall", value: "78%", note: "30-day" },
    ],
    signals: [
      {
        title: "Incident-window intent",
        body: "Behavioral signals correlated with active legal-need consideration, scoped to the relevant practice-area window.",
      },
      {
        title: "Mass-tort cohort scoring",
        body: "Predictive identification of qualifying class membership for mass-tort campaigns.",
      },
    ],
    faqs: [
      {
        q: "Is this TCPA-compliant?",
        a: "Yes. Records carry verifiable consent provenance and TCPA-compliant calling/messaging workflows are supported.",
      },
    ],
    caseStudySlug: "finance-behavioral-scoring",
    clusterTopics: [
      "personal-injury-lead-targeting",
      "mass-tort-cohort-identification",
      "family-law-intent-signals",
      "immigration-firm-marketing",
    ],
  },
  {
    slug: "travel",
    label: "Luxury Travel Intent Intelligence",
    hero: "Destination intent and booking probability, in real time.",
    intro:
      "Luxury hotels, tour operators, cruise lines, and destination marketing organizations use predictive intelligence to identify in-market high-value travelers within a 28-day booking window — and to redirect media accordingly.",
    keywords: [
      "luxury travel leads",
      "tourism predictive data",
      "traveler intent signals",
      "destination targeting",
      "luxury hospitality marketing intelligence",
    ],
    metrics: [
      { label: "Upmarket booking lift", value: "+62%", note: "11-property cohort" },
      { label: "Incremental high-value stays", value: "+2,400", note: "8 months" },
      { label: "Decision window", value: "28d", note: "median booking" },
    ],
    signals: [
      {
        title: "Destination intent",
        body: "Search, content, and behavioral signals correlated with destination-specific consideration.",
      },
      {
        title: "Booking probability",
        body: "Probability score for booking within a defined window, calibrated against historical conversion.",
      },
      {
        title: "Seasonal cohort modeling",
        body: "Travel intent has strong seasonality. Models adjust for weather, school calendars, and macro-economic signals.",
      },
    ],
    faqs: [
      {
        q: "Can you target by destination and seasonality?",
        a: "Yes. Destination-specific intent + seasonal cohort modeling is core to the travel product.",
      },
    ],
    caseStudySlug: "travel-intent-prediction",
    clusterTopics: [
      "luxury-hotel-marketing-intelligence",
      "cruise-line-predictive-targeting",
      "destination-intent-data",
      "hnw-traveler-acquisition",
    ],
  },
  {
    slug: "political",
    label: "Political Intelligence",
    hero: "Sentiment, persuasion, and engagement — modeled as probability.",
    intro:
      "Statewide and federal campaigns, PACs, and advocacy organizations use behavioral and sentiment intelligence to identify persuadable cohorts, predict turnout, and concentrate persuasion budget where it produces measurable shift.",
    keywords: [
      "voter intent data",
      "political behavioral analytics",
      "sentiment intelligence",
      "campaign targeting data",
      "persuasion modeling",
    ],
    metrics: [
      { label: "Engagement lift", value: "+38%", note: "statewide cycle" },
      { label: "Persuasion-target reach", value: "+2.3x", note: "vs. baseline" },
      { label: "Sentiment shift detection", value: "<48h", note: "median window" },
    ],
    signals: [
      {
        title: "Behavioral sentiment",
        body: "Sentiment clustering at cohort level — far more actionable than topline polling.",
      },
      {
        title: "Persuasion targeting",
        body: "Identification of persuadable cohorts within engaged-electorate populations.",
      },
      {
        title: "Turnout probability",
        body: "Behavioral propensity scoring for voter turnout in a defined election.",
      },
    ],
    faqs: [
      {
        q: "Is this used for both campaigns and advocacy?",
        a: "Yes. Persuasion, GOTV, donor identification, and issue-advocacy organizations all use the same underlying intelligence stack.",
      },
    ],
    caseStudySlug: "political-sentiment-intelligence",
    clusterTopics: [
      "voter-sentiment-clustering",
      "persuasion-target-modeling",
      "turnout-probability-scoring",
      "donor-identification-data",
      "issue-advocacy-targeting",
    ],
  },
  {
    slug: "b2b-saas",
    label: "B2B SaaS Predictive Intelligence",
    hero: "Software switching intent and buying-committee acceleration.",
    intro:
      "Enterprise SaaS operators use predictive intelligence to identify software-switching intent within target accounts, accelerate the buying committee, and concentrate ABM spend on accounts most likely to convert in-quarter.",
    keywords: [
      "SaaS buyer intent",
      "B2B predictive analytics",
      "software switching intent",
      "enterprise targeting",
      "ABM intelligence",
    ],
    metrics: [
      { label: "Sales cycle compression", value: "-44%", note: "quarter cohort" },
      { label: "In-quarter conversion lift", value: "+38%", note: "ABM target accounts" },
      { label: "Buying-committee recall", value: "11", note: "median identified" },
    ],
    signals: [
      {
        title: "Account-level switching intent",
        body: "Behavioral signals from across the buying committee, resolved to the account level.",
      },
      {
        title: "Committee resolution",
        body: "Identification of all decision-makers and influencers within the account — median 11 individuals.",
      },
      {
        title: "Funnel velocity scoring",
        body: "Probability of conversion within the current quarter, calibrated by account behavior.",
      },
    ],
    faqs: [
      {
        q: "How does this integrate with our ABM and CRM stack?",
        a: "Native integrations with Salesforce, HubSpot, Marketo, and 6sense; webhook delivery for real-time signal flows.",
      },
    ],
    caseStudySlug: "finance-behavioral-scoring",
    clusterTopics: [
      "abm-intent-data",
      "saas-switching-signals",
      "enterprise-buying-committee-identification",
      "in-quarter-conversion-modeling",
    ],
  },
  {
    slug: "automotive",
    label: "Automotive Predictive Intelligence",
    hero: "In-market buyer probability, mapped to model and dealer.",
    intro:
      "OEMs, dealer groups, and finance arms use predictive intelligence to identify in-market vehicle buyers, model-level intent, and dealer-proximity probability. The result: dramatic improvement in test-drive cost and lead-to-close economics.",
    keywords: [
      "automotive leads",
      "in-market vehicle buyer data",
      "dealer prospect intelligence",
      "automotive predictive analytics",
    ],
    metrics: [
      { label: "Test drive rate", value: "+33%", note: "qualified booked" },
      { label: "Lead-to-close lift", value: "+24%", note: "30-day cohort" },
      { label: "Model-level intent recall", value: "76%", note: "90d window" },
    ],
    signals: [
      {
        title: "In-market probability",
        body: "Behavioral signals correlated with active vehicle consideration within a defined purchase window.",
      },
      {
        title: "Model-level intent",
        body: "Specificity at the make/model level, not just category-level interest.",
      },
    ],
    faqs: [
      {
        q: "Can you target by dealer geography?",
        a: "Yes. Dealer-proximity probability is a core signal class.",
      },
    ],
    caseStudySlug: "finance-behavioral-scoring",
    clusterTopics: [
      "dealer-prospect-intelligence",
      "ev-buyer-intent-data",
      "luxury-vehicle-buyer-signals",
      "fleet-acquisition-targeting",
    ],
  },
  {
    slug: "private-equity",
    label: "Private Equity Operational Intelligence",
    hero: "Operational predictive intelligence across the portfolio.",
    intro:
      "PE operators use predictive intelligence as a portfolio-wide acquisition accelerant — deployed across portfolio companies to lift conversion economics, reduce CAC, and benchmark operational performance.",
    keywords: [
      "private equity portfolio intelligence",
      "PE customer acquisition optimization",
      "portfolio company predictive analytics",
    ],
    metrics: [
      { label: "Portfolio CAC reduction", value: "-31%", note: "blended" },
      { label: "Cross-portfolio data leverage", value: "+2.7x", note: "vs. siloed" },
      { label: "Time to deployment", value: "<30d", note: "per portfolio co." },
    ],
    signals: [
      {
        title: "Portfolio-wide intelligence",
        body: "Cross-portfolio signal sharing (where permitted) materially improves model performance per portfolio company.",
      },
      {
        title: "Operational benchmarking",
        body: "CAC, ROAS, and conversion metrics benchmarked across the portfolio for board-level visibility.",
      },
    ],
    faqs: [
      {
        q: "How is this deployed across a portfolio?",
        a: "Enterprise tier supports portfolio-wide deployment with shared infrastructure, per-portfolio company instances, and consolidated reporting.",
      },
    ],
    caseStudySlug: "finance-behavioral-scoring",
    clusterTopics: [
      "portfolio-acquisition-acceleration",
      "pe-operational-intelligence",
      "value-creation-data-strategy",
    ],
  },
  {
    slug: "wellness",
    label: "Wellness & Longevity Predictive Intelligence",
    hero: "Premium patient acquisition for high-LTV wellness verticals.",
    intro:
      "Longevity clinics, executive wellness practices, and premium nutrition/peptide operators use predictive intelligence to identify high-intent, high-LTV prospects within their decision windows.",
    keywords: [
      "longevity patient acquisition",
      "executive wellness leads",
      "premium nutrition marketing intelligence",
      "peptide therapy lead generation",
    ],
    metrics: [
      { label: "Qualified intake lift", value: "+51%", note: "blended" },
      { label: "Patient LTV improvement", value: "+27%", note: "cohort-tracked" },
      { label: "Decision-window window", value: "21d", note: "median" },
    ],
    signals: [
      {
        title: "Premium intent",
        body: "Behavioral signals scoped to premium and concierge consideration — not commodity wellness traffic.",
      },
      {
        title: "Specialty cohorts",
        body: "Longevity, hormone optimization, peptide therapy, IV/regenerative each have distinct decay curves.",
      },
    ],
    faqs: [
      {
        q: "How is this different from generic healthcare predictive intelligence?",
        a: "Wellness/longevity targets premium consumer behavior rather than insurance-driven healthcare consumption. The cohorts, signals, and LTV profile are different.",
      },
    ],
    caseStudySlug: "healthcare-predictive-targeting",
    clusterTopics: [
      "longevity-clinic-marketing",
      "executive-wellness-acquisition",
      "peptide-therapy-leads",
      "iv-therapy-marketing-intelligence",
    ],
  },
  {
    slug: "home-services",
    label: "Home Services Predictive Intelligence",
    hero: "Geo-temporal demand prediction for high-ticket home services.",
    intro:
      "Roofing, HVAC, solar, remodeling, and pool/spa operators use predictive intelligence to anticipate demand at the geo-temporal level — and to concentrate spend on prospects within the active decision window.",
    keywords: [
      "home services lead generation",
      "roofing predictive marketing",
      "HVAC intent data",
      "solar lead intelligence",
      "remodeling acquisition data",
    ],
    metrics: [
      { label: "Wasted spend reduction", value: "-39%", note: "media efficiency" },
      { label: "Qualified appointment lift", value: "+44%", note: "30-day window" },
      { label: "Geo-temporal recall", value: "81%", note: "ZIP-level" },
    ],
    signals: [
      {
        title: "Geo-temporal demand",
        body: "ZIP and DMA-level demand prediction tied to seasonality, weather events, and macro signals.",
      },
      {
        title: "Decision-window scoring",
        body: "Probability of decision within 30/60/90-day windows.",
      },
    ],
    faqs: [
      {
        q: "Do you support weather-driven demand spikes (e.g., post-storm roofing)?",
        a: "Yes. Weather-trigger signals are part of the home-services model family.",
      },
    ],
    caseStudySlug: "finance-behavioral-scoring",
    clusterTopics: [
      "roofing-storm-restoration-data",
      "hvac-replacement-intent",
      "solar-installation-leads",
      "pool-spa-prospect-targeting",
    ],
  },
];

export function getIndustry(slug: string): IndustryPillar | undefined {
  return industries.find((i) => i.slug === slug);
}
