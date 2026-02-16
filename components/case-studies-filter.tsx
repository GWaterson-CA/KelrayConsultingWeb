"use client";

import { useMemo, useState } from "react";

import { CaseStudyCard } from "@/components/case-study-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CaseStudy, OutcomeType } from "@/lib/types";

type CaseStudiesFilterProps = {
  caseStudies: CaseStudy[];
};

const outcomeOptions: { label: string; value: OutcomeType }[] = [
  { label: "Time saved", value: "time_saved" },
  { label: "Cost reduced", value: "cost_reduced" },
  { label: "Revenue growth", value: "revenue_growth" },
  { label: "Risk reduction", value: "risk_reduction" },
];

export function CaseStudiesFilter({ caseStudies }: CaseStudiesFilterProps) {
  const [industry, setIndustry] = useState<string>("all");
  const [outcome, setOutcome] = useState<string>("all");

  const industries = useMemo(() => {
    return Array.from(new Set(caseStudies.map((study) => study.industry))).sort();
  }, [caseStudies]);

  const filtered = useMemo(() => {
    return caseStudies.filter((study) => {
      const industryPass = industry === "all" || study.industry === industry;
      const outcomePass =
        outcome === "all" || study.metrics.some((metric) => metric.outcomeType === (outcome as OutcomeType));

      return industryPass && outcomePass;
    });
  }, [caseStudies, industry, outcome]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All industries</SelectItem>
            {industries.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={outcome} onValueChange={setOutcome}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by outcome" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All outcomes</SelectItem>
            {outcomeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {filtered.map((study) => (
          <CaseStudyCard key={study.id} caseStudy={study} />
        ))}
      </div>

      {!filtered.length ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-300">
          No case studies match that filter combination.
        </div>
      ) : null}
    </div>
  );
}
