"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/lib/brand";
import { collections, eventTypes } from "@/lib/data";
import { slugify } from "@/lib/slug";

const field =
  "w-full rounded-xl border border-line bg-cream px-4 py-3.5 transition-colors placeholder:text-ink-50 focus:border-sage focus:outline-none";

const goalOptions = [
  "Empezar la casa",
  "Luna de miel",
  "Enganche o remodelación",
  "Una mezcla de todo",
];

const stepsMeta = ["Tipo de evento", "Para qué es", "Punto de partida", "Sus datos"];

type Created = { slug: string; url: string; gifts: number; goals: number };

export default function CreateWizard() {
  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [collection, setCollection] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [phone, setPhone] = useState("");

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<Created | null>(null);

  const previewSlug = slugify(title) || "su-nombre";

  const canAdvance = [
    Boolean(eventType),
    Boolean(goal),
    Boolean(collection),
    title.trim().length > 2,
  ][step];

  async function create() {
    setSending(true);
    setError(null);

    const res = await fetch("/api/registries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        eventType: eventType ?? "Boda",
        goal: goal ?? undefined,
        collection: collection ?? undefined,
        venue: venue.trim() || undefined,
        hostPhone: phone.replace(/\D/g, "") || undefined,
        hostName: title.trim(),
      }),
    }).catch(() => null);

    const json = await res?.json().catch(() => null);

    if (!res?.ok || !json?.ok) {
      setError(
        json?.error ?? "No pudimos crear la mesa. Intenten de nuevo en un momento.",
      );
      setSending(false);
      return;
    }

    setCreated(json.data);
    setSending(false);
  }

  /* ─── Confirmación ─── */
  if (created) {
    return (
      <div className="mx-auto mt-16 max-w-2xl rounded-[2rem] border border-line bg-shell/40 p-9 text-center md:p-14">
        <p className="display text-4xl text-sage-deep">Su mesa está creada</p>
        <p className="mt-5 text-ink-70">
          Quedó guardada en la base de datos con {created.gifts} regalos
          {created.goals > 0 && ` y ${created.goals} metas`}. Esta es la única
          liga que tienen que mandar a sus invitados.
        </p>

        <p className="mt-7 rounded-xl border border-line bg-cream px-5 py-4 font-mono text-sm break-all">
          {brand.domain}{created.url}
        </p>

        <dl className="mt-9 space-y-3 text-left text-sm">
          {[
            ["Evento", eventType],
            ["Objetivo", goal],
            ["Punto de partida", collection],
            ["Liga interna", created.url],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between gap-6 border-b border-line pb-3"
            >
              <dt className="text-ink-50">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={created.url}
            className="rounded-full bg-forest px-7 py-3.5 text-cream transition-colors hover:bg-sage-deep"
          >
            Abrir mi mesa
          </Link>
          <Link
            href={`/panel/${created.slug}`}
            className="rounded-full border border-ink/20 px-7 py-3.5 transition-colors hover:border-ink/50"
          >
            Ir a mi panel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-14 max-w-3xl">
      {/* Progreso */}
      <div className="flex items-center gap-2">
        {stepsMeta.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1 rounded-full transition-colors duration-400 ${
                i <= step ? "bg-sage" : "bg-line"
              }`}
            />
            <p
              className={`mt-2.5 hidden text-xs transition-colors sm:block ${
                i <= step ? "text-ink" : "text-ink-50"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[2rem] border border-line bg-shell/30 p-8 md:p-12">
        {step === 0 && (
          <Fieldset
            title="¿Qué están celebrando?"
            hint="Esto define las plantillas y el tono del sitio."
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {eventTypes.map((e) => (
                <Choice
                  key={e.name}
                  active={eventType === e.name}
                  onClick={() => setEventType(e.name)}
                >
                  {e.name}
                </Choice>
              ))}
            </div>
          </Fieldset>
        )}

        {step === 1 && (
          <Fieldset
            title="¿Para qué quieren la mesa?"
            hint="Con esto les creamos las metas en efectivo automáticamente."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {goalOptions.map((g) => (
                <Choice key={g} active={goal === g} onClick={() => setGoal(g)}>
                  {g}
                </Choice>
              ))}
            </div>
          </Fieldset>
        )}

        {step === 2 && (
          <Fieldset
            title="¿Con qué colección empezamos?"
            hint="Los productos de la colección entran a su mesa. Podrán quitar y agregar después."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {collections.map((c) => (
                <Choice
                  key={c.slug}
                  active={collection === c.name}
                  onClick={() => setCollection(c.name)}
                >
                  <span className="block">{c.name}</span>
                  <span className="mt-1 block text-xs text-ink-50">
                    {c.products.length} productos · {c.blurb}
                  </span>
                </Choice>
              ))}
              <Choice
                active={collection === "Empezar desde cero"}
                onClick={() => setCollection("Empezar desde cero")}
              >
                <span className="block">Empezar desde cero</span>
                <span className="mt-1 block text-xs text-ink-50">
                  Ya sabemos qué queremos.
                </span>
              </Choice>
            </div>
          </Fieldset>
        )}

        {step === 3 && (
          <Fieldset
            title="¿Cómo se llama su mesa?"
            hint="Con esto armamos su liga. Todo se puede cambiar después."
          >
            <div className="grid gap-4">
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ana y Diego"
                aria-label="Nombre de la mesa"
                className={field}
              />
              <input
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Lugar del evento (opcional)"
                aria-label="Lugar"
                className={field}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Su WhatsApp, 10 dígitos (opcional)"
                aria-label="WhatsApp"
                className={field}
              />
              <p className="text-sm text-ink-50">
                Su liga quedaría:{" "}
                <span className="font-mono text-ink">
                  {brand.domain}/mesa/{previewSlug}
                </span>
              </p>
            </div>
          </Fieldset>
        )}

        {error && (
          <p className="mt-6 rounded-xl bg-sage/10 px-4 py-3 text-sm text-sage-deep">
            {error}
          </p>
        )}

        {/* Navegación */}
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-8">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || sending}
            className="text-sm text-ink-50 transition-colors hover:text-ink disabled:invisible"
          >
            ← Atrás
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-ink-50">
              Paso {step + 1} de {stepsMeta.length}
            </span>
            <button
              onClick={() => (step === 3 ? create() : setStep((s) => s + 1))}
              disabled={!canAdvance || sending}
              className="rounded-full bg-forest px-7 py-3.5 text-[0.95rem] text-cream transition-colors hover:bg-sage-deep disabled:cursor-not-allowed disabled:opacity-30"
            >
              {sending
                ? "Creando…"
                : step === 3
                  ? "Crear mi mesa"
                  : "Siguiente"}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-ink-50">
        ¿Prefieren que alguien lo haga con ustedes?{" "}
        <Link
          href={brand.whatsappUrl}
          className="tap text-sage-deep underline decoration-sage-deep/30 underline-offset-4"
        >
          Escríbannos por WhatsApp
        </Link>
      </p>
    </div>
  );
}

function Fieldset({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="display t-1">{title}</h2>
      <p className="mt-2.5 text-ink-70">{hint}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl border px-5 py-4 text-left text-[0.95rem] transition-all duration-200 ${
        active
          ? "border-sage bg-cream shadow-[inset_0_0_0_1px_var(--color-sage-deep)]"
          : "border-line bg-cream/60 hover:border-ink/25"
      }`}
    >
      {children}
    </button>
  );
}
