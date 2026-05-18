-- Hero video clips that play on the homepage hero.
-- Admin manages these via /admin/hero-clips. If the table is empty the page
-- gracefully falls back to a still photo with kenburns animation.

create table if not exists public.hero_clips (
  id uuid primary key default gen_random_uuid(),
  label_en text not null,
  label_it text,
  video_url text not null,
  poster_url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists hero_clips_position_idx
  on public.hero_clips(position);

alter table public.hero_clips enable row level security;

drop policy if exists "hero_clips public read" on public.hero_clips;
create policy "hero_clips public read" on public.hero_clips
  for select using (true);

drop policy if exists "hero_clips admin all" on public.hero_clips;
create policy "hero_clips admin all" on public.hero_clips
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- Seed four clips. The video URLs point at the project's own Supabase Storage
-- bucket (videos/<name>.mp4, public). Replace via /admin/hero-clips with your
-- own real Italian food MP4s when ready — upload to the same bucket.
insert into public.hero_clips (label_en, label_it, video_url, poster_url, position)
values
  (
    'Wine',
    'Vino',
    'https://vgbuycqryudvdhgroajv.supabase.co/storage/v1/object/public/videos/wine.mp4',
    'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=2400&q=90',
    1
  ),
  (
    'Chocolate',
    'Cioccolato',
    'https://vgbuycqryudvdhgroajv.supabase.co/storage/v1/object/public/videos/chocolate.mp4',
    'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=2400&q=90',
    2
  ),
  (
    'Cheese',
    'Formaggio',
    'https://vgbuycqryudvdhgroajv.supabase.co/storage/v1/object/public/videos/cheese.mp4',
    'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=2400&q=90',
    3
  ),
  (
    'Pasta',
    'Pasta',
    'https://vgbuycqryudvdhgroajv.supabase.co/storage/v1/object/public/videos/pasta.mp4',
    'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=2400&q=90',
    4
  )
on conflict do nothing;
