import Image from "next/image";
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: BRAND.name,
    },
    serviceType: "AI Consulting and Implementation",
    description:
      "Custom AI tool development, team training, and business process automation for companies without dedicated AI staff.",
    areaServed: "North America",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom AI Tool Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Team Training & Workshops" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Strategy & Capability Review" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Process Automation" } },
      ],
    },
  };

  return (
    <div className="pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pt-24">
        <AnimatedSection className="space-y-8">
          <p className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-1 text-sm font-medium text-emerald-100">
            Your outsourced AI specialist
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-tight text-white md:text-6xl">
            Custom AI tools and training built around your business.
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            Most businesses don&apos;t have a dedicated AI person — and they shouldn&apos;t need one. We work alongside
            your team to build the tools you&apos;ve always wanted, train your staff to use AI with confidence, and find
            the opportunities you haven&apos;t spotted yet.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/book">
                Book a free 2-hour intro
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/case-studies">See what we&apos;ve built</Link>
            </Button>
          </div>
          <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Custom tools that fit how you already work
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Hands-on AI training for your whole team
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Discover what AI can actually do for you
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Expert help without a full-time hire
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50">
            <Image
              src="/images/hero-business.svg"
              alt="AI dashboard showing workflow efficiency, team confidence, and hours saved through custom business automation tools"
              width={800}
              height={600}
              className="h-full min-h-[480px] w-full object-cover"
              priority
            />
          </div>
        </AnimatedSection>
      </section>

      {/* Social proof */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Trusted by business owners and their teams
          </p>
          <div className="mt-8">
            <TrustedTeamsMarquee teams={trustedTeams} />
          </div>
        </AnimatedSection>
      </section>

      {/* The problem we solve */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <SectionHeading
            badge="The reality"
            title="Your team is curious about AI — but nobody owns it yet."
            description="You know AI could save time and money. Some staff are experimenting, but nobody is connecting the dots between what's possible and what your business actually needs. That's where we come in."
          />
        </AnimatedSection>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <AnimatedSection delay={0.04}>
            <Card className="h-full">
              <p className="text-3xl font-semibold text-emerald-200">01</p>
              <h3 className="mt-4 text-xl font-semibold text-white">You want custom tools</h3>
              <p className="mt-3 text-sm text-slate-300">
                Off-the-shelf software never quite fits. We build AI-powered tools designed around your specific
                workflows, data, and team — so they actually get used.
              </p>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <Card className="h-full">
              <p className="text-3xl font-semibold text-emerald-200">02</p>
              <h3 className="mt-4 text-xl font-semibold text-white">You need your team trained</h3>
              <p className="mt-3 text-sm text-slate-300">
                AI is only useful if people know how to use it well. We run practical workshops tailored to each
                role — leadership, operations, front-line staff — so everyone gets confident fast.
              </p>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <Card className="h-full">
              <p className="text-3xl font-semibold text-emerald-200">03</p>
              <h3 className="mt-4 text-xl font-semibold text-white">You want to explore what&apos;s possible</h3>
              <p className="mt-3 text-sm text-slate-300">
                You suspect AI could transform parts of your business but you&apos;re not sure where to start. We map
                your operations and show you exactly where AI creates the biggest wins.
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <SectionHeading
            badge="What we do"
            title="Everything you need from an AI specialist — without hiring one."
            description="Whether you need a single custom tool or a full AI strategy, we handle the technical work so you can focus on running your business."
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

      {/* Process */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <SectionHeading
            badge="How we work"
            title="From first conversation to tools your team actually uses"
            description="We keep things simple, practical, and focused on your results — not ours."
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

      {/* Featured projects */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <SectionHeading
            badge="Real results"
            title="Tools and systems we've built for businesses like yours"
            description="Every project starts with a real business problem. Here's what we've delivered."
          />
        </AnimatedSection>
        <div className="mt-10">
          <FeaturedCaseCarousel caseStudies={featured} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <AnimatedSection>
          <SectionHeading badge="From our clients" title="What business owners and their teams say" align="center" />
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

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatedSection>
          <div className="rounded-3xl border border-emerald-300/30 bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-amber-500/15 p-10">
            <h2 className="text-3xl font-semibold text-white">Ready to put AI to work in your business?</h2>
            <p className="mt-3 max-w-3xl text-slate-200">
              Book a free 2-hour intro session. We&apos;ll review what you&apos;re doing now, show you what&apos;s
              possible, and give you a clear next step — no pressure, no jargon.
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
