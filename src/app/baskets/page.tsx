import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow, Hairline } from "@/components/ui";
import { getAllBaskets } from "@/lib/data";
import { formatEventDate, formatPrice } from "@/lib/utils";

export const metadata = { title: "Italian Baskets" };

export default async function BasketsPage() {
  const baskets = await getAllBaskets();
  const live = baskets.filter(
    (b) => b.event && (b.event.status === "published" || b.event.status === "sold_out"),
  );

  return (
    <>
      <section className="pt-20 pb-12">
        <Container className="text-center max-w-3xl">
          <Eyebrow>Curated baskets</Eyebrow>
          <h1 className="mt-5 font-display text-5xl md:text-6xl leading-[1.05]">
            Ten Italian goods, hand-picked for each evening.
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed">
            Every Mai event has its own basket — the same ten items every guest
            tasted that night. Buy alongside your seat, or order to ship while
            supplies last.
          </p>
        </Container>
      </section>

      <Hairline />

      <section className="py-16">
        <Container>
          {live.length === 0 ? (
            <div className="border border-line py-20 text-center bg-cream max-w-2xl mx-auto">
              <p className="text-muted">
                The next basket is being assembled.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {live.map((b) => (
                <Link
                  key={b.id}
                  href={`/baskets/${b.id}`}
                  className="group block"
                >
                  <div className="relative aspect-square overflow-hidden bg-ivory-2">
                    {b.image_url ? (
                      <Image
                        src={b.image_url}
                        alt={b.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : b.event?.hero_image_url ? (
                      <Image
                        src={b.event.hero_image_url}
                        alt={b.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
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
                        For {b.event.title} ·{" "}
                        {formatEventDate(b.event.starts_at)}
                      </p>
                    )}
                    <h3 className="font-display text-3xl leading-tight group-hover:text-wine transition-colors">
                      {b.name}
                    </h3>
                    {b.description && (
                      <p className="text-muted leading-relaxed line-clamp-2">
                        {b.description}
                      </p>
                    )}
                    <p className="pt-2 font-display text-xl">
                      {formatPrice(b.price_cents)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
