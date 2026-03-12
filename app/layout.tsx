import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import { BRAND } from "@/lib/brand";

import "./globals.css";

const headingFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || BRAND.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: `${BRAND.name} | AI Consulting, Custom Tools & Team Training for Business`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Your outsourced AI specialist. Ascent Business Solutions builds custom AI tools, trains your team, and helps you explore what AI can actually do for your business.",
  openGraph: {
    title: `${BRAND.name} — Your Outsourced AI Specialist`,
    description:
      "Custom AI tools, team training, and hands-on implementation for businesses that want to use AI but don't have dedicated AI staff.",
    url: siteUrl,
    siteName: BRAND.name,
    type: "website",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — AI Consulting, Custom Tools & Team Training`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Your Outsourced AI Specialist`,
    description: "Custom AI tools, team training, and business automation. No full-time hire needed.",
    images: ["/images/og-cover.png"],
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
