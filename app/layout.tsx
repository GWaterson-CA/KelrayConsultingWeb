import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import "./globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Forge AI Contracting | AI Consulting for Business Teams",
    template: "%s | Forge AI Contracting",
  },
  description:
    "AI consulting and contracting for businesses: capability reviews, staff training, workflow automation, and custom AI solutions.",
  openGraph: {
    title: "Forge AI Contracting",
    description:
      "Move beyond AI-lite. We train teams, redesign workflows, and ship practical AI solutions with measurable outcomes.",
    url: siteUrl,
    siteName: "Forge AI Contracting",
    type: "website",
    images: [
      {
        url: "/images/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "Forge AI Contracting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge AI Contracting",
    description: "Pragmatic AI consulting and custom implementation for businesses.",
    images: ["/images/og-cover.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
