import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Hairline } from "@/components/ui";
import { BasketPurchase } from "@/components/basket-purchase";
import { getBasketById } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import {
  formatDateLocalized,
  getDictionary,
  getLocale,
  pickLocalized,
} from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const basket = await getBasketById(id);
  if (!basket) return {};
  return {
    title: basket.name,
    description: basket.description ?? undefined,
  };
}

export default async function BasketDetailPage({ params }: Props) {
  const { id } = await params;
  const basket = await getBasketById(id);
  if (!basket) notFound();
  const [user, t, locale] = await Promise.all([
    getCurrentUser(),
    getDictionary(),
    getLocale(),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bAny = basket as any;
  const name = pickLocalized(basket.name, bAny.name_it, locale);
  const description = pickLocalized(
    basket.description,
    bAny.description_it,
    locale,
  );
  const eventTitle = pickLocalized(
    basket.event?.title,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (basket.event as any)?.title_it,
    locale,
  );

  return (
    <>
      <section className="py-20">
        <Container>
          <Link
            href="/baskets"
            className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-wine"
          >
            {t.basketDetail.backToBaskets}
          </Link>
          <div className="grid lg:grid-cols-12 gap-16 mt-10">
            <div className="lg:col-span-6">
              <div className="relative aspect-square overflow-hidden bg-ivory-2">
                {basket.image_url ? (
                  <Image
                    src={basket.image_url}
                    alt={name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover photo-warm"
                  />
                ) : basket.event?.hero_image_url ? (
                  <Image
                    src={basket.event.hero_image_url}
                    alt={name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover opacity-95 photo-warm"
                  />
                ) : (
                  <div className="h-full w-full bg-ink flex items-center justify-center">
                    <Image
                      src="/mai-logo.png"
                      alt=""
                      width={120}
                      height={120}
                      className="opacity-70"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-6">
              {basket.event && (
                <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                  {t.basketDetail.pairedWith(
                    eventTitle || "",
                    formatDateLocalized(basket.event.starts_at, locale),
                  )}
                </p>
              )}
              <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05]">
                {name}
              </h1>
              {description && (
                <p className="mt-5 text-muted leading-relaxed text-lg">
                  {description}
                </p>
              )}
              <p className="mt-8 font-display text-4xl">
                {formatPrice(basket.price_cents)}
              </p>
              <p className="text-sm text-muted">
                {basket.fulfillment_shipping &&
                  `${formatPrice(basket.shipping_cents)} ${t.basketDetail.shipping}`}
                {basket.fulfillment_shipping &&
                  basket.fulfillment_pickup &&
                  " · "}
                {basket.fulfillment_pickup && t.basketDetail.pickup}
              </p>

              <div className="mt-10 bg-cream border border-line p-8">
                <BasketPurchase basket={basket} signedIn={!!user} compact />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Hairline />

      <section className="py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Eyebrow>{t.basketDetail.contentsEyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl">
              {t.basketDetail.contentsTitle(eventTitle || "")}
            </h2>
          </div>
          {basket.items.length === 0 ? (
            <p className="mt-10 text-center text-muted">
              {t.basketDetail.contentsEmpty}
            </p>
          ) : (
            <ul className="mt-12 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-12 gap-y-4">
              {basket.items.map((it, i) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const itAny = it as any;
                const itName = pickLocalized(it.name, itAny.name_it, locale);
                const itDesc = pickLocalized(
                  it.description,
                  itAny.description_it,
                  locale,
                );
                return (
                  <li
                    key={it.id}
                    className="flex gap-5 border-b border-line-soft py-5"
                  >
                    <span className="font-display text-2xl text-gold tabular-nums w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-medium">{itName}</p>
                      {itDesc && (
                        <p className="text-sm text-muted leading-snug mt-1">
                          {itDesc}
                        </p>
                      )}
                    </div>
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
