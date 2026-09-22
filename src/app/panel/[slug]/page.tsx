import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { mxn } from "@/lib/brand";
import { formatDateTime, formatEventDate } from "@/lib/format";
import { getRegistryBySlug } from "@/lib/registries";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Panel · ${slug}` };
}

export default async function PanelPage({ params }: Props) {
  const { slug } = await params;
  const registry = await getRegistryBySlug(slug);
  if (!registry) notFound();

  const [contributions, rsvps] = await Promise.all([
    db.contribution.findMany({
      where: { registryId: registry.id },
      orderBy: { createdAt: "desc" },
      include: {
        gift: { select: { name: true } },
        goal: { select: { name: true } },
      },
    }),
    db.rsvp.findMany({
      where: { registryId: registry.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const paid = contributions.filter((c) => c.status === "pagado");
  const total = paid.reduce((s, c) => s + c.amount, 0);
  const commission = registry.plan === "esencial" ? Math.round(total * 0.04) : 0;
  const attending = rsvps.filter((r) => r.attending);
  const declined = rsvps.length - attending.length;

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-16">
      {/* Encabezado */}
      <div className="flex flex-col gap-6 border-b border-sand-dark pb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-clay">Panel del anfitrión</p>
          <h1 className="display mt-3 text-[clamp(2rem,5vw,3.5rem)]">
            {registry.title}
          </h1>
          <p className="mt-2 text-ink-70">
            {registry.eventType} · {formatEventDate(registry.eventDate)}
            {registry.venue && ` · ${registry.venue}`}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/mesa/${registry.slug}`}
            className="rounded-full bg-ink px-6 py-3 text-sm text-cream transition-colors hover:bg-clay"
          >
            Ver mesa pública
          </Link>
          <span
            className={`rounded-full border px-5 py-3 text-sm ${
              registry.published
                ? "border-olive/40 bg-olive/10 text-olive"
                : "border-sand-dark text-ink-50"
            }`}
          >
            {registry.published ? "Publicada" : "Borrador"}
          </span>
          <span className="rounded-full border border-sand-dark px-5 py-3 text-sm capitalize">
            Plan {registry.plan}
          </span>
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid gap-px border-b border-sand-dark py-10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Recaudado", mxn(total), `${paid.length} aportaciones`],
          [
            "Disponible para retiro",
            mxn(total - commission),
            commission > 0
              ? `menos ${mxn(commission)} de comisión (4%)`
              : "0% de comisión · plan Completo",
          ],
          [
            "Invitados confirmados",
            String(registry.stats.guestsConfirmed),
            `${attending.length} respuestas · ${declined} no asisten`,
          ],
          [
            "Regalos apartados",
            `${registry.stats.giftsTotal - registry.stats.giftsAvailable} de ${registry.stats.giftsTotal}`,
            `${registry.stats.giftsAvailable} siguen disponibles`,
          ],
        ].map(([label, value, hint]) => (
          <div key={label} className="pr-6">
            <p className="eyebrow text-ink-50">{label}</p>
            <p className="display mt-2 text-[2rem] leading-none">{value}</p>
            <p className="mt-2 text-xs text-ink-50">{hint}</p>
          </div>
        ))}
      </div>

      {/* Metas */}
      {registry.goals.length > 0 && (
        <section className="border-b border-sand-dark py-12">
          <h2 className="display text-2xl">Avance de metas</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {registry.goals.map((g) => (
              <div
                key={g.id}
                className="rounded-2xl border border-sand-dark bg-sand/30 p-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-medium">{g.name}</p>
                  <p className="display text-xl text-clay">{g.pct}%</p>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-sand-dark">
                  <div
                    className="h-full rounded-full bg-clay"
                    style={{ width: `${g.pct}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-ink-50">
                  {mxn(g.raised)} de {mxn(g.target)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Dos columnas: aportaciones + confirmaciones */}
      <div className="grid gap-14 py-12 lg:grid-cols-2">
        <section>
          <div className="flex items-end justify-between gap-4">
            <h2 className="display text-2xl">Agradecimientos pendientes</h2>
            <p className="text-sm text-ink-50">
              {contributions.filter((c) => !c.thanked).length} sin agradecer
            </p>
          </div>

          {contributions.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-sand-dark bg-sand/30 p-6 text-sm text-ink-50">
              Todavía no hay aportaciones. Compartan su liga para empezar.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-sand-dark border-y border-sand-dark">
              {contributions.map((c) => (
                <li key={c.id} className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{c.guestName}</p>
                      <p className="mt-0.5 text-sm text-ink-50">
                        {c.gift?.name ?? c.goal?.name ?? "Aportación libre"}
                        {c.msi > 0 && ` · ${c.msi} MSI`}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="display text-lg">{mxn(c.amount)}</p>
                      <p className="text-xs text-ink-50">
                        {formatDateTime(c.createdAt)}
                      </p>
                    </div>
                  </div>
                  {c.message && (
                    <p className="mt-3 border-l-2 border-clay/40 pl-4 text-sm text-ink-70 italic">
                      “{c.message}”
                    </p>
                  )}
                  {!c.thanked && (
                    <span className="mt-3 inline-block rounded-full bg-clay/10 px-3 py-1 text-xs text-clay">
                      Pendiente de agradecer
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="flex items-end justify-between gap-4">
            <h2 className="display text-2xl">Confirmaciones</h2>
            <p className="text-sm text-ink-50">
              {registry.stats.guestsConfirmed} personas
            </p>
          </div>

          {rsvps.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-sand-dark bg-sand/30 p-6 text-sm text-ink-50">
              Nadie ha confirmado todavía.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-sand-dark border-y border-sand-dark">
              {rsvps.map((r) => (
                <li
                  key={r.id}
                  className="flex items-start justify-between gap-4 py-4"
                >
                  <div>
                    <p className="font-medium">
                      {r.firstName} {r.lastName}
                      {r.companions > 0 && (
                        <span className="text-ink-50"> +{r.companions}</span>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-50">{r.phone}</p>
                    {r.message && (
                      <p className="mt-1.5 text-sm text-ink-70 italic">
                        “{r.message}”
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                      r.attending
                        ? "bg-olive/12 text-olive"
                        : "bg-sand text-ink-50"
                    }`}
                  >
                    {r.attending ? "Asiste" : "No asiste"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <p className="border-t border-sand-dark pt-8 text-xs text-ink-50">
        Panel de demostración: todavía sin autenticación. En producción esta
        ruta queda detrás del inicio de sesión del anfitrión.
      </p>
    </div>
  );
}
