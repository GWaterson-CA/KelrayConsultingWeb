"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Link from "next/link";

import projects from "@/content/showcase.json";

type Project = (typeof projects)[number];
type Category = "All" | "Tools" | "Websites";

export function ProjectShowcase({
  initialProject,
  standalone = false,
}: {
  initialProject?: string;
  standalone?: boolean;
}) {
  const [category, setCategory] = useState<Category>("All");
  const [openId, setOpenId] = useState(initialProject);
  const [frames, setFrames] = useState<Record<string, number>>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const returnTo = useRef<HTMLButtonElement | null>(null);
  const focusStory = useRef(false);
  const visible = projects.filter(
    (project) => category === "All" || project.kind === category,
  );
  const Heading = standalone ? "h1" : "h2";

  useEffect(() => {
    if (openId && focusStory.current) {
      heading.current?.focus();
      focusStory.current = false;
    }
  }, [openId]);

  function close() {
    setOpenId(undefined);
    returnTo.current?.focus();
  }

  function selectFrame(project: Project, index: number) {
    setFrames((previous) => {
      const next = (index + project.shots.length) % project.shots.length;
      return (previous[project.id] ?? 0) === next
        ? previous
        : { ...previous, [project.id]: next };
    });
  }

  return (
    <section className="group work wrap" aria-labelledby="portfolio-title">
      <div className="portfolio-head">
        <div>
          <Heading id="portfolio-title">Explore our work.</Heading>
          <p className="gallery-hint">
            <span className="mouse-hint">
              Move across a preview to browse its images.{" "}
            </span>
            Select a project to see what it solved.
          </p>
        </div>
        <div className="work-filters" role="group" aria-label="Filter projects">
          {(["All", "Tools", "Websites"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={category === filter}
              onClick={() => {
                setCategory(filter);
                setOpenId(undefined);
              }}
            >
              {filter === "All" ? "All work" : filter}
            </button>
          ))}
        </div>
      </div>
      <div className="casewall">
        {visible.map((project, index) => {
          const current = frames[project.id] ?? 0;
          const shot = project.shots[current];
          const expanded = openId === project.id;
          const multiple = project.shots.length > 1;
          const step = (offset: number) =>
            selectFrame(project, current + offset);
          const handleKeys = (event: React.KeyboardEvent) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              step(event.key === "ArrowLeft" ? -1 : 1);
            } else if (expanded && event.key === "Escape") close();
          };
          return (
            <Fragment key={project.id}>
              <button
                type="button"
                className="case-open"
                style={
                  {
                    "--case-color": project.color,
                    order: index * 2,
                  } as CSSProperties
                }
                aria-label={project.name + ". " + project.title}
                aria-expanded={expanded}
                aria-controls={expanded ? "project-story" : undefined}
                onKeyDown={handleKeys}
                onClick={(event) => {
                  if (expanded) {
                    close();
                    return;
                  }
                  returnTo.current = event.currentTarget;
                  focusStory.current = true;
                  setOpenId(project.id);
                }}
              >
                <span
                  className="case-art"
                  onPointerMove={(event) => {
                    if (expanded || !multiple || event.pointerType !== "mouse")
                      return;
                    const bounds = event.currentTarget.getBoundingClientRect();
                    const fraction =
                      (event.clientX - bounds.left) / bounds.width;
                    selectFrame(
                      project,
                      Math.max(
                        0,
                        Math.min(
                          project.shots.length - 1,
                          Math.floor(fraction * project.shots.length),
                        ),
                      ),
                    );
                  }}
                >
                  <Image
                    unoptimized
                    src={shot.src}
                    width={820}
                    height={535}
                    className={shot.portrait ? "portrait" : undefined}
                    alt={project.name + " — " + shot.label}
                  />
                  {multiple && (
                    <span className="scrub" aria-hidden="true">
                      {project.shots.map((s, i) => (
                        <i key={s.src} className={i === current ? "on" : ""} />
                      ))}
                    </span>
                  )}
                  <span className="shot-tag">{shot.label}</span>
                </span>
                <span className="case-title">
                  <strong>{project.name}</strong>
                  <span className="toggle-case" aria-hidden="true">
                    {expanded ? "−" : "+"}
                  </span>
                </span>
                <span className="case-summary">{project.title}</span>
              </button>
              {expanded && (
                <section
                  id="project-story"
                  className="case-story"
                  aria-labelledby="story-title"
                  onKeyDown={handleKeys}
                  style={
                    {
                      "--case-color": project.color,
                      "--order-one": 2 * index + 1,
                      "--order-two": 4 * Math.floor(index / 2) + 3,
                      "--order-three": 6 * Math.floor(index / 3) + 5,
                    } as CSSProperties
                  }
                >
                  <figure>
                    <div className="story-shot">
                      <Image
                        unoptimized
                        width={820}
                        height={535}
                        src={shot.src}
                        alt={project.name + " — " + shot.label}
                      />
                    </div>
                    <div className="shot-controls">
                      <figcaption aria-live="polite">
                        {multiple &&
                          current + 1 + " / " + project.shots.length + " · "}
                        {shot.label}
                      </figcaption>
                      {multiple && (
                        <div className="arrows">
                          <button
                            aria-label="Previous image"
                            onClick={() => step(-1)}
                          >
                            ←
                          </button>
                          <button
                            aria-label="Next image"
                            onClick={() => step(1)}
                          >
                            →
                          </button>
                        </div>
                      )}
                    </div>
                  </figure>
                  <div className="story-copy">
                    <div className="story-heading">
                      <div>
                        <p>{project.type}</p>
                        <h3 id="story-title" tabIndex={-1} ref={heading}>
                          {project.name}
                        </h3>
                      </div>
                      <button
                        className="close-case"
                        aria-label="Close project story"
                        onClick={close}
                      >
                        ×
                      </button>
                    </div>
                    <h4>What we built</h4>
                    <p>{project.build}</p>
                    <h4>What it solved</h4>
                    <p>{project.benefit}</p>
                    {project.slug && (
                      <Link
                        className="textlink"
                        href={"/case-studies/" + project.slug}
                      >
                        Read the full case study →
                      </Link>
                    )}
                  </div>
                </section>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
