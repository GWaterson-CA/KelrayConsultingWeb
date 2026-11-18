import type { Metadata } from "next";
import { BookingInterestForm } from "@/components/forms/booking-interest-form";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Request a 20-minute call",
  description:
    "Tell Geoffrey about one task you’d like to make easier. Ascent will follow up to arrange a 20-minute conversation.",
  alternates: { canonical: "/book" },
};
export default function BookPage() {
  const calendar = process.env.NEXT_PUBLIC_FREE_INTRO_CALENDAR_EMBED;
  return (
    <div className="ascent">
      <section className="svc-page wrap">
        <h1>Request a 20-minute call</h1>
        {calendar ? (
          <iframe
            title="Schedule a 20-minute call"
            src={calendar}
            className="my-6 h-[720px] w-full"
          />
        ) : (
          <>
            <p className="svc-intro">
              Tell us about one task you’d like to make easier. We’ll reply by
              email to arrange a time.
            </p>
            <BookingInterestForm />
          </>
        )}
        <p className="mt-8">
          Already working with Ascent?{" "}
          <a className="textlink" href={"mailto:" + BRAND.email}>
            Email us directly.
          </a>
        </p>
      </section>
    </div>
  );
}
