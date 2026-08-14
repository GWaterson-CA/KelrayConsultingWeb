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
  const clientLabel = caseStudy.client_name ?? caseStudy.title;

  return (
    <Card className="group overflow-hidden border-slate-200 p-0 transition duration-300 hover:border-blue-300 hover:shadow-lg">
      <div className="relative h-52 overflow-hidden border-b border-slate-200 bg-slate-100">
        <Image
          src={coverImage}
          alt={caseStudy.title}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">Built for {clientLabel}</span>
          {caseStudy.work_types.slice(0, 1).map((type) => (
            <Badge key={type} variant="secondary">{type}</Badge>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{caseStudy.title}</h3>
        <p className="text-sm text-slate-600">{caseStudy.summary}</p>
        <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          {caseStudy.metrics.slice(0, 2).map((metric) => (
            <span key={metric.label} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="block text-xs text-slate-500">{metric.label}</span>
              <span className="font-semibold">{metric.value}</span>
            </span>
          ))}
        </div>
        <Link href={`/case-studies/${caseStudy.slug}`} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
          See what was built →
        </Link>
      </div>
    </Card>
  );
}
