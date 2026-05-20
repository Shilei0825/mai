import Image from "next/image";
import { FadeIn } from "@/components/animations";

// Quiet sign-off section showing the full wordmark — gold M monogram
// with "Italian Food · Wine / Tasting & Appreciation" beneath. Sits on
// a calm cream surface so the gold reads clearly.
export function BrandMark() {
  return (
    <section className="bg-cream py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto flex justify-center">
        <FadeIn>
          <Image
            src="/mai-wordmark.png"
            alt="Mai — Italian Food & Wine, Tasting & Appreciation"
            width={420}
            height={460}
            className="opacity-95"
            priority={false}
          />
        </FadeIn>
      </div>
    </section>
  );
}
