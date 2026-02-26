import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { BRAND } from "@/lib/brand";

import "./globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || BRAND.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} | AI Strategy, Training, and Automation`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Ascent Business Solutions delivers practical AI consulting: capability reviews, team training, process automation, and custom business tools.",
  openGraph: {
    title: BRAND.name,
    description:
      "Operational AI for real businesses. We redesign processes, train teams, and implement measurable systems.",
    url: siteUrl,
    siteName: BRAND.name,
    type: "website",
    images: [
      {
        url: "/images/og-cover.svg",
        width: 1200,
        height: 630,
        alt: BRAND.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: BRAND.tagline,
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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L4RELDCS9R" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L4RELDCS9R');
            `,
          }}
        />
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
