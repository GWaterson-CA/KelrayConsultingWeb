import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services",
  description: "AI consulting, staff training, automation delivery, and custom AI solution builds for business teams.",
};

const engagementOptions = [
  {
    title: "Strategy Workshop",
    outcome: "Clear AI roadmap in 1-2 weeks",
    deliverables: "Capability review, opportunity map, implementation priorities, and governance baseline.",
    useCase: "Best for leadership teams deciding where to invest first.",
  },
  {
    title: "Retainer Partnership",
    outcome: "Ongoing optimization and delivery support",
    deliverables: "Monthly execution cycles, training refreshers, workflow monitoring, and iteration planning.",
    useCase: "Best for teams rolling out AI across multiple departments.",
  },
  {
    title: "Project-Based Build",
    outcome: "Specific workflow/tool shipped end-to-end",
    deliverables: "Technical design, implementation, integrations, QA, and handoff documentation.",
    useCase: "Best for one high-value process needing rapid transformation.",
  },
];

const faqs = [
  {
    q: "How quickly can we start seeing business impact?",
    a: "Most clients see early gains during the pilot phase, often within 2-6 weeks depending on process complexity and system access.",
  },
  {
    q: "Do you only work with technical teams?",
    a: "No. We work with operators, managers, and frontline staff. The goal is practical adoption, not technical theater.",
  },
  {
    q: "Can you train our staff, not just build tools?",
    a: "Yes. Training is part of every engagement so your team can operate and improve workflows after rollout.",
  },
  {
    q: "What if we have strict compliance requirements?",
    a: "We can design workflows with guardrails, approval gates, and logging requirements aligned with your risk profile.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10">
      <AnimatedSection>
        <SectionHeading
          badge="Services"
          title="From AI strategy to shipped workflows and trained teams."
          description="We support businesses through the full implementation lifecycle with pragmatic, outcome-focused execution."
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

      <section className="mt-20">
        <AnimatedSection>
          <SectionHeading
            badge="Engagement options"
            title="Flexible ways to work together"
            description="Choose the engagement model based on urgency, internal capacity, and desired depth of implementation."
          />
        </AnimatedSection>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {engagementOptions.map((option, index) => (
            <AnimatedSection key={option.title} delay={index * 0.05}>
              <Card className="h-full">
                <h3 className="text-xl font-semibold text-white">{option.title}</h3>
                <p className="mt-3 text-sm text-cyan-200">Outcome: {option.outcome}</p>
                <p className="mt-4 text-sm text-slate-300">Deliverables: {option.deliverables}</p>
                <p className="mt-4 text-sm text-slate-300">Use case: {option.useCase}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <AnimatedSection>
          <SectionHeading badge="FAQs" title="Common questions before kickoff" />
        </AnimatedSection>

        <AnimatedSection className="mt-6 rounded-3xl border border-white/10 bg-white/5 px-6">
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

      <AnimatedSection className="mt-16 rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 p-8">
        <h2 className="text-3xl font-semibold text-white">Start with a free 2-hour intro session.</h2>
        <p className="mt-3 text-slate-200">
          {`We'll review your current AI usage, identify high-leverage opportunities, and suggest a practical next step.`}
        </p>
        <Button asChild className="mt-6">
          <Link href="/book">Book now</Link>
        </Button>
      </AnimatedSection>
    </div>
  );
}
