"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const field =
  "w-full rounded-xl border border-cream/20 bg-cream/[0.06] px-4 py-3.5 text-cream placeholder:text-cream/35 transition-colors focus:border-gold focus:outline-none";

export default function RsvpForm({ slug }: { slug: string }) {
  const router = useRouter();
  const [attending, setAttending] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [companions, setCompanions] = useState(0);
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"form" | "sending" | "done">("form");
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError(null);

    const res = await fetch(`/api/registries/${slug}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        attending,
        companions: attending ? companions : 0,
        message: message || undefined,
      }),
    }).catch(() => null);

    const json = await res?.json().catch(() => null);

    if (!res?.ok || !json?.ok) {
      setError(
        json?.error ??
          "No pudimos registrar la confirmación. Revisen el teléfono (10 dígitos).",
      );
      setState("form");
      return;
    }

    setServerMessage(json.data.message);
    setState("done");
    router.refresh(); // actualiza el contador de invitados confirmados
  }

  if (state === "done") {
    return (
      <div className="flex flex-col items-start justify-center rounded-[1.75rem] border border-gold/40 bg-cream/[0.06] p-10">
        <p className="display text-3xl text-gold">¡Quedó registrado!</p>
        <p className="mt-4 max-w-sm text-cream/75">{serverMessage}</p>
        <button
          onClick={() => {
            setState("form");
            setFirstName("");
            setLastName("");
            setPhone("");
            setMessage("");
            setCompanions(0);
          }}
          className="mt-8 text-sm text-gold underline underline-offset-4"
        >
          Registrar otra respuesta
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[1.75rem] border border-cream/15 bg-cream/[0.04] p-7 md:p-9"
    >
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nombre"
            aria-label="Nombre"
            className={field}
          />
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Apellido"
            aria-label="Apellido"
            className={field}
          />
        </div>

        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="WhatsApp (10 dígitos)"
          aria-label="WhatsApp"
          className={field}
        />

        <fieldset>
          <legend className="mb-2.5 text-sm text-cream/55">
            ¿Van a poder venir?
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                [true, "Sí, ahí estaremos"],
                [false, "No podré asistir"],
              ] as const
            ).map(([val, label]) => (
              <button
                key={label}
                type="button"
                onClick={() => setAttending(val)}
                className={`rounded-xl border px-4 py-3.5 text-sm transition-colors ${
                  attending === val
                    ? "border-gold bg-gold text-ink"
                    : "border-cream/20 text-cream/80 hover:border-cream/45"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        {attending && (
          <select
            aria-label="Número de acompañantes"
            value={companions}
            onChange={(e) => setCompanions(Number(e.target.value))}
            className={`${field} appearance-none`}
          >
            <option value={0}>Voy solo / sola</option>
            <option value={1}>+1 acompañante</option>
            <option value={2}>+2 acompañantes</option>
            <option value={3}>+3 acompañantes</option>
          </select>
        )}

        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Restricciones de comida o un mensaje para nosotros (opcional)"
          aria-label="Mensaje"
          className={`${field} resize-none`}
        />

        {error && (
          <p className="rounded-xl bg-gold/15 px-4 py-3 text-sm text-gold">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "sending"}
          className="mt-2 rounded-full bg-cream py-4 text-ink transition-colors hover:bg-gold disabled:opacity-50"
        >
          {state === "sending" ? "Enviando…" : "Enviar confirmación"}
        </button>
      </div>
    </form>
  );
}
