# Ascent Business Solutions Website

Marketing website for an AI consulting/contracting practice.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn-style UI primitives
- Framer Motion
- Zod + React Hook Form
- Resend (optional email notifications)
- Vercel-friendly deployment

## What is included
- Public pages:
  - `/`
  - `/services`
  - `/case-studies`
  - `/case-studies/[slug]`
  - `/about`
  - `/book`
  - `/contact`
- Case studies rendered from local placeholder data (`/lib/placeholder-data.ts`)
- Booking page with calendar embeds or fallback request forms
- Contact form submission API
- Email notifications + customer confirmations via Resend (optional)
- SEO metadata, OpenGraph, sitemap, robots, and structured data
- Placeholder media assets under `/public/images`
- Asset replacement guide in `ASSET_SOURCES.md`

## Local development
1. Install dependencies:
```bash
npm install
```

2. Copy env template and fill values:
```bash
cp .env.example .env.local
```

3. Start dev server:
```bash
npm run dev -- --port 3000
```

Open [http://localhost:3000](http://localhost:3000)

## Environment variables
Required:
- `NEXT_PUBLIC_SITE_URL`

Optional (calendar embeds for `/book`):
- `NEXT_PUBLIC_FREE_INTRO_CALENDAR_EMBED`
- `NEXT_PUBLIC_PAID_CLIENT_CALENDAR_EMBED`

Optional (email notifications):
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_NOTIFY_EMAIL`

If emails work locally but not on Vercel, confirm all three vars are set in Vercel for the `Production` environment and then redeploy.

## Brand assets
- Header logo path: `public/brand/logo.svg` (or replace with `logo.png` and update `components/site-header.tsx`)
- Favicon path: `app/favicon.ico`

## Build and quality checks
Run:
```bash
npm run lint
npm run build
```

## Deployment (Vercel)
1. Push repository to Git provider.
2. Import project in Vercel.
3. Set env vars from `.env.example` in Vercel project settings.
4. Deploy.

After first deploy:
- Confirm `/sitemap.xml` and `/robots.txt`
- Test `/contact` and `/book`
- Verify emails are delivered if Resend env vars are configured

## Notes
- If calendar embeds are not set, `/book` automatically shows fallback forms.
- If Resend env vars are not set, form submissions still return success but no emails are sent.
- Placeholder case studies and media should be replaced before production launch.
