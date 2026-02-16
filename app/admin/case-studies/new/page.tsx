import { redirect } from "next/navigation";

import { CaseStudyEditor } from "@/components/admin/case-study-editor";
import { getAdminSession } from "@/lib/admin";

type NewCaseStudyPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function NewCaseStudyPage({ searchParams }: NewCaseStudyPageProps) {
  const session = await getAdminSession();
  const params = await searchParams;

  if (!session.enabled) {
    redirect("/admin/login?error=Supabase+is+not+configured");
  }

  if (!session.user || !session.isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-white">Create case study</h1>
      <CaseStudyEditor caseStudy={null} message={params.error ?? params.success} isError={Boolean(params.error)} />
    </div>
  );
}
