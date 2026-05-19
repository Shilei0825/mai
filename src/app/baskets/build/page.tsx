import { Container, Eyebrow, Hairline } from "@/components/ui";
import { BasketBuilder } from "@/components/basket-builder";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Build your own basket",
  description:
    "Pick your own selection of Italian wines, pasta, sauces, cheeses, oils and chocolate.",
};

export default async function BuildBasketPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <section className="pt-20 pb-10">
        <Container className="text-center max-w-3xl">
          <Eyebrow>Build your own basket</Eyebrow>
          <h1 className="mt-5 font-display text-5xl md:text-6xl leading-[1.05]">
            Pick what you love.
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed">
            Choose any combination of the nine goods from our tasting table.
            Pick all nine and save — that&apos;s the curated bundle, at the same
            price as the basket included with an event ticket.
          </p>
        </Container>
      </section>

      <Hairline />

      <section className="pb-24">
        <Container>
          <BasketBuilder signedIn={Boolean(user)} />
        </Container>
      </section>
    </>
  );
}
