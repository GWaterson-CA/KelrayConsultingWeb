import { z } from "zod";

import type { CaseStudy, CaseStudyMedia, Metric } from "@/lib/types";

const OutcomeTypeSchema = z.enum([
  "time_saved",
  "cost_reduced",
  "revenue_growth",
  "risk_reduction",
]);

const MetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  outcomeType: OutcomeTypeSchema,
});

const MediaSchema = z.object({
  type: z.enum(["image", "video"]),
  url: z.string().min(1),
  alt: z.string().nullable().default(null),
  sort_order: z.number().int().positive(),
});

export const CaseStudyFileSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(20),
  industry: z.string().min(2),
  problem: z.string().min(20),
  approach: z.string().min(20),
  deliverables: z.array(z.string().min(1)).min(1),
  tools: z.array(z.string().min(1)).min(1),
  results: z.string().min(20),
  metrics: z.array(MetricSchema).min(1),
  testimonial_quote: z.string().nullable().default(null),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  published_at: z.string().nullable().default(null),
  created_at: z.string(),
  updated_at: z.string(),
  tags: z.array(z.string()).default([]),
  media: z.array(MediaSchema).default([]),
});

export type CaseStudyFileData = z.infer<typeof CaseStudyFileSchema>;

/** Transform validated file data + derived slug into a CaseStudy object. */
export function toCaseStudy(slug: string, data: CaseStudyFileData): CaseStudy {
  return {
    id: slug,
    slug,
    title: data.title,
    summary: data.summary,
    industry: data.industry,
    problem: data.problem,
    approach: data.approach,
    deliverables: data.deliverables,
    tools: data.tools,
    results: data.results,
    metrics: data.metrics as Metric[],
    testimonial_quote: data.testimonial_quote,
    featured: data.featured,
    published: data.published,
    published_at: data.published_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    tags: data.tags,
    media: data.media.map(
      (m): CaseStudyMedia => ({
        id: `${slug}-media-${m.sort_order}`,
        case_study_id: slug,
        type: m.type,
        url: m.url,
        alt: m.alt,
        sort_order: m.sort_order,
      }),
    ),
  };
}
