"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { CaseStudyCard } from "@/components/case-study-card";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/lib/types";

type FeaturedCaseCarouselProps = {
  caseStudies: CaseStudy[];
};

export function FeaturedCaseCarousel({ caseStudies }: FeaturedCaseCarouselProps) {
  return (
    <div className="space-y-6">
      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        {caseStudies.map((caseStudy, index) => (
          <motion.div
            key={caseStudy.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <CaseStudyCard caseStudy={caseStudy} />
          </motion.div>
        ))}
      </motion.div>
      <Button variant="outline" asChild>
        <Link href="/case-studies">View all case studies</Link>
      </Button>
    </div>
  );
}
