import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow, Hairline } from "@/components/ui";
import { getAllBaskets } from "@/lib/data";
import {
  formatDateLocalized,
  getDictionary,
  getLocale,
  pickLocalized,
} from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Italian Baskets" };

export default async function BasketsPage() {
  const [baskets, t, locale] = await Promise.all([
    getAllBaskets(),
    getDictionary(),
    getLocale(),
  ]);
  const live = baskets.filter(
    (b) =>
      b.event &&
      (b.event.status === "published" || b.event.status === "sold_out"),
  );

  return (
    <>
      <section className="pt-20 pb-12">
        <Container className="text-center max-w-3xl">
          <Eyebrow>{t.basketsList.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-display text-5xl md:text-6xl leading-[1.05]">
            {t.basketsList.title}
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed">
            {t.basketsList.blurb}
          </p>
        </Container>
      </section>

      <Hairline />

      <section className="py-16">
        <Container>
          {live.length === 0 ? (
            <div className="border border-line py-20 text-center bg-cream max-w-2xl mx-auto">
              <p className="text-muted">{t.basketsList.empty}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {live.map((b) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const bAny = b as any;
                const name = pickLocalized(b.name, bAny.name_it, locale);
                const description = pickLocalized(
                  b.description,
                  bAny.description_it,
                  locale,
                );
                const eventTitle = pickLocalized(
                  b.event?.title,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (b.event as any)?.title_it,
                  locale,
                );
                return (
                  <Link
                    key={b.id}
                    href={`/baskets/${b.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-square overflow-hidden bg-ivory-2">
                      {b.image_url ? (
                        <Image
                          src={b.image_url}
                          alt={name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 photo-warm"
                        />
                      ) : b.event?.hero_image_url ? (
                        <Image
                          src={b.event.hero_image_url}
                          alt={name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 photo-warm"
                        />
                      ) : (
                        <div className="h-full w-full bg-ink flex items-center justify-center">
                          <Image
                            src="/mai-logo.png"
                            alt=""
                            width={80}
                            height={80}
                            className="opacity-70"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-6 space-y-2">
                      {b.event && (
                        <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                          {t.basketsList.forEvent(
                            eventTitle || "",
                            formatDateLocalized(b.event.starts_at, locale),
                          )}
                        </p>
                      )}
                      <h3 className="font-display text-3xl leading-tight group-hover:text-wine transition-colors">
                        {name}
                      </h3>
                      {description && (
                        <p className="text-muted leading-relaxed line-clamp-2">
                          {description}
                        </p>
                      )}
                      <p className="pt-2 font-display text-xl">
                        {formatPrice(b.price_cents)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
