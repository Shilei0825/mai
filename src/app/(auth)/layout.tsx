import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-ink relative items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, #6b1a2a 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #b8945a 0%, transparent 50%)",
          }}
        />
        <div className="relative text-center text-ivory">
          <Image
            src="/mai-logo.png"
            alt="Mai"
            width={120}
            height={120}
            className="mx-auto"
          />
          <p className="font-display text-4xl mt-6">Mai</p>
          <p className="text-ivory/60 text-sm mt-3 max-w-xs mx-auto italic font-display text-lg">
            Dal cuore d&apos;Italia, alla tua tavola.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {children}
          <p className="mt-10 text-center text-xs text-muted">
            By continuing you agree to our{" "}
            <Link href="/about" className="underline">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/about" className="underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
