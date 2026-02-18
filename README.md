# Ascent Business Solutions Website

Production-ready marketing site + admin CMS for an AI consulting/contracting practice.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn-style UI primitives
- Framer Motion
- Supabase (Auth, Postgres, Storage)
- Zod + React Hook Form
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
- Protected admin area:
  - `/admin`
  - `/admin/login`
  - `/admin/case-studies/new`
  - `/admin/case-studies/[id]`
- Case study CRUD with draft/publish + featured + media uploads
- Contact form persistence + optional Resend email notifications
- Booking page with calendar embeds or fallback Supabase form
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
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## Environment variables
Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Recommended:
- `NEXT_PUBLIC_SITE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (not currently required by runtime logic but useful for ops scripts)

Optional:
- `NEXT_PUBLIC_FREE_INTRO_CALENDAR_EMBED`
- `NEXT_PUBLIC_PAID_CLIENT_CALENDAR_EMBED`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_NOTIFY_EMAIL`

## Supabase setup

### 1) Run migrations
Migrations are in:
- `supabase/migrations/202602160001_initial_schema.sql`
- `supabase/migrations/202602160002_seed_case_studies.sql`

Apply them via Supabase SQL Editor in order, or using Supabase CLI migration flow.

### 2) Create first admin user
1. Create a user in Supabase Auth (Email/Password).
2. Get the user UUID from `auth.users`.
3. Insert into `public.admin_users`:
```sql
insert into public.admin_users (user_id) values ('YOUR_AUTH_USER_UUID');
```

### 3) Storage bucket
The migration creates a public bucket named `case-media` and storage policies.

## Data model
Implemented tables:
- `admin_users`
- `case_studies`
- `case_study_media`
- `contact_submissions`

RLS policies enforce:
- Public read of published case studies/media
- Public insert for contact submissions
- Admin-only CRUD for case studies/media and admin-only read for submissions

## Placeholder seed data
`202602160002_seed_case_studies.sql` inserts 5 realistic placeholder case studies with metrics and media references.

## Build and quality checks
Run:
```bash
npm run lint
npm run build
```

## Automated Supabase migrations (GitHub Actions)
A workflow is included at `.github/workflows/supabase-migrations.yml`.

It runs automatically on pushes to `main` when files in `supabase/migrations/**` change, and can also be run manually from the Actions tab.

Add these GitHub repository secrets:
- `SUPABASE_ACCESS_TOKEN`: a Supabase personal access token from Supabase dashboard account settings
- `SUPABASE_PROJECT_REF`: `xuccrinmnefemwtawkbt`

Optional local helper command:
```bash
npm run db:push
```

This assumes the project has already been linked once (`supabase link --project-ref ...`).

## Deployment (Vercel)
1. Push repository to Git provider.
2. Import project in Vercel.
3. Set env vars from `.env.example` in Vercel project settings.
4. Deploy.

After first deploy:
- Confirm `/sitemap.xml` and `/robots.txt`
- Test `/admin/login` and case study CRUD + upload
- Confirm contact and booking fallback submissions are stored in Supabase

## Notes
- If calendar embeds are not set, `/book` automatically shows fallback forms.
- If Resend env vars are not set, submissions are still stored in Supabase without email notification.
- Placeholder case studies and media should be replaced before production launch.
