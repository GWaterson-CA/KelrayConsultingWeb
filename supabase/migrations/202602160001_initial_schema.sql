create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admins can read own admin record" on public.admin_users;
create policy "Admins can read own admin record"
on public.admin_users
for select
to authenticated
using (auth.uid() = user_id);

create or replace function public.is_admin(user_uuid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.user_id = coalesce(user_uuid, auth.uid())
  );
$$;

grant execute on function public.is_admin(uuid) to anon, authenticated;

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  industry text not null,
  problem text not null,
  approach text not null,
  deliverables text not null,
  tools text not null,
  results text not null,
  metrics jsonb not null default '[]'::jsonb,
  testimonial_quote text,
  featured boolean not null default false,
  published boolean not null default false,
  published_at timestamptz,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists case_studies_published_idx on public.case_studies (published, published_at desc);
create index if not exists case_studies_featured_idx on public.case_studies (featured, published);
create index if not exists case_studies_industry_idx on public.case_studies (industry);

drop trigger if exists case_studies_set_updated_at on public.case_studies;
create trigger case_studies_set_updated_at
before update on public.case_studies
for each row
execute function public.set_updated_at();

alter table public.case_studies enable row level security;

drop policy if exists "Public can read published case studies" on public.case_studies;
create policy "Public can read published case studies"
on public.case_studies
for select
to anon, authenticated
using (published = true or public.is_admin(auth.uid()));

drop policy if exists "Admins can insert case studies" on public.case_studies;
create policy "Admins can insert case studies"
on public.case_studies
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can update case studies" on public.case_studies;
create policy "Admins can update case studies"
on public.case_studies
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete case studies" on public.case_studies;
create policy "Admins can delete case studies"
on public.case_studies
for delete
to authenticated
using (public.is_admin(auth.uid()));

create table if not exists public.case_study_media (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid not null references public.case_studies(id) on delete cascade,
  type text not null check (type in ('image', 'video')),
  url text not null,
  alt text,
  sort_order integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists case_study_media_case_study_id_idx on public.case_study_media(case_study_id, sort_order);

drop trigger if exists case_study_media_set_updated_at on public.case_study_media;
create trigger case_study_media_set_updated_at
before update on public.case_study_media
for each row
execute function public.set_updated_at();

alter table public.case_study_media enable row level security;

drop policy if exists "Public can read published case study media" on public.case_study_media;
create policy "Public can read published case study media"
on public.case_study_media
for select
to anon, authenticated
using (
  public.is_admin(auth.uid())
  or exists (
    select 1
    from public.case_studies cs
    where cs.id = case_study_media.case_study_id
      and cs.published = true
  )
);

drop policy if exists "Admins can insert media" on public.case_study_media;
create policy "Admins can insert media"
on public.case_study_media
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can update media" on public.case_study_media;
create policy "Admins can update media"
on public.case_study_media
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete media" on public.case_study_media;
create policy "Admins can delete media"
on public.case_study_media
for delete
to authenticated
using (public.is_admin(auth.uid()));

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null,
  role text not null,
  message text not null,
  budget_range text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

drop policy if exists "Public can submit contact form" on public.contact_submissions;
create policy "Public can submit contact form"
on public.contact_submissions
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read contact submissions" on public.contact_submissions;
create policy "Admins can read contact submissions"
on public.contact_submissions
for select
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "Admins can update contact submissions" on public.contact_submissions;
create policy "Admins can update contact submissions"
on public.contact_submissions
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete contact submissions" on public.contact_submissions;
create policy "Admins can delete contact submissions"
on public.contact_submissions
for delete
to authenticated
using (public.is_admin(auth.uid()));

insert into storage.buckets (id, name, public)
values ('case-media', 'case-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view case media bucket" on storage.objects;
create policy "Public can view case media bucket"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'case-media');

drop policy if exists "Admins can upload case media bucket" on storage.objects;
create policy "Admins can upload case media bucket"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'case-media'
  and public.is_admin(auth.uid())
);

drop policy if exists "Admins can update case media bucket" on storage.objects;
create policy "Admins can update case media bucket"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'case-media'
  and public.is_admin(auth.uid())
)
with check (
  bucket_id = 'case-media'
  and public.is_admin(auth.uid())
);

drop policy if exists "Admins can delete case media bucket" on storage.objects;
create policy "Admins can delete case media bucket"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'case-media'
  and public.is_admin(auth.uid())
);
