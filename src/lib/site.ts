export const site = {
  name: "Predictive Intelligence Exchange",
  short: "VRTCLS.AI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vrtcls.ai",
  tagline: "The Operating System for Predictive Customer Acquisition",
  description:
    "AI-powered predictive intelligence infrastructure delivering real-time behavioral signals, conversion probability modeling, and enterprise-grade acquisition intelligence.",
  email: "intel@vrtcls.ai",
  twitter: "@vrtclsai",
  cta: {
    primary: { label: "Run Predictive Estimate", href: "/#calculator" },
    secondary: { label: "Request Enterprise Demo", href: "/demo" },
    tertiary: { label: "Download Intelligence Report", href: "/research" },
  },
  nav: [
    { label: "Platform", href: "/platform" },
    { label: "Industries", href: "/industries" },
    { label: "Research", href: "/research" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "FAQ", href: "/faq" },
  ],
  industries: [
    { slug: "healthcare", label: "Healthcare" },
    { slug: "real-estate", label: "Real Estate" },
    { slug: "finance", label: "Finance" },
    { slug: "insurance", label: "Insurance" },
    { slug: "legal", label: "Legal" },
    { slug: "travel", label: "Luxury Travel" },
    { slug: "political", label: "Political" },
    { slug: "b2b-saas", label: "B2B SaaS" },
    { slug: "automotive", label: "Automotive" },
    { slug: "private-equity", label: "Private Equity" },
    { slug: "wellness", label: "Wellness & Longevity" },
    { slug: "home-services", label: "Home Services" },
  ],
  topics: [
    { slug: "identity-graphing", label: "Identity Graphing" },
    { slug: "behavioral-economics", label: "Behavioral Economics" },
    { slug: "predictive-methodology", label: "Predictive Methodology" },
    { slug: "compliance", label: "Data Compliance & Privacy" },
  ],
} as const;

export type SiteConfig = typeof site;
