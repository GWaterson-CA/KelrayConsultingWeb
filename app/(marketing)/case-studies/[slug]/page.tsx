import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAdminSession } from "@/lib/admin";
import { getCaseStudyBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type CaseStudyDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug, true);

  if (!caseStudy) {
    return { title: "Case study" };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      type: "article",
      images: [
        {
          url: caseStudy.media.find((item) => item.type === "image")?.url ?? "/images/og-cover.svg",
          alt: caseStudy.title,
        },
      ],
    },
  };
}

export default async function CaseStudyDetailPage({ params, searchParams }: CaseStudyDetailPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  let includeDraft = false;
  if (query.preview === "1") {
    const session = await getAdminSession();
    includeDraft = session.isAdmin;
  }

  const caseStudy = await getCaseStudyBySlug(slug, includeDraft);

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
      name: "Forge AI Contracting",
    },
  };

  return (
    <article className="mx-auto max-w-5xl px-6 pb-24 pt-16 lg:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <AnimatedSection>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{caseStudy.industry}</Badge>
          {caseStudy.featured ? <Badge>Featured</Badge> : null}
          {!caseStudy.published ? <Badge variant="secondary">Draft preview</Badge> : null}
        </div>
        <h1 className="mt-5 text-balance text-4xl font-semibold text-white sm:text-5xl">{caseStudy.title}</h1>
        <p className="mt-4 text-lg text-slate-300">{caseStudy.summary}</p>
        <p className="mt-3 text-sm text-slate-400">
          Published {formatDate(caseStudy.published_at || caseStudy.updated_at)}
        </p>
      </AnimatedSection>

      <AnimatedSection className="mt-10 space-y-4">
        {caseStudy.media.map((media) => (
          <div key={media.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            {media.type === "video" ? (
              <video className="w-full" controls playsInline loop muted poster="/images/video-poster-case.svg">
                <source src={media.url} type="video/mp4" />
              </video>
            ) : (
              <div className="relative h-[320px] w-full sm:h-[440px]">
                <Image src={media.url} alt={media.alt ?? caseStudy.title} fill className="object-cover" sizes="100vw" />
              </div>
            )}
          </div>
        ))}
      </AnimatedSection>

      <AnimatedSection className="mt-10 grid gap-5 md:grid-cols-3">
        {caseStudy.metrics.map((metric) => (
          <Card key={metric.label} className="bg-cyan-400/10">
            <p className="text-xs uppercase tracking-wider text-cyan-100">{metric.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
          </Card>
        ))}
      </AnimatedSection>

      <AnimatedSection className="mt-10 grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-white">Problem</h2>
          <div className="mt-3 space-y-3 text-slate-300 [&_a]:text-cyan-200 [&_li]:ml-5 [&_ul]:list-disc">
            <ReactMarkdown>{caseStudy.problem}</ReactMarkdown>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Approach</h2>
          <div className="mt-3 space-y-3 text-slate-300 [&_a]:text-cyan-200 [&_li]:ml-5 [&_ul]:list-disc">
            <ReactMarkdown>{caseStudy.approach}</ReactMarkdown>
          </div>
        </Card>
      </AnimatedSection>

      <AnimatedSection className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-white">Deliverables</h2>
          <ul className="mt-3 space-y-2 text-slate-300">
            {caseStudy.deliverables.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Tools used</h2>
          <ul className="mt-3 space-y-2 text-slate-300">
            {caseStudy.tools.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </Card>
      </AnimatedSection>

      <AnimatedSection className="mt-5">
        <Card>
          <h2 className="text-xl font-semibold text-white">Results</h2>
          <div className="mt-3 space-y-3 text-slate-300 [&_a]:text-cyan-200 [&_li]:ml-5 [&_ul]:list-disc">
            <ReactMarkdown>{caseStudy.results}</ReactMarkdown>
          </div>
          {caseStudy.testimonial_quote ? (
            <blockquote className="mt-5 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-4 text-slate-100">
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
