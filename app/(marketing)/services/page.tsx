import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import offers from "@/content/services.json";
import projects from "@/content/showcase.json";
import { CallStrip } from "@/components/call-strip";

export const metadata: Metadata = {
  title: "Services — Part-Time AI Support, Custom Tools, Websites & Training",
  description:
    "Choose part-time AI support, a custom workflow, a website, hands-on team training, or a strategy workshop. See what each engagement includes.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const selected =
    offers.find((offer) => offer.id === service) ??
    offers.find((offer) => offer.id === "automation")!;
  const example = projects.find((p) => p.id === selected.example);
  const shot = example?.shots[selected.shot ?? 0];
  return (
    <div className="ascent">
      <section className="svc-page wrap">
        <h1>Our services</h1>
        <p className="svc-intro">
          Bring us a task that eats up your week, a website your customers
          struggle with, or a team ready to learn.
        </p>
        <div className="svc-browser">
          <nav className="svc-choices" aria-label="Explore a service">
            {offers.map((offer) => (
              <Link
                key={offer.id}
                href={"/services?service=" + offer.id + "#service-panel"}
                aria-current={offer.id === selected.id ? "true" : undefined}
              >
                {offer.label}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>
          <div className="svc-panel" id="service-panel">
            <h2>{selected.headline}</h2>
            <div className="svc-answer">
              <h3>When it fits</h3>
              <p>{selected.fit}</p>
            </div>
            <div className="svc-answer">
              <h3>What you get</h3>
              <p>{selected.deliver}</p>
            </div>
            {!example || !shot ? (
              <Link className="primary support-cta" href="/book">
                Request a 20-minute call →
              </Link>
            ) : (
              <Link
                className="svc-proof"
                href={"/case-studies?project=" + example.id + "#project-story"}
              >
                <Image
                  unoptimized
                  width={820}
                  height={535}
                  src={shot.src}
                  alt={example.name + " — " + shot.label}
                />
                <span>
                  <strong>{example.name} ↗</strong>
                  <span>{selected.caption}</span>
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="svc-faq">
          <h2>Before we start</h2>
          <details>
            <summary>What happens on the first call?</summary>
            <p>
              Bring one example, such as a quote you prepare by hand or a
              question customers keep asking. In 20 minutes we’ll talk through
              how it works today and decide whether part-time support, a
              workshop, or a build would help.
            </p>
          </details>
          <details>
            <summary>How do you scope and price the work?</summary>
            <p>
              For part-time support, we agree on monthly capacity and
              priorities. Workshops have an agreed scope. For a build, we review
              the workflow and propose milestones. You see the deliverables,
              timing, cost, and any ongoing support before committing.
            </p>
          </details>
          <details>
            <summary>Can our team run it afterwards?</summary>
            <p>
              We plan the handoff with you. For a tool or website, that covers
              administrator access, documentation, and practice with the tasks
              your team will own. Ongoing help is available if you want it.
            </p>
          </details>
        </div>{" "}
      </section>
      <CallStrip />
    </div>
  );
}
