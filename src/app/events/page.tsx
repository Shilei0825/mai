import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow, Hairline } from "@/components/ui";
import { getUpcomingEvents } from "@/lib/data";
import {
  formatDateLocalized,
  getDictionary,
  getLocale,
  pickLocalized,
} from "@/lib/i18n";
import { formatEventTime, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = { title: "Upcoming Events" };

export default async function EventsPage() {
  const [events, t, locale] = await Promise.all([
    getUpcomingEvents(24),
    getDictionary(),
    getLocale(),
  ]);

  return (
    <>
      <section className="pt-20 pb-12">
        <Container className="text-center max-w-3xl">
          <Eyebrow>{t.events.pageEyebrow}</Eyebrow>
          <h1 className="mt-5 font-display text-5xl md:text-6xl leading-[1.05]">
            {t.events.pageTitle}
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed">
            {t.events.pageBlurb}
          </p>
        </Container>
      </section>

      <Hairline />

      <section className="py-16">
        <Container>
          {events.length === 0 ? (
            <div className="border border-line py-20 text-center bg-cream max-w-2xl mx-auto">
              <p className="text-muted">{t.events.emptyMessage}</p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {events.map((e) => {
                const title = pickLocalized(
                  e.title,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (e as any).title_it,
                  locale,
                );
                const tagline = pickLocalized(
                  e.tagline,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (e as any).tagline_it,
                  locale,
                );
                const venue = pickLocalized(
                  e.venue,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (e as any).venue_it,
                  locale,
                );
                return (
                  <li key={e.id}>
                    <Link
                      href={`/events/${e.slug}`}
                      className="block py-10 group"
                    >
                      <div className="grid md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-4">
                          <div className="relative aspect-[4/3] overflow-hidden bg-ivory-2">
                            {e.hero_image_url ? (
                              <Image
                                src={e.hero_image_url}
                                alt={title}
                                fill
                                sizes="(min-width: 768px) 33vw, 100vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105 photo-warm"
                              />
                            ) : (
                              <div className="h-full w-full bg-ink/90 flex items-center justify-center">
                                <Image
                                  src="/mai-logo.png"
                                  alt=""
                                  width={64}
                                  height={64}
                                  className="opacity-70"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-6 space-y-3">
                          <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                            {formatDateLocalized(e.starts_at, locale)} ·{" "}
                            {formatEventTime(e.starts_at)}
                            {venue && <> · {venue}</>}
                          </p>
                          <h2 className="font-display text-3xl md:text-4xl leading-tight group-hover:text-wine transition-colors">
                            {title}
                          </h2>
                          {tagline && (
                            <p className="text-muted leading-relaxed">
                              {tagline}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2 md:text-right space-y-1">
                          <p className="font-display text-2xl">
                            {formatPrice(e.ticket_price_cents)}
                          </p>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                            {t.events.perSeat}
                          </p>
                          {e.status === "sold_out" && (
                            <p className="text-[11px] uppercase tracking-[0.22em] text-wine pt-2">
                              {t.upcoming.soldOut}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
