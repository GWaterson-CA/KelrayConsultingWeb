import { notFound, redirect } from "next/navigation";

import { CaseStudyEditor } from "@/components/admin/case-study-editor";
import { getAdminSession } from "@/lib/admin";
import { getAdminCaseStudyById } from "@/lib/data";

type EditCaseStudyPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function EditCaseStudyPage({ params, searchParams }: EditCaseStudyPageProps) {
  const session = await getAdminSession();

  if (!session.enabled) {
    redirect("/admin/login?error=Supabase+is+not+configured");
  }

  if (!session.user || !session.isAdmin) {
    redirect("/admin/login");
  }

  const [{ id }, query] = await Promise.all([params, searchParams]);
  const caseStudy = await getAdminCaseStudyById(id);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-white">Edit case study</h1>
      <CaseStudyEditor caseStudy={caseStudy} message={query.error ?? query.success} isError={Boolean(query.error)} />
    </div>
  );
}
