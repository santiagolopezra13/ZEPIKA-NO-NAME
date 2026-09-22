"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/lib/brand";
import Wordmark from "@/components/wordmark";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md border-b border-line/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Inicio">
          <Wordmark className="text-[1.6rem] md:text-[1.9rem]" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="group relative text-[0.9rem] text-ink-70 transition-colors hover:text-ink"
            >
              {i.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-sage transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/entrar"
            className="px-3 py-2 text-[0.9rem] text-ink-70 transition-colors hover:text-ink"
          >
            Entrar
          </Link>
          <Link
            href="/crear"
            className="rounded-full bg-forest px-5 py-2.5 text-[0.9rem] text-cream transition-all duration-200 hover:bg-sage-deep"
          >
            Crear mi mesa
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-px w-6 bg-forest transition-all duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-forest transition-all duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`overflow-hidden border-t border-line/60 bg-cream transition-[max-height,opacity] duration-400 lg:hidden ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-5 py-6">
          {nav.map((i, idx) => (
            <Link
              key={i.href}
              href={i.href}
              onClick={() => setOpen(false)}
              className="display border-b border-line/50 py-4 text-3xl"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              {i.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/crear"
              onClick={() => setOpen(false)}
              className="rounded-full bg-forest px-6 py-3.5 text-center text-cream"
            >
              Crear mi mesa
            </Link>
            <Link
              href="/entrar"
              onClick={() => setOpen(false)}
              className="rounded-full border border-ink/20 px-6 py-3.5 text-center"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
