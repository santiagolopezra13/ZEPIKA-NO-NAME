import Image from "next/image";

/**
 * Logotipo LÖGUE — el archivo original, no una reconstrucción.
 *
 * Antes se rehacía con tipografía web (Cormorant Garamond) y se veía débil:
 * el logotipo real tiene trazos gruesos y mucho contraste, y las serifas y
 * la diéresis de guijarros no se pueden imitar con una fuente. Ahora se usa
 * el PNG recortado a la caja de la tinta.
 *
 * `tone="cream"` sirve para los fondos oscuros: mismo trazo, tinta en crema,
 * porque el verde bosque de la "L" desaparecería sobre el pie de página.
 */

/**
 * El archivo recortado mide 1291 × 349. Aquí se declara a 4× del tamaño en
 * que realmente se muestra (~28 px de alto), no a su tamaño nativo: así
 * next/image sirve unos pocos kilobytes en vez de pedir 3840 px de ancho
 * para un logotipo de cien.
 */
const W = 414;
const H = 112;

export default function Wordmark({
  className = "h-7",
  tone = "color",
  priority = false,
}: {
  /** Controla la altura (h-6, h-7, …); el ancho se calcula solo. */
  className?: string;
  tone?: "color" | "cream";
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "cream" ? "/marca/logue-cream.png" : "/marca/logue.png"}
      alt="LÖGUE"
      width={W}
      height={H}
      priority={priority}
      className={`w-auto select-none transition-transform duration-500 ease-out ${className}`}
    />
  );
}
