"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatEventDate } from "@/lib/format";

type Result = {
  slug: string;
  title: string;
  eventType: string;
  eventDate: string | null;
  venue: string | null;
  published: boolean;
};

export default function SearchRegistry() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/registries?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        setResults(json.ok ? json.data : []);
        setSearched(true);
      } catch {
        // búsqueda cancelada por una tecla nueva: se ignora
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [q]);

  return (
    <div className="mx-auto mt-14 max-w-2xl">
      <div className="flex items-center gap-3 rounded-full border border-sand-dark bg-cream px-6 py-2 transition-colors focus-within:border-clay">
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0 text-ink-50"
          aria-hidden
        >
          <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M13 13L17.5 17.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ana y Diego, Regina, Mérida…"
          aria-label="Buscar una mesa de regalos"
          className="w-full bg-transparent py-3 placeholder:text-ink-50 focus:outline-none"
        />
        {loading && (
          <span className="shrink-0 text-xs text-ink-50">Buscando…</span>
        )}
        {q && !loading && (
          <button
            onClick={() => setQ("")}
            aria-label="Limpiar búsqueda"
            className="shrink-0 text-ink-50 hover:text-ink"
          >
            ✕
          </button>
        )}
      </div>

      {q.trim().length < 2 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-ink-50">Prueben con:</span>
          {["Ana", "Regina", "Mérida", "XV años"].map((s) => (
            <button
              key={s}
              onClick={() => setQ(s)}
              className="rounded-full border border-sand-dark px-4 py-2 text-sm transition-colors hover:border-clay hover:text-clay"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {searched && (
        <div className="mt-8">
          <p className="text-sm text-ink-50">
            {results.length === 0
              ? "No encontramos ninguna mesa con ese nombre."
              : `${results.length} ${
                  results.length === 1 ? "mesa" : "mesas"
                } encontrada${results.length === 1 ? "" : "s"}`}
          </p>

          <ul className="mt-4 divide-y divide-sand-dark border-y border-sand-dark">
            {results.map((r) => (
              <li key={r.slug}>
                {r.published ? (
                  <Link
                    href={`/mesa/${r.slug}`}
                    className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-clay"
                  >
                    <Row r={r} />
                    <span className="shrink-0 text-sm transition-transform group-hover:translate-x-1">
                      Ver la mesa →
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between gap-6 py-5">
                    <Row r={r} />
                    <span className="shrink-0 rounded-full bg-sand px-3 py-1.5 text-xs text-ink-50">
                      Privada
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Row({ r }: { r: Result }) {
  return (
    <div>
      <p className="display text-xl">{r.title}</p>
      <p className="mt-1 text-sm text-ink-50">
        {[
          r.eventType,
          formatEventDate(r.eventDate ? new Date(r.eventDate) : null),
          r.venue,
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>
    </div>
  );
}
