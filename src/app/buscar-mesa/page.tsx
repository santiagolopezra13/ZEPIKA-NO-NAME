import type { Metadata } from "next";
import SearchRegistry from "@/components/search-registry";
import { Section } from "@/components/section";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Buscar una mesa",
  description:
    "Busquen la mesa de regalos de los novios por nombre y regalen en menos de dos minutos.",
};

export default function SearchPage() {
  return (
    <Section className="!pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-sage-deep">Para invitados</p>
        <h1 className="display mt-4 t-hero">
          Buscar una mesa
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-70">
          Escriban el nombre de los novios o de la persona festejada. No
          necesitan crear cuenta ni instalar nada.
        </p>
      </div>

      <SearchRegistry />

      <div className="mx-auto mt-20 max-w-2xl rounded-[1.75rem] border border-line bg-shell/40 p-8 text-center md:p-10">
        <p className="display text-2xl">¿No la encuentran?</p>
        <p className="mt-3 text-ink-70">
          Pídanles la liga directa a los anfitriones — se ve como{" "}
          <span className="rounded bg-cream px-2 py-1 font-mono text-sm">
            {brand.domain}/mesa/su-nombre
          </span>
          . También pueden escribirnos por WhatsApp y la buscamos por ustedes.
        </p>
      </div>
    </Section>
  );
}
