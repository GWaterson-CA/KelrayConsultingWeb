import { unstable_noStore as noStore } from "next/cache";

import { PLACEHOLDER_CASE_STUDIES } from "@/lib/placeholder-data";

export async function getPublishedCaseStudies() {
  noStore();
  return PLACEHOLDER_CASE_STUDIES.filter((cs) => cs.published).sort((a, b) => {
    const aDate = new Date(a.published_at ?? a.updated_at).getTime();
    const bDate = new Date(b.published_at ?? b.updated_at).getTime();
    return bDate - aDate;
  });
}

export async function getFeaturedCaseStudies(limit = 3) {
  noStore();
  return PLACEHOLDER_CASE_STUDIES.filter((cs) => cs.featured && cs.published)
    .sort((a, b) => {
      const aDate = new Date(a.published_at ?? a.updated_at).getTime();
      const bDate = new Date(b.published_at ?? b.updated_at).getTime();
      return bDate - aDate;
    })
    .slice(0, limit);
}

export async function getCaseStudyBySlug(slug: string) {
  noStore();
  return PLACEHOLDER_CASE_STUDIES.find((item) => item.slug === slug && item.published) ?? null;
}
