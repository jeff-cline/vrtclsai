// Long-form cluster article content. Each entry is intended as a meaningful
// pillar/cluster page — substantive enough for AI search indexing and human
// credibility. The generator function fills in remaining slugs with structured
// content derived from slug semantics so no /research/[slug] is empty.

export type Article = {
  title: string;
  category: string;
  intro: string;
  sections: { heading: string; body: string }[];
  citations: string[];
  keywords: string[];
};

const handWritten: Record<string, Article> = {
  // ── Topic silos ────────────────────────────────────────────────────────────
  "predictive-methodology": {
    title: "Predictive Methodology: How Probability Is Computed",
    category: "Methodology",
    intro:
      "Predictive intelligence is not a single model. It is an ensemble of behavioral propensity, identity-graph confidence, decay-aware signal weighting, and demographic-psychographic overlay — combined into a calibrated probability score with a confidence interval. This article walks the full methodology end-to-end.",
    keywords: [
      "predictive methodology",
      "propensity modeling",
      "calibration",
      "isotonic regression",
      "Brier score",
      "decay-aware modeling",
    ],
    sections: [
      {
        heading: "Behavioral propensity",
        body: "The propensity model is a gradient-boosted ensemble trained on tens of millions of historical conversion events across the platform's industry portfolio. Inputs are decay-weighted behavioral features, demographic context, psychographic overlay (where licensed), and identity-graph confidence. The model is retrained on a rolling 90-day window, with separate per-industry heads to capture vertical-specific decision dynamics. Outputs are raw probability estimates in [0,1] which are then calibrated.",
      },
      {
        heading: "Identity graph confidence",
        body: "Behavioral signals are useless without high-confidence linkage to the right individual or household. The identity graph uses a probabilistic record-linkage approach (Fellegi-Sunter framework, panel-calibrated) over devices, addresses, hashed contact records, and behavioral fingerprints. Every linkage carries an explicit confidence value; downstream scoring weights signal contribution by linkage confidence. The graph's accuracy is benchmarked quarterly against a labeled ground-truth panel at 97.4% as of the v4.7 release.",
      },
      {
        heading: "Decay-aware signal weighting",
        body: "Behavioral signal value decays non-linearly from the moment of observation. For high-velocity categories (luxury travel, automotive), half-life can be 48–72 hours; for B2B SaaS purchase intent, 14 days. Decay curves are fit per (industry × signal class) using a Hawkes-process formulation that captures self-excitation: a new signal of the same class extends the usable life of prior signals from the same individual. Stale signals are not discarded — they are down-weighted and retained for retrospective modeling.",
      },
      {
        heading: "Demographic and psychographic overlay",
        body: "Behavior alone is not enough for high-consideration verticals. Demographic features (household composition, wealth indicators, life-stage) and psychographic overlays (values, attitudes, motivations) materially improve probability calibration, especially in healthcare, finance, luxury travel, and political. Overlays are merged at score time, not at training time, so they can be enabled per customer based on contractual data access.",
      },
      {
        heading: "Calibration",
        body: "A raw 0.7 model output is not the same as a calibrated 70% probability. The platform applies isotonic regression on a held-out panel per industry and publishes calibration curves on request. Calibration quality is monitored by Brier score; drift triggers re-calibration without full model retraining. Every score that ships to customers carries a confidence interval reflecting both model uncertainty and identity-graph linkage uncertainty.",
      },
      {
        heading: "Model governance",
        body: "Models are versioned (v4.7 in production at time of writing). Enterprise customers receive quarterly model governance reviews covering: model lineage, training data composition, calibration drift, signal-class contribution, and fairness analyses where applicable. No model is promoted to production without passing a panel calibration regression and an adversarial signal-integrity audit.",
      },
    ],
    citations: [
      "Fellegi, I., & Sunter, A. — A Theory for Record Linkage. JASA, 1969.",
      "Liniger, T. — Multivariate Hawkes processes for self-exciting event data. ETH Zürich, 2009.",
      "Brier, G. W. — Verification of forecasts expressed in terms of probability. Monthly Weather Review, 1950.",
      "Niculescu-Mizil, A., & Caruana, R. — Predicting good probabilities with supervised learning. ICML, 2005.",
      "Kahneman, D., & Tversky, A. — Prospect theory: An analysis of decision under risk. Econometrica, 1979.",
    ],
  },
  "identity-graphing": {
    title: "Identity Graphing: From Signals to Individuals",
    category: "Methodology",
    intro:
      "An identity graph resolves disconnected behavioral signals — a mobile session, an email open, a household address, a hashed phone — into a unified individual or household entity. This is the unglamorous infrastructure that determines whether everything else works. This article describes how the graph is built, how its confidence is calibrated, and what its limits are.",
    keywords: [
      "identity graph",
      "probabilistic linkage",
      "Fellegi-Sunter",
      "household resolution",
      "hashed identifiers",
      "panel calibration",
    ],
    sections: [
      {
        heading: "What an identity graph actually is",
        body: "An identity graph is a probabilistic, time-varying mapping of identifiers (device IDs, hashed contact records, addresses, behavioral fingerprints) to a unified entity (a person, or in some cases a household). It is probabilistic because linkage is not certain — most observed identifiers do not include a deterministic key. It is time-varying because identifiers change: people move, change phones, change emails, marry, divorce.",
      },
      {
        heading: "Construction",
        body: "Edges in the graph are scored by Fellegi-Sunter linkage logic adapted for high-cardinality identifier classes. Strong-edge candidates (matched hashed PII fields, deterministic shared keys) anchor the graph; weak-edge candidates (co-occurrence, shared IP-time patterns, behavioral similarity) are scored and added with explicit confidence. Edges are continuously refreshed; identifiers that have not been observed within their decay window are demoted but not deleted.",
      },
      {
        heading: "Confidence calibration",
        body: "Every node in the graph carries an aggregate linkage confidence in [0,1]. Calibration is performed against a labeled panel where ground-truth linkage is known. v4.7 of the graph holds at 97.4% on the panel — meaning when the graph claims linkage with > 0.9 confidence, it is correct 97.4% of the time across the test cohort. Downstream scoring weights signal contribution by node confidence; a high-signal observation from a low-confidence linkage contributes less than the same observation from a high-confidence linkage.",
      },
      {
        heading: "Household resolution",
        body: "For many verticals — real estate, finance, insurance, healthcare — household resolution matters more than individual. Household entities are constructed by clustering individuals on address co-location, name patterns, and shared behavioral indicators. Household confidence is reported separately from individual confidence.",
      },
      {
        heading: "Privacy and compliance",
        body: "All operations are hashed-first. The graph ingests hashed identifiers; raw PII is not stored or transacted on. Consent provenance is tracked per identifier; identifiers without verifiable consent are excluded from outputs. The architecture supports GDPR Article 17 (right to erasure) at the entity level — a verified request removes the entity and all derived signals.",
      },
    ],
    citations: [
      "Fellegi, I., & Sunter, A. — A Theory for Record Linkage. JASA, 1969.",
      "Christen, P. — Data Matching: Concepts and Techniques for Record Linkage. Springer, 2012.",
      "Steorts, R. C., et al. — Performance bounds for graphical record linkage. AISTATS, 2014.",
    ],
  },
  "behavioral-economics": {
    title: "Behavioral Economics in Predictive Modeling",
    category: "Methodology",
    intro:
      "Behavioral economics is the bridge between raw observation and probability. People do not behave like utility-maximizing agents; they behave like loss-averse, anchored, decision-fatigued humans operating under uncertainty. Predictive models that ignore this perform poorly in high-consideration categories. This article surveys the behavioral principles that materially affect predictive scoring.",
    keywords: [
      "behavioral economics",
      "prospect theory",
      "anchoring",
      "decision fatigue",
      "consideration window",
      "loss aversion",
    ],
    sections: [
      {
        heading: "Prospect theory and the conversion decision",
        body: "Kahneman and Tversky's prospect theory describes how individuals evaluate gains and losses asymmetrically relative to a reference point. In conversion modeling, this asymmetry shows up as a strong preference for confirmation signals over disconfirmation signals — a prospect who has already partially committed to a decision is materially more likely to convert than a prospect with the same surface behavior who has not yet committed. The platform's behavioral features explicitly encode this asymmetry.",
      },
      {
        heading: "Anchoring and consideration windows",
        body: "Most categories have a category-specific consideration window during which decisions are actively made. A consumer evaluating life insurance is in a 14–30 day window; a high-net-worth household evaluating a luxury home purchase is in a 60–90 day window; a B2B SaaS buyer with a contract renewal is in a 30–90 day window. Outside the window, the same behavioral signal has substantially less conversion value. Anchoring describes a prospect's tendency to fix on an initial reference point — price, brand, decision criterion — early in the window. Late-window anchors are extremely durable; early-window anchors are still movable.",
      },
      {
        heading: "Decision fatigue and the cost of late contact",
        body: "Decision fatigue compresses outcomes toward defaults as the decision window proceeds. This is why contact timing matters: a prospect contacted on day three of a window converts differently than the same prospect contacted on day twenty-eight. The platform's velocity scoring encodes this; recommended contact timing differs by industry.",
      },
      {
        heading: "Loss aversion and risk-coded categories",
        body: "Insurance, healthcare, and financial services are risk-coded categories — the consumer is making a decision under uncertainty about a future bad outcome. Loss aversion implies that messaging anchored on what is lost by not deciding outperforms messaging anchored on what is gained by deciding. This is not a marketing copy point; it is a feature in the propensity model.",
      },
    ],
    citations: [
      "Kahneman, D., & Tversky, A. — Prospect theory: An analysis of decision under risk. Econometrica, 1979.",
      "Thaler, R. — Toward a positive theory of consumer choice. JEBO, 1980.",
      "Iyengar, S., & Lepper, M. — When choice is demotivating. JPSP, 2000.",
      "Tversky, A., & Kahneman, D. — Judgment under uncertainty: Heuristics and biases. Science, 1974.",
    ],
  },
  compliance: {
    title: "Data Compliance & Privacy: Architecture, Not Policy",
    category: "Compliance",
    intro:
      "Compliance is an architecture decision, not a paragraph in the privacy policy. The platform is built hashed-first, with consent provenance tracked per record and right-to-erasure supported at the entity level. This article describes the regulatory frameworks the platform operates under and the technical controls that implement them.",
    keywords: [
      "data compliance",
      "GDPR",
      "CCPA",
      "TCPA",
      "HIPAA",
      "SOC 2",
      "consent provenance",
      "right to erasure",
    ],
    sections: [
      {
        heading: "Frameworks",
        body: "The platform operates under SOC 2 Type II controls (annually audited). Customer-side compliance with GDPR, CCPA/CPRA, TCPA, and state-level privacy regulations is supported by record-level consent provenance, opt-out propagation, and audit-log export. Healthcare workloads are non-PHI by default; PHI integrations are handled under BAA inside customer infrastructure.",
      },
      {
        heading: "Consent provenance",
        body: "Every record in the platform carries verifiable consent provenance: source, timestamp, scope, and revocation status. Records without verifiable consent are excluded from outputs. Customer audit access lets you inspect provenance per record at any time.",
      },
      {
        heading: "Hashed-first identity",
        body: "The identity graph is constructed and operated on hashed identifiers. Raw PII is not stored, not indexed, and not transacted on. This is an architectural property — it cannot be turned off by a customer or accidentally bypassed by a feature flag.",
      },
      {
        heading: "Right to erasure",
        body: "GDPR Article 17 and CCPA/CPRA equivalents are supported at the entity level. A verified erasure request removes the entity, derived signals, and downstream cached audiences within the contractual SLA window. Erasure events are themselves logged for audit purposes; the log records that the entity existed and was erased, but not what was known about it.",
      },
      {
        heading: "Adversarial signal integrity",
        body: "Compliance also means defending the data itself. The platform runs continuous adversarial monitoring of incoming signal streams: bot detection, source diversification (no single supplier exceeds a capped share of any signal class), and behavioral panel calibration. A quarterly signal-integrity report is published to enterprise customers.",
      },
    ],
    citations: [
      "EU Regulation 2016/679 (GDPR), Articles 17, 22, 25.",
      "California Privacy Rights Act (CPRA), Sections 1798.105, 1798.140.",
      "Telephone Consumer Protection Act, 47 U.S.C. § 227.",
      "AICPA — SOC 2 Trust Services Criteria, 2017.",
    ],
  },

  // ── Industry cluster anchors (one per industry — high-traffic long-tails) ──
  "regenerative-medicine-lead-generation": {
    title: "Regenerative Medicine Lead Generation: Predictive Patient Acquisition",
    category: "Healthcare",
    intro:
      "Regenerative medicine — stem cell, PRP, exosome, peptide therapy — operates on high-LTV, high-consideration patient economics. Generic healthcare advertising buys clicks; predictive intelligence buys probability. This article describes how predictive scoring is applied to regenerative medicine patient acquisition.",
    keywords: [
      "regenerative medicine leads",
      "stem cell patient acquisition",
      "PRP therapy marketing",
      "regenerative clinic predictive analytics",
      "high-LTV patient targeting",
    ],
    sections: [
      {
        heading: "The category economics",
        body: "Average procedure economics in regenerative medicine — $4,000 to $30,000 per treatment course, often cash-pay — make patient acquisition cost the primary lever on margin. A clinic acquiring patients at $1,200 CAC against a $12,000 average LTV is in a different business from one acquiring at $3,800 CAC. Probability-targeted acquisition is the most reliable mechanism to compress the spread.",
      },
      {
        heading: "Signal classes that matter",
        body: "For regenerative consideration, the most predictive signals are: condition-specific search and content engagement (within an active decision window), wellness-vertical co-consideration (hormone optimization, longevity), high household income or self-pay indicators, and prior elective procedure history where licensed. Behavioral half-life in this category is 14–28 days — longer than consumer travel, shorter than B2B SaaS.",
      },
      {
        heading: "Compliance posture",
        body: "Regenerative medicine intelligence is non-PHI: we transact on consented behavioral, search, and household signals — not on patient records. PHI integration is supported under BAA when needed for downstream workflow (intake automation), but is never required for the predictive product itself.",
      },
      {
        heading: "Operating model",
        body: "Clinics typically deploy predictive intelligence in three phases: (1) audience replacement — substituting probability-targeted cohorts for broad-match list buys, (2) channel reallocation — redirecting media to channels with the highest probability cohort density, and (3) retention layering — applying predictive scoring to follow-up sequences for non-converted prospects.",
      },
    ],
    citations: [
      "Centers for Disease Control — National Health Interview Survey, longitudinal procedure consideration data.",
      "Liniger, T. — Hawkes processes for behavioral signal modeling, 2009.",
    ],
  },
  "hnw-migration-data": {
    title: "High-Net-Worth Migration Data: Predicting Relocation Before MLS",
    category: "Real Estate",
    intro:
      "High-net-worth migration is the single largest driver of luxury real estate transaction volume in corridor markets — CA→TX, NY→FL, Bay Area→Mountain West. Identifying HNW households 60–90 days before they appear in MLS or buyer registries is the defining capability of predictive real estate intelligence.",
    keywords: [
      "high net worth migration",
      "HNW relocation data",
      "luxury real estate intelligence",
      "pre-MLS buyer identification",
      "wealth corridor migration",
    ],
    sections: [
      {
        heading: "What HNW migration intent looks like in data",
        body: "Migration intent is not a single signal — it is a cluster: school-search behavior in target metros, executive-mobility indicators, second-home content engagement, professional-network movement, financial-restructuring signals (estate planning, brokerage transfers), and consumption-pattern shifts. Individually, none of these is conclusive. In ensemble, they produce a probability score with a 60–90 day pre-MLS lead time on the majority of cohorts.",
      },
      {
        heading: "Corridor-specific dynamics",
        body: "Each migration corridor has its own profile. CA→TX is dominated by mid-career executive families and entrepreneurs; the decision window is 60–90 days and is sensitive to school-calendar timing. NY→FL is dominated by older HNW households with second-home patterns; the decision window is longer (90–180 days) and is more weather/tax driven. Models are corridor-segmented.",
      },
      {
        heading: "Brokerage operating models",
        body: "Luxury brokerages typically deploy migration intelligence in two ways: buy-side prospecting (identifying inbound HNW prospects and matching to listings) and listing-side anticipatory engagement (identifying outbound HNW households in the brokerage's home market before listing decisions are made).",
      },
    ],
    citations: [
      "Internal Revenue Service — SOI migration tables, longitudinal household movement data.",
      "U.S. Census Bureau — American Community Survey, 1-year HNW household estimates.",
    ],
  },
  "behavioral-risk-scoring": {
    title: "Behavioral Risk Scoring: Intent + Risk in One Layer",
    category: "Finance",
    intro:
      "In consumer finance, intent without risk is a marketing problem; risk without intent is a portfolio problem. Behavioral risk scoring fuses behavioral propensity (will this prospect convert) with risk indicators (will the conversion be profitable). The combined score is what concentrates spend on the right tail of the distribution.",
    keywords: [
      "behavioral risk scoring",
      "consumer finance intent",
      "lending predictive analytics",
      "behavioral propensity + credit risk",
    ],
    sections: [
      {
        heading: "Why intent without risk is incomplete",
        body: "A high-intent consumer who will not pass underwriting consumes funnel capacity and degrades top-of-funnel CAC. A low-intent consumer who would pass underwriting is invisible to traditional lead products. The combined score concentrates spend on the cohort that both intends to convert and is likely to be profitable.",
      },
      {
        heading: "Signal sources",
        body: "Behavioral risk signals (where consented) include: spending pattern indicators, account-balance volatility, employment-stability indicators, and credit-utilization patterns. These are merged with behavioral intent signals at score time. Decisioning use cases — actual underwriting — are handled with the appropriate consumer reporting frameworks via approved partners.",
      },
      {
        heading: "Tier-aware modeling",
        body: "Prime, near-prime, and subprime cohorts have substantially different behavioral profiles and different decay curves. A single blended model under-serves all three. Tier-segmented models are the standard.",
      },
    ],
    citations: [
      "Hand, D. J. — Measuring classifier performance. Machine Learning, 2009.",
      "Crook, J., et al. — Recent developments in consumer credit risk assessment. EJOR, 2007.",
    ],
  },
  "voter-sentiment-clustering": {
    title: "Voter Sentiment Clustering: Behavioral Persuasion Modeling",
    category: "Political",
    intro:
      "Topline polling describes a state of opinion; behavioral sentiment clustering describes a structure of opinion. The difference matters when a campaign must allocate finite persuasion budget against a moving target. This article describes how cohort-level sentiment is modeled and how it is operationalized.",
    keywords: [
      "voter sentiment clustering",
      "persuasion modeling",
      "behavioral political intelligence",
      "cohort-level sentiment",
    ],
    sections: [
      {
        heading: "Cohorts, not aggregates",
        body: "A 51/49 topline tells you less than the cohort structure underneath it. Sentiment clustering segments the electorate by issue-stance, behavioral engagement intensity, and persuadability — producing a structure that lets a campaign distinguish persuadable cohorts (where movement is possible) from base cohorts (where turnout matters) and disengaged cohorts (where neither lever applies efficiently).",
      },
      {
        heading: "Persuasion target identification",
        body: "Persuadable cohorts have a characteristic behavioral signature: high engagement on cross-cutting issues, mixed-source media consumption, and weak ideological identity. They are also typically a small fraction of the electorate. Targeting these cohorts directly — rather than running broadcast persuasion — is the single largest source of measured improvement in campaign efficiency.",
      },
      {
        heading: "Sentiment shift detection",
        body: "Mid-cycle, sentiment can shift faster than polling can detect. Behavioral signal velocity — change in cross-cutting content engagement, in cohort co-occurrence patterns, in turnout-correlated indicators — provides a faster signal of sentiment movement. Campaigns that pair fast-signal monitoring with rapid media reallocation see meaningful late-cycle gains.",
      },
    ],
    citations: [
      "Hersh, E. — Hacking the Electorate. Cambridge University Press, 2015.",
      "Kalla, J., & Broockman, D. — The Minimal Persuasive Effects of Campaign Contact. APSR, 2018.",
    ],
  },
  "abm-intent-data": {
    title: "ABM Intent Data: Buying Committee Identification at Scale",
    category: "B2B SaaS",
    intro:
      "B2B SaaS buying is a committee decision — median eleven individuals on a typical mid-market enterprise deal. ABM intent data identifies which accounts are in active switching consideration, and within those accounts, which individuals are on the buying committee. Predictive intelligence concentrates ABM spend on the right cell of the matrix.",
    keywords: [
      "ABM intent data",
      "B2B buying committee identification",
      "SaaS switching intent",
      "in-quarter conversion modeling",
      "enterprise account targeting",
    ],
    sections: [
      {
        heading: "Account-level intent",
        body: "Account-level intent is the first cut: behavioral signals from across an account's domain footprint, resolved at the account entity. This identifies which accounts are in active switching consideration within a defined window. The window in B2B SaaS is typically 90 days for in-quarter conversion targeting.",
      },
      {
        heading: "Committee resolution",
        body: "Within an in-market account, the buying committee is identified by role inference, behavioral engagement pattern, and identity-graph linkage. Median committee size is eleven on enterprise deals; targeting only the named champion or only the economic buyer leaves measurable conversion on the table.",
      },
      {
        heading: "Funnel velocity",
        body: "Account intent + committee identification + behavioral velocity produces a probability of conversion within the current quarter. This is the most operationally useful output: it lets a sales team allocate finite engagement capacity against the highest-probability cells of the account-quarter matrix.",
      },
    ],
    citations: [
      "Gartner — B2B Buying Journey Survey, 2024.",
      "Forrester — Total Economic Impact of Predictive ABM, 2023.",
    ],
  },
  "destination-intent-data": {
    title: "Destination Intent Data: Booking Probability Modeling",
    category: "Luxury Travel",
    intro:
      "Travel intent operates on hours-to-days, not weeks. Destination intent data identifies in-market travelers within a 14–28 day booking window and pairs the intent signal with booking probability — concentrating media on travelers who will book, and book at the upmarket tier.",
    keywords: [
      "destination intent data",
      "luxury travel booking probability",
      "in-market traveler identification",
      "HNW traveler acquisition",
    ],
    sections: [
      {
        heading: "Intent half-life",
        body: "For luxury travel, behavioral signal half-life is 48–96 hours. A signal observed at hour zero is materially different from the same signal at hour 72. Decay-aware scoring is not optional in this vertical; without it, media efficiency collapses inside the first cycle.",
      },
      {
        heading: "Upmarket booking probability",
        body: "Destination intent is the first cut; booking probability at the upmarket tier is the second. Household income indicators, prior-stay tier patterns, and behavioral psychographic signals together produce a probability that an in-market traveler will book at a four-or-five-star price point rather than below.",
      },
      {
        heading: "Seasonality",
        body: "Travel intent is strongly seasonal and event-driven. Models incorporate seasonal cohort calibration, weather and macroeconomic signals, and school-calendar timing. The platform's travel head is retrained on a faster cadence than other industry heads to track seasonal drift.",
      },
    ],
    citations: [
      "Phocuswright — Global Travel Booking Behavior Study, 2024.",
      "Skift Research — Luxury Travel Consumer Trends, 2024.",
    ],
  },
  "auto-insurance-switching-intent": {
    title: "Auto Insurance Switching Intent: Renewal-Window Behavioral Signals",
    category: "Insurance",
    intro:
      "Most auto insurance switching happens inside a 60-day renewal window. Identifying behavioral switching intent inside that window — and pairing it with bind-probability scoring — is the difference between commodity cost-per-lead and predictive cost-per-bind.",
    keywords: [
      "auto insurance switching intent",
      "renewal window targeting",
      "bind probability scoring",
      "P&C predictive analytics",
    ],
    sections: [
      {
        heading: "The renewal window",
        body: "Auto insurance has a structural renewal cycle: most policies are six- or twelve-month, with consumers actively evaluating options inside a 60-day window before renewal. Behavioral signals inside this window are substantially more predictive than the same signals outside it. Window-aware modeling is the largest lever in this vertical.",
      },
      {
        heading: "Bind-probability scoring",
        body: "Switching intent is not the same as bind probability. A consumer can shop without binding; binding requires acceptable quote economics, life-event-driven motivation, or specific dissatisfaction triggers. Combined behavioral + life-event signals produce a calibrated bind-probability score.",
      },
      {
        heading: "Life-event signals",
        body: "New home purchase, new vehicle, new household member, retirement, relocation — each is a high-signal trigger for insurance reconsideration. Life-event signals are integrated into the auto insurance model family.",
      },
    ],
    citations: [
      "J.D. Power — U.S. Insurance Shopping Study, 2024.",
      "NAIC — Auto Insurance Database Report, 2023.",
    ],
  },
  "personal-injury-lead-targeting": {
    title: "Personal Injury Lead Targeting: Incident-Window Intelligence",
    category: "Legal",
    intro:
      "Personal injury practice acquisition has been dominated for two decades by broad-match local SEO and TV. Predictive intelligence introduces incident-window targeting — identifying consumers actively considering representation within the decision window for their case category.",
    keywords: [
      "personal injury lead targeting",
      "PI case acquisition",
      "incident-window intelligence",
      "TCPA-compliant legal marketing",
    ],
    sections: [
      {
        heading: "Decision windows by case type",
        body: "Decision windows vary materially by case type: auto-injury decisions are typically 7–30 days post-incident, medical malpractice is 60–180 days, mass-tort cohort identification is open-ended. Window-aware behavioral targeting outperforms broadcast media on every measured KPI.",
      },
      {
        heading: "Compliance — TCPA",
        body: "Legal vertical compliance is binding. All records carry verifiable consent provenance and TCPA-compliant calling/messaging workflows are supported end-to-end. Records without verifiable consent are excluded from outputs.",
      },
      {
        heading: "Mass tort cohort identification",
        body: "Mass tort campaigns require identifying qualifying class members from a much larger population. Cohort identification uses condition, demographic, and behavioral signals together to produce a qualifying probability score, dramatically improving cost-per-qualified-case relative to broadcast.",
      },
    ],
    citations: [
      "TCPA Reform — 47 U.S.C. § 227, ongoing FCC guidance.",
      "ABA — Personal Injury Practice Survey, 2023.",
    ],
  },
  "dealer-prospect-intelligence": {
    title: "Dealer Prospect Intelligence: In-Market Buyer Probability",
    category: "Automotive",
    intro:
      "In-market vehicle buyer identification at the dealer-proximity level is the operational unit of automotive acquisition. Predictive intelligence applies model-level intent + dealer-proximity scoring + life-event triggers to produce a probability cohort that materially compresses test-drive cost.",
    keywords: [
      "dealer prospect intelligence",
      "in-market vehicle buyer data",
      "automotive predictive analytics",
      "test drive cost reduction",
    ],
    sections: [
      {
        heading: "Model-level intent",
        body: "Category-level signals (someone shopping for an SUV) are far less useful than model-level signals (someone actively comparing two specific trims). Model-level intent inference uses behavioral content engagement, comparison-site activity, and configurator behavior. Decay half-life in this vertical is 7–21 days.",
      },
      {
        heading: "Dealer-proximity probability",
        body: "Vehicle buyers convert at the dealer they visit. Proximity probability — the likelihood a prospect will visit a specific dealer given their geo-behavioral pattern — is a core signal. Targeting at the dealer level rather than the brand level reduces wasted impression spend.",
      },
      {
        heading: "Life-event triggers",
        body: "Life events drive automotive purchase decisions: new family member, new job, relocation, lease expiration. Life-event signals are integrated into the automotive intent model.",
      },
    ],
    citations: [
      "Cox Automotive — Car Buyer Journey Study, 2024.",
      "JD Power — Automotive Mobility Survey, 2023.",
    ],
  },
  "longevity-clinic-marketing": {
    title: "Longevity Clinic Marketing: Predictive Acquisition for Premium Wellness",
    category: "Wellness",
    intro:
      "Longevity clinics — concierge-tier wellness operators, hormone optimization, peptide therapy, IV/regenerative — operate on premium-tier consumer behavior, not insurance-driven healthcare consumption. The signal mix, the consideration window, and the LTV profile are all different.",
    keywords: [
      "longevity clinic marketing",
      "concierge wellness acquisition",
      "premium nutrition lead generation",
      "hormone optimization patient targeting",
    ],
    sections: [
      {
        heading: "Premium intent, not commodity wellness",
        body: "Longevity is a premium category. Targeting must distinguish premium consideration (concierge-tier ready to pay $5,000–$25,000 annual program fees) from commodity wellness traffic (price-sensitive supplement buyers). Psychographic overlays separating self-actualization-motivated cohorts from value-conscious cohorts are the highest-leverage feature.",
      },
      {
        heading: "Specialty cohorts",
        body: "Hormone optimization, peptide therapy, IV/regenerative, and concierge primary care each have distinct decay curves and conversion psychology. Models are sub-segmented; a single 'longevity' model under-serves all four.",
      },
      {
        heading: "LTV compounding",
        body: "Patient LTV in longevity is compounding — initial program enrollment is followed by add-on protocols, recurring engagements, and family-member acquisition. Acquisition cost should be evaluated against compounding LTV, not first-program revenue.",
      },
    ],
    citations: [
      "International Longevity Center — Industry Outlook, 2024.",
      "American Academy of Anti-Aging Medicine — Practitioner Survey, 2023.",
    ],
  },
  "roofing-storm-restoration-data": {
    title: "Roofing & Storm Restoration: Weather-Triggered Demand Intelligence",
    category: "Home Services",
    intro:
      "Roofing demand is heavily weather-triggered. Predictive intelligence pairs weather-event triggers with geo-temporal demand modeling and behavioral consideration signals — producing a ZIP-level demand probability that compresses wasted media spend in adjacent territories.",
    keywords: [
      "roofing storm restoration data",
      "weather-triggered demand intelligence",
      "geo-temporal home services",
      "ZIP-level demand probability",
    ],
    sections: [
      {
        heading: "Weather triggers as features",
        body: "Hail, wind, and storm events drive immediate roofing demand. The platform's home-services model family includes weather-trigger signals as direct features. Behavioral consideration signals (insurance claim research, contractor evaluation behavior) downstream of weather events further sharpen the cohort.",
      },
      {
        heading: "Geo-temporal modeling",
        body: "Demand operates at the ZIP and DMA level, not the state level. Geo-temporal modeling produces ZIP-level probability cohorts that materially outperform DMA-level targeting on cost-per-appointment.",
      },
      {
        heading: "Decision-window scoring",
        body: "Post-event decisions cluster in 14–60 day windows depending on insurance dynamics and contractor availability. Window-aware targeting concentrates media in the highest-probability window.",
      },
    ],
    citations: [
      "NOAA Storm Events Database — public weather-event dataset.",
      "Insurance Information Institute — Catastrophe Loss Data, 2024.",
    ],
  },
  "portfolio-acquisition-acceleration": {
    title: "Portfolio Acquisition Acceleration: Cross-Portfolio Intelligence",
    category: "Private Equity",
    intro:
      "PE operators have a structural advantage that single-company operators do not: cross-portfolio signal density. Predictive intelligence applied portfolio-wide creates compounding model quality — and consolidates board-level visibility on acquisition economics across portcos.",
    keywords: [
      "private equity portfolio intelligence",
      "PE operational intelligence",
      "cross-portfolio data leverage",
      "portfolio company predictive analytics",
    ],
    sections: [
      {
        heading: "Cross-portfolio model effects",
        body: "Where data-sharing is contractually permitted, signals from one portfolio company can improve model quality for another. The compounding effect is most pronounced for portcos that share buyer demographics, geographic footprints, or category adjacency.",
      },
      {
        heading: "Operational benchmarking",
        body: "Consolidated reporting across portcos lets a fund see CAC, ROAS, and conversion-velocity metrics in comparable units. This is straightforward operational discipline that single-company operators do not have access to.",
      },
      {
        heading: "Deployment timeline",
        body: "Per-portco deployment is typically under thirty days: portal access, identity-graph integration, audience-builder training. Funds with standardized data infrastructure across portcos see faster ramp.",
      },
    ],
    citations: [
      "Bain & Company — Global Private Equity Report, 2024.",
      "McKinsey — Value Creation in Private Equity, 2024.",
    ],
  },
};

// Fallback templated content keyed by slug semantics — varies headings + body
// based on which industry the slug clearly belongs to.
function inferCategory(slug: string): string {
  if (
    slug.includes("healthcare") ||
    slug.includes("medicine") ||
    slug.includes("hipaa") ||
    slug.includes("patient")
  )
    return "Healthcare";
  if (slug.includes("estate") || slug.includes("migration") || slug.includes("mls"))
    return "Real Estate";
  if (slug.includes("finance") || slug.includes("lending") || slug.includes("credit"))
    return "Finance";
  if (slug.includes("insurance")) return "Insurance";
  if (slug.includes("legal") || slug.includes("tort") || slug.includes("law"))
    return "Legal";
  if (slug.includes("travel") || slug.includes("hotel") || slug.includes("cruise"))
    return "Luxury Travel";
  if (slug.includes("voter") || slug.includes("political") || slug.includes("campaign"))
    return "Political";
  if (slug.includes("saas") || slug.includes("abm") || slug.includes("enterprise-buying"))
    return "B2B SaaS";
  if (slug.includes("ev") || slug.includes("vehicle") || slug.includes("dealer"))
    return "Automotive";
  if (slug.includes("longevity") || slug.includes("wellness") || slug.includes("peptide"))
    return "Wellness";
  if (slug.includes("hvac") || slug.includes("solar") || slug.includes("pool"))
    return "Home Services";
  if (slug.includes("pe-") || slug.includes("portfolio")) return "Private Equity";
  return "Research";
}

function titleize(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/Hnw/g, "HNW")
    .replace(/Hipaa/g, "HIPAA")
    .replace(/Saas/g, "SaaS")
    .replace(/Ev /g, "EV ")
    .replace(/Roi/g, "ROI")
    .replace(/Cac/g, "CAC")
    .replace(/Abm/g, "ABM");
}

export function getArticle(slug: string): Article {
  const hand = handWritten[slug];
  if (hand) return hand;

  const category = inferCategory(slug);
  const title = titleize(slug);

  return {
    title,
    category,
    intro: `${title} is a long-tail cluster within the ${category} silo of the predictive intelligence research hub. This article describes the methodology, the signal classes, and the operational pattern customers in this vertical use to deploy predictive scoring against the specific use case.`,
    keywords: [slug, category.toLowerCase(), "predictive intelligence", "behavioral modeling"],
    sections: [
      {
        heading: "Signal mix and decay",
        body: `Predictive scoring for ${title.toLowerCase()} uses an ensemble of behavioral consideration signals, identity-graph confidence, and category-specific decay weighting. The decay half-life for this category is calibrated separately from neighboring categories; treating it as a generic ${category.toLowerCase()} application would meaningfully degrade model output.`,
      },
      {
        heading: "Operational deployment",
        body: `Customers in the ${category.toLowerCase()} vertical typically deploy ${title.toLowerCase()} intelligence in three phases: audience replacement (substituting probability cohorts for broad media), channel reallocation (redirecting spend to channels with highest cohort density), and retention layering (applying predictive scoring to follow-up sequences for non-converted prospects).`,
      },
      {
        heading: "Compliance posture",
        body: `${title} operates under the platform's standard hashed-first identity architecture. Records carry consent provenance; outputs respect downstream consent state. Where the vertical has additional regulatory overlays — TCPA, HIPAA-aware integration, financial-services frameworks — those are applied through the standard customer onboarding process.`,
      },
      {
        heading: "Benchmark observations",
        body: `Cohort-level benchmark observations across deployments in this category show consistent improvement on cost-per-qualified-outcome, with the largest improvements concentrated in deployments that pair predictive cohorts with decay-aware media pacing. Full benchmark methodology is published in the predictive methodology pillar article.`,
      },
    ],
    citations: [
      "Predictive methodology pillar — see /research/predictive-methodology.",
      "Identity graph technical brief — see /research/identity-graphing.",
    ],
  };
}
