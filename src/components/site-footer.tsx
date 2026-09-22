import Link from "next/link";
import { brand } from "@/lib/brand";
import { collections } from "@/lib/data";

const columns = [
  {
    title: "Producto",
    links: [
      { href: "/como-funciona", label: "Cómo funciona" },
      { href: "/planes", label: "Planes y precios" },
      { href: "/colecciones", label: "Colecciones" },
      { href: "/mesa/ana-y-diego", label: "Ver una mesa de ejemplo" },
      { href: "/buscar-mesa", label: "Buscar una mesa" },
    ],
  },
  {
    title: "Colecciones",
    links: collections
      .slice(0, 5)
      .map((c) => ({ href: `/colecciones/${c.slug}`, label: c.name })),
  },
  {
    title: "Compañía",
    links: [
      { href: "/crear", label: "Crear mi mesa" },
      { href: "/entrar", label: "Entrar" },
      { href: brand.whatsappUrl, label: "WhatsApp" },
      { href: `mailto:${brand.email}`, label: brand.email },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-ink text-cream">
      <div className="paper relative mx-auto max-w-[1400px] px-5 pt-20 pb-10 md:px-10 md:pt-28">
        {/* Cierre */}
        <div className="grid gap-12 border-b border-cream/12 pb-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="display text-[clamp(2.25rem,5vw,4rem)] text-cream">
              Su mesa puede estar
              <br />
              lista esta noche.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/crear"
                className="rounded-full bg-cream px-7 py-3.5 text-ink transition-colors hover:bg-gold"
              >
                Crear mi mesa gratis
              </Link>
              <Link
                href="/mesa/ana-y-diego"
                className="rounded-full border border-cream/25 px-7 py-3.5 text-cream transition-colors hover:border-cream/60"
              >
                Ver un ejemplo
              </Link>
            </div>
          </div>

          <div>
            <p className="eyebrow text-cream/50">Boletín</p>
            <p className="mt-3 max-w-sm text-cream/70">
              Ideas de mesa, plantillas y descuentos de proveedores. Una vez al
              mes, sin ruido.
            </p>
            <form className="mt-5 flex gap-2 border-b border-cream/25 pb-2">
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                aria-label="Correo electrónico"
                className="w-full bg-transparent text-cream placeholder:text-cream/35 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-sm text-gold transition-opacity hover:opacity-70"
              >
                Suscribirme →
              </button>
            </form>
          </div>
        </div>

        {/* Enlaces */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="display text-2xl text-cream">
              {brand.name}
              <span className="text-gold">.</span>
            </p>
            <p className="mt-3 max-w-[20ch] text-sm text-cream/55">
              {brand.tagline}
            </p>
            <p className="mt-6 text-sm text-cream/45">{brand.city}, México</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-cream/45">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream/75 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/12 pt-8 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. Todos los derechos
            reservados.
          </p>
          <p className="flex gap-5">
            <Link href="/legal/privacidad" className="hover:text-cream/70">
              Privacidad
            </Link>
            <Link href="/legal/terminos" className="hover:text-cream/70">
              Términos
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
