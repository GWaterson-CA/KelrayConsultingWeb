import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/brand";
import { getPublishedCaseStudies } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/services", "/case-studies", "/about", "/book", "/contact", "/privacy", "/security-data"];
  const caseStudies = await getPublishedCaseStudies();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    ...(["", "/services", "/case-studies", "/about", "/book"].includes(route) && { lastModified: "2026-11-17" }),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  })) as MetadataRoute.Sitemap;

  const caseEntries = caseStudies.map((caseStudy) => ({
    url: `${siteUrl}/case-studies/${caseStudy.slug}`,
    lastModified: new Date(caseStudy.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...caseEntries];
}
