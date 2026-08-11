import type { Metadata } from "next";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND.name} handles website, enquiry, and optional analytics data.`,
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Information you provide",
    body: "When you contact us or request a call, we receive the information you enter, such as your name, business email, company, phone number if supplied, and the details of your enquiry. We use it to respond, evaluate whether we can help, and maintain the resulting business relationship.",
  },
  {
    title: "Optional website analytics",
    body: "Google Analytics remains off unless you choose to allow optional analytics. If allowed, it helps us understand aggregate public-site usage. We do not use this analytics data for advertising and do not sell it. You can change your choice from the Analytics choices link in the footer.",
  },
  {
    title: "Service providers",
    body: "Our website hosting provider processes technical service logs needed to deliver and protect the site. Resend processes form information so we can receive enquiries and send confirmations. A scheduling provider may also process information if a calendar is displayed on the booking page. Those providers handle information under their own terms and privacy commitments.",
  },
  {
    title: "Retention and disclosure",
    body: "We retain enquiry and client communications for as long as reasonably needed to respond, deliver services, maintain business records, resolve disputes, and meet applicable obligations. We do not sell personal information. We disclose it only to service providers supporting our work, when you direct us to, or when legally required.",
  },
  {
    title: "Your choices",
    body: "You can reject optional analytics without losing access to the site. You may also ask us to correct or delete personal information we hold, subject to contractual and legal record-keeping requirements.",
  },
];

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-16 lg:px-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Privacy</p>
      <h1 className="mt-3 text-balance text-4xl font-semibold text-slate-900 sm:text-5xl">A plain-language privacy policy</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">
        This page explains how {BRAND.name} handles information submitted through this website. Last updated August 11, 2026.
      </p>
      <div className="mt-10 space-y-5">
        {sections.map((section) => (
          <Card key={section.title}>
            <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{section.body}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-5 bg-blue-50">
        <h2 className="text-xl font-semibold text-slate-900">Contact us about privacy</h2>
        <p className="mt-3 text-slate-600">
          Email <a className="text-blue-600 underline underline-offset-2" href={`mailto:${BRAND.email}`}>{BRAND.email}</a> with “Privacy” in the subject line.
          For information about project data, see <Link href="/security-data" className="text-blue-600 underline underline-offset-2">Security &amp; data</Link>.
        </p>
      </Card>
    </article>
  );
}
