/**
 * Configuración de marca LÖGUE.
 * El nombre, el dominio y el contacto viven solo aquí.
 *
 * Los colores del logotipo están en src/app/globals.css (@theme):
 *   forest #2E4239 · sage #7A8467 · sand #C8B598 · mist #96A8B4
 */
export const brand = {
  name: "LÖGUE",
  /** Con capitalización normal, para textos corridos. */
  nameProse: "Lögue",
  legalName: "Lögue Regalos S.A.P.I. de C.V.",
  domain: "logue.mx",
  tagline: "La mesa de regalos que sí se siente suya.",
  claim: "Digital, sin comisiones y con todo en un solo lugar.",
  whatsapp: "+52 55 0000 0000",
  whatsappUrl: "https://wa.me/525500000000",
  email: "hola@logue.mx",
  city: "Ciudad de México",
  instagram: "https://instagram.com",
  currency: "MXN",
} as const;

/** Las cinco letras del logotipo con su color. Ver components/wordmark.tsx */
export type WordmarkLetter = {
  char: string;
  color: string;
  /** La Ö lleva los dos puntos en arena y azul. */
  diaeresis?: boolean;
};

export const wordmarkLetters: WordmarkLetter[] = [
  { char: "L", color: "text-forest" },
  { char: "O", color: "text-sage", diaeresis: true },
  { char: "G", color: "text-sand" },
  { char: "U", color: "text-mist" },
  { char: "E", color: "text-sage" },
];

export const nav = [
  { href: "/colecciones", label: "Colecciones" },
  { href: "/planes", label: "Planes" },
  { href: "/buscar-mesa", label: "Buscar una mesa" },
] as const;

export const mxn = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
