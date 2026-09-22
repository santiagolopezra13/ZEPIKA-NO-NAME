import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/lib/brand";
import { img } from "@/lib/data";
import { formatEventDate } from "@/lib/format";
import { getRegistryBySlug } from "@/lib/registries";
import RsvpForm from "@/components/rsvp-form";
import RegistryClient from "@/components/registry-client";

type Props = { params: Promise<{ slug: string }> };

// Los datos cambian en cuanto un invitado regala: siempre al día.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = await getRegistryBySlug(slug);
  if (!r) return { title: "Mesa no encontrada" };
  return {
    title: `${r.title} · ${formatEventDate(r.eventDate)}`,
    description: `Mesa de regalos y confirmación de asistencia de ${r.title}.`,
  };
}

export default async function RegistryPage({ params }: Props) {
  const { slug } = await params;
  const r = await getRegistryBySlug(slug);
  if (!r) notFound();

  const daysLeft = r.eventDate
    ? Math.ceil((r.eventDate.getTime() - Date.now()) / 86_400_000)
    : null;

  return (
    <>
      <div className="bg-clay px-5 py-2.5 text-center text-xs text-cream md:px-10">
        Mesa de ejemplo con datos reales de la base de datos — prueben a regalar
        o confirmar.{" "}
        <Link href="/crear" className="underline underline-offset-2">
          Crear la mía
        </Link>
      </div>

      {/* Portada */}
      <section className="relative h-[68vh] min-h-[480px] w-full overflow-hidden">
        <Image
          src={img(r.heroSeed, 1800, 1100)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative flex h-full flex-col items-center justify-center px-5 text-center text-cream">
          <p className="eyebrow text-cream/70">
            {r.eventType === "Boda" ? "Nos casamos" : r.eventType}
          </p>
          <h1 className="display mt-4 text-[clamp(3rem,10vw,7rem)]">
            {r.title}
          </h1>
          <div className="mt-6 flex flex-col items-center gap-1.5 text-cream/85">
            <p className="text-lg">{formatEventDate(r.eventDate)}</p>
            {r.venue && <p className="text-sm">{r.venue}</p>}
          </div>
          <a
            href="#confirmar"
            className="mt-10 rounded-full bg-cream px-8 py-3.5 text-ink transition-colors hover:bg-gold"
          >
            Confirmar asistencia
          </a>
        </div>
      </section>

      {/* Indicadores en vivo */}
      <section className="border-b border-sand-dark">
        <div className="mx-auto grid max-w-[1400px] gap-px px-5 md:grid-cols-4 md:px-10">
          {[
            daysLeft !== null && daysLeft >= 0
              ? ["Faltan", `${daysLeft} días`]
              : ["Evento", r.eventType],
            ["Invitados confirmados", String(r.stats.guestsConfirmed)],
            ["Regalos disponibles", `${r.stats.giftsAvailable} de ${r.stats.giftsTotal}`],
            ["Detalles enviados", `${r.stats.contributions} regalos`],
          ].map(([k, v]) => (
            <div
              key={k}
              className="border-b border-sand-dark py-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <p className="eyebrow text-ink-50">{k}</p>
              <p className="display mt-2 text-2xl">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mensaje */}
      {r.message && (
        <section className="mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
          <p className="display text-[clamp(1.5rem,3.2vw,2.25rem)] leading-snug">
            “{r.message}”
          </p>
        </section>
      )}

      {/* Metas + regalos (interactivos, escriben en la base) */}
      <RegistryClient
        slug={r.slug}
        goals={r.goals}
        gifts={r.gifts}
        giftsAvailable={r.stats.giftsAvailable}
      />

      {/* Confirmación */}
      <section
        id="confirmar"
        className="relative overflow-hidden bg-ink text-cream"
      >
        <div className="paper relative mx-auto grid max-w-[1400px] gap-14 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Confirmación</p>
            <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] text-cream">
              ¿Nos acompañan?
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-cream/70">
              Confírmennos con tiempo para poder apartar sus lugares. Si tienen
              alguna restricción de comida, déjenla en el mensaje.
            </p>

            <dl className="mt-10 space-y-6 border-t border-cream/15 pt-8">
              {[
                ["Ceremonia", "17:00 h · Capilla de la hacienda"],
                ["Recepción", "19:00 h · Jardín principal"],
                ["Código de vestimenta", "Formal · evitar blanco"],
                ["Transporte", "Camión desde Toluca a las 15:00 h"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6">
                  <dt className="text-sm text-cream/45">{k}</dt>
                  <dd className="text-right text-sm text-cream/90">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <RsvpForm slug={r.slug} />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 text-center md:px-10">
        <p className="text-sm text-ink-50">
          Mesa administrada con {brand.name}
        </p>
        <Link
          href="/crear"
          className="display mt-2 inline-block text-2xl transition-colors hover:text-clay"
        >
          Crear su propia mesa →
        </Link>
      </section>
    </>
  );
}
