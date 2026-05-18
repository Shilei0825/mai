import { cn } from "@/lib/utils";

export function ItalianMarquee({
  phrases,
  className,
}: {
  phrases?: string[];
  className?: string;
}) {
  const list =
    phrases && phrases.length > 0
      ? phrases
      : [
          "Benvenuti a Mai",
          "Una serata speciale",
          "Il vino, il pane, l'amicizia",
          "Mangia, bevi, sii felice",
          "Dal cuore d'Italia",
          "L'arte del convivio",
          "Piccoli produttori, grandi storie",
          "La dolce vita",
          "A tavola!",
          "Buon appetito",
        ];
  // Duplicate for seamless loop.
  const doubled = [...list, ...list];
  return (
    <div className={cn("overflow-hidden border-y border-line", className)}>
      <div className="marquee py-8">
        {doubled.map((p, i) => (
          <span
            key={i}
            className="flex items-center px-10 font-display text-3xl md:text-5xl whitespace-nowrap"
          >
            <span className="italic">{p}</span>
            <span className="mx-10 text-gold text-2xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
