-- Mai schema: profiles, events, baskets, basket_items, orders
-- Run this in Supabase SQL Editor after creating the project.

-- ---------- profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

-- Auto-create profile row when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  seed_email text := coalesce(current_setting('app.admin_seed_email', true), '');
  assigned_role text := 'customer';
begin
  if seed_email <> '' and lower(new.email) = lower(seed_email) then
    assigned_role := 'admin';
  end if;

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    assigned_role
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------- events ----------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tagline text,
  description text,
  hero_image_url text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  venue text,
  address text,
  ticket_price_cents integer not null default 0,
  capacity integer,
  tickets_sold integer not null default 0,
  status text not null default 'draft' check (status in ('draft','published','sold_out','archived')),
  created_at timestamptz not null default now()
);

create index if not exists events_starts_at_idx on public.events (starts_at);
create index if not exists events_status_idx on public.events (status);

-- ---------- baskets (one per event) ----------
create table if not exists public.baskets (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  description text,
  image_url text,
  price_cents integer not null default 0,
  shipping_cents integer not null default 0,
  stock integer,
  units_sold integer not null default 0,
  fulfillment_pickup boolean not null default true,
  fulfillment_shipping boolean not null default true,
  created_at timestamptz not null default now()
);

create unique index if not exists baskets_one_per_event on public.baskets(event_id);

-- ---------- basket items (the 9-10 products inside a basket) ----------
create table if not exists public.basket_items (
  id uuid primary key default gen_random_uuid(),
  basket_id uuid not null references public.baskets(id) on delete cascade,
  name text not null,
  description text,
  position integer not null default 0
);

create index if not exists basket_items_basket_idx on public.basket_items(basket_id, position);

-- ---------- orders ----------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  customer_email text not null,
  customer_name text,
  customer_phone text,
  event_id uuid references public.events(id) on delete set null,
  basket_id uuid references public.baskets(id) on delete set null,
  kind text not null check (kind in ('event_ticket','basket')),
  quantity integer not null default 1 check (quantity > 0),
  fulfillment_method text check (fulfillment_method in ('pickup','shipping')),
  shipping_address jsonb,
  subtotal_cents integer not null default 0,
  shipping_cents integer not null default 0,
  total_cents integer not null default 0,
  status text not null default 'pending' check (status in ('pending','paid','fulfilled','canceled','refunded')),
  stripe_session_id text unique,
  stripe_payment_intent text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists orders_event_idx on public.orders(event_id);
create index if not exists orders_basket_idx on public.orders(basket_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_created_idx on public.orders(created_at desc);

-- ---------- RLS ----------
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.baskets enable row level security;
alter table public.basket_items enable row level security;
alter table public.orders enable row level security;

-- profiles: each user reads/updates their own; admins read all.
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles admin read" on public.profiles;
create policy "profiles admin read" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- events: everyone reads published; admins do everything.
drop policy if exists "events public read" on public.events;
create policy "events public read" on public.events
  for select using (status = 'published' or status = 'sold_out');

drop policy if exists "events admin all" on public.events;
create policy "events admin all" on public.events
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- baskets: public reads (for any event row visible to user).
drop policy if exists "baskets public read" on public.baskets;
create policy "baskets public read" on public.baskets
  for select using (true);

drop policy if exists "baskets admin all" on public.baskets;
create policy "baskets admin all" on public.baskets
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- basket_items: public read; admins write.
drop policy if exists "basket_items public read" on public.basket_items;
create policy "basket_items public read" on public.basket_items
  for select using (true);

drop policy if exists "basket_items admin all" on public.basket_items;
create policy "basket_items admin all" on public.basket_items
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- orders: users see their own; admins see all. Inserts/updates happen via
-- server actions using the service-role key, which bypasses RLS.
drop policy if exists "orders user read" on public.orders;
create policy "orders user read" on public.orders
  for select using (auth.uid() = user_id);

drop policy if exists "orders admin all" on public.orders;
create policy "orders admin all" on public.orders
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );
