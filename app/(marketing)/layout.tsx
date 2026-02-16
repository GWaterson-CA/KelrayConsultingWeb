import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-20" />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
