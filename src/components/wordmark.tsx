import { wordmarkLetters } from "@/lib/brand";

/**
 * Logotipo LÖGUE reconstruido en texto: cada letra con su color y la diéresis
 * de dos puntos — uno arena, uno azul — como en el original.
 *
 * Va en texto y no en imagen para que escale, herede la tipografía display
 * y se lea bien en cualquier tamaño. `tone` lo pasa a un solo color para
 * fondos oscuros, donde la versión policromática pierde contraste.
 */
export default function Wordmark({
  className = "",
  tone = "color",
}: {
  className?: string;
  tone?: "color" | "cream";
}) {
  const mono = tone === "cream";

  return (
    <span
      className={`display inline-flex items-baseline leading-none tracking-[0.01em] ${className}`}
      aria-label="LÖGUE"
      role="img"
    >
      {wordmarkLetters.map((l, i) =>
        l.diaeresis ? (
          <span key={i} className="relative inline-block">
            <span className={mono ? "text-cream" : l.color}>{l.char}</span>
            {/* Los dos puntos de la diéresis, en arena y azul */}
            <span
              aria-hidden
              className="absolute -top-[0.30em] left-1/2 flex -translate-x-1/2 gap-[0.075em]"
            >
              <span
                className={`block h-[0.11em] w-[0.11em] rounded-full ${
                  mono ? "bg-cream" : "bg-sand"
                }`}
              />
              <span
                className={`block h-[0.11em] w-[0.11em] rounded-full ${
                  mono ? "bg-cream" : "bg-mist"
                }`}
              />
            </span>
          </span>
        ) : (
          <span key={i} className={mono ? "text-cream" : l.color}>
            {l.char}
          </span>
        ),
      )}
    </span>
  );
}
