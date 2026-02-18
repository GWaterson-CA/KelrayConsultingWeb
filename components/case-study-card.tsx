import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const coverImage = caseStudy.media.find((item) => item.type === "image")?.url ?? "/images/case-study-default.svg";

  return (
    <Card className="group overflow-hidden border-white/10 p-0 transition duration-300 hover:border-emerald-300/40 hover:bg-white/[0.08]">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={coverImage}
          alt={caseStudy.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{caseStudy.industry}</Badge>
          {caseStudy.featured ? <Badge>Featured</Badge> : null}
        </div>
        <h3 className="text-xl font-semibold text-white">{caseStudy.title}</h3>
        <p className="text-sm text-slate-300">{caseStudy.summary}</p>
        <div className="flex flex-wrap gap-4 text-sm text-emerald-200">
          {caseStudy.metrics.slice(0, 2).map((metric) => (
            <span key={metric.label}>{metric.value}</span>
          ))}
        </div>
        <Link href={`/case-studies/${caseStudy.slug}`} className="inline-flex text-sm font-medium text-emerald-200 hover:text-emerald-100">
          View case study
        </Link>
      </div>
    </Card>
  );
}
