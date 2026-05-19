import Image from "next/image";
import { ButtonLink, Container, Eyebrow, Hairline } from "@/components/ui";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="pt-24 pb-12">
        <Container className="max-w-3xl text-center">
          <Eyebrow>Our story</Eyebrow>
          <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[1.02]">
            Mai is a name and a quiet promise.
          </h1>
        </Container>
      </section>

      <Hairline />

      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] bg-ink overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/mai-logo.png"
                    alt="Mai"
                    width={320}
                    height={338}
                    className="opacity-95"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6 text-ink/85 text-lg leading-relaxed">
              <p>
                We started Mai because the Italy we grew up with — the long
                Sunday lunches, the small producers, the bottle someone&apos;s
                grandfather buried in the cellar — felt very far away from how
                Italian food is sold around us.
              </p>
              <p>
                So we built something small. A long table. A short list of
                guests. Five or six pours, a few cheeses, a square of
                chocolate. We tell you where every bottle came from and who
                made it.
              </p>
              <p>
                And before you leave, we hand you a basket of the ten goods we
                walked through together — so the evening keeps going at your
                kitchen counter, with the people who weren&apos;t at the
                table.
              </p>
              <p className="font-display text-2xl italic text-wine pt-4">
                Dal cuore d&apos;Italia, alla tua tavola.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Hairline />

      <section className="py-20">
        <Container className="max-w-2xl text-center">
          <h2 className="font-display text-4xl">Come sit at the table.</h2>
          <div className="mt-8">
            <ButtonLink href="/events" variant="wine" size="lg">
              See upcoming events
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
