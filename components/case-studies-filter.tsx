"use client";

import { useMemo, useState } from "react";

import { CaseStudyCard } from "@/components/case-study-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CaseStudy } from "@/lib/types";

type CaseStudiesFilterProps = {
  caseStudies: CaseStudy[];
};

export function CaseStudiesFilter({ caseStudies }: CaseStudiesFilterProps) {
  const [industry, setIndustry] = useState<string>("all");
  const [workType, setWorkType] = useState<string>("all");

  const industries = useMemo(() => {
    return Array.from(new Set(caseStudies.map((study) => study.industry))).sort();
  }, [caseStudies]);

  const workTypes = useMemo(() => {
    return Array.from(new Set(caseStudies.flatMap((study) => study.work_types))).sort();
  }, [caseStudies]);

  const filtered = useMemo(() => {
    return caseStudies.filter((study) => {
      const industryPass = industry === "all" || study.industry === industry;
      const workTypePass = workType === "all" || study.work_types.includes(workType);

      return industryPass && workTypePass;
    });
  }, [caseStudies, industry, workType]);

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

        <Select value={workType} onValueChange={setWorkType}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by work type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All work types</SelectItem>
            {workTypes.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
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
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
          No case studies match that filter combination.
        </div>
      ) : null}
    </div>
  );
}
