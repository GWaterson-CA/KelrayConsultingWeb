import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { signInAction } from "@/app/admin/actions";
import { BRAND } from "@/lib/brand";
import { getAdminSession } from "@/lib/admin";

export const metadata: Metadata = {
  title: `Admin Login | ${BRAND.name}`,
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSession();
  const params = await searchParams;

  if (session.enabled && session.user && session.isAdmin) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
      <h1 className="text-2xl font-semibold text-white">Admin login</h1>
      <p className="mt-2 text-sm text-slate-300">Sign in to manage case studies and media.</p>

      {!session.enabled ? (
        <div className="mt-5 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3 text-sm text-amber-100">
          Supabase environment variables are missing. Add them in `.env.local` first.
        </div>
      ) : null}

      {params.error ? (
        <div className="mt-5 rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">
          {params.error}
        </div>
      ) : null}

      <form action={signInAction} className="mt-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-slate-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="h-11 w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm text-slate-200">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="h-11 w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-400 px-6 text-sm font-medium text-slate-950 hover:bg-emerald-300"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
