import { Container, Eyebrow, Hairline } from "@/components/ui";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <section className="pt-24 pb-12">
        <Container className="max-w-3xl text-center">
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="mt-5 font-display text-5xl md:text-6xl leading-[1.05]">
            Private events, gifting, or a hello.
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed">
            We host private parties for ten or more, can build custom baskets
            for gifting, and read every note.
          </p>
        </Container>
      </section>

      <Hairline />

      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                Email
              </p>
              <p className="mt-3 font-display text-xl">hello@mai.com</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                Private events
              </p>
              <p className="mt-3 font-display text-xl">events@mai.com</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                Press
              </p>
              <p className="mt-3 font-display text-xl">press@mai.com</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
