import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { values } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: "About Forge AI Contracting, our operating model, and specialist network.",
};

const skills = [
  { label: "AI automation", level: "Advanced" },
  { label: "LLM workflow design", level: "Advanced" },
  { label: "Systems integrations", level: "Advanced" },
  { label: "Data pipelines", level: "Advanced" },
  { label: "Internal tooling", level: "Advanced" },
  { label: "Change enablement", level: "Strong" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10">
      <AnimatedSection>
        <SectionHeading
          badge="About"
          title="A lean core team backed by a trusted specialist network"
          description="We combine business operations thinking with hands-on implementation experience to ship practical AI systems."
        />
      </AnimatedSection>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <AnimatedSection>
          <Card className="h-full">
            <h2 className="text-2xl font-semibold text-white">Founder story</h2>
            <p className="mt-4 text-slate-300">
              Forge AI Contracting started after seeing businesses invest in tools but struggle to turn them into repeatable workflow gains.
              We focus on the gap between experimentation and operational adoption.
            </p>
            <p className="mt-4 text-slate-300">
              Our model blends strategy, delivery, and enablement so businesses can move fast without building a full in-house AI team from scratch.
            </p>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <Card className="h-full">
            <h2 className="text-2xl font-semibold text-white">Team network model</h2>
            <p className="mt-4 text-slate-300">
              We are a small group of specialists including business owners and technical operators. That structure gives clients focused expertise
              without the overhead of a large consultancy.
            </p>
            <p className="mt-4 text-slate-300">
              Engagement teams are assembled based on your domain, systems, and delivery timeline.
            </p>
          </Card>
        </AnimatedSection>
      </section>

      <section className="mt-20">
        <AnimatedSection>
          <SectionHeading badge="Skills matrix" title="Core capabilities" />
        </AnimatedSection>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {skills.map((skill, index) => (
            <AnimatedSection key={skill.label} delay={index * 0.05}>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <span className="text-slate-100">{skill.label}</span>
                <span className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">{skill.level}</span>
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
                <value.icon className="h-6 w-6 text-cyan-200" />
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
