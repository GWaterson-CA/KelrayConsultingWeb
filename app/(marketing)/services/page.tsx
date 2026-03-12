import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "AI Services — Custom Tools, Team Training & Automation",
  description:
    "Custom AI tool development, hands-on team training, process automation, and strategic consulting for businesses that want results without hiring full-time AI staff.",
  alternates: { canonical: "/services" },
};

const engagementOptions = [
  {
    title: "Strategy Workshop",
    outcome: "A clear AI roadmap in 1-2 weeks",
    deliverables: "We review your operations, identify the best AI opportunities, and give you a prioritized action plan you can start on immediately.",
    useCase: "Best if you know AI could help but aren't sure where to start.",
  },
  {
    title: "Ongoing Partnership",
    outcome: "A dedicated AI specialist working with your team",
    deliverables: "Monthly implementation cycles, team training sessions, and continuous improvement — like having an AI department without the overhead.",
    useCase: "Best if you want to roll out AI across your business over time.",
  },
  {
    title: "Project Build",
    outcome: "A specific tool or automation, built and delivered",
    deliverables: "We design, build, test, and hand off a working solution — including training your team to use and maintain it.",
    useCase: "Best if you have a specific problem you want solved with AI.",
  },
];

const faqs = [
  {
    q: "How quickly will we see results?",
    a: "Most clients see tangible value within 2-6 weeks. We start with a quick pilot so you get a real win early on before committing to anything bigger.",
  },
  {
    q: "Do we need technical staff to work with you?",
    a: "Not at all. We work directly with business owners, managers, and front-line teams. You don't need any AI expertise — that's what we bring.",
  },
  {
    q: "Can you just train our team without building tools?",
    a: "Absolutely. Training-only engagements are one of our most popular options. We tailor workshops to each role so everyone learns what's relevant to their actual work.",
  },
  {
    q: "What size of business do you work with?",
    a: "Typically 5 to 500 employees. We're a great fit for businesses too small for a dedicated AI hire but big enough that manual work is costing you real money.",
  },
  {
    q: "What if we've already tried AI tools and they didn't stick?",
    a: "That's one of the most common situations we see. Usually the tools weren't connected to real workflows or the team wasn't trained properly. We fix both.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10">
      <AnimatedSection>
        <SectionHeading
          badge="Services"
          title="Everything you'd want from an AI specialist on your team."
          description="Whether you need one custom tool or a full AI rollout, we handle the technical work while keeping your team in the loop and in control."
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

      <section className="mt-20">
        <AnimatedSection>
          <SectionHeading
            badge="Ways to work together"
            title="Pick the approach that fits your business"
            description="No long-term contracts required. Start small or go all-in — whatever makes sense for where you are right now."
          />
        </AnimatedSection>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {engagementOptions.map((option, index) => (
            <AnimatedSection key={option.title} delay={index * 0.05}>
              <Card className="h-full">
                <h3 className="text-xl font-semibold text-slate-900">{option.title}</h3>
                <p className="mt-3 text-sm text-blue-600">Outcome: {option.outcome}</p>
                <p className="mt-4 text-sm text-slate-600">Deliverables: {option.deliverables}</p>
                <p className="mt-4 text-sm text-slate-600">Use case: {option.useCase}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <AnimatedSection>
          <SectionHeading badge="FAQs" title="Common questions before kickoff" />
        </AnimatedSection>

        <AnimatedSection className="mt-6 rounded-3xl border border-slate-200 bg-white px-6">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </section>

      <AnimatedSection className="mt-16 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 p-8">
        <h2 className="text-3xl font-semibold text-slate-900">Not sure where to start? That&apos;s literally what the intro is for.</h2>
        <p className="mt-3 text-slate-600">
          Book a free 2-hour session. We&apos;ll look at your business, show you where AI can help, and give you a clear next step — no commitment required.
        </p>
        <Button asChild className="mt-6">
          <Link href="/book">Book now</Link>
        </Button>
      </AnimatedSection>
    </div>
  );
}
