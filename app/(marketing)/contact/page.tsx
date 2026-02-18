import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${BRAND.name} about AI strategy, training, and implementation support.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-16 lg:px-10">
      <AnimatedSection>
        <SectionHeading
          badge="Contact"
          title="Tell us what you're trying to solve"
          description="Share your current workflow constraints and desired outcomes. We'll follow up with practical next steps."
        />
      </AnimatedSection>

      <AnimatedSection delay={0.08} className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <ContactForm />
      </AnimatedSection>
    </div>
  );
}
