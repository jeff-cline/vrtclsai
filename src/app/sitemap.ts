import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { industries } from "@/content/industries";
import { caseStudies } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const staticPaths = [
    "",
    "/platform",
    "/platform/scoring",
    "/platform/identity-graph",
    "/platform/enrichment",
    "/platform/api",
    "/industries",
    "/research",
    "/case-studies",
    "/faq",
    "/about",
    "/contact",
    "/demo",
    "/quote",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));

  for (const i of industries) {
    entries.push({
      url: `${base}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
    for (const c of i.clusterTopics) {
      entries.push({
        url: `${base}/research/${c}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  for (const c of caseStudies) {
    entries.push({
      url: `${base}/case-studies/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
