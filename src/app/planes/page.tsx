import type { Metadata } from "next";
import Link from "next/link";
import { brand, mxn } from "@/lib/brand";
import { plans } from "@/lib/data";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Planes y precios",
  description:
    "Tres planes, pago único, sin suscripción. Desde gratis hasta curaduría uno a uno. 0% de comisión al retirar en el plan Completo.",
};

const faqs = [
  {
    q: "¿De verdad no cobran comisión?",
    a: "En el plan Completo y Atelier, no. Pagan el plan una vez y retiran el 100% de lo que aportaron sus invitados. En el plan gratuito sí retenemos 4% al momento del retiro, porque es lo que cuesta procesar el pago.",
  },
  {
    q: "¿Cuándo puedo retirar el dinero?",
    a: "Cuando quieran, incluso antes del evento. El retiro se manda por SPEI a la cuenta que ustedes registren y cae en un máximo de 24 horas hábiles.",
  },
  {
    q: "¿Quién paga la comisión de los meses sin intereses?",
    a: "Nosotros la absorbemos en el plan Completo. El invitado paga a 3, 6 o 12 meses con tarjeta participante y ustedes reciben el monto completo de inmediato.",
  },
  {
    q: "¿Qué pasa si se cancela el evento?",
    a: "Devolvemos el plan completo hasta 60 días después de la compra y ayudamos a reembolsar a los invitados que lo pidan, sin cargo.",
  },
  {
    q: "¿Puedo pedir productos que no están en su catálogo?",
    a: "Sí. Pegan la liga del producto de cualquier tienda en México y lo agregamos a su mesa con foto y precio. Si prefieren, lo convertimos en una aportación en efectivo por ese monto.",
  },
  {
    q: "¿Cobran algo a mis invitados?",
    a: "Nada. El invitado paga exactamente el precio que ve.",
  },
];

export default function PlansPage() {
  return (
    <>
      <Section className="!pb-12 !pt-12">
        <div className="max-w-3xl">
          <p className="eyebrow text-clay">Planes</p>
          <h1 className="display mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">
            Pago único.
            <br />
            Sin suscripción.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-70">
            No cobramos mensualidades por algo que van a usar una vez en la
            vida. Eligen el plan, lo pagan y su mesa queda activa un año
            completo después del evento.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.slug}
              className={`relative flex flex-col rounded-[1.75rem] border p-8 md:p-10 ${
                p.featured
                  ? "border-ink bg-ink text-cream"
                  : "border-sand-dark bg-sand/30"
              }`}
            >
              {p.featured && (
                <span className="eyebrow absolute -top-3 left-8 rounded-full bg-gold px-4 py-1.5 text-ink">
                  Más elegido
                </span>
              )}

              <h2
                className={`display text-3xl ${p.featured ? "text-cream" : ""}`}
              >
                {p.name}
              </h2>
              <p
                className={`mt-2 text-sm ${
                  p.featured ? "text-cream/60" : "text-ink-50"
                }`}
              >
                {p.pitch}
              </p>

              <div className="mt-8">
                <p
                  className={`display text-[3.25rem] leading-none ${
                    p.featured ? "text-gold" : ""
                  }`}
                >
                  {p.price === 0 ? "Gratis" : mxn(p.price)}
                </p>
                <p
                  className={`mt-2 text-sm ${
                    p.featured ? "text-cream/50" : "text-ink-50"
                  }`}
                >
                  {p.priceNote}
                </p>
              </div>

              <ul className="mt-8 flex-1 space-y-3.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      className={`mt-[0.35rem] shrink-0 ${
                        p.featured ? "text-gold" : "text-clay"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path
                          d="M2 7.5L5.5 11L12 3.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={p.featured ? "text-cream/85" : ""}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.slug === "atelier" ? brand.whatsappUrl : "/crear"}
                className={`mt-9 rounded-full py-3.5 text-center text-[0.95rem] transition-colors ${
                  p.featured
                    ? "bg-cream text-ink hover:bg-gold"
                    : "bg-ink text-cream hover:bg-clay"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-50">
          Todos los precios en pesos mexicanos, IVA incluido. Cambien de plan
          cuando quieran pagando solo la diferencia.
        </p>
      </Section>

      {/* Preguntas */}
      <section className="border-t border-sand-dark bg-sand/40">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-clay">Preguntas</p>
              <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">
                Lo que todos
                <br />
                preguntan primero.
              </h2>
              <p className="mt-6 text-ink-70">
                ¿Falta algo? Escríbannos por WhatsApp, contestamos el mismo día.
              </p>
              <Link
                href={brand.whatsappUrl}
                className="mt-5 inline-block text-clay underline decoration-clay/30 underline-offset-4"
              >
                {brand.whatsapp}
              </Link>
            </div>

            <div className="divide-y divide-sand-dark border-t border-sand-dark">
              {faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <span className="display text-xl leading-snug md:text-2xl">
                      {f.q}
                    </span>
                    <span className="mt-1 shrink-0 text-2xl leading-none text-clay transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink-70">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
