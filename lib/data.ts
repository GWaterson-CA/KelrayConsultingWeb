import fs from "node:fs";
import path from "node:path";

import { unstable_noStore as noStore } from "next/cache";
import YAML from "yaml";

import { CaseStudyFileSchema, toCaseStudy } from "@/lib/case-study-schema";
import type { CaseStudy } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

function loadAllCaseStudies(): CaseStudy[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".yaml") && !f.startsWith("_"));

  return files.map((filename) => {
    const slug = filename.replace(/\.yaml$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const parsed = YAML.parse(raw);
    const validated = CaseStudyFileSchema.parse(parsed);
    return toCaseStudy(slug, validated);
  });
}

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  noStore();
  return loadAllCaseStudies()
    .filter((cs) => cs.published)
    .sort((a, b) => {
      const aDate = new Date(a.published_at ?? a.updated_at).getTime();
      const bDate = new Date(b.published_at ?? b.updated_at).getTime();
      return bDate - aDate;
    });
}

export async function getFeaturedCaseStudies(limit = 3): Promise<CaseStudy[]> {
  noStore();
  return loadAllCaseStudies()
    .filter((cs) => cs.featured && cs.published)
    .sort((a, b) => {
      const aDate = new Date(a.published_at ?? a.updated_at).getTime();
      const bDate = new Date(b.published_at ?? b.updated_at).getTime();
      return bDate - aDate;
    })
    .slice(0, limit);
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  noStore();
  const filepath = path.join(CONTENT_DIR, `${slug}.yaml`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf-8");
  const parsed = YAML.parse(raw);
  const validated = CaseStudyFileSchema.parse(parsed);
  const cs = toCaseStudy(slug, validated);
  return cs.published ? cs : null;
}
