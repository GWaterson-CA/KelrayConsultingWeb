import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { BRAND } from "@/lib/brand";
import { values } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About — AI Specialists for Business Owners",
  description:
    "Ascent Business Solutions is a lean AI consulting team that helps business owners build custom tools, train staff, and put AI to work without the overhead of a full-time hire.",
  alternates: { canonical: "/about" },
};

const skills = [
  { label: "Custom AI tool development", level: "Expert" },
  { label: "AI workflow design & automation", level: "Expert" },
  { label: "Team training & AI adoption", level: "Expert" },
  { label: "Systems integration (CRM, ERP, etc.)", level: "Expert" },
  { label: "Data organization & reporting", level: "Advanced" },
  { label: "AI strategy for business owners", level: "Expert" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10">
      <AnimatedSection>
        <SectionHeading
          badge="About"
          title="We're the AI team you don't have to hire full-time"
          description="Most businesses know AI could help — they just don't have someone who can connect the dots between what's possible and what their business actually needs. That's us."
        />
      </AnimatedSection>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <AnimatedSection>
          <Card className="h-full">
            <h2 className="text-2xl font-semibold text-white">Why we exist</h2>
            <p className="mt-4 text-slate-300">
              {BRAND.name} was founded after watching too many businesses buy AI tools that never got used, or have staff
              dabbling with ChatGPT without any real strategy behind it. The problem was never the technology — it was the
              gap between what AI can do and what businesses actually need it to do.
            </p>
            <p className="mt-4 text-slate-300">
              We bridge that gap. We build custom tools that fit your workflows, train your team to use AI confidently, and
              help you discover opportunities you didn&apos;t know existed — all without you needing to hire a full-time AI specialist.
            </p>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <Card className="h-full">
            <h2 className="text-2xl font-semibold text-white">How we&apos;re different</h2>
            <p className="mt-4 text-slate-300">
              We&apos;re not a big consultancy that sells you a report and walks away. We&apos;re a small, focused team of
              people who build things, train people, and stick around to make sure everything works. Think of us as your
              outsourced AI department.
            </p>
            <p className="mt-4 text-slate-300">
              We assemble the right specialists for your specific industry and needs, so you get focused expertise without
              paying for overhead you don&apos;t need.
            </p>
          </Card>
        </AnimatedSection>
      </section>

      <section className="mt-20">
        <AnimatedSection>
          <SectionHeading badge="What we bring" title="Our core expertise" />
        </AnimatedSection>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {skills.map((skill, index) => (
            <AnimatedSection key={skill.label} delay={index * 0.05}>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <span className="text-slate-100">{skill.label}</span>
                <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">{skill.level}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <AnimatedSection>
          <SectionHeading badge="Values" title="How we operate" />
        </AnimatedSection>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.06}>
              <Card className="h-full">
                <value.icon className="h-6 w-6 text-emerald-200" />
                <h3 className="mt-4 text-xl font-semibold text-white">{value.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{value.description}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
