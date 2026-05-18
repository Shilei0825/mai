-- Optional: seed a sample event + basket so the site shows real content immediately.
-- Run this AFTER 0001_init.sql, and after the first admin has signed up.

insert into public.events (slug, title, tagline, description, hero_image_url, starts_at, ends_at, venue, address, ticket_price_cents, capacity, status)
values (
  'piedmont-evening',
  'An Evening in Piedmont',
  'Barolo, Barbaresco, and the hills they come from.',
  'A walk through the rolling hills of Piedmont — five wines, two cheeses aged on chestnut leaves, hand-cracked hazelnuts, and a closing square of single-origin gianduja. We sit at one long table.',
  'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600',
  now() + interval '21 days' + interval '19 hours',
  now() + interval '21 days' + interval '22 hours',
  'Casa Mai · Private Dining Room',
  '—',
  9500,
  16,
  'published'
) on conflict (slug) do nothing;

with e as (select id from public.events where slug = 'piedmont-evening')
insert into public.baskets (event_id, name, description, price_cents, shipping_cents, stock, fulfillment_pickup, fulfillment_shipping)
select e.id,
       'The Piedmont Basket',
       'A curated selection of ten Italian goods from this evening''s tasting, packed in a hand-tied basket.',
       18500, 1800, 24, true, true
from e
on conflict do nothing;

with b as (
  select baskets.id from public.baskets
  join public.events on events.id = baskets.event_id
  where events.slug = 'piedmont-evening'
)
insert into public.basket_items (basket_id, name, description, position)
select b.id, item.name, item.description, item.position
from b, (values
  ('Barolo DOCG, 2019', 'A single-vineyard Nebbiolo from La Morra.', 1),
  ('Barbaresco DOCG, 2020', 'Producer-bottled, lifted with rose and red cherry.', 2),
  ('Tuma Persa', 'Aged sheep''s milk cheese wrapped in chestnut leaves.', 3),
  ('Castagne del Monferrato', 'Whole Piedmont hazelnuts, lightly toasted.', 4),
  ('Gianduja Tablet, 70%', 'Single-origin chocolate with Piedmont hazelnut paste.', 5),
  ('Acacia Honey', 'Light, floral, from a Langhe apiary.', 6),
  ('Olive Oil — Taggiasca, 250ml', 'First press, cold-extracted, Liguria.', 7),
  ('Saba — Cooked Grape Must', 'A spoonful over cheese or ice cream.', 8),
  ('Amaretti di Saronno', 'Crisp almond cookies, baked the traditional way.', 9),
  ('Nocino Liqueur, 200ml', 'Green-walnut digestif from a family recipe.', 10)
) as item(name, description, position)
on conflict do nothing;
