import Link from "next/link";
import { redirect } from "next/navigation";

import { deleteCaseStudyAction, signOutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminSession } from "@/lib/admin";
import { getAdminCaseStudies } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type AdminDashboardProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminDashboardPage({ searchParams }: AdminDashboardProps) {
  const session = await getAdminSession();

  if (!session.enabled) {
    return (
      <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 text-amber-100">
        Supabase env vars are missing. Configure the app before using admin routes.
      </div>
    );
  }

  if (!session.user) {
    redirect("/admin/login");
  }

  if (!session.isAdmin) {
    redirect("/admin/login?error=You+are+not+authorized+as+an+admin");
  }

  const [caseStudies, params] = await Promise.all([getAdminCaseStudies(), searchParams]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-white">Admin dashboard</h1>
          <p className="mt-1 text-sm text-slate-300">Manage case studies, publication status, and media assets.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/case-studies/new">New case study</Link>
          </Button>
          <form action={signOutAction}>
            <Button type="submit" variant="secondary">
              Sign out
            </Button>
          </form>
        </div>
      </div>

      {params.error ? (
        <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{params.error}</div>
      ) : null}
      {params.success ? (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-200">{params.success}</div>
      ) : null}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caseStudies.map((study) => (
              <TableRow key={study.id}>
                <TableCell className="font-medium">{study.title}</TableCell>
                <TableCell>{study.industry}</TableCell>
                <TableCell>{study.published ? "Published" : "Draft"}</TableCell>
                <TableCell>{formatDate(study.updated_at)}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button asChild size="sm" variant="secondary">
                      <Link href={`/admin/case-studies/${study.id}`}>Edit</Link>
                    </Button>
                    <form action={deleteCaseStudyAction}>
                      <input type="hidden" name="id" value={study.id} />
                      <Button type="submit" size="sm" variant="destructive">
                        Delete
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
