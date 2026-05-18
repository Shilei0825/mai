import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { BlurIn, FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { TicketPurchase } from "@/components/ticket-purchase";
import { BasketPurchase } from "@/components/basket-purchase";
import { getBasketForEvent, getEventBySlug } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import {
  formatEventDateIt,
  formatEventTime,
  formatPrice,
  toRoman,
} from "@/lib/utils";

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
      {/* Cinematic editorial hero */}
      <section className="relative h-[100svh] min-h-[760px] max-h-[1100px] w-full overflow-hidden bg-ink text-ivory">
        <div className="absolute inset-0">
          {event.hero_image_url ? (
            <Image
              src={event.hero_image_url}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover photo-warm kenburns"
            />
          ) : (
            <div className="h-full w-full bg-ink" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.4)_0%,rgba(11,11,12,0.25)_45%,rgba(11,11,12,0.85)_100%)]" />
        </div>

        <div className="hero-entry-1 absolute top-24 md:top-28 left-6 md:left-12 text-[10px] uppercase tracking-[0.42em] text-ivory/60">
          <Link href="/events" className="hover:text-ivory">
            ← Tutti gli eventi
          </Link>
        </div>
        <div className="hero-entry-1 absolute top-24 md:top-28 right-6 md:right-12 text-[10px] uppercase tracking-[0.42em] text-ivory/60 text-right">
          {formatEventDateIt(event.starts_at)}
        </div>

        <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-20 md:pb-28 max-w-[1600px] mx-auto w-full">
          <p className="hero-entry-2 text-[11px] uppercase tracking-[0.42em] text-gold-soft mb-8">
            La prossima serata · Upcoming
          </p>
          <h1 className="hero-entry-3 font-display font-light leading-[0.9] tracking-[-0.025em] text-[clamp(3rem,10vw,10rem)] max-w-[14ch]">
            {event.title}
          </h1>
          {event.tagline && (
            <p className="hero-entry-4 mt-8 font-display italic text-2xl md:text-3xl text-ivory/85 max-w-2xl leading-snug">
              {event.tagline}
            </p>
          )}
          <div className="hero-entry-5 mt-12 flex flex-wrap items-baseline gap-x-12 gap-y-4 text-sm text-ivory/70">
            {event.venue && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-gold-soft mb-1">
                  Luogo
                </p>
                <p className="font-display text-lg">{event.venue}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-gold-soft mb-1">
                Ora
              </p>
              <p className="font-display text-lg">
                {formatEventTime(event.starts_at)}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-gold-soft mb-1">
                Posti
              </p>
              <p className="font-display text-lg">
                {seatsLeft && seatsLeft > 0
                  ? `${seatsLeft} / ${event.capacity}`
                  : "Tutto esaurito"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-gold-soft mb-1">
                Prezzo
              </p>
              <p className="font-display text-lg">
                {formatPrice(event.ticket_price_cents)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Body — editorial split */}
      <section className="py-32 md:py-40 px-6 md:px-12">
        <Container className="!px-0">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7 space-y-12">
              <BlurIn>
                <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-8">
                  §01 · La serata
                </p>
                <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2rem,4vw,3.5rem)] max-w-[18ch]">
                  What we&apos;ll taste{" "}
                  <em className="italic text-wine">together.</em>
                </h2>
              </BlurIn>
              <FadeIn>
                {event.description ? (
                  <p className="dropcap text-[18px] leading-[1.85] text-ink/85 whitespace-pre-line">
                    {event.description}
                  </p>
                ) : (
                  <p className="text-muted italic">
                    Details will be shared closer to the date.
                  </p>
                )}
              </FadeIn>

              {basket && basket.items.length > 0 && (
                <div className="pt-16">
                  <BlurIn>
                    <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-8">
                      §02 · Il cesto della serata
                    </p>
                    <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2rem,4vw,3.5rem)] max-w-[18ch]">
                      {basket.name}
                    </h2>
                    {basket.description && (
                      <p className="mt-5 text-ink/65 leading-relaxed text-lg max-w-xl">
                        {basket.description}
                      </p>
                    )}
                  </BlurIn>
                  <Stagger className="mt-10 grid sm:grid-cols-2 gap-x-10" step={0.05}>
                    {basket.items.map((it, i) => (
                      <StaggerItem
                        key={it.id}
                        className="border-b border-line-soft py-5 flex gap-5"
                      >
                        <span className="font-display italic text-gold tabular-nums w-8 text-xl">
                          {toRoman(i + 1)}
                        </span>
                        <div>
                          <p className="font-display text-xl tracking-tight">
                            {it.name}
                          </p>
                          {it.description && (
                            <p className="text-sm text-muted leading-snug mt-1">
                              {it.description}
                            </p>
                          )}
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              )}
            </div>

            {/* Purchase rail */}
            <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 lg:self-start">
              <FadeIn>
                <div className="bg-cream border border-line p-8">
                  <p className="text-[10px] uppercase tracking-[0.42em] text-gold mb-3">
                    Riserva un posto
                  </p>
                  <p className="font-display text-5xl tracking-tight">
                    {formatPrice(event.ticket_price_cents)}
                    <span className="text-base text-muted ml-2">/ posto</span>
                  </p>
                  <div className="mt-6">
                    <TicketPurchase event={event} signedIn={!!user} />
                  </div>
                </div>
              </FadeIn>

              {basket && (
                <FadeIn delay={0.1}>
                  <div className="bg-ink text-ivory p-8">
                    <p className="text-[10px] uppercase tracking-[0.42em] text-gold-soft mb-3">
                      Porta il cesto a casa
                    </p>
                    <p className="font-display text-4xl tracking-tight">
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
                </FadeIn>
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
    </>
  );
}
