import Image from "next/image";
import Link from "next/link";
import { ProjectShowcase } from "@/components/project-showcase";
import { MeetGeoffrey } from "@/components/meet-geoffrey";
import { CallStrip } from "@/components/call-strip";
import { BRAND, siteUrl } from "@/lib/brand";

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: siteUrl,
    email: BRAND.email,
    description: BRAND.description,
    areaServed: "North America",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: BRAND.name,
    },
    serviceType: "AI Consulting and Implementation",
    description:
      "Custom AI tool development, team training, and business process automation for companies without dedicated AI staff.",
    areaServed: "North America",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom AI Tool Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Team Training & Workshops",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Strategy & Capability Review",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Process Automation",
          },
        },
      ],
    },
  };

  return (
    <div className="ascent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, serviceSchema]),
        }}
      />
      <section className="hero wrap">
        <div>
          <h1>
            Put repetitive work{" "}
            <span className="headline-tail">on autopilot.</span>
          </h1>
          <p className="intro">
            We build custom tools and websites around the way your business
            works, and train your team to use AI on everyday tasks.
          </p>
          <div className="actions">
            <Link href="/book" className="primary">
              Request a 20-minute call <span aria-hidden="true">→</span>
            </Link>
            <Link href="/case-studies" className="textlink">
              See our work
            </Link>
          </div>
        </div>
        <Link
          href="/case-studies?project=kelray#project-story"
          className="feature"
          aria-label="Explore the Kelray Heating website and heater planner"
        >
          <span className="kelray-pair">
            <Image
              priority
              sizes="(max-width: 650px) 100vw, 48vw"
              className="heater-photo"
              src="/images/work/kelray-1.webp"
              alt="Kelray infrared heater installed above a covered patio"
              width={820}
              height={535}
            />
            <Image
              sizes="(max-width: 650px) 42vw, 20vw"
              className="planner-inset"
              src="/images/work/kelray-2.webp"
              alt="The Kelray planner shows heater coverage over a model patio"
              width={820}
              height={535}
            />
          </span>
          <span className="caption">
            <span>
              <b>Kelray Heating’s patio heater planner</b>
              <small>
                Enter your patio dimensions and see where the heat will reach.
              </small>
            </span>
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </span>
        </Link>
      </section>
      <section
        className="group wrap colleague"
        aria-labelledby="ascent-colleague-title"
      >
        <h2 id="ascent-colleague-title">
          Your part-time <br />
          AI colleague.
        </h2>
        <div>
          <p>
            Curious about AI? Bring us something your team does every week.
            We’ll help you find one place to save time or serve customers
            better, then try it together. You’ll have someone to turn to as you
            learn, without hiring a full-time specialist.
          </p>
          <Link href="/services?service=part-time" className="textlink">
            See how part-time support works →
          </Link>
        </div>
      </section>
      <ProjectShowcase />
      <section className="group wrap bg-[var(--pale)]">
        <h2>How can we help?</h2>
        <div className="paths">
          <Link href="/services?service=automation" className="path">
            <strong>
              Automate a workflow <span className="arr">→</span>
            </strong>
            <small>Cut down on retyping, quoting, and chasing updates.</small>
          </Link>
          <Link href="/services?service=training" className="path">
            <strong>
              Train my team <span className="arr">→</span>
            </strong>
            <small>Practice using AI on tasks your team does every day.</small>
          </Link>
          <Link href="/services?service=strategy" className="path">
            <strong>
              Find where AI can help <span className="arr">→</span>
            </strong>
            <small>Choose a first project that’s worth the effort.</small>
          </Link>
        </div>
        <Link href="/services" className="textlink service-index-link">
          Explore all services →
        </Link>
      </section>
      <MeetGeoffrey />
      <CallStrip />
    </div>
  );
}
