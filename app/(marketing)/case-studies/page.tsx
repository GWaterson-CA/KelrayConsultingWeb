import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { CaseStudiesFilter } from "@/components/case-studies-filter";
import { SectionHeading } from "@/components/section-heading";
import { getPublishedCaseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies — Real AI Projects with Measurable Results",
  description:
    "See how businesses use custom AI tools, automation, and training to cut costs, save time, and improve operations. Real projects with real outcomes.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudies();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10">
      <AnimatedSection>
        <SectionHeading
          badge="Named client work"
          title="Working software, visible workflows, and clients you can verify"
          description="No placeholder companies and no invented performance claims. Each case study names the organization or product, shows real work where confidentiality permits, and separates delivered capabilities from measured outcomes."
        />
      </AnimatedSection>

      <AnimatedSection className="mt-8">
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 sm:grid-cols-3">
          <p><span className="font-semibold text-slate-900">Named.</span> Every public entry identifies the client or product.</p>
          <p><span className="font-semibold text-slate-900">Visible.</span> Screens come from live products or sanitized client work.</p>
          <p><span className="font-semibold text-slate-900">Specific.</span> Proof points describe shipped capabilities—not estimates.</p>
        </div>
      </AnimatedSection>

      <div className="mt-10">
        <CaseStudiesFilter caseStudies={caseStudies} />
      </div>
    </div>
  );
}
