"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { assertAdmin } from "@/lib/admin";
import { caseStudyFormSchema } from "@/lib/schemas";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { makeSlug } from "@/lib/utils";

function getStoragePathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/case-media/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.slice(index + marker.length);
}

export async function signInAction(formData: FormData) {
  if (!hasSupabaseEnv) {
    redirect("/admin/login?error=Supabase+env+vars+missing");
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    redirect("/admin/login?error=Email+and+password+are+required");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login?error=Unable+to+authenticate");
  }

  const { data: adminRecord } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRecord) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=User+is+not+an+admin");
  }

  redirect("/admin");
}

export async function signOutAction() {
  if (!hasSupabaseEnv) {
    redirect("/admin/login");
  }

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function upsertCaseStudyAction(formData: FormData) {
  await assertAdmin();

  const rawId = String(formData.get("id") ?? "").trim();
  const rawTitle = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const rawMetrics = String(formData.get("metrics") ?? "[]").trim();

  let parsedMetrics: unknown = [];
  try {
    parsedMetrics = JSON.parse(rawMetrics || "[]");
  } catch {
    redirect(`/admin/case-studies/${rawId || "new"}?error=Metrics+must+be+valid+JSON`);
  }

  const parsed = caseStudyFormSchema.safeParse({
    id: rawId || undefined,
    title: rawTitle,
    slug: rawSlug || makeSlug(rawTitle),
    summary: String(formData.get("summary") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    problem: String(formData.get("problem") ?? ""),
    approach: String(formData.get("approach") ?? ""),
    deliverables: String(formData.get("deliverables") ?? ""),
    tools: String(formData.get("tools") ?? ""),
    results: String(formData.get("results") ?? ""),
    metrics: JSON.stringify(parsedMetrics),
    testimonialQuote: String(formData.get("testimonialQuote") ?? ""),
    tags: String(formData.get("tags") ?? ""),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    const errorMessage = parsed.error.issues[0]?.message ?? "Validation failed";
    redirect(`/admin/case-studies/${rawId || "new"}?error=${encodeURIComponent(errorMessage)}`);
  }

  const payload = parsed.data;
  const supabase = await createSupabaseServerClient();

  const row = {
    title: payload.title,
    slug: payload.slug,
    summary: payload.summary,
    industry: payload.industry,
    problem: payload.problem,
    approach: payload.approach,
    deliverables: payload.deliverables,
    tools: payload.tools,
    results: payload.results,
    metrics: parsedMetrics,
    testimonial_quote: payload.testimonialQuote || null,
    tags: payload.tags
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    featured: payload.featured,
    published: payload.published,
    published_at: payload.published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  if (payload.id) {
    const { error } = await supabase.from("case_studies").update(row).eq("id", payload.id);

    if (error) {
      redirect(`/admin/case-studies/${payload.id}?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath(`/case-studies/${payload.slug}`);
    revalidatePath("/case-studies");
    revalidatePath("/");
    revalidatePath("/admin");
    redirect(`/admin/case-studies/${payload.id}?success=Saved`);
  }

  const { data, error } = await supabase
    .from("case_studies")
    .insert({ ...row, created_at: new Date().toISOString() })
    .select("id")
    .single();

  if (error || !data) {
    redirect(`/admin/case-studies/new?error=${encodeURIComponent(error?.message ?? "Unable to create case study")}`);
  }

  revalidatePath("/case-studies");
  revalidatePath("/");
  revalidatePath("/admin");
  redirect(`/admin/case-studies/${data.id}?success=Created`);
}

export async function deleteCaseStudyAction(formData: FormData) {
  await assertAdmin();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    redirect("/admin?error=Missing+case+study+id");
  }

  const supabase = await createSupabaseServerClient();

  const { data: mediaRows } = await supabase.from("case_study_media").select("url").eq("case_study_id", id);
  const storagePaths =
    mediaRows
      ?.map((row) => getStoragePathFromPublicUrl(row.url))
      .filter((path): path is string => Boolean(path)) ?? [];

  if (storagePaths.length) {
    await supabase.storage.from("case-media").remove(storagePaths);
  }

  const { error } = await supabase.from("case_studies").delete().eq("id", id);

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/case-studies");
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?success=Deleted");
}

export async function uploadCaseStudyMediaAction(formData: FormData) {
  await assertAdmin();

  const caseStudyId = String(formData.get("caseStudyId") ?? "").trim();
  const alt = String(formData.get("alt") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 1);
  const file = formData.get("file") as File | null;

  if (!caseStudyId || !file || !file.name) {
    redirect(`/admin/case-studies/${caseStudyId}?error=Missing+file+or+case+study+ID`);
  }

  const supabase = await createSupabaseServerClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "-");
  const path = `${caseStudyId}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage.from("case-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) {
    redirect(`/admin/case-studies/${caseStudyId}?error=${encodeURIComponent(uploadError.message)}`);
  }

  const { data: publicUrlData } = supabase.storage.from("case-media").getPublicUrl(path);

  const { error: dbError } = await supabase.from("case_study_media").insert({
    case_study_id: caseStudyId,
    type: file.type.startsWith("video") ? "video" : "image",
    url: publicUrlData.publicUrl,
    alt: alt || null,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 1,
  });

  if (dbError) {
    redirect(`/admin/case-studies/${caseStudyId}?error=${encodeURIComponent(dbError.message)}`);
  }

  revalidatePath(`/admin/case-studies/${caseStudyId}`);
  revalidatePath("/case-studies");
  revalidatePath("/");
  redirect(`/admin/case-studies/${caseStudyId}?success=Media+uploaded`);
}

export async function deleteCaseStudyMediaAction(formData: FormData) {
  await assertAdmin();

  const mediaId = String(formData.get("mediaId") ?? "").trim();
  const caseStudyId = String(formData.get("caseStudyId") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (!mediaId || !caseStudyId) {
    redirect(`/admin/case-studies/${caseStudyId}?error=Missing+media+information`);
  }

  const supabase = await createSupabaseServerClient();

  const storagePath = getStoragePathFromPublicUrl(url);
  if (storagePath) {
    await supabase.storage.from("case-media").remove([storagePath]);
  }

  const { error } = await supabase.from("case_study_media").delete().eq("id", mediaId);

  if (error) {
    redirect(`/admin/case-studies/${caseStudyId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/admin/case-studies/${caseStudyId}`);
  revalidatePath("/case-studies");
  revalidatePath("/");
  redirect(`/admin/case-studies/${caseStudyId}?success=Media+deleted`);
}
