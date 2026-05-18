import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Hairline } from "@/components/ui";
import { BasketPurchase } from "@/components/basket-purchase";
import { getBasketById } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import { formatEventDate, formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

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
  const user = await getCurrentUser();

  return (
    <>
      <section className="py-20">
        <Container>
          <Link
            href="/baskets"
            className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-wine"
          >
            ← All baskets
          </Link>
          <div className="grid lg:grid-cols-12 gap-16 mt-10">
            <div className="lg:col-span-6">
              <div className="relative aspect-square overflow-hidden bg-ivory-2">
                {basket.image_url ? (
                  <Image
                    src={basket.image_url}
                    alt={basket.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : basket.event?.hero_image_url ? (
                  <Image
                    src={basket.event.hero_image_url}
                    alt={basket.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover opacity-95"
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
                  Paired with {basket.event.title} ·{" "}
                  {formatEventDate(basket.event.starts_at)}
                </p>
              )}
              <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05]">
                {basket.name}
              </h1>
              {basket.description && (
                <p className="mt-5 text-muted leading-relaxed text-lg">
                  {basket.description}
                </p>
              )}
              <p className="mt-8 font-display text-4xl">
                {formatPrice(basket.price_cents)}
              </p>
              <p className="text-sm text-muted">
                {basket.fulfillment_shipping &&
                  `${formatPrice(basket.shipping_cents)} shipping`}
                {basket.fulfillment_shipping &&
                  basket.fulfillment_pickup &&
                  " · "}
                {basket.fulfillment_pickup && "or pickup at the event"}
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
            <Eyebrow>What&apos;s inside</Eyebrow>
            <h2 className="mt-4 font-display text-4xl">
              Ten goods from {basket.event?.title ?? "the table"}.
            </h2>
          </div>
          {basket.items.length === 0 ? (
            <p className="mt-10 text-center text-muted">
              The basket contents are being finalized.
            </p>
          ) : (
            <ul className="mt-12 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-12 gap-y-4">
              {basket.items.map((it, i) => (
                <li
                  key={it.id}
                  className="flex gap-5 border-b border-line-soft py-5"
                >
                  <span className="font-display text-2xl text-gold tabular-nums w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-medium">{it.name}</p>
                    {it.description && (
                      <p className="text-sm text-muted leading-snug mt-1">
                        {it.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
