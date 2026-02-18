import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { BookingInterestForm } from "@/components/forms/booking-interest-form";
import { SectionHeading } from "@/components/section-heading";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Book",
  description: `Book a free intro call or paid client session with ${BRAND.name}.`,
};

const freeIntroEmbed = process.env.NEXT_PUBLIC_FREE_INTRO_CALENDAR_EMBED;
const existingClientEmbed = process.env.NEXT_PUBLIC_PAID_CLIENT_CALENDAR_EMBED;

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
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3">
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
          title="Schedule a conversation"
          description="Choose the right booking path based on whether you are a new prospect or an existing client."
        />
      </AnimatedSection>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold text-white">Free 2-hour intro (new clients)</h2>
          <p className="mt-2 text-sm text-slate-300">
            {`We'll review your current AI initiatives, identify high-leverage opportunities, and outline a practical next step.`}
          </p>
          <div className="mt-5">
            <CalendarOrFallback
              embed={freeIntroEmbed}
              title="Free 2-hour intro"
              callType="free_intro"
              description="Share your context and preferred times. We'll confirm your session shortly."
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <h2 className="text-2xl font-semibold text-white">Existing clients: book paid time</h2>
          <p className="mt-2 text-sm text-slate-300">For ongoing delivery, support, or implementation sessions.</p>
          <div className="mt-5">
            <CalendarOrFallback
              embed={existingClientEmbed}
              title="Existing clients paid session"
              callType="existing_client_paid"
              description="Share your request and preferred slots. We'll coordinate the best specialist for your session."
            />
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
