-- Fix: admin RLS policies referenced `profiles` from a policy on `profiles`,
-- producing infinite recursion on every query that touches an admin-gated table.
-- Replace the inline `exists (select ... from profiles ...)` check with a
-- SECURITY DEFINER helper that bypasses RLS on `profiles`.

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce(
    (select role from public.profiles where id = uid),
    'customer'
  ) = 'admin';
$$;

revoke all on function public.is_admin(uuid) from public;
grant execute on function public.is_admin(uuid) to anon, authenticated;

-- profiles ----------------------------------------------------------
drop policy if exists "profiles admin read" on public.profiles;
create policy "profiles admin read" on public.profiles
  for select using (public.is_admin(auth.uid()));

-- events ------------------------------------------------------------
drop policy if exists "events admin all" on public.events;
create policy "events admin all" on public.events
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- baskets -----------------------------------------------------------
drop policy if exists "baskets admin all" on public.baskets;
create policy "baskets admin all" on public.baskets
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- basket_items ------------------------------------------------------
drop policy if exists "basket_items admin all" on public.basket_items;
create policy "basket_items admin all" on public.basket_items
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- orders ------------------------------------------------------------
drop policy if exists "orders admin all" on public.orders;
create policy "orders admin all" on public.orders
  for all using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));
