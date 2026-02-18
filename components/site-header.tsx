import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { navLinks } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3 text-white">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/45 bg-emerald-300/15 text-sm font-semibold text-emerald-100">
              A
            </span>
            <span className="text-base font-semibold tracking-tight sm:text-lg">
              <span className="sm:hidden">{BRAND.shortName}</span>
              <span className="hidden sm:inline">{BRAND.name}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button asChild size="sm">
            <Link href="/book">
              <span className="sm:hidden">Book intro</span>
              <span className="hidden sm:inline">Book free 2-hour intro</span>
            </Link>
          </Button>
        </div>
        <nav className="mt-3 flex gap-4 overflow-x-auto pb-1 text-sm md:hidden">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-slate-300">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
