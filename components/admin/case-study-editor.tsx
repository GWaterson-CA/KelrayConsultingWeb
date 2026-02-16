"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  deleteCaseStudyMediaAction,
  uploadCaseStudyMediaAction,
  upsertCaseStudyAction,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CaseStudy } from "@/lib/types";
import { makeSlug, toJsonString } from "@/lib/utils";

type CaseStudyEditorProps = {
  caseStudy: CaseStudy | null;
  message?: string;
  isError?: boolean;
};

export function CaseStudyEditor({ caseStudy, message, isError = false }: CaseStudyEditorProps) {
  const [title, setTitle] = useState(caseStudy?.title ?? "");
  const [slug, setSlug] = useState(caseStudy?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(caseStudy?.slug));

  const metricsDefault = useMemo(() => toJsonString(caseStudy?.metrics ?? [], "[]"), [caseStudy?.metrics]);

  return (
    <div className="space-y-8">
      {message ? (
        <div
          className={`rounded-2xl border p-4 text-sm ${
            isError ? "border-rose-400/30 bg-rose-400/10 text-rose-200" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
          }`}
        >
          {message}
        </div>
      ) : null}

      <form action={upsertCaseStudyAction} className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        {caseStudy?.id ? <input type="hidden" name="id" value={caseStudy.id} /> : null}

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              value={title}
              onChange={(event) => {
                const value = event.target.value;
                setTitle(value);
                if (!slugEdited) {
                  setSlug(makeSlug(value));
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              required
              value={slug}
              onChange={(event) => {
                setSlug(event.target.value);
                setSlugEdited(true);
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea id="summary" name="summary" required defaultValue={caseStudy?.summary ?? ""} />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" name="industry" required defaultValue={caseStudy?.industry ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" name="tags" defaultValue={caseStudy?.tags.join(", ") ?? ""} />
          </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="problem">Problem (Markdown supported)</Label>
          <Textarea id="problem" name="problem" required defaultValue={caseStudy?.problem ?? ""} />
        </div>

        <div className="space-y-2">
            <Label htmlFor="approach">Approach (Markdown supported)</Label>
          <Textarea id="approach" name="approach" required defaultValue={caseStudy?.approach ?? ""} />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="deliverables">Deliverables (one per line)</Label>
            <Textarea
              id="deliverables"
              name="deliverables"
              required
              defaultValue={caseStudy?.deliverables.join("\n") ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tools">Tools (one per line)</Label>
            <Textarea id="tools" name="tools" required defaultValue={caseStudy?.tools.join("\n") ?? ""} />
          </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="results">Results (Markdown supported)</Label>
          <Textarea id="results" name="results" required defaultValue={caseStudy?.results ?? ""} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="metrics">Metrics JSON</Label>
          <Textarea id="metrics" name="metrics" required className="min-h-[180px] font-mono text-xs" defaultValue={metricsDefault} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="testimonialQuote">Testimonial quote</Label>
          <Textarea id="testimonialQuote" name="testimonialQuote" defaultValue={caseStudy?.testimonial_quote ?? ""} />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-200">
            <input type="checkbox" name="featured" defaultChecked={caseStudy?.featured ?? false} className="h-4 w-4" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-200">
            <input type="checkbox" name="published" defaultChecked={caseStudy?.published ?? false} className="h-4 w-4" />
            Published
          </label>
          {slug ? (
            <Link href={`/case-studies/${slug}?preview=1`} target="_blank" className="text-sm font-medium text-cyan-200 hover:text-cyan-100">
              Preview draft
            </Link>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Save case study</Button>
          <Button variant="secondary" asChild>
            <Link href="/admin">Back to dashboard</Link>
          </Button>
        </div>
      </form>

      {caseStudy?.id ? (
        <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Media uploads</h2>
          <form action={uploadCaseStudyMediaAction} className="grid gap-4 lg:grid-cols-4" encType="multipart/form-data">
            <input type="hidden" name="caseStudyId" value={caseStudy.id} />
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="file">Image or video</Label>
              <Input id="file" name="file" type="file" required accept="image/*,video/*" className="pt-2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Alt text</Label>
              <Input id="alt" name="alt" placeholder="Describe this media" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort order</Label>
              <Input id="sortOrder" name="sortOrder" type="number" min={1} defaultValue={1} />
            </div>
            <div className="lg:col-span-4">
              <Button type="submit" size="sm">
                Upload media
              </Button>
            </div>
          </form>

          <div className="space-y-3">
            {caseStudy.media.length ? (
              caseStudy.media.map((media) => (
                <div
                  key={media.id}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-100">{media.type.toUpperCase()}</p>
                    <p className="truncate text-xs text-slate-400">{media.url}</p>
                  </div>
                  <form action={deleteCaseStudyMediaAction}>
                    <input type="hidden" name="mediaId" value={media.id} />
                    <input type="hidden" name="caseStudyId" value={caseStudy.id} />
                    <input type="hidden" name="url" value={media.url} />
                    <Button variant="destructive" size="sm" type="submit">
                      Delete
                    </Button>
                  </form>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-300">No media uploaded yet.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
