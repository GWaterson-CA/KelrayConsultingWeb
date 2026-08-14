import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BRAND } from "@/lib/brand";
import { getCaseStudyBySlug, getPublishedCaseStudies } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const caseStudies = await getPublishedCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

type CaseStudyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return { title: "Case study" };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      type: "article",
      images: [
        {
          url: caseStudy.media.find((item) => item.type === "image")?.url ?? "/images/og-cover.png",
          alt: caseStudy.title,
        },
      ],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.summary,
    datePublished: caseStudy.published_at ?? caseStudy.created_at,
    author: {
      "@type": "Organization",
      name: BRAND.name,
    },
  };

  return (
    <article className="mx-auto max-w-5xl px-6 pb-24 pt-16 lg:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <AnimatedSection>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{caseStudy.industry}</Badge>
          {caseStudy.work_types.map((type) => <Badge key={type}>{type}</Badge>)}
          {!caseStudy.published ? <Badge variant="secondary">Draft preview</Badge> : null}
        </div>
        <h1 className="mt-5 text-balance text-4xl font-semibold text-slate-900 sm:text-5xl">{caseStudy.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{caseStudy.summary}</p>
        <p className="mt-3 text-sm text-slate-500">Case study updated {formatDate(caseStudy.updated_at)}</p>
        {caseStudy.client_name ? (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Client/product: {caseStudy.client_name}.</span>{" "}
            This page describes work completed for this organization or product; it does not imply ownership by Ascent Business Solutions.
          </div>
        ) : null}
        {caseStudy.client_website ? (
          <Link
            href={caseStudy.client_website}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Visit {caseStudy.client_name || "client website"} ↗
          </Link>
        ) : null}
      </AnimatedSection>

      <AnimatedSection className="mt-10 space-y-4">
        {caseStudy.media.map((media) => (
          <div key={media.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {media.type === "video" ? (
              <video className="w-full" controls playsInline loop muted poster="/images/video-poster-case.svg">
                <source src={media.url} type="video/mp4" />
              </video>
            ) : (
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <Image src={media.url} alt={media.alt ?? caseStudy.title} fill className="object-cover object-top" sizes="100vw" />
              </div>
            )}
          </div>
        ))}
      </AnimatedSection>

      <AnimatedSection className="mt-10 grid gap-5 md:grid-cols-3">
        {caseStudy.metrics.map((metric) => (
          <Card key={metric.label} className="bg-blue-50">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Verified detail · {metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
          </Card>
        ))}
      </AnimatedSection>

      <AnimatedSection className="mt-10 grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Problem</h2>
          <div className="mt-3 space-y-3 text-slate-600 [&_a]:text-blue-600 [&_li]:ml-5 [&_ul]:list-disc">
            <ReactMarkdown>{caseStudy.problem}</ReactMarkdown>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Approach</h2>
          <div className="mt-3 space-y-3 text-slate-600 [&_a]:text-blue-600 [&_li]:ml-5 [&_ul]:list-disc">
            <ReactMarkdown>{caseStudy.approach}</ReactMarkdown>
          </div>
        </Card>
      </AnimatedSection>

      <AnimatedSection className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Deliverables</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
            {caseStudy.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Tools used</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
            {caseStudy.tools.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </AnimatedSection>

      <AnimatedSection className="mt-5">
        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Results</h2>
          <div className="mt-3 space-y-3 text-slate-600 [&_a]:text-blue-600 [&_li]:ml-5 [&_ul]:list-disc">
            <ReactMarkdown>{caseStudy.results}</ReactMarkdown>
          </div>
          {caseStudy.testimonial_quote ? (
            <blockquote className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-slate-700">
              &quot;{caseStudy.testimonial_quote}&quot;
            </blockquote>
          ) : null}
          {caseStudy.tags.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </Card>
      </AnimatedSection>
    </article>
  );
}
