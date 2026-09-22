import Image from "next/image";
import Link from "next/link";
import { brand, mxn } from "@/lib/brand";
import {
  collections,
  differentiators,
  eventTypes,
  img,
  steps,
  testimonials,
} from "@/lib/data";
import { Button, Section, SectionHead } from "@/components/section";

export default function Home() {
  return (
    <>
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 pt-10 pb-16 md:px-10 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
        <div className="rise">
          <p className="eyebrow flex items-center gap-3 text-clay">
            <span className="h-px w-8 bg-clay" />
            Mesa de regalos digital · México
          </p>

          <h1 className="display mt-6 text-[clamp(2.75rem,7.5vw,5.75rem)]">
            La mesa de regalos
            <br />
            que sí se siente
            <br />
            <em className="text-clay not-italic">suya.</em>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-70">
            Mesa de regalos, sitio de evento, invitación y confirmación de
            asistencia en una sola liga. Sus invitados pagan hasta en 12 meses
            sin intereses y ustedes retiran{" "}
            <strong className="font-medium text-ink">sin comisión</strong>.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/crear">Crear mi mesa gratis</Button>
            <Button href="/mesa/ana-y-diego" variant="outline">
              Ver una mesa real
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-ink-50">
            <span className="flex items-center gap-2">
              <Check /> Sin tarjeta para empezar
            </span>
            <span className="flex items-center gap-2">
              <Check /> Lista en 20 minutos
            </span>
            <span className="flex items-center gap-2">
              <Check /> Soporte por WhatsApp
            </span>
          </div>
        </div>

        {/* Collage */}
        <div className="relative h-[420px] sm:h-[520px] lg:h-[660px]">
          <div className="absolute top-0 right-0 h-[72%] w-[70%] overflow-hidden rounded-[2rem] bg-sand">
            <Image
              src={img("casalta-hero-a", 900, 1200)}
              alt="Pareja en su casa nueva"
              fill
              priority
              sizes="(max-width: 1024px) 70vw, 34vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 h-[52%] w-[54%] overflow-hidden rounded-[2rem] border-[6px] border-cream bg-sand">
            <Image
              src={img("casalta-hero-b", 800, 800)}
              alt="Detalle de vajilla artesanal"
              fill
              sizes="(max-width: 1024px) 54vw, 26vw"
              className="object-cover"
            />
          </div>

          {/* Tarjeta flotante */}
          <div className="absolute bottom-[14%] right-[2%] w-[13.5rem] rounded-2xl border border-sand-dark bg-cream p-4 shadow-[0_18px_50px_-20px_rgba(23,19,15,0.35)]">
            <p className="eyebrow text-ink-50">Meta · Enganche</p>
            <p className="display mt-2 text-2xl">{mxn(163500)}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sand-dark">
              <div className="h-full w-[65%] rounded-full bg-clay" />
            </div>
            <p className="mt-2 text-xs text-ink-50">
              65% de {mxn(250000)} · 41 invitados
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── Diferenciadores ───────────────── */}
      <section className="border-y border-sand-dark bg-sand/40">
        <div className="mx-auto grid max-w-[1400px] gap-px px-5 md:grid-cols-2 md:px-10 lg:grid-cols-4">
          {differentiators.map((d) => (
            <div
              key={d.title}
              className="group border-b border-sand-dark py-10 pr-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <p className="display text-4xl text-clay transition-transform duration-300 group-hover:-translate-y-0.5">
                {d.metric}
              </p>
              <h3 className="mt-3 font-medium">{d.title}</h3>
              <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-ink-70">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── Cómo funciona ───────────────── */}
      <Section id="como-funciona">
        <SectionHead
          eyebrow="Cómo funciona"
          title={
            <>
              Tres pasos. Sin juntas,
              <br />
              sin cotizaciones, sin esperas.
            </>
          }
          cta={{ href: "/como-funciona", label: "Ver el detalle completo" }}
        />

        <div className="mt-16 grid gap-px border-t border-sand-dark md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="border-b border-sand-dark pt-8 pb-10 pr-8 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <p className="display text-5xl text-sand-dark">{s.n}</p>
              <h3 className="display mt-6 text-2xl">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-70">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────────── Retiro 0% ───────────────── */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="paper relative mx-auto grid max-w-[1400px] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-gold">El dinero es suyo</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.6rem)] text-cream">
              Otras plataformas se
              <br />
              quedan con el 3%.
              <br />
              Nosotros con nada.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-cream/70">
              Pagan el plan una vez y ya. Retiren cuando quieran — antes del
              evento, el mismo día o tres meses después — a la cuenta que
              ustedes pongan, por SPEI, en 24 horas hábiles.
            </p>
            <div className="mt-9">
              <Button href="/planes" variant="light">
                Ver planes desde {mxn(0)}
              </Button>
            </div>
          </div>

          {/* Comparativa */}
          <div className="rounded-3xl border border-cream/15 bg-cream/[0.04] p-7 backdrop-blur-sm md:p-9">
            <p className="eyebrow text-cream/45">
              Sobre una mesa de {mxn(180000)}
            </p>

            <div className="mt-7 space-y-6">
              <div>
                <div className="flex items-baseline justify-between">
                  <p className="text-cream/70">Plataforma con 3% de comisión</p>
                  <p className="display text-2xl text-cream/60">
                    {mxn(174600)}
                  </p>
                </div>
                <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-cream/10">
                  <div className="h-full w-[97%] rounded-full bg-cream/25" />
                </div>
                <p className="mt-1.5 text-xs text-cream/40">
                  Se van {mxn(5400)} en comisión
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <p className="text-cream">
                    {brand.name} <span className="text-gold">Completo</span>
                  </p>
                  <p className="display text-3xl text-gold">{mxn(180000)}</p>
                </div>
                <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-cream/10">
                  <div className="h-full w-full rounded-full bg-gold" />
                </div>
                <p className="mt-1.5 text-xs text-cream/40">
                  Comisión {mxn(0)} · plan {mxn(1490)} pagado una vez
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-baseline justify-between border-t border-cream/15 pt-6">
              <p className="text-sm text-cream/60">Diferencia a su favor</p>
              <p className="display text-3xl text-gold">+{mxn(3910)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Colecciones ───────────────── */}
      <Section>
        <SectionHead
          eyebrow="Colecciones"
          title={
            <>
              Mesas ya armadas.
              <br />
              Ajústenlas y listo.
            </>
          }
          body="Cada colección trae entre 20 y 60 productos elegidos por nuestra curaduría. Quiten, agreguen o mezclen dos. Nadie los va a juzgar."
          cta={{ href: "/colecciones", label: "Ver las 6 colecciones" }}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              href={`/colecciones/${c.slug}`}
              className="group block"
            >
              <div
                className={`relative overflow-hidden rounded-[1.75rem] bg-sand ${
                  i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/4.4]"
                }`}
              >
                <Image
                  src={img(c.seed, 800, 1000)}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="display text-2xl text-cream">{c.name}</p>
                  <p className="mt-1 text-sm text-cream/80">{c.blurb}</p>
                </div>
              </div>
              <p className="mt-3 flex items-center justify-between text-sm text-ink-50">
                <span>{c.products.length} productos de muestra</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ───────────────── Sitio + invitaciones ───────────────── */}
      <section className="border-y border-sand-dark bg-sand/40">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow text-clay">Sitio e invitaciones</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.6rem)]">
              Su evento completo
              <br />
              en una sola liga.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-ink-70">
              No manden cuatro cosas distintas. Un link lleva a su sitio: la
              historia, el mapa, el código de vestimenta, la mesa de regalos y
              el botón de confirmar asistencia. Todo desde el celular, sin bajar
              nada.
            </p>

            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {[
                ["Dominio propio", "sunombre.casalta.mx o el dominio que ya tengan."],
                ["Invitación por WhatsApp", "Se envía y se lee. No como el correo."],
                ["Confirmación con acompañantes", "Sepan cuántos llegan y qué comen."],
                ["Recordatorios automáticos", "A los 30, 7 y 1 día del evento."],
                ["Agradecimientos", "Quién regaló qué, listo para el thank you."],
                ["Multi-evento", "Boda, XV, baby shower o casa nueva."],
              ].map(([t, d]) => (
                <li key={t} className="border-t border-sand-dark pt-4">
                  <p className="font-medium">{t}</p>
                  <p className="mt-1 text-sm text-ink-70">{d}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Mock de teléfono */}
          <div className="mx-auto w-full max-w-[330px]">
            <div className="rounded-[2.75rem] border-[10px] border-ink bg-ink p-1 shadow-[0_30px_70px_-30px_rgba(23,19,15,0.6)]">
              <div className="overflow-hidden rounded-[2.1rem] bg-cream">
                <div className="relative h-52 bg-sand">
                  <Image
                    src={img("demo-hero", 700, 500)}
                    alt="Sitio de evento de ejemplo"
                    fill
                    sizes="330px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/25" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-cream">
                    <p className="eyebrow text-cream/70">14.02.2027</p>
                    <p className="display mt-1 text-3xl">Ana &amp; Diego</p>
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <div className="rounded-xl bg-sand/70 p-3">
                    <p className="text-xs text-ink-50">Faltan</p>
                    <p className="display text-xl">142 días</p>
                  </div>
                  <button className="w-full rounded-xl bg-clay py-3 text-sm text-cream">
                    Confirmar asistencia
                  </button>
                  <button className="w-full rounded-xl border border-ink/15 py-3 text-sm">
                    Ver mesa de regalos
                  </button>
                  <div className="flex items-center gap-2 pt-1 text-[0.7rem] text-ink-50">
                    <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                    41 invitados confirmados
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-5 text-center text-sm text-ink-50">
              Así lo ve su invitado.{" "}
              <Link
                href="/mesa/ana-y-diego"
                className="text-clay underline decoration-clay/30 underline-offset-4"
              >
                Ábranlo completo
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── Testimonios ───────────────── */}
      <Section>
        <SectionHead
          eyebrow="Quien ya lo usó"
          title={
            <>
              Parejas que ya
              <br />
              retiraron su mesa.
            </>
          }
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col justify-between rounded-[1.75rem] border border-sand-dark bg-sand/30 p-8"
            >
              <div>
                <div className="flex gap-1 text-gold" aria-label="5 de 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <blockquote className="display mt-6 text-[1.4rem] leading-snug">
                  “{t.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-8 border-t border-sand-dark pt-5">
                <p className="font-medium">{t.author}</p>
                <p className="text-sm text-ink-50">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ───────────────── Tipos de evento ───────────────── */}
      <Section className="!pt-0">
        <div className="rounded-[2rem] border border-sand-dark bg-sand/40 p-8 md:p-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-clay">No solo bodas</p>
              <h2 className="display mt-3 text-[clamp(1.75rem,3.6vw,2.75rem)]">
                Cualquier evento que
                <br />
                merezca una mesa.
              </h2>
            </div>
            <Button href="/crear" variant="outline">
              Elegir mi tipo de evento
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {eventTypes.map((e) => (
              <Link
                key={e.name}
                href="/crear"
                className="rounded-full border border-ink/15 bg-cream px-6 py-3 text-sm transition-all hover:border-clay hover:text-clay"
              >
                {e.name}
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 7.5L5.5 11L12 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.3 6.9.8-5 4.8 1.3 6.8L12 17.5 5.9 20.7 7.2 13.9l-5-4.8 6.9-.8L12 2z" />
    </svg>
  );
}
