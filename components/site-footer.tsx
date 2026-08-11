import Link from "next/link";

import { AnalyticsChoicesButton } from "@/components/analytics-consent";
import { BRAND } from "@/lib/brand";
import { navLinks } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-3 lg:px-10">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{BRAND.name}</h3>
          <p className="mt-3 max-w-sm text-sm text-slate-500">{BRAND.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Navigation</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li>{BRAND.email}</li>
            <li>Canada + United States</li>
            <li>Remote + on-site engagements</li>
            <li>
              <a href={`https://${BRAND.domain}`} className="transition-colors hover:text-slate-900" target="_blank" rel="noreferrer">
                {BRAND.domain}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 px-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/privacy" className="transition-colors hover:text-slate-900">Privacy</Link>
          <Link href="/security-data" className="transition-colors hover:text-slate-900">Security &amp; data</Link>
          <AnalyticsChoicesButton />
        </div>
      </div>
    </footer>
  );
}
