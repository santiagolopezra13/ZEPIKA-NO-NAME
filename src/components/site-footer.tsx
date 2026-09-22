import Link from "next/link";
import { brand } from "@/lib/brand";
import Wordmark from "@/components/wordmark";

const columns = [
  {
    title: "Producto",
    links: [
      { href: "/colecciones", label: "Colecciones" },
      { href: "/planes", label: "Planes" },
      { href: "/#como-funciona", label: "Cómo funciona" },
      { href: "/mesa/ana-y-diego", label: "Mesa de ejemplo" },
    ],
  },
  {
    title: "Invitados",
    links: [
      { href: "/buscar-mesa", label: "Buscar una mesa" },
      { href: brand.whatsappUrl, label: "Ayuda por WhatsApp" },
    ],
  },
  {
    title: "Cuenta",
    links: [
      { href: "/crear", label: "Crear mi mesa" },
      { href: "/entrar", label: "Entrar" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest text-cream">
      <div className="paper relative mx-auto max-w-[1240px] px-6 py-16 md:px-10 md:py-20">
        {/* Cierre en una sola línea */}
        <div className="flex flex-col gap-8 border-b border-cream/12 pb-14 md:flex-row md:items-end md:justify-between">
          <h2 className="display max-w-xl t-1 text-cream">
            Su mesa puede estar lista esta noche.
          </h2>
          <Link
            href="/crear"
            className="shrink-0 self-start rounded-full bg-cream px-8 py-4 text-ink transition-colors hover:bg-sand md:self-auto"
          >
            Empezar gratis
          </Link>
        </div>

        {/* Enlaces, compactos */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Wordmark tone="cream" className="text-[1.75rem]" />
            <p className="mt-4 max-w-[22ch] text-sm text-cream/55">
              {brand.tagline}
            </p>
            <p className="mt-5 text-sm text-cream/45">{brand.city}, México</p>

            <form className="mt-7 flex max-w-xs gap-2 border-b border-cream/25 pb-2">
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                aria-label="Correo electrónico"
                className="w-full bg-transparent text-sm text-cream placeholder:text-cream/35 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-sm text-sand transition-opacity hover:opacity-70"
              >
                →
              </button>
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-cream/40">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream/75 transition-colors hover:text-sand"
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
            © {new Date().getFullYear()} {brand.legalName}
          </p>
          <p className="flex gap-6">
            <Link href={`mailto:${brand.email}`} className="hover:text-cream/70">
              {brand.email}
            </Link>
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
