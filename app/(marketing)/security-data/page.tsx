import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Security, Data & Project Ownership",
  description: "How Ascent scopes data access, AI providers, human review, ownership, and handoff for client engagements.",
  alternates: { canonical: "/security-data" },
};

const principles = [
  {
    title: "Start with the minimum access",
    text: "We identify the systems and data a project actually needs before requesting access. Access, environments, and responsibilities are documented for the engagement rather than assumed.",
  },
  {
    title: "Make AI providers visible",
    text: "A project plan should identify which AI and infrastructure providers are involved, what information reaches them, and which configuration choices are available. We do not treat every model or workflow as interchangeable.",
  },
  {
    title: "Keep people at consequential checkpoints",
    text: "Automations are designed with review and escalation appropriate to the risk of the task. Examples on this site include human confirmation for extracted documents, estimates, and sensitive workflow decisions.",
  },
  {
    title: "Design for handoff",
    text: "Ownership, administrator access, documentation, exports, source code, hosting, support, and offboarding are agreed in the project scope. Our goal is a system your team can operate—not a black box that only we can access.",
  },
  {
    title: "Be specific about retention",
    text: "Project-specific retention and deletion requirements depend on the systems involved and the client’s obligations. We document the applicable approach during discovery instead of making one generic promise for every engagement.",
  },
  {
    title: "Test before relying on automation",
    text: "Pilots, realistic test data, acceptance criteria, and monitored rollout help establish whether a workflow is accurate and dependable enough for its intended use.",
  },
];

export default function SecurityDataPage() {
  return (
    <article className="mx-auto max-w-5xl px-6 pb-24 pt-16 lg:px-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Security &amp; data</p>
      <h1 className="mt-3 text-balance text-4xl font-semibold text-slate-900 sm:text-5xl">Know how your data and systems will be handled before we build.</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        The right controls depend on the workflow, data, providers, and risks involved. These are the principles we use to make those choices explicit in every engagement.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {principles.map((principle) => (
          <Card key={principle.title} className="h-full">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{principle.title}</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{principle.text}</p>
          </Card>
        ))}
      </div>
      <div className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Questions are welcome before access is granted.</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Ask us about a proposed architecture, provider, hosting region, data flow, ownership term, or handoff plan. We will answer based on the actual engagement rather than a generic assurance.
        </p>
        <Link href="/contact" className="mt-5 inline-flex font-medium text-blue-600 hover:text-blue-700">Discuss your requirements →</Link>
      </div>
    </article>
  );
}
