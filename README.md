# Mai

Authentic Italian tastings & curated baskets — a Next.js 16 + Supabase + Stripe site.

```
              Mai
   Dal cuore d'Italia, alla tua tavola.
```

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Stripe keys
npm run dev
```

Open http://localhost:3000.

For the full setup walk-through (Supabase project, schema, auth providers, Stripe webhook, Vercel), see **[SETUP.md](./SETUP.md)**.

## Stack

- **Next.js 16** (App Router, Turbopack, async params/cookies)
- **Supabase** — Postgres + auth (email, Google, Apple OAuth) + RLS
- **Stripe** — Checkout Sessions for events and baskets, webhook updates order status
- **Tailwind v4** — custom palette + Cormorant Garamond + Inter type
- **Deployed on Vercel**

## What's inside

- Public site: home, events (list + detail), baskets (list + detail), about, contact
- Auth: email + Google + Apple sign-in
- Customer account: order history, ticket status
- Admin portal: events CRUD, baskets CRUD with item list, orders queue
- Stripe Checkout for both tickets and baskets (pickup or shipping)
