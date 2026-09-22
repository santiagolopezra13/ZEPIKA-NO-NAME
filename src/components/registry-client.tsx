"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mxn } from "@/lib/brand";
import { img } from "@/lib/data";

type Goal = {
  id: string;
  name: string;
  target: number;
  raised: number;
  pct: number;
};
type Gift = {
  id: string;
  name: string;
  brand: string;
  price: number;
  seed: string;
  claimed: boolean;
};

type Target =
  | { kind: "goal"; goal: Goal; amount: number }
  | { kind: "gift"; gift: Gift };

export default function RegistryClient({
  slug,
  goals,
  gifts,
  giftsAvailable,
}: {
  slug: string;
  goals: Goal[];
  gifts: Gift[];
  giftsAvailable: number;
}) {
  const [target, setTarget] = useState<Target | null>(null);

  return (
    <>
      {/* Metas en efectivo */}
      {goals.length > 0 && (
        <section className="border-y border-line bg-shell/40">
          <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-24">
            <p className="eyebrow text-sage-deep">Nuestras metas</p>
            <h2 className="display mt-4 t-1">
              Si prefieren aportar en efectivo
            </h2>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {goals.map((g) => (
                <div
                  key={g.id}
                  className="rounded-[1.75rem] border border-line bg-cream p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="display text-2xl">{g.name}</h3>
                    <p className="display shrink-0 text-2xl text-sage-deep">
                      {g.pct}%
                    </p>
                  </div>

                  <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-sage transition-[width] duration-700"
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>

                  <div className="mt-4 flex items-baseline justify-between text-sm">
                    <p>
                      <span className="display text-xl">{mxn(g.raised)}</span>
                      <span className="text-ink-50"> de {mxn(g.target)}</span>
                    </p>
                    <p className="text-ink-50">
                      {g.raised >= g.target
                        ? "¡Meta cumplida!"
                        : `Faltan ${mxn(g.target - g.raised)}`}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {[500, 1000, 2500, 5000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() =>
                          setTarget({ kind: "goal", goal: g, amount: amt })
                        }
                        className="rounded-full border border-ink/15 px-5 py-2.5 text-sm transition-all hover:border-sage hover:bg-sage-deep hover:text-cream"
                      >
                        {mxn(amt)}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setTarget({ kind: "goal", goal: g, amount: 0 })
                      }
                      className="rounded-full bg-forest px-5 py-2.5 text-sm text-cream transition-colors hover:bg-sage-deep"
                    >
                      Otro monto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mesa de regalos */}
      <section className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-sage-deep">Mesa de regalos</p>
            <h2 className="display mt-4 t-1">
              Lo que nos hace falta
            </h2>
          </div>
          <p className="text-sm text-ink-50">
            {giftsAvailable} de {gifts.length} disponibles · hasta 12 meses sin
            intereses
          </p>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {gifts.map((g) => (
            <article key={g.id} className="group flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-shell">
                <Image
                  src={img(g.seed, 600, 600)}
                  alt={g.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
                  className={`object-cover transition-transform duration-700 ${
                    g.claimed ? "opacity-45 grayscale" : "group-hover:scale-105"
                  }`}
                />
                {g.claimed && (
                  <span className="eyebrow absolute top-3 left-3 rounded-full bg-cream px-3 py-1.5 text-ink-70">
                    Ya lo regalaron
                  </span>
                )}
              </div>

              {g.brand && (
                <p className="eyebrow mt-4 text-ink-50">{g.brand}</p>
              )}
              <h3 className="mt-1.5 flex-1 leading-snug">{g.name}</h3>
              <p className="display mt-2 text-xl">{mxn(g.price)}</p>
              <p className="mt-1 text-xs text-ink-50">
                o 12 × {mxn(Math.round(g.price / 12))} sin intereses
              </p>

              <button
                disabled={g.claimed}
                onClick={() => setTarget({ kind: "gift", gift: g })}
                className={`mt-4 rounded-full py-3 text-sm transition-colors ${
                  g.claimed
                    ? "cursor-not-allowed border border-line text-ink-50"
                    : "bg-forest text-cream hover:bg-sage-deep"
                }`}
              >
                {g.claimed ? "No disponible" : "Regalar esto"}
              </button>
            </article>
          ))}
        </div>
      </section>

      {target && (
        <ContributeDialog
          slug={slug}
          target={target}
          onClose={() => setTarget(null)}
        />
      )}
    </>
  );
}

/* ─────────── Diálogo de aportación ─────────── */

const field =
  "w-full rounded-xl border border-line bg-cream px-4 py-3.5 transition-colors placeholder:text-ink-50 focus:border-sage focus:outline-none";

function ContributeDialog({
  slug,
  target,
  onClose,
}: {
  slug: string;
  target: Target;
  onClose: () => void;
}) {
  const router = useRouter();
  const isGift = target.kind === "gift";
  const fixedAmount = isGift ? target.gift.price : null;

  const [amount, setAmount] = useState(
    isGift ? String(target.gift.price) : target.amount ? String(target.amount) : "",
  );
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [message, setMessage] = useState("");
  const [msi, setMsi] = useState(0);
  const [state, setState] = useState<"form" | "sending" | "done">("form");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const numericAmount = Number(amount) || 0;
  const msiOptions = numericAmount >= 3000 ? [0, 3, 6, 12] : [0];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError(null);

    const res = await fetch(`/api/registries/${slug}/contributions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        giftId: isGift ? target.gift.id : undefined,
        goalId: isGift ? undefined : target.goal.id,
        amount: numericAmount,
        msi,
        guestName,
        guestPhone: guestPhone || undefined,
        message: message || undefined,
      }),
    }).catch(() => null);

    const json = await res?.json().catch(() => null);

    if (!res?.ok || !json?.ok) {
      setError(json?.error ?? "No pudimos registrar el regalo. Intenten de nuevo.");
      setState("form");
      return;
    }

    setState("done");
    router.refresh(); // recarga los datos del servidor: barras y disponibilidad
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-forest/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[1.75rem] border border-line bg-cream p-7 sm:rounded-[1.75rem] md:p-9"
      >
        {state === "done" ? (
          <div className="py-6 text-center">
            <p className="display text-4xl text-sage-deep">¡Gracias!</p>
            <p className="mt-4 text-ink-70">
              {isGift
                ? `Quedó apartado «${target.gift.name}».`
                : `Registramos tu aportación de ${mxn(numericAmount)} a «${target.goal.name}».`}
              {msi > 0 && ` Se cargará en ${msi} pagos sin intereses.`}
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-forest px-7 py-3.5 text-cream transition-colors hover:bg-sage-deep"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow text-sage-deep">
                  {isGift ? "Regalar" : "Aportar a"}
                </p>
                <h3 className="display mt-2 text-2xl">
                  {isGift ? target.gift.name : target.goal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="shrink-0 text-xl text-ink-50 hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="mt-7 grid gap-4">
              {fixedAmount !== null ? (
                <div className="rounded-xl border border-line bg-shell/40 px-4 py-3.5">
                  <p className="text-xs text-ink-50">Monto</p>
                  <p className="display text-2xl">{mxn(fixedAmount)}</p>
                </div>
              ) : (
                <label className="block">
                  <span className="mb-2 block text-sm text-ink-70">
                    ¿Cuánto quieren aportar? (mínimo $100)
                  </span>
                  <input
                    required
                    autoFocus
                    type="number"
                    min={100}
                    step={50}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="1000"
                    className={field}
                  />
                </label>
              )}

              <input
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Tu nombre (así lo verán los anfitriones)"
                aria-label="Nombre"
                className={field}
              />

              <input
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="WhatsApp (opcional, para tu comprobante)"
                aria-label="WhatsApp"
                className={field}
              />

              {msiOptions.length > 1 && (
                <fieldset>
                  <legend className="mb-2 text-sm text-ink-70">
                    Meses sin intereses
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {msiOptions.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMsi(m)}
                        className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                          msi === m
                            ? "border-sage-deep bg-sage-deep text-cream"
                            : "border-line hover:border-ink/30"
                        }`}
                      >
                        {m === 0 ? "Un solo pago" : `${m} MSI`}
                      </button>
                    ))}
                  </div>
                  {msi > 0 && (
                    <p className="mt-2 text-xs text-ink-50">
                      {msi} × {mxn(Math.round(numericAmount / msi))} · los
                      anfitriones reciben el monto completo de inmediato.
                    </p>
                  )}
                </fieldset>
              )}

              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mensaje para los anfitriones (opcional)"
                aria-label="Mensaje"
                className={`${field} resize-none`}
              />

              {error && (
                <p className="rounded-xl bg-sage/10 px-4 py-3 text-sm text-sage-deep">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={state === "sending"}
                className="mt-1 rounded-full bg-forest py-4 text-cream transition-colors hover:bg-sage-deep disabled:opacity-50"
              >
                {state === "sending"
                  ? "Procesando…"
                  : `Confirmar ${mxn(numericAmount)}`}
              </button>

              <p className="text-center text-xs text-ink-50">
                Maqueta: aún no hay pasarela de pago conectada, pero la
                aportación sí se guarda en la base de datos.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
