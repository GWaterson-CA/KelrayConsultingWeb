export type OutcomeType = "time_saved" | "cost_reduced" | "revenue_growth" | "risk_reduction";

export type Metric = {
  label: string;
  value: string;
  outcomeType: OutcomeType;
};

export type CaseStudyMedia = {
  id: string;
  case_study_id: string;
  type: "image" | "video";
  url: string;
  alt: string | null;
  sort_order: number;
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  industry: string;
  problem: string;
  approach: string;
  deliverables: string[];
  tools: string[];
  results: string;
  metrics: Metric[];
  testimonial_quote: string | null;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags: string[];
  media: CaseStudyMedia[];
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  budget_range: string | null;
  created_at: string;
};
