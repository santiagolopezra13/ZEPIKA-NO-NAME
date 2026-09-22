import { wordmarkLetters } from "@/lib/brand";

/**
 * Logotipo LÖGUE reconstruido en texto.
 *
 * Los dos puntos de la diéresis no son círculos: en el original son guijarros
 * orgánicos, ligeramente inclinados y de distinto tamaño — uno arena y uno
 * azul. Ahí está el carácter de la marca, así que se replican con
 * border-radius asimétrico en vez de `rounded-full`.
 *
 * `tone="cream"` lo pasa a un solo color para fondos oscuros, donde la
 * versión policromática pierde contraste.
 */
export default function Wordmark({
  className = "",
  tone = "color",
  animate = false,
}: {
  className?: string;
  tone?: "color" | "cream";
  /** Entrada escalonada letra por letra. Solo en la portada. */
  animate?: boolean;
}) {
  const mono = tone === "cream";

  return (
    <span
      className={`wordmark display inline-flex items-baseline leading-none ${className}`}
      aria-label="LÖGUE"
      role="img"
    >
      {wordmarkLetters.map((l, i) => {
        const color = mono ? "text-cream" : l.color;
        const style = animate
          ? { animationDelay: `${i * 70}ms` }
          : undefined;

        if (!l.diaeresis) {
          return (
            <span
              key={i}
              className={`${color} ${animate ? "rise" : ""}`}
              style={style}
            >
              {l.char}
            </span>
          );
        }

        return (
          <span
            key={i}
            className={`relative inline-block ${animate ? "rise" : ""}`}
            style={style}
          >
            <span className={color}>{l.char}</span>
            <span
              aria-hidden
              className="pebbles absolute -top-[0.26em] left-1/2 flex -translate-x-1/2 items-end gap-[0.06em]"
            >
              <span
                className={`pebble pebble-a block h-[0.125em] w-[0.135em] ${
                  mono ? "bg-cream" : "bg-sand"
                }`}
              />
              <span
                className={`pebble pebble-b block h-[0.145em] w-[0.12em] ${
                  mono ? "bg-cream" : "bg-mist"
                }`}
              />
            </span>
          </span>
        );
      })}
    </span>
  );
}
