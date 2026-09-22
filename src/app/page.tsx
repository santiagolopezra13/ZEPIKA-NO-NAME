import Image from "next/image";
import Link from "next/link";
import { brand, mxn } from "@/lib/brand";
import { collections, img, steps, testimonials } from "@/lib/data";

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

/* ───────────────── 1 · Portada ─────────────────
   El titular cruza por encima de la fotografía en lugar de vivir
   en una columna aparte. */

function Hero() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-5 pt-8 pb-24 md:px-10 md:pt-14 md:pb-32">
      <div className="relative lg:grid lg:grid-cols-12 lg:items-center">
        {/* Fotografía — ocupa la derecha y sangra fuera del contenedor */}
        <div className="relative col-span-7 col-start-6 h-[58vh] min-h-[380px] overflow-hidden rounded-[2rem] bg-shell lg:h-[76vh] lg:rounded-l-[2rem] lg:rounded-r-none">
          <Image
            src={img("logue-hero", 1200, 1500)}
            alt="Una casa recién estrenada"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>

        {/* Titular — encima de la foto en escritorio */}
        <div className="relative z-10 col-span-7 col-start-1 row-start-1 -mt-16 lg:mt-0">
          <h1 className="display text-[clamp(3rem,8.5vw,7.5rem)]">
            <span className="rise block bg-cream pr-6 pb-1 lg:inline-block">
              La mesa
            </span>
            <span
              className="rise block bg-cream pr-6 pb-1 lg:inline-block"
              style={{ animationDelay: "90ms" }}
            >
              de regalos
            </span>
            <span
              className="rise block bg-cream pr-6 lg:inline-block"
              style={{ animationDelay: "180ms" }}
            >
              que sí se
              <br className="hidden lg:block" /> siente{" "}
              <em className="text-sage-deep not-italic">suya.</em>
            </span>
          </h1>

          <div
            className="rise mt-8 max-w-md bg-cream pt-2 lg:mt-10"
            style={{ animationDelay: "280ms" }}
          >
            <p className="text-lg leading-relaxed text-ink-70">
              Regalos, sitio de evento, invitación y confirmación en una sola
              liga. Sus invitados pagan hasta en 12 meses sin intereses; ustedes
              retiran sin comisión.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/crear"
                className="rounded-full bg-forest px-8 py-4 text-cream transition-colors hover:bg-sage-deep"
              >
                Crear mi mesa
              </Link>
              <Link
                href="/mesa/ana-y-diego"
                className="group text-[0.95rem] text-ink-70 transition-colors hover:text-ink"
              >
                Ver una mesa real
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── 2 · Los números, en una sola línea editorial ───────────────── */

function Numbers() {
  const items = [
    ["0%", "de comisión al retirar"],
    ["12", "meses sin intereses"],
    ["∞", "productos de cualquier tienda"],
  ];

  return (
    <section className="border-y border-line">
      <div className="mx-auto flex max-w-[1400px] flex-col divide-y divide-line px-5 md:flex-row md:divide-x md:divide-y-0 md:px-10">
        {items.map(([n, label]) => (
          <div key={label} className="flex items-baseline gap-4 py-8 md:flex-1 md:px-8 md:first:pl-0 md:last:pr-0">
            <span className="display text-[2.75rem] leading-none text-sage">
              {n}
            </span>
            <span className="text-sm leading-snug text-ink-70">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────── 3 · Cómo funciona ─────────────────
   Los pasos se montan sobre la fotografía, no debajo. */

function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <div className="lg:grid lg:grid-cols-12 lg:gap-0">
        {/* Foto */}
        <div className="relative col-span-6 h-[46vh] min-h-[320px] overflow-hidden rounded-[2rem] bg-shell lg:h-auto lg:min-h-[560px]">
          <Image
            src={img("logue-proceso", 1000, 1200)}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover"
          />
        </div>

        {/* Tarjeta de pasos, montada sobre la foto */}
        <div className="relative z-10 col-span-7 col-start-6 -mt-14 ml-4 mr-0 rounded-[2rem] bg-cream p-8 md:p-12 lg:mt-16 lg:mb-16 lg:ml-0 lg:p-14">
          <p className="eyebrow text-sage-deep">Cómo funciona</p>
          <h2 className="display mt-4 text-[clamp(1.9rem,4vw,3rem)]">
            Tres pasos. Sin juntas,
            <br />
            sin cotizaciones.
          </h2>

          <ol className="mt-10 divide-y divide-line border-t border-line">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-6 py-6">
                <span className="display shrink-0 text-lg text-sage">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-70">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <Link
            href="/planes"
            className="group mt-9 inline-block text-[0.95rem] text-ink transition-colors hover:text-sage-deep"
          >
            Ver planes desde {mxn(0)}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── 4 · Colecciones, en rejilla desigual ───────────────── */

function Collections() {
  const [first, second, third, ...rest] = collections;

  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <h2 className="display text-[clamp(1.9rem,4vw,3rem)]">
          Mesas ya armadas.
          <br />
          Ajústenlas y listo.
        </h2>
        <Link
          href="/colecciones"
          className="group text-[0.95rem] text-ink-70 transition-colors hover:text-ink"
        >
          Las {collections.length} colecciones
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-12">
        {/* Grande a la izquierda */}
        <CollectionCard c={first} className="md:col-span-7" ratio="aspect-[4/3.2]" />

        {/* Dos apilados, desfasados hacia abajo */}
        <div className="grid gap-12 md:col-span-5 md:pt-16">
          <CollectionCard c={second} ratio="aspect-[4/3]" />
          <CollectionCard c={third} ratio="aspect-[4/3]" />
        </div>

        {/* Los restantes, como una línea de texto discreta */}
        <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8 md:col-span-12">
          {rest.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/colecciones/${c.slug}`}
                className="display text-xl text-ink-50 transition-colors hover:text-sage-deep"
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

function CollectionCard({
  c,
  className = "",
  ratio,
}: {
  c: (typeof collections)[number];
  className?: string;
  ratio: string;
}) {
  return (
    <Link href={`/colecciones/${c.slug}`} className={`group block ${className}`}>
      <div className={`relative overflow-hidden rounded-[1.5rem] bg-shell ${ratio}`}>
        <Image
          src={img(c.seed, 900, 700)}
          alt={c.name}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-2xl">{c.name}</h3>
        <span className="text-sm text-ink-50">{c.blurb}</span>
      </div>
    </Link>
  );
}

/* ───────────────── 5 · La mesa en vivo ─────────────────
   Una sola pieza oscura, con el dato flotando sobre la fotografía. */

function LiveRegistry() {
  return (
    <section className="relative overflow-hidden bg-forest text-cream">
      <div className="paper relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-sand">Su evento, una sola liga</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.5rem)] text-cream">
              Lo que ve
              <br />
              su invitado.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-cream/70">
              Un link lleva al sitio, la mesa de regalos y la confirmación de
              asistencia. Se manda por WhatsApp, se abre en el celular y se
              regala sin crear cuenta.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-y-6 border-t border-cream/15 pt-8">
              {[
                ["Dominio propio", `sunombre.${brand.domain}`],
                ["Confirmación", "con acompañantes"],
                ["Recordatorios", "30, 7 y 1 día antes"],
                ["Agradecimientos", "quién regaló qué"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-sm text-cream/90">{k}</dt>
                  <dd className="mt-0.5 text-xs text-cream/45">{v}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/mesa/ana-y-diego"
              className="mt-10 inline-block rounded-full bg-cream px-8 py-4 text-ink transition-colors hover:bg-sand"
            >
              Abrir la mesa de ejemplo
            </Link>
          </div>

          {/* Fotografía con el dato cruzado encima */}
          <div className="relative mt-14 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem] bg-cream/10">
              <Image
                src={img("demo-hero", 1100, 950)}
                alt="Mesa de regalos de ejemplo"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -left-4 w-[15rem] rounded-2xl bg-cream p-5 text-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] md:-left-8">
              <p className="eyebrow text-ink-50">Meta · Enganche</p>
              <p className="display mt-2 text-3xl">{mxn(163500)}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
                <div className="h-full w-[65%] rounded-full bg-sage" />
              </div>
              <p className="mt-2 text-xs text-ink-50">
                65% de {mxn(250000)} · 41 invitados
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── 6 · Una sola cita, grande ───────────────── */

function Quote() {
  const t = testimonials[1];

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <figure className="mx-auto max-w-4xl text-center">
        <blockquote className="display text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.15]">
          “{t.quote}”
        </blockquote>
        <figcaption className="mt-10 text-sm text-ink-50">
          {t.author} · {t.detail}
        </figcaption>
      </figure>
    </section>
  );
}
