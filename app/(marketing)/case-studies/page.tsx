import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { CaseStudiesFilter } from "@/components/case-studies-filter";
import { SectionHeading } from "@/components/section-heading";
import { getPublishedCaseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Case studies and project snapshots from AI consulting and implementation engagements.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudies();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10">
      <AnimatedSection>
        <SectionHeading
          badge="Case studies"
          title="Real workflow transformations with measurable outcomes"
          description="These are placeholder examples for now. Replace with real project stories and metrics as they become available."
        />
      </AnimatedSection>

      <div className="mt-10">
        <CaseStudiesFilter caseStudies={caseStudies} />
      </div>
    </div>
  );
}
