-- Chef profile (single-row) + certifications.
-- The site supports one chef; we use a fixed id so updates are simple.

create table if not exists public.chef_profile (
  id uuid primary key default '00000000-0000-0000-0000-000000000001'::uuid,
  name text not null,
  title text,
  bio text,
  philosophy text,
  origin text,
  signature_dish text,
  photo_url text,
  hero_image_url text,
  instagram_handle text,
  updated_at timestamptz not null default now()
);

create table if not exists public.chef_certifications (
  id uuid primary key default gen_random_uuid(),
  chef_id uuid not null references public.chef_profile(id) on delete cascade,
  name text not null,
  issuer text,
  year integer,
  image_url text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists chef_certifications_chef_idx
  on public.chef_certifications(chef_id, position);

-- Seed one row with Maimouna's details (placeholder bio — admin will edit).
insert into public.chef_profile (id, name, title, bio, philosophy, origin)
values (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Maimouna Niang',
  'Chef · Founder',
  'Maimouna Niang trained across the kitchens of Piedmont, Sicily, and the Veneto before founding Mai. She hosts every evening herself, choosing each producer and every plate.',
  'L''Italia non è un solo sapore. È mille tavole.',
  'Italia · Senegal'
)
on conflict (id) do nothing;

-- RLS
alter table public.chef_profile enable row level security;
alter table public.chef_certifications enable row level security;

drop policy if exists "chef public read" on public.chef_profile;
create policy "chef public read" on public.chef_profile
  for select using (true);

drop policy if exists "chef admin all" on public.chef_profile;
create policy "chef admin all" on public.chef_profile
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

drop policy if exists "chef_certs public read" on public.chef_certifications;
create policy "chef_certs public read" on public.chef_certifications
  for select using (true);

drop policy if exists "chef_certs admin all" on public.chef_certifications;
create policy "chef_certs admin all" on public.chef_certifications
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));
