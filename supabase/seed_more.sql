-- Additional test events for richer homepage display.

insert into public.events (slug, title, tagline, description, hero_image_url, starts_at, ends_at, venue, address, ticket_price_cents, capacity, status)
values
  (
    'tuscan-twilight',
    'A Tuscan Twilight',
    'Olive oil, pecorino, and the slow-aged Chianti hills.',
    'A long table beneath cypress shadows — three Tuscan pours, two pecorinos aged on chestnut leaves, fresh focaccia with house olive oil, and a closing square of cantucci dipped in vin santo.',
    'https://images.unsplash.com/photo-1531315396756-905d68d21b56?w=1800&q=85',
    now() + interval '38 days' + interval '19 hours',
    now() + interval '38 days' + interval '22 hours',
    'Casa Mai · Atrium',
    '—',
    8500,
    18,
    'published'
  ),
  (
    'sicilian-supper',
    'A Sicilian Supper',
    'Marsala, blood oranges, and the volcano under the table.',
    'A Sicilian evening — three Etna reds, pistachio from Bronte, blood-orange granita, and a wedge of cassata for the closing. We finish with a Marsala from a family cellar.',
    'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=1800&q=85',
    now() + interval '54 days' + interval '19 hours',
    now() + interval '54 days' + interval '22 hours',
    'Casa Mai · Terrace',
    '—',
    9500,
    14,
    'published'
  ),
  (
    'veneto-evening',
    'An Evening in the Veneto',
    'Prosecco, risotto, and the lagoon at dusk.',
    'A Veneto evening — Prosecco di Valdobbiadene, four cicchetti, a saffron risotto pour, and tiramisù served as we open a bottle of Recioto for the final round.',
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1800&q=85',
    now() + interval '70 days' + interval '19 hours',
    now() + interval '70 days' + interval '22 hours',
    'Casa Mai · Library',
    '—',
    8800,
    16,
    'published'
  )
on conflict (slug) do nothing;

-- Tuscan basket
with e as (select id from public.events where slug = 'tuscan-twilight')
insert into public.baskets (event_id, name, description, image_url, price_cents, shipping_cents, stock, fulfillment_pickup, fulfillment_shipping)
select e.id,
       'The Tuscan Basket',
       'Ten goods from the rolling hills of Tuscany.',
       'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1600&q=85',
       17500, 1800, 24, true, true
from e on conflict do nothing;

with b as (
  select baskets.id from public.baskets
  join public.events on events.id = baskets.event_id
  where events.slug = 'tuscan-twilight'
)
insert into public.basket_items (basket_id, name, description, position)
select b.id, item.name, item.description, item.position
from b, (values
  ('Chianti Classico Riserva', 'Sangiovese aged in Slavonian oak.', 1),
  ('Pecorino Toscano DOP', 'Aged on chestnut leaves for six months.', 2),
  ('Olio Extra Vergine — Frantoio', 'First-press, single estate.', 3),
  ('Vin Santo del Chianti', 'Dessert wine pressed from semi-dried Trebbiano.', 4),
  ('Cantucci di Prato', 'Twice-baked almond biscuits.', 5),
  ('Pici Cacio e Pepe Kit', 'Hand-rolled fresh pasta with pecorino and pepper.', 6),
  ('Sale dolce di Cervia', 'Hand-harvested sea salt from the salt flats.', 7),
  ('Honey — Lavender', 'Pressed in the Val d''Orcia.', 8),
  ('Capocollo di Toscana', 'Cured pork shoulder, oak-aged.', 9),
  ('Acetobalsamico Tradizionale', 'A small bottle of 12-year aceto.', 10)
) as item(name, description, position)
on conflict do nothing;

-- Sicilian basket
with e as (select id from public.events where slug = 'sicilian-supper')
insert into public.baskets (event_id, name, description, image_url, price_cents, shipping_cents, stock, fulfillment_pickup, fulfillment_shipping)
select e.id,
       'The Sicilian Basket',
       'Ten goods from the volcanic island.',
       'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=1600&q=85',
       19500, 2200, 20, true, true
from e on conflict do nothing;

with b as (
  select baskets.id from public.baskets
  join public.events on events.id = baskets.event_id
  where events.slug = 'sicilian-supper'
)
insert into public.basket_items (basket_id, name, description, position)
select b.id, item.name, item.description, item.position
from b, (values
  ('Etna Rosso DOC', 'Nerello Mascalese from the volcano slopes.', 1),
  ('Marsala Vergine', '10-year solera Marsala from Florio.', 2),
  ('Pistacchio di Bronte', 'PDO whole green pistachios.', 3),
  ('Caciocavallo Ragusano', 'Stretched-curd cheese aged 8 months.', 4),
  ('Sale di Trapani', 'Hand-raked sea salt.', 5),
  ('Capers from Pantelleria', 'Sun-dried, salt-cured.', 6),
  ('Cannoli Shell Kit', 'Hand-rolled tubes + ricotta cream packet.', 7),
  ('Blood Orange Marmellata', 'From Sicilian Tarocco oranges.', 8),
  ('Almond paste Marzipan', 'Hand-shaped traditional frutta martorana.', 9),
  ('Estratto di pomodoro', 'Sun-dried tomato paste, two-month cure.', 10)
) as item(name, description, position)
on conflict do nothing;

-- Veneto basket
with e as (select id from public.events where slug = 'veneto-evening')
insert into public.baskets (event_id, name, description, image_url, price_cents, shipping_cents, stock, fulfillment_pickup, fulfillment_shipping)
select e.id,
       'The Veneto Basket',
       'Ten goods from the lagoon and the prosecco hills.',
       'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=85',
       18000, 2000, 22, true, true
from e on conflict do nothing;

with b as (
  select baskets.id from public.baskets
  join public.events on events.id = baskets.event_id
  where events.slug = 'veneto-evening'
)
insert into public.basket_items (basket_id, name, description, position)
select b.id, item.name, item.description, item.position
from b, (values
  ('Prosecco di Valdobbiadene DOCG', 'Hand-harvested superiore from the Cartizze hill.', 1),
  ('Recioto della Valpolicella', 'Sweet red wine from semi-dried grapes.', 2),
  ('Risotto Carnaroli', 'Aged Carnaroli rice from Isola della Scala.', 3),
  ('Saffron from Aquileia', 'Hand-harvested filaments.', 4),
  ('Asiago d''Allevo Stravecchio', 'Hard cheese aged 18 months.', 5),
  ('Polenta Marano', 'Stone-milled corn flour from heirloom Marano corn.', 6),
  ('Coffee — Venetian Roast', 'Dark roast for the moka pot.', 7),
  ('Tiramisù Kit', 'Savoiardi + mascarpone + dark cocoa.', 8),
  ('Grappa di Bassano', 'Aged grappa from Veneto distilleries.', 9),
  ('Baicoli', 'Crisp Venetian biscuits, perfect with sweet wine.', 10)
) as item(name, description, position)
on conflict do nothing;
