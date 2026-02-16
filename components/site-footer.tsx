import Link from "next/link";

import { navLinks } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-3 lg:px-10">
        <div>
          <h3 className="text-lg font-semibold text-white">Forge AI Contracting</h3>
          <p className="mt-3 max-w-sm text-sm text-slate-400">
            AI consulting and contracting for businesses that want measurable outcomes, not disconnected experiments.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Navigation</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>hello@forgeai.co</li>
            <li>United States</li>
            <li>Remote + on-site engagements</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-6 text-xs text-slate-500 lg:px-10">
        (c) {new Date().getFullYear()} Forge AI Contracting. All rights reserved.
      </div>
    </footer>
  );
}
