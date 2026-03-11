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
          badge="Case studies"
          title="Real workflow transformations with measurable outcomes"
          description="Selected engagements showing how we approach real workflow challenges."
        />
      </AnimatedSection>

      <div className="mt-10">
        <CaseStudiesFilter caseStudies={caseStudies} />
      </div>
    </div>
  );
}
