import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Forge AI Contracting",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-10">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}
