import type { Metadata } from "next";
import Link from "next/link";
import { ProjectShowcase } from "@/components/project-showcase";
import { CallStrip } from "@/components/call-strip";
import { getPublishedCaseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Work — Custom Tools, Websites & AI Projects",
  description:
    "Explore Ascent’s client work through interactive product screenshots and short stories about the problems each project solved.",
  alternates: { canonical: "/case-studies" },
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const { project } = await searchParams;
  const studies = await getPublishedCaseStudies();
  return (
    <div className="ascent">
      <ProjectShowcase key={project} initialProject={project} standalone />
      <details className="wrap archive">
        <summary>Browse all full case studies</summary>
        <ul>
          {studies.map((study) => (
            <li key={study.slug}>
              <Link className="textlink" href={"/case-studies/" + study.slug}>
                {study.title}
              </Link>
            </li>
          ))}
        </ul>
      </details>
      <CallStrip />
    </div>
  );
}
