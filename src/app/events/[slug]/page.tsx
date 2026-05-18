import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Hairline,
} from "@/components/ui";
import { TicketPurchase } from "@/components/ticket-purchase";
import { BasketPurchase } from "@/components/basket-purchase";
import { getBasketForEvent, getEventBySlug } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.tagline ?? undefined,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const [basket, user] = await Promise.all([
    getBasketForEvent(event.id),
    getCurrentUser(),
  ]);

  const seatsLeft =
    event.capacity != null ? event.capacity - event.tickets_sold : null;

  return (
    <>
      {/* HERO ------------------------------------------------------------ */}
      <section className="relative bg-ink text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          {event.hero_image_url && (
            <Image
              src={event.hero_image_url}
              alt=""
              fill
              priority
              className="object-cover"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
        <Container className="relative py-28 md:py-40">
          <Link
            href="/events"
            className="text-[11px] uppercase tracking-[0.22em] text-ivory/60 hover:text-ivory"
          >
            ← All events
          </Link>
          <p className="mt-8 text-[11px] uppercase tracking-[0.32em] text-gold-soft">
            {formatEventDate(event.starts_at)} ·{" "}
            {formatEventTime(event.starts_at)}
          </p>
          <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl">
            {event.title}
          </h1>
          {event.tagline && (
            <p className="mt-6 max-w-xl text-ivory/80 text-lg leading-relaxed">
              {event.tagline}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-ivory/70">
            {event.venue && (
              <span>
                <span className="text-gold-soft uppercase tracking-[0.22em] text-[11px] mr-2">
                  Venue
                </span>
                {event.venue}
              </span>
            )}
            {event.capacity != null && (
              <span>
                <span className="text-gold-soft uppercase tracking-[0.22em] text-[11px] mr-2">
                  Seats
                </span>
                {seatsLeft && seatsLeft > 0
                  ? `${seatsLeft} of ${event.capacity} remaining`
                  : "Sold out"}
              </span>
            )}
          </div>
        </Container>
      </section>

      {/* BODY ------------------------------------------------------------ */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-5">
                <Eyebrow>The evening</Eyebrow>
                <div className="text-lg leading-relaxed text-ink/85 space-y-5 whitespace-pre-line">
                  {event.description ?? (
                    <p className="text-muted italic">
                      Details will be shared closer to the date.
                    </p>
                  )}
                </div>
              </div>

              {basket && basket.items.length > 0 && (
                <div className="pt-8">
                  <Eyebrow>The basket of the night</Eyebrow>
                  <h2 className="mt-4 font-display text-3xl md:text-4xl leading-tight">
                    {basket.name}
                  </h2>
                  {basket.description && (
                    <p className="mt-3 text-muted leading-relaxed">
                      {basket.description}
                    </p>
                  )}
                  <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-ink/85">
                    {basket.items.map((it, i) => (
                      <li
                        key={it.id}
                        className="flex gap-4 border-b border-line-soft py-3"
                      >
                        <span className="font-display text-gold tabular-nums w-7">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-medium">{it.name}</p>
                          {it.description && (
                            <p className="text-sm text-muted leading-snug">
                              {it.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* PURCHASE SIDEBAR ----------------------------------------- */}
            <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="bg-cream border border-line p-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                  Reserve a seat
                </p>
                <p className="mt-3 font-display text-5xl">
                  {formatPrice(event.ticket_price_cents)}
                  <span className="text-base text-muted ml-2">/ seat</span>
                </p>
                <div className="mt-6">
                  <TicketPurchase event={event} signedIn={!!user} />
                </div>
              </div>

              {basket && (
                <div className="bg-ink text-ivory p-8">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gold-soft">
                    Take the basket home
                  </p>
                  <p className="mt-3 font-display text-4xl">
                    {formatPrice(basket.price_cents)}
                  </p>
                  <p className="mt-1 text-sm text-ivory/60">
                    {basket.fulfillment_shipping &&
                      `${formatPrice(basket.shipping_cents)} shipping · `}
                    {basket.fulfillment_pickup
                      ? "or pickup at the event"
                      : "shipping only"}
                  </p>
                  <div className="mt-6">
                    <BasketPurchase basket={basket} signedIn={!!user} />
                  </div>
                </div>
              )}

              {!user && (
                <p className="text-xs text-muted text-center">
                  You&apos;ll be prompted to{" "}
                  <Link href="/login" className="text-wine underline">
                    sign in
                  </Link>{" "}
                  before payment.
                </p>
              )}
            </aside>
          </div>
        </Container>
      </section>

      <Hairline />

      <section className="py-16">
        <Container className="text-center max-w-2xl">
          <Eyebrow>More to come</Eyebrow>
          <h2 className="mt-4 font-display text-4xl">
            Other evenings at Mai.
          </h2>
          <p className="mt-5 text-muted">
            Browse the rest of the season.
          </p>
          <div className="mt-8">
            <ButtonLink href="/events" variant="secondary">
              See all events
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
