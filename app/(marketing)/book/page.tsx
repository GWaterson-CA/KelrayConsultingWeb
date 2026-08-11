import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import Link from "next/link";

import { BookingInterestForm } from "@/components/forms/booking-interest-form";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Book a 20-Minute AI Fit Call",
  description:
    "Book a focused 20-minute call with Ascent Business Solutions to discuss your workflow, determine fit, and agree on a useful next step.",
  alternates: { canonical: "/book" },
};

const freeIntroEmbed = process.env.NEXT_PUBLIC_FREE_INTRO_CALENDAR_EMBED;

function CalendarOrFallback({
  embed,
  title,
  callType,
  description,
}: {
  embed: string | undefined;
  title: string;
  callType: "free_intro" | "existing_client_paid";
  description: string;
}) {
  if (embed) {
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm p-3">
        <iframe title={title} src={embed} className="h-[720px] w-full rounded-2xl border-0" loading="lazy" />
      </div>
    );
  }

  return <BookingInterestForm callType={callType} title={title} description={description} />;
}

export default function BookPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10">
      <AnimatedSection>
        <SectionHeading
          badge="Book"
          title="Start with a focused 20-minute fit call"
          description="Tell us what is slowing your team down. We'll determine whether Ascent is a sensible fit and agree on the next useful step—without turning the first conversation into a two-hour commitment."
        />
      </AnimatedSection>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold text-slate-900">New-client fit call</h2>
          <p className="mt-2 text-sm text-slate-600">
            We&apos;ll focus on the workflow, desired outcome, constraints, and whether a practical pilot or workshop makes sense.
          </p>
          <div className="mt-5">
            <CalendarOrFallback
              embed={freeIntroEmbed}
              title="20-minute fit call"
              callType="free_intro"
              description="Share the essentials and your preferred times. Phone is optional."
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <Card>
            <h2 className="text-2xl font-semibold text-slate-900">What happens next</h2>
            <ol className="mt-5 space-y-5 text-sm text-slate-600">
              <li><span className="font-semibold text-slate-900">1. Fit call:</span> We understand the problem and decide whether we can help.</li>
              <li><span className="font-semibold text-slate-900">2. Working session:</span> Qualified projects can move into a deeper workflow review or workshop.</li>
              <li><span className="font-semibold text-slate-900">3. Clear scope:</span> You receive the recommended first step, expected timeline, and investment before committing.</li>
            </ol>
          </Card>
          <Card className="mt-5 bg-slate-50">
            <h2 className="text-xl font-semibold text-slate-900">Already working with Ascent?</h2>
            <p className="mt-3 text-sm text-slate-600">Use your existing project channel or email us directly to schedule delivery and support time.</p>
            <Link href={`mailto:${BRAND.email}`} className="mt-4 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700">{BRAND.email}</Link>
          </Card>
        </AnimatedSection>
      </section>
    </div>
  );
}
