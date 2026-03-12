import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-white">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
