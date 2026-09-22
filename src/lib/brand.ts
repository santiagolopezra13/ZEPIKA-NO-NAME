/**
 * Configuración de marca. Cambiar el nombre aquí lo cambia en todo el sitio.
 */
export const brand = {
  name: "Casalta",
  legalName: "Casalta Regalos S.A.P.I. de C.V.",
  tagline: "La mesa de regalos que sí se siente suya.",
  claim: "Digital, sin comisiones y con todo en un solo lugar.",
  whatsapp: "+52 55 0000 0000",
  whatsappUrl: "https://wa.me/525500000000",
  email: "hola@casalta.mx",
  city: "Ciudad de México",
  instagram: "https://instagram.com",
  currency: "MXN",
} as const;

export const nav = [
  { href: "/colecciones", label: "Colecciones" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/planes", label: "Planes" },
  { href: "/buscar-mesa", label: "Buscar una mesa" },
] as const;

export const mxn = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
