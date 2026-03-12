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
      <section className="relative overflow-hidden pt-16 lg:pt-24">
        {/* Full-width dark background with texture */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617] to-[#0f172a]" />
          {/* Grid texture */}
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="hero-grid" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
                <line x1="0" y1="100" x2="200" y2="100" stroke="#6EE7B7" strokeOpacity="0.06" strokeWidth="1"/>
                <line x1="200" y1="0" x2="200" y2="100" stroke="#6EE7B7" strokeOpacity="0.06" strokeWidth="1"/>
              </pattern>
              <filter id="hero-blur1" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="120"/>
              </filter>
              <filter id="hero-blur2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="80"/>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)"/>
            {/* Green glow - right side */}
            <circle cx="75%" cy="25%" r="300" fill="#10B981" fillOpacity="0.12" filter="url(#hero-blur1)"/>
            {/* Orange glow - left side */}
            <circle cx="20%" cy="80%" r="250" fill="#F59E0B" fillOpacity="0.08" filter="url(#hero-blur2)"/>
            {/* Extra green glow center-right */}
            <circle cx="60%" cy="60%" r="200" fill="#10B981" fillOpacity="0.06" filter="url(#hero-blur1)"/>
          </svg>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <AnimatedSection className="space-y-8">
          <p className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-300">
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
            <Button asChild variant="outline" size="lg" className="border-slate-500 text-slate-200 hover:bg-slate-800 hover:text-white">
              <Link href="/case-studies">See what we&apos;ve built</Link>
            </Button>
          </div>
          <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Custom tools that fit how you already work
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Hands-on AI training for your whole team
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Discover what AI can actually do for you
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Expert help without a full-time hire
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="relative">
            <Image
              src="/images/hero-business.svg"
              alt="AI dashboard showing workflow efficiency, team confidence, and hours saved through custom business automation tools"
              width={800}
              height={600}
              className="h-full min-h-[480px] w-full object-contain"
              priority
            />
          </div>
        </AnimatedSection>
      </div>

        {/* Social proof - inside dark hero */}
        <div className="relative pb-20"><div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimatedSection>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Trusted by business owners and their teams
            </p>
            <div className="mt-8">
              <TrustedTeamsMarquee teams={trustedTeams} />
            </div>
          </AnimatedSection>
        </div></div>
      </section>

      {/* The problem we solve */}
      <section className="bg-slate-50 py-20"><div className="mx-auto max-w-7xl px-6 lg:px-10">
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
              <p className="text-3xl font-semibold text-blue-500">01</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">You want custom tools</h3>
              <p className="mt-3 text-sm text-slate-600">
                Off-the-shelf software never quite fits. We build AI-powered tools designed around your specific
                workflows, data, and team — so they actually get used.
              </p>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <Card className="h-full">
              <p className="text-3xl font-semibold text-blue-500">02</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">You need your team trained</h3>
              <p className="mt-3 text-sm text-slate-600">
                AI is only useful if people know how to use it well. We run practical workshops tailored to each
                role — leadership, operations, front-line staff — so everyone gets confident fast.
              </p>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <Card className="h-full">
              <p className="text-3xl font-semibold text-blue-500">03</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">You want to explore what&apos;s possible</h3>
              <p className="mt-3 text-sm text-slate-600">
                You suspect AI could transform parts of your business but you&apos;re not sure where to start. We map
                your operations and show you exactly where AI creates the biggest wins.
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </div></section>

      {/* Services */}
      <section className="py-20"><div className="mx-auto max-w-7xl px-6 lg:px-10">
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
                <service.icon className="h-6 w-6 text-blue-500" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{service.description}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div></section>

      {/* Process */}
      <section className="bg-slate-50 py-20"><div className="mx-auto max-w-7xl px-6 lg:px-10">
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
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div></section>

      {/* Featured projects */}
      <section className="py-20"><div className="mx-auto max-w-7xl px-6 lg:px-10">
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
      </div></section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-20"><div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatedSection>
          <SectionHeading badge="From our clients" title="What business owners and their teams say" align="center" />
        </AnimatedSection>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.07}>
              <Card className="h-full">
                <p className="text-base leading-relaxed text-slate-700">&quot;{testimonial.quote}&quot;</p>
                <p className="mt-4 text-sm text-blue-600">{testimonial.name}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div></section>

      {/* CTA */}
      <section className="py-20"><div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatedSection>
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 via-blue-50 to-sky-50 p-10">
            <h2 className="text-3xl font-semibold text-slate-900">Ready to put AI to work in your business?</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
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
      </div></section>
    </div>
  );
}