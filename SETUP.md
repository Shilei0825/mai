# Mai — Setup & Deploy

Everything you need to take Mai from `git clone` to a live, accepting-payments site.

---

## 1. Create the Supabase project

1. Go to https://supabase.com → **New project**.
2. Name it `mai-prod`. Pick a region close to your customers (e.g. `us-east-1`).
3. After provisioning, open **Project Settings → API**. Grab:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret — server only)
4. Paste them into `.env.local`.

### Run the schema

In the Supabase Dashboard → **SQL Editor**, paste the contents of `supabase/migrations/0001_init.sql` and run it. This creates:

- `profiles` (one row per signed-up user)
- `events`, `baskets`, `basket_items`
- `orders`
- Row-level security policies
- A trigger that auto-creates a profile when a user signs up.

### Seed (optional)

To see a sample evening + basket on the site immediately, run `supabase/seed.sql` in the SQL editor too.

### Make yourself admin

The schema reads an `app.admin_seed_email` setting to grant admin on first sign-up. Set it for your project:

```sql
alter database postgres set app.admin_seed_email = 'project2025board@gmail.com';
```

Replace the email with whichever address you'll sign in with. Then sign up at `/signup` — that account will be `role = admin` and see `/admin`.

If you already signed up before setting the seed, just flip your role:

```sql
update profiles set role = 'admin' where email = 'your@email.com';
```

### Configure auth providers

In Supabase Dashboard → **Authentication → Providers**:

- **Email** is on by default.
- **Google**: enable, then follow the dashboard's link to create OAuth credentials in Google Cloud. Authorized redirect URI is `https://<your-supabase-ref>.supabase.co/auth/v1/callback`.
- **Apple**: same flow, requires an Apple developer account.

In **Authentication → URL Configuration**, set:

- **Site URL**: `http://localhost:3000` for dev, change to your real domain in prod.
- **Redirect URLs**: add `http://localhost:3000/auth/callback` and (later) `https://<your-domain>/auth/callback`.

---

## 2. Create the Stripe account

1. Go to https://stripe.com → create / sign in.
2. **Developers → API keys**. Grab:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`
3. Paste into `.env.local`.

### Webhook (so orders mark themselves paid)

1. **Developers → Webhooks → Add endpoint**.
2. URL: `https://<your-domain>/api/stripe/webhook`
3. Listen to event: `checkout.session.completed`.
4. Copy the **signing secret** → `STRIPE_WEBHOOK_SECRET`.

For local testing, install the Stripe CLI and run:

```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

It'll print a temporary signing secret to use in `.env.local`.

---

## 3. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

- Sign up → confirm via the magic link Supabase emails you → you land on `/account`.
- If your email matches `app.admin_seed_email`, the `Admin` link appears in the header.
- Create your first event at `/admin/events/new`, then its basket at `/admin/baskets/new`, then add 9–10 items to that basket on the edit page.

---

## 4. Deploy to Vercel

```bash
# Install Vercel CLI if needed:
npm i -g vercel

# From the project root:
vercel              # one-time setup → choose your team, accept defaults
vercel --prod       # deploy to production
```

Or simply: push to GitHub, then **New Project** on Vercel → import the repo.

### Vercel env vars

Add all of these in **Project Settings → Environment Variables** (Production + Preview):

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | From Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase (secret) |
| `STRIPE_SECRET_KEY` | From Stripe (secret) |
| `STRIPE_WEBHOOK_SECRET` | From Stripe webhook endpoint |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | From Stripe |
| `NEXT_PUBLIC_SITE_URL` | `https://<your-vercel-domain>` (or your custom domain) |
| `ADMIN_SEED_EMAIL` | The email you'll use to sign in as admin |

After the first prod deploy, update Supabase **Authentication → URL Configuration**:

- Site URL → your production URL
- Redirect URLs → add `https://<your-domain>/auth/callback`

And update the Stripe webhook URL to the production endpoint.

---

## 5. Day-to-day workflow

- **Create an event** → `/admin/events/new`. Set price, capacity, start time, status = `published`.
- **Create the basket** → `/admin/baskets/new`. Pick the event, set price + shipping, pickup/shipping options.
- **Add the 9–10 items** → on the basket's edit page, scroll to "What's inside."
- **Watch orders come in** → `/admin/orders`. Use the status dropdown to move orders `paid → fulfilled` as you ship/hand over.

---

## File map

```
src/
  app/
    (auth)/              login & signup pages
    auth/                OAuth callback + sign-out route handlers
    admin/               admin portal (events, baskets, orders)
    api/
      checkout/event     creates Stripe Checkout Session for tickets
      checkout/basket    creates Stripe Checkout Session for baskets
      stripe/webhook     marks orders paid, increments counters
    events/              public events list + detail
    baskets/             public baskets list + detail
    account/             customer dashboard
  components/            UI primitives + page chunks
  lib/
    supabase/            server, browser, admin, proxy session clients
    auth.ts              getCurrentUser, requireAdmin
    data.ts              read queries (events, baskets, orders)
    stripe.ts            lazy Stripe client
    utils.ts             cn, formatPrice, formatEventDate, siteUrl
    types.ts             shared TS types
supabase/
  migrations/0001_init.sql   the only migration you need to run
  seed.sql                   optional sample event + basket
proxy.ts                     refreshes Supabase sessions on every request
```

---

## Brand

- **Logo**: `/public/mai-logo.png` — white "MA" monogram with a woman's profile, on black.
- **Palette**: ivory `#f6f1e8`, ink `#0b0b0c`, wine `#6b1a2a`, gold `#b8945a`.
- **Type**: Cormorant Garamond (display) + Inter (body).
- **Motto**: *Dal cuore d'Italia, alla tua tavola* — from the heart of Italy, to your table.
