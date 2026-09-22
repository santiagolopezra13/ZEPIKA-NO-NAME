import Image from "next/image";
import Link from "next/link";
import { brand, mxn } from "@/lib/brand";
import { collections, img, steps, testimonials } from "@/lib/data";

/**
 * Una sola rejilla para toda la página: 12 columnas, mismo contenedor,
 * mismos márgenes. Nada se sale ni se monta encima de otra cosa — cada
 * bloque arranca en una columna declarada y todo comparte el mismo borde
 * izquierdo.
 */
const SHELL = "mx-auto w-full max-w-[1240px] px-6 md:px-10";
const GRID = "grid grid-cols-4 gap-x-6 md:grid-cols-12";

export default function Home() {
  return (
    <>
      <Hero />
      <Numbers />
      <HowItWorks />
      <Collections />
      <LiveRegistry />
      <Quote />
    </>
  );
}

/* ───────────────── 1 · Portada ───────────────── */

function Hero() {
  return (
    <section className={`${SHELL} pt-10 pb-16 md:pt-16 md:pb-24`}>
      <div className={`${GRID} items-start`}>
        {/* Texto: columnas 1–5 */}
        <div className="col-span-4 md:col-span-5">
          <p className="eyebrow rise text-sage-deep">
            Mesa de regalos digital · México
          </p>

          <h1
            className="display t-hero rise mt-5"
            style={{ animationDelay: "60ms" }}
          >
            La mesa de regalos
            <br />
            que sí se siente{" "}
            <em className="text-sage-deep not-italic">suya.</em>
          </h1>

          <p
            className="rise mt-6 max-w-[38ch] leading-relaxed text-ink-70"
            style={{ animationDelay: "120ms" }}
          >
            Regalos, sitio de evento, invitación y confirmación en una sola
            liga. Sus invitados pagan hasta en 12 meses sin intereses; ustedes
            retiran sin comisión.
          </p>

          <div
            className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href="/crear"
              className="rounded-full bg-forest px-7 py-3.5 text-[0.95rem] text-cream transition-colors hover:bg-sage-deep"
            >
              Crear mi mesa
            </Link>
            <Link
              href="/mesa/ana-y-diego"
              className="tap group text-[0.95rem] text-ink-70 transition-colors hover:text-ink"
            >
              Ver una mesa real
              <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Fotografía: columnas 7–12, alineada al mismo borde superior */}
        <div className="col-span-4 mt-12 md:col-span-6 md:col-start-7 md:mt-0">
          <div className="relative aspect-[4/3.6] overflow-hidden rounded-2xl bg-shell md:aspect-[4/4.4]">
            <Image
              src={img("logue-hero", 1100, 1300)}
              alt="Una casa recién estrenada"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── 2 · Números ───────────────── */

function Numbers() {
  const items: [string, string][] = [
    ["0%", "de comisión al retirar"],
    ["12", "meses sin intereses"],
    ["∞", "productos de cualquier tienda"],
  ];

  return (
    <section className="border-y border-line">
      <div className={SHELL}>
        <div className={GRID}>
          {items.map(([n, label], i) => (
            <div
              key={label}
              className={`col-span-4 flex items-baseline gap-4 py-7 md:col-span-4 ${
                i > 0 ? "border-t border-line md:border-t-0 md:border-l md:pl-8" : ""
              }`}
            >
              <span className="display t-1 text-sage">{n}</span>
              <span className="text-sm leading-snug text-ink-70">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── 3 · Cómo funciona ───────────────── */

function HowItWorks() {
  return (
    <section id="como-funciona" className={`${SHELL} py-20 md:py-28`}>
      <div className={GRID}>
        {/* Encabezado: columnas 1–4 */}
        <div className="col-span-4">
          <p className="eyebrow text-sage-deep">Cómo funciona</p>
          <h2 className="display t-1 mt-4">
            Tres pasos.
            <br />
            Sin juntas, sin
            <br />
            cotizaciones.
          </h2>

          <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-2xl bg-shell md:block">
            <Image
              src={img("logue-proceso", 700, 880)}
              alt=""
              fill
              sizes="30vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Pasos: columnas 6–12 */}
        <ol className="col-span-4 mt-10 divide-y divide-line border-t border-line md:col-span-7 md:col-start-6 md:mt-0">
          {steps.map((s) => (
            <li key={s.n} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-7">
              <span className="display t-3 text-sage">{s.n}</span>
              <div>
                <h3 className="display t-2">{s.title}</h3>
                <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-ink-70">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
          <li className="py-7">
            <Link
              href="/planes"
              className="tap group text-[0.95rem] text-ink transition-colors hover:text-sage-deep"
            >
              Ver planes desde {mxn(0)}
              <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}

/* ───────────────── 4 · Colecciones ───────────────── */

function Collections() {
  const featured = collections.slice(0, 3);
  const rest = collections.slice(3);

  return (
    <section className={`${SHELL} pb-20 md:pb-28`}>
      <div className={`${GRID} items-end border-b border-line pb-6`}>
        <h2 className="display t-1 col-span-4 md:col-span-6">
          Mesas ya armadas.
          <br />
          Ajústenlas y listo.
        </h2>
        <div className="col-span-4 mt-4 md:col-span-4 md:col-start-9 md:mt-0 md:text-right">
          <Link
            href="/colecciones"
            className="tap group text-[0.95rem] text-ink-70 transition-colors hover:text-ink"
          >
            Las {collections.length} colecciones
            <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Tres tarjetas iguales, mismas proporciones, mismas líneas base */}
      <div className={`${GRID} mt-10`}>
        {featured.map((c) => (
          <Link
            key={c.slug}
            href={`/colecciones/${c.slug}`}
            className="group col-span-4 mb-10 block md:mb-0"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-shell">
              <Image
                src={img(c.seed, 800, 600)}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 100vw, 31vw"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
              />
            </div>
            <h3 className="display t-2 mt-4">{c.name}</h3>
            <p className="mt-1 text-sm text-ink-50">{c.blurb}</p>
          </Link>
        ))}

        {/* Las demás, como índice de texto alineado a la misma rejilla */}
        <ul className="col-span-4 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-7 md:col-span-12">
          {rest.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/colecciones/${c.slug}`}
                className="tap display t-3 text-ink-50 transition-colors hover:text-sage-deep"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────── 5 · La mesa en vivo ───────────────── */

function LiveRegistry() {
  const facts: [string, string][] = [
    ["Dominio propio", `sunombre.${brand.domain}`],
    ["Confirmación", "con acompañantes"],
    ["Recordatorios", "30, 7 y 1 día antes"],
    ["Agradecimientos", "quién regaló qué"],
  ];

  return (
    <section className="relative overflow-hidden bg-forest text-cream">
      <div className={`paper relative ${SHELL} py-20 md:py-28`}>
        <div className={`${GRID} items-center`}>
          {/* Texto: columnas 1–5 */}
          <div className="col-span-4 md:col-span-5">
            <p className="eyebrow text-sand">Su evento, una sola liga</p>
            <h2 className="display t-1 mt-4 text-cream">
              Lo que ve
              <br />
              su invitado.
            </h2>
            <p className="mt-5 max-w-[38ch] leading-relaxed text-cream/70">
              Un link lleva al sitio, la mesa de regalos y la confirmación. Se
              manda por WhatsApp y se regala sin crear cuenta.
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-cream/15 pt-7">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm text-cream/90">{k}</dt>
                  <dd className="mt-0.5 text-xs text-cream/45">{v}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/mesa/ana-y-diego"
              className="mt-9 inline-block rounded-full bg-cream px-7 py-3.5 text-[0.95rem] text-ink transition-colors hover:bg-sand"
            >
              Abrir la mesa de ejemplo
            </Link>
          </div>

          {/* Fotografía + dato: columnas 7–12, ambos dentro de la rejilla */}
          <div className="col-span-4 mt-12 md:col-span-6 md:col-start-7 md:mt-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream/10">
              <Image
                src={img("demo-hero", 1000, 750)}
                alt="Mesa de regalos de ejemplo"
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
                className="object-cover"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-6 rounded-2xl border border-cream/15 bg-cream/[0.06] px-6 py-5">
              <div>
                <p className="eyebrow text-cream/45">Meta · Enganche</p>
                <p className="display t-2 mt-1.5 text-sand">{mxn(163500)}</p>
              </div>
              <div className="w-1/2">
                <div className="h-1.5 overflow-hidden rounded-full bg-cream/15">
                  <div className="h-full w-[65%] rounded-full bg-sand" />
                </div>
                <p className="mt-2 text-xs text-cream/45">
                  65% de {mxn(250000)} · 41 invitados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── 6 · Cita ───────────────── */

function Quote() {
  const t = testimonials[1];

  return (
    <section className={`${SHELL} py-20 md:py-28`}>
      <div className={GRID}>
        <figure className="col-span-4 md:col-span-8 md:col-start-3">
          <blockquote className="display t-1 text-center">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-8 text-center text-sm text-ink-50">
            {t.author} · {t.detail}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
