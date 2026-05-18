import Image from "next/image";
import Link from "next/link";
import { BlurIn, Stagger, StaggerItem } from "@/components/animations";
import {
  formatEventDateIt,
  formatEventTime,
  formatPrice,
  toRoman,
} from "@/lib/utils";
import type { Event } from "@/lib/types";

export function Upcoming({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return (
      <section className="py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.42em] text-muted">
            §03 · Prossimi eventi
          </p>
          <h2 className="mt-10 font-display text-5xl md:text-6xl">
            The next evening is being prepared.
          </h2>
          <Link
            href="/signup"
            className="mt-10 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-wine"
          >
            <span>Reserve a place for first notice</span>
            <span className="block h-px w-10 bg-current transition-all duration-700 hover:w-20" />
          </Link>
        </div>
      </section>
    );
  }

  const [headline, ...rest] = events;

  return (
    <section className="py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-20 md:mb-28">
          <BlurIn>
            <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-10">
              §03 · Prossimi eventi
            </p>
            <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)]">
              The calendar.
              <br />
              <em className="italic text-wine">A seat at the table.</em>
            </h2>
          </BlurIn>
          <Link
            href="/events"
            className="group hidden md:inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-ink hover:text-wine transition-colors"
          >
            <span>Vedi tutto</span>
            <span className="block h-px w-8 bg-current transition-all duration-700 group-hover:w-16" />
          </Link>
        </div>

        {/* Headline event — magazine cover treatment */}
        <Link href={`/events/${headline.slug}`} className="group block mb-24">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden bg-ivory-2 grain">
                {headline.hero_image_url ? (
                  <Image
                    src={headline.hero_image_url}
                    alt={headline.title}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 photo-warm"
                  />
                ) : (
                  <div className="h-full w-full bg-ink" />
                )}
              </div>
            </div>
            <div className="lg:col-span-5 lg:pl-8">
              <p className="text-[10px] uppercase tracking-[0.42em] text-gold tabular-nums">
                {toRoman(1)} · La prossima serata
              </p>
              <h3 className="mt-5 font-display font-light text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em] group-hover:text-wine transition-colors duration-700">
                {headline.title}
              </h3>
              {headline.tagline && (
                <p className="mt-6 font-display italic text-2xl text-muted leading-snug">
                  {headline.tagline}
                </p>
              )}
              <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                    Data
                  </p>
                  <p className="mt-1 font-display text-lg">
                    {formatEventDateIt(headline.starts_at)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                    Ora
                  </p>
                  <p className="mt-1 font-display text-lg">
                    {formatEventTime(headline.starts_at)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                    Posto
                  </p>
                  <p className="mt-1 font-display text-lg">
                    {formatPrice(headline.ticket_price_cents)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Other events */}
        {rest.length > 0 && (
          <Stagger className="grid md:grid-cols-2 gap-x-10 gap-y-20" step={0.15}>
            {rest.map((e, i) => (
              <StaggerItem key={e.id}>
                <Link href={`/events/${e.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ivory-2 grain">
                    {e.hero_image_url ? (
                      <Image
                        src={e.hero_image_url}
                        alt={e.title}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 photo-warm"
                      />
                    ) : (
                      <div className="h-full w-full bg-ink" />
                    )}
                  </div>
                  <div className="mt-6 flex items-baseline justify-between">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-gold tabular-nums">
                      {toRoman(i + 2)}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                      {formatEventDateIt(e.starts_at)}
                    </p>
                  </div>
                  <h3 className="mt-3 font-display font-light text-3xl md:text-4xl leading-[0.95] tracking-tight group-hover:text-wine transition-colors duration-700">
                    {e.title}
                  </h3>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
