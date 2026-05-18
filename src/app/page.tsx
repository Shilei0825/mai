import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Container, Eyebrow, Hairline } from "@/components/ui";
import { getUpcomingEvents } from "@/lib/data";
import { formatEventDate, formatEventTime, formatPrice } from "@/lib/utils";

export default async function Home() {
  const events = await getUpcomingEvents(3);

  return (
    <>
      {/* HERO ----------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-ink text-ivory">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, #6b1a2a 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #b8945a 0%, transparent 50%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#0b0b0c_85%)]" />
        </div>

        <Container className="py-28 md:py-40 lg:py-48 text-center">
          <div className="flex justify-center mb-10">
            <Image
              src="/mai-logo.png"
              alt="Mai"
              width={120}
              height={120}
              priority
              className="drop-shadow-lg"
            />
          </div>
          <Eyebrow className="text-gold-soft">An Italian Table</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] max-w-4xl mx-auto">
            Tastings of <em className="text-gold-soft">authentic</em> Italy —
            and a basket to take home.
          </h1>
          <p className="mt-8 max-w-xl mx-auto text-ivory/70 text-lg leading-relaxed">
            Mai hosts intimate evenings of wine, chocolate, and food, each
            paired with a curated basket of ten authentic Italian goods. Every
            event is different. Every table is one long table.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/events" variant="wine" size="lg">
              Upcoming events
            </ButtonLink>
            <ButtonLink href="/baskets" variant="secondary" size="lg" className="border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink">
              Browse baskets
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* BRAND STORY ---------------------------------------------------- */}
      <section className="py-28">
        <Container>
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 md:col-start-1">
              <Eyebrow>Our philosophy</Eyebrow>
              <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[1.05]">
                A small room.<br />
                A long table.<br />
                <em className="text-wine">Italy, honestly.</em>
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 space-y-5 text-muted text-lg leading-relaxed">
              <p>
                We source from small Italian producers — a vineyard family in
                the Langhe, a cheesemaker in the Madonie, a chocolatier who
                stones their gianduja by hand.
              </p>
              <p>
                Each event is a single seating, no more than sixteen guests.
                You taste, you talk, and you leave with the same basket of
                ten goods we just walked through together. Simple, honest, and
                quietly indulgent.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Hairline />

      {/* UPCOMING EVENTS ------------------------------------------------- */}
      <section className="py-20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <Eyebrow>Upcoming</Eyebrow>
              <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05]">
                Reserve your seat.
              </h2>
            </div>
            <Link
              href="/events"
              className="text-[12px] uppercase tracking-[0.22em] text-wine hover:text-wine-deep self-start md:self-end"
            >
              See all events →
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="border border-line py-20 text-center bg-cream">
              <p className="text-muted">
                The next evening is being prepared. Check back soon, or{" "}
                <Link href="/signup" className="text-wine underline">
                  reserve a place
                </Link>{" "}
                for first notice.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((e) => (
                <Link
                  key={e.id}
                  href={`/events/${e.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-ivory-2">
                    {e.hero_image_url ? (
                      <Image
                        src={e.hero_image_url}
                        alt={e.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-ink/90 flex items-center justify-center">
                        <Image
                          src="/mai-logo.png"
                          alt=""
                          width={80}
                          height={80}
                          className="opacity-70"
                        />
                      </div>
                    )}
                    {e.status === "sold_out" && (
                      <span className="absolute top-4 left-4 bg-ivory text-ink px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                        Sold out
                      </span>
                    )}
                  </div>
                  <div className="mt-6 space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                      {formatEventDate(e.starts_at)} ·{" "}
                      {formatEventTime(e.starts_at)}
                    </p>
                    <h3 className="font-display text-3xl leading-tight group-hover:text-wine transition-colors">
                      {e.title}
                    </h3>
                    {e.tagline && (
                      <p className="text-muted leading-relaxed">{e.tagline}</p>
                    )}
                    <p className="pt-2 text-sm">
                      {formatPrice(e.ticket_price_cents)}{" "}
                      <span className="text-muted">/ seat</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* THE BASKET ------------------------------------------------------ */}
      <section className="py-28 bg-ink text-ivory mt-20">
        <Container>
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6">
              <Eyebrow className="text-gold-soft">The Basket</Eyebrow>
              <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[1.05]">
                Ten goods from the table — yours to take home.
              </h2>
              <p className="mt-7 text-ivory/75 text-lg leading-relaxed max-w-lg">
                Every event has a matching basket: the same ten items every
                guest tasted that evening, packed for you to share at home.
                Buy alongside your seat, or order without attending while
                supplies last.
              </p>
              <div className="mt-10">
                <ButtonLink href="/baskets" variant="wine" size="lg">
                  Explore baskets
                </ButtonLink>
              </div>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <ul className="space-y-3 text-ivory/80">
                {[
                  "Estate-bottled Italian wines",
                  "Single-origin Piedmont chocolate",
                  "Aged regional cheeses",
                  "Cold-pressed olive oils",
                  "Hand-toasted hazelnuts",
                  "Floral monoflora honey",
                  "Traditional Amaretti",
                  "Saba — cooked grape must",
                  "Small-batch digestifs",
                  "And one quiet surprise.",
                ].map((line, i) => (
                  <li
                    key={i}
                    className="flex gap-4 border-b border-ivory/10 pb-3"
                  >
                    <span className="font-display text-gold-soft tabular-nums w-7">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
