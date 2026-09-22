import { brand } from "@/lib/brand";
/**
 * Datos de maqueta. Sustituir por CMS / base de datos.
 * Las imágenes son placeholders determinísticos (picsum) — cambiar por fotografía propia.
 */

export const img = (seed: string, w = 900, h = 1100) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  seed: string;
};

export type Collection = {
  slug: string;
  name: string;
  blurb: string;
  description: string;
  seed: string;
  products: Product[];
};

export const collections: Collection[] = [
  {
    slug: "primer-hogar",
    name: "Primer hogar",
    blurb: "Lo esencial para empezar, sin relleno.",
    description:
      "Una mesa completa para quienes se mudan juntos por primera vez: blancos, batería de cocina, vajilla diaria y lo que de verdad se usa el primer año.",
    seed: "logue-hogar",
    products: [
      { id: "ph1", name: "Batería de cocina 10 piezas", brand: "Acero mate", price: 8900, seed: "p-bateria" },
      { id: "ph2", name: "Juego de sábanas algodón 400 hilos", brand: "Lino Casa", price: 3200, seed: "p-sabanas" },
      { id: "ph3", name: "Vajilla 16 piezas gres", brand: "Barro Nuevo", price: 4700, seed: "p-vajilla" },
      { id: "ph4", name: "Cuchillo de chef 20 cm", brand: "Filo", price: 2450, seed: "p-cuchillo" },
      { id: "ph5", name: "Edredón de pluma", brand: "Lino Casa", price: 6800, seed: "p-edredon" },
      { id: "ph6", name: "Set de toallas 6 piezas", brand: "Algodón MX", price: 2100, seed: "p-toallas" },
    ],
  },
  {
    slug: "cocina-de-autor",
    name: "Cocina de autor",
    blurb: "Para quien cocina en serio.",
    description:
      "Hierro fundido, cuchillería, fermentos y café de especialidad. La mesa para las parejas que pasan el domingo entero en la cocina.",
    seed: "logue-cocina",
    products: [
      { id: "ca1", name: "Olla de hierro fundido 5.3 L", brand: "Fundición", price: 11500, seed: "p-olla" },
      { id: "ca2", name: "Molino de café cónico", brand: "Grano", price: 5400, seed: "p-molino" },
      { id: "ca3", name: "Cafetera de goteo V60 + báscula", brand: "Grano", price: 2800, seed: "p-v60" },
      { id: "ca4", name: "Batidora de pedestal", brand: "Mezcla", price: 14900, seed: "p-batidora" },
      { id: "ca5", name: "Tabla de nogal 50 cm", brand: "Taller Sur", price: 3100, seed: "p-tabla" },
      { id: "ca6", name: "Molcajete de piedra volcánica", brand: "Artesanal Oaxaca", price: 1450, seed: "p-molcajete" },
    ],
  },
  {
    slug: "mesa-de-domingo",
    name: "Mesa de domingo",
    blurb: "Para recibir gente en casa.",
    description:
      "Vajilla para doce, cristalería, mantelería de lino y todo lo que hace falta cuando la familia cae sin avisar.",
    seed: "logue-domingo",
    products: [
      { id: "md1", name: "Cristalería vino 6 piezas", brand: "Soplado", price: 2900, seed: "p-copas" },
      { id: "md2", name: "Mantel de lino 3 m", brand: "Lino Casa", price: 2600, seed: "p-mantel" },
      { id: "md3", name: "Charola de latón", brand: "Taller Sur", price: 1900, seed: "p-charola" },
      { id: "md4", name: "Vajilla de servicio 8 piezas", brand: "Barro Nuevo", price: 5600, seed: "p-servicio" },
      { id: "md5", name: "Candeleros de barro (par)", brand: "Artesanal Oaxaca", price: 1250, seed: "p-candeleros" },
      { id: "md6", name: "Cubertería 24 piezas", brand: "Filo", price: 6400, seed: "p-cuberteria" },
    ],
  },
  {
    slug: "luna-de-miel",
    name: "Luna de miel",
    blurb: "Aportaciones en efectivo, por tramos.",
    description:
      "En lugar de un objeto, los invitados aportan a vuelos, hospedaje, cenas y experiencias. Ustedes definen las metas y el monto de cada tramo.",
    seed: "logue-luna",
    products: [
      { id: "lm1", name: "Vuelos ida y vuelta", brand: "Meta en efectivo", price: 38000, seed: "p-vuelos" },
      { id: "lm2", name: "Siete noches frente al mar", brand: "Meta en efectivo", price: 46000, seed: "p-hotel" },
      { id: "lm3", name: "Cena de aniversario", brand: "Meta en efectivo", price: 4500, seed: "p-cena" },
      { id: "lm4", name: "Buceo en arrecife", brand: "Experiencia", price: 6200, seed: "p-buceo" },
      { id: "lm5", name: "Masaje para dos", brand: "Experiencia", price: 3400, seed: "p-spa" },
      { id: "lm6", name: "Renta de auto una semana", brand: "Meta en efectivo", price: 9800, seed: "p-auto" },
    ],
  },
  {
    slug: "terraza-y-jardin",
    name: "Terraza y jardín",
    blurb: "La casa también es lo de afuera.",
    description:
      "Asador, macetería, textiles de exterior y mobiliario para la parte de la casa donde de verdad pasa la vida.",
    seed: "logue-terraza",
    products: [
      { id: "tj1", name: "Asador de carbón 57 cm", brand: "Brasa", price: 7900, seed: "p-asador" },
      { id: "tj2", name: "Macetas de barro (juego de 3)", brand: "Artesanal Oaxaca", price: 1800, seed: "p-macetas" },
      { id: "tj3", name: "Hamaca de Yucatán", brand: "Artesanal MX", price: 2400, seed: "p-hamaca" },
      { id: "tj4", name: "Set de jardinería", brand: "Taller Sur", price: 1500, seed: "p-jardin" },
      { id: "tj5", name: "Lámparas solares (6)", brand: "Luz", price: 2200, seed: "p-lamparas" },
      { id: "tj6", name: "Mesa plegable de teca", brand: "Taller Sur", price: 9400, seed: "p-mesateca" },
    ],
  },
  {
    slug: "primer-enganche",
    name: "Primer enganche",
    blurb: "Para quienes van por la casa.",
    description:
      "Una sola meta grande, con barra de avance visible. Los invitados aportan desde 500 pesos y ustedes retiran cuando quieran.",
    seed: "logue-enganche",
    products: [
      { id: "pe1", name: "Aportación al enganche", brand: "Meta en efectivo", price: 250000, seed: "p-casa" },
      { id: "pe2", name: "Gastos notariales", brand: "Meta en efectivo", price: 45000, seed: "p-notaria" },
      { id: "pe3", name: "Mudanza", brand: "Meta en efectivo", price: 12000, seed: "p-mudanza" },
    ],
  },
];

export const steps = [
  {
    n: "01",
    title: "Armen su mesa en una tarde",
    body: "Empiecen de una colección lista o agreguen cualquier producto de cualquier tienda pegando su liga. Sin catálogo cerrado, sin pedir permiso.",
  },
  {
    n: "02",
    title: "Compartan un solo link",
    body: "Su sitio de evento, la invitación digital y la confirmación de asistencia viven en la misma liga. Se manda por WhatsApp y ya.",
  },
  {
    n: "03",
    title: "Reciban y retiren sin comisión",
    body: "Los invitados regalan o aportan en efectivo, hasta en 12 meses sin intereses. Ustedes retiran a su cuenta cuando quieran, al 0%.",
  },
] as const;

export const differentiators = [
  {
    title: "0% de comisión",
    body: "Otras plataformas se quedan con el 3% al transferir. Aquí el plan se paga una vez y el dinero de sus invitados llega completo.",
    metric: "0%",
  },
  {
    title: "Meses sin intereses",
    body: "El invitado paga a 3, 6 o 12 MSI con tarjeta participante. Ustedes reciben el monto completo de inmediato.",
    metric: "12 MSI",
  },
  {
    title: "Catálogo abierto",
    body: "Pegan la liga de cualquier tienda de México y el producto entra a su mesa con foto y precio. No los limitamos a nuestro inventario.",
    metric: "∞",
  },
  {
    title: "Todo por WhatsApp",
    body: "Invitación, recordatorios, confirmación y agradecimientos salen por WhatsApp, no por correo que nadie abre.",
    metric: "98%",
  },
] as const;

export const plans = [
  {
    slug: "esencial",
    name: "Esencial",
    price: 0,
    priceNote: "Gratis para siempre",
    pitch: "Para una mesa sencilla que se arma esta semana.",
    features: [
      "Mesa de regalos ilimitada",
      "Sitio de evento con plantilla",
      "Confirmación de asistencia",
      "Aportaciones en efectivo",
      "Retiro con 4% de comisión",
    ],
    cta: "Empezar gratis",
    featured: false,
  },
  {
    slug: "completo",
    name: "Completo",
    price: 1490,
    priceNote: "Pago único",
    pitch: "El que eligen 8 de cada 10 parejas.",
    features: [
      "Todo lo de Esencial",
      "0% de comisión al retirar",
      `Dominio propio (sunombre.${brand.domain})`,
      "Invitaciones por WhatsApp ilimitadas",
      "Meses sin intereses para invitados",
      "Panel de agradecimientos",
      "Envío consolidado después del evento",
    ],
    cta: "Elegir Completo",
    featured: true,
  },
  {
    slug: "atelier",
    name: "Atelier",
    price: 4900,
    priceNote: "Pago único",
    pitch: "Curaduría y acompañamiento uno a uno.",
    features: [
      "Todo lo de Completo",
      "Curaduría de mesa con asesor",
      "Diseño de sitio a medida",
      "Papelería digital coordinada",
      "Coordinación de entregas",
      "Soporte por WhatsApp el día del evento",
    ],
    cta: "Hablar con un asesor",
    featured: false,
  },
] as const;

export const testimonials = [
  {
    quote:
      "Armamos la mesa un martes en la noche y la mandamos por WhatsApp el miércoles. Para el fin de semana ya teníamos la mitad del enganche.",
    author: "Ana y Diego",
    detail: "Boda · Valle de Bravo",
  },
  {
    quote:
      "Lo del 0% no es mercadotecnia: retiramos ciento ochenta mil y llegaron ciento ochenta mil. Ya había usado otra plataforma y sí se siente la diferencia.",
    author: "Mariana y Sofía",
    detail: "Boda · Mérida",
  },
  {
    quote:
      "Mis tías no bajan apps. Pegaron el link, escogieron el regalo y pagaron a seis meses. Cero llamadas pidiéndome ayuda.",
    author: "Regina",
    detail: "XV años · Monterrey",
  },
] as const;

export const eventTypes = [
  { name: "Boda", seed: "ev-boda" },
  { name: "Baby shower", seed: "ev-baby" },
  { name: "XV años", seed: "ev-xv" },
  { name: "Aniversario", seed: "ev-aniv" },
  { name: "Graduación", seed: "ev-grad" },
  { name: "Casa nueva", seed: "ev-casa" },
] as const;

/* ---------- Mesa pública de demostración ---------- */

export const demoRegistry = {
  slug: "ana-y-diego",
  couple: "Ana & Diego",
  date: "14 de febrero de 2027",
  venue: "Hacienda El Sauce · Valle de Bravo",
  message:
    "Gracias por acompañarnos. Si quieren regalarnos algo, aquí dejamos lo que nos hace falta para empezar la casa. Su presencia ya es suficiente.",
  heroSeed: "demo-hero",
  goals: [
    { name: "Enganche de la casa", target: 250000, raised: 163500 },
    { name: "Luna de miel en Oaxaca", target: 48000, raised: 41200 },
  ],
  gifts: [
    { id: "g1", name: "Olla de hierro fundido 5.3 L", price: 11500, seed: "p-olla", claimed: true },
    { id: "g2", name: "Vajilla 16 piezas gres", price: 4700, seed: "p-vajilla", claimed: false },
    { id: "g3", name: "Juego de sábanas 400 hilos", price: 3200, seed: "p-sabanas", claimed: false },
    { id: "g4", name: "Batidora de pedestal", price: 14900, seed: "p-batidora", claimed: false },
    { id: "g5", name: "Cristalería vino 6 piezas", price: 2900, seed: "p-copas", claimed: true },
    { id: "g6", name: "Asador de carbón 57 cm", price: 7900, seed: "p-asador", claimed: false },
    { id: "g7", name: "Molcajete de piedra volcánica", price: 1450, seed: "p-molcajete", claimed: false },
    { id: "g8", name: "Tabla de nogal 50 cm", price: 3100, seed: "p-tabla", claimed: false },
  ],
};
