-- Bilingual content support. Italian columns are optional;
-- when blank, public pages fall back to the default (English) field.

alter table public.events
  add column if not exists title_it text,
  add column if not exists tagline_it text,
  add column if not exists description_it text,
  add column if not exists venue_it text;

alter table public.baskets
  add column if not exists name_it text,
  add column if not exists description_it text;

alter table public.basket_items
  add column if not exists name_it text,
  add column if not exists description_it text;

alter table public.chef_profile
  add column if not exists bio_it text,
  add column if not exists title_it text,
  add column if not exists signature_dish_it text;

-- Optional per-user locale preference. Public pages fall back to cookie.
alter table public.profiles
  add column if not exists preferred_locale text
    check (preferred_locale is null or preferred_locale in ('en','it'));
