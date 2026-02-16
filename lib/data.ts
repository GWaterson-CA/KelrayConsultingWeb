import type { PostgrestError } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";

import { PLACEHOLDER_CASE_STUDIES } from "@/lib/placeholder-data";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CaseStudy, CaseStudyMedia, Metric } from "@/lib/types";
import { splitLines } from "@/lib/utils";

const CASE_STUDY_SELECT = `
  id,
  title,
  slug,
  summary,
  industry,
  problem,
  approach,
  deliverables,
  tools,
  results,
  metrics,
  testimonial_quote,
  featured,
  published,
  published_at,
  created_at,
  updated_at,
  tags,
  case_study_media (
    id,
    case_study_id,
    type,
    url,
    alt,
    sort_order
  )
`;

type CaseStudyDbRow = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  industry: string;
  problem: string;
  approach: string;
  deliverables: string | null;
  tools: string | null;
  results: string;
  metrics: Metric[] | Record<string, unknown> | null;
  testimonial_quote: string | null;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags: string[] | null;
  case_study_media: CaseStudyMedia[] | null;
};

function normalizeMetrics(metrics: CaseStudyDbRow["metrics"]): Metric[] {
  if (!metrics) return [];
  if (Array.isArray(metrics)) return metrics as Metric[];
  return [];
}

function normalizeCaseStudy(row: CaseStudyDbRow): CaseStudy {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    industry: row.industry,
    problem: row.problem,
    approach: row.approach,
    deliverables: splitLines(row.deliverables),
    tools: splitLines(row.tools),
    results: row.results,
    metrics: normalizeMetrics(row.metrics),
    testimonial_quote: row.testimonial_quote,
    featured: row.featured,
    published: row.published,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    tags: row.tags ?? [],
    media: (row.case_study_media ?? []).sort((a, b) => a.sort_order - b.sort_order),
  };
}

function throwIfError(error: PostgrestError | null) {
  if (error) {
    throw new Error(error.message);
  }
}

export async function getPublishedCaseStudies() {
  noStore();

  if (!hasSupabaseEnv) {
    return PLACEHOLDER_CASE_STUDIES.filter((cs) => cs.published);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select(CASE_STUDY_SELECT)
    .eq("published", true)
    .order("published_at", { ascending: false });

  throwIfError(error);

  return ((data as CaseStudyDbRow[] | null) ?? []).map(normalizeCaseStudy);
}

export async function getFeaturedCaseStudies(limit = 3) {
  noStore();

  if (!hasSupabaseEnv) {
    return PLACEHOLDER_CASE_STUDIES.filter((cs) => cs.featured && cs.published).slice(0, limit);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select(CASE_STUDY_SELECT)
    .eq("featured", true)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  throwIfError(error);

  return ((data as CaseStudyDbRow[] | null) ?? []).map(normalizeCaseStudy);
}

export async function getCaseStudyBySlug(slug: string, includeDraft = false) {
  noStore();

  if (!hasSupabaseEnv) {
    const local = PLACEHOLDER_CASE_STUDIES.find((item) => item.slug === slug);
    if (!local) return null;
    return includeDraft || local.published ? local : null;
  }

  const supabase = await createSupabaseServerClient();

  let query = supabase.from("case_studies").select(CASE_STUDY_SELECT).eq("slug", slug).limit(1);

  if (!includeDraft) {
    query = query.eq("published", true);
  }

  const { data, error } = await query.maybeSingle();
  throwIfError(error);

  if (!data) return null;

  return normalizeCaseStudy(data as CaseStudyDbRow);
}

export async function getAdminCaseStudies() {
  noStore();

  if (!hasSupabaseEnv) {
    return PLACEHOLDER_CASE_STUDIES;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select(CASE_STUDY_SELECT)
    .order("updated_at", { ascending: false });

  throwIfError(error);

  return ((data as CaseStudyDbRow[] | null) ?? []).map(normalizeCaseStudy);
}

export async function getAdminCaseStudyById(id: string) {
  noStore();

  if (!hasSupabaseEnv) {
    return PLACEHOLDER_CASE_STUDIES.find((item) => item.id === id) ?? null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select(CASE_STUDY_SELECT)
    .eq("id", id)
    .limit(1)
    .maybeSingle();

  throwIfError(error);

  if (!data) return null;

  return normalizeCaseStudy(data as CaseStudyDbRow);
}
