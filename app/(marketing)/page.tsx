import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { FeaturedCaseCarousel } from "@/components/featured-case-carousel";
import { SectionHeading } from "@/components/section-heading";
import { TrustedTeamsMarquee } from "@/components/trusted-teams-marquee";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BRAND } from "@/lib/brand";
import { getFeaturedCaseStudies } from "@/lib/data";
import { processTimeline, services, testimonials, trustedTeams } from "@/lib/site-content";

export default async function HomePage() {
  const featured = await getFeaturedCaseStudies(3);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: process.env.NEXT_PUBLIC_SITE_URL || BRAND.siteUrl,
    email: BRAND.email,
    description: BRAND.description,
    areaServed: "North America",
  };

  return (
    <div className="pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pt-24">
        <AnimatedSection className="space-y-8">
          <p className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-1 text-sm font-medium text-emerald-100">
            Ascent Business Solutions
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-tight text-white md:text-6xl">
            Turn AI potential into measurable business performance.
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            We help owners and operations teams move from AI experiments to real systems that reduce manual work, speed delivery, and
            improve margins.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/book">
                Book free 2-hour intro
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/case-studies">View case studies</Link>
            </Button>
          </div>
          <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              AI capability review and strategy roadmap
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Team training with role-specific playbooks
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Automation and custom internal tools
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Specialist implementation without full-time hiring
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="video-shell relative overflow-hidden rounded-3xl border border-white/10">
            <video
              className="h-full min-h-[480px] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/video-poster-hero.svg"
            >
              <source src="/videos/hero-loop.mp4" type="video/mp4" />
            </video>
          </div>
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Trusted by growth-focused teams</p>
          <div className="mt-8">
            <TrustedTeamsMarquee teams={trustedTeams} />
          </div>
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <SectionHeading
            badge="What we do"
            title="Consulting and implementation built for operators, not hype."
            description="Clients engage us for strategy, delivery, or both depending on internal team bandwidth and timeline."
          />
        </AnimatedSection>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.04}>
              <Card className="h-full">
                <service.icon className="h-6 w-6 text-emerald-200" />
                <h3 className="mt-4 text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{service.description}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <SectionHeading
            badge="How we work"
            title="A practical delivery model from discovery to adoption"
            description="We keep execution clear, measurable, and aligned with business outcomes from day one."
          />
        </AnimatedSection>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processTimeline.map((step, index) => (
            <AnimatedSection key={step.title} delay={index * 0.05}>
              <Card>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.detail}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <SectionHeading
            badge="Featured projects"
            title="Selected engagements with measurable outcomes"
            description="Live case studies will be expanded over time as new implementation milestones are completed."
          />
        </AnimatedSection>
        <div className="mt-10">
          <FeaturedCaseCarousel caseStudies={featured} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <SectionHeading badge="Testimonials" title="What clients say" align="center" />
        </AnimatedSection>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.07}>
              <Card className="h-full">
                <p className="text-base leading-relaxed text-slate-200">&quot;{testimonial.quote}&quot;</p>
                <p className="mt-4 text-sm text-emerald-200">{testimonial.name}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatedSection>
          <div className="rounded-3xl border border-emerald-300/30 bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-amber-500/15 p-10">
            <h2 className="text-3xl font-semibold text-white">Ready to scale AI usage with confidence?</h2>
            <p className="mt-3 max-w-3xl text-slate-200">
              Work with Ascent Business Solutions to design, implement, and operationalize the systems your team can actually maintain.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/book">Book free 2-hour intro</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
