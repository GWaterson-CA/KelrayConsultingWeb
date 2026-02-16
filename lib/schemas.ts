import { z } from "zod";

import { makeSlug } from "@/lib/utils";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please provide a valid email"),
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),
  message: z.string().min(20, "Please share a little more context"),
  budgetRange: z.string().optional(),
});

export const bookingInterestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please provide a valid email"),
  company: z.string().min(2, "Company is required"),
  callType: z.enum(["free_intro", "existing_client_paid"]),
  details: z.string().min(10, "Please share your request"),
});

export const caseStudyFormSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "Title is required"),
  slug: z
    .string()
    .min(3, "Slug is required")
    .transform((value) => makeSlug(value)),
  summary: z.string().min(20, "Summary is required"),
  industry: z.string().min(2, "Industry is required"),
  problem: z.string().min(20, "Problem statement is required"),
  approach: z.string().min(20, "Approach is required"),
  deliverables: z.string().min(3, "Add at least one deliverable"),
  tools: z.string().min(3, "Add at least one tool"),
  results: z.string().min(20, "Results are required"),
  metrics: z.string().default("[]"),
  testimonialQuote: z.string().optional(),
  tags: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type BookingInterestValues = z.infer<typeof bookingInterestSchema>;
