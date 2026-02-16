import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { FeaturedCaseCarousel } from "@/components/featured-case-carousel";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedCaseStudies } from "@/lib/data";
import { logoPlaceholders, processTimeline, services, testimonials } from "@/lib/site-content";

export default async function HomePage() {
  const featured = await getFeaturedCaseStudies(3);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Forge AI Contracting",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    email: "hello@forgeai.co",
    description:
      "AI consulting and contracting for businesses: capability reviews, training, automation, and custom implementation.",
    areaServed: "US",
  };

  return (
    <div className="pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pt-24">
        <AnimatedSection className="space-y-8">
          <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-sm font-medium text-cyan-100">
            AI consulting for business operators and owners
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-tight text-white md:text-6xl">
            Move beyond AI-lite and build workflows that save real time and money.
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            AI is changing everything, but most teams are still using it at a surface level. We help you go deeper with the right tools,
            prompts, and workflows, then train your staff to run it confidently.
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
              <CheckCircle2 className="h-4 w-4 text-cyan-300" />
              AI capability review and roadmap
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" />
              Staff training and enablement
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" />
              Automation and custom tool builds
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-300" />
              Small network of specialist operators
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
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Trusted by teams in growth mode</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {logoPlaceholders.map((logo) => (
              <div key={logo} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center text-sm text-slate-300">
                {logo}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <SectionHeading
            badge="What we do"
            title="Consulting and implementation that translates AI potential into operating leverage."
            description="Clients engage us for strategic guidance, delivery execution, or both depending on internal bandwidth."
          />
        </AnimatedSection>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.04}>
              <Card className="h-full">
                <service.icon className="h-6 w-6 text-cyan-200" />
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
            title="A practical delivery model from diagnosis to adoption."
            description="We keep momentum high while reducing implementation risk with staged rollouts and measurable checkpoints."
          />
        </AnimatedSection>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processTimeline.map((step, index) => (
            <AnimatedSection key={step.title} delay={index * 0.05}>
              <Card>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">Step {index + 1}</p>
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
            title="Selected case studies from recent engagements"
            description="Placeholder case studies below are for layout/demo purposes and should be replaced with real project stories."
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
                <p className="text-base leading-relaxed text-slate-200">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="mt-4 text-sm text-cyan-200">{testimonial.name}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatedSection>
          <div className="rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-blue-500/20 p-10">
            <h2 className="text-3xl font-semibold text-white">Need specialist AI capability without hiring full-time?</h2>
            <p className="mt-3 max-w-3xl text-slate-200">
              Engage a focused operator or small specialist team to design, build, and scale the workflows that matter most.
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
