import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { collections, img } from "@/lib/data";
import { mxn } from "@/lib/brand";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Colecciones",
  description:
    "Mesas de regalos ya armadas por nuestra curaduría: primer hogar, cocina de autor, luna de miel, enganche y más.",
};

export default function CollectionsPage() {
  return (
    <Section className="!pt-12">
      <div className="max-w-3xl">
        <p className="eyebrow text-clay">Colecciones</p>
        <h1 className="display mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">
          Empiecen con una
          <br />
          mesa ya armada.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-70">
          Cada colección la armó nuestro equipo de curaduría con marcas
          mexicanas y clásicos que duran. Tómenla completa, quiten la mitad o
          mezclen dos. Se edita en minutos.
        </p>
      </div>

      <div className="mt-16 space-y-6">
        {collections.map((c, i) => {
          const total = c.products.reduce((s, p) => s + p.price, 0);
          return (
            <Link
              key={c.slug}
              href={`/colecciones/${c.slug}`}
              className="group grid items-stretch gap-0 overflow-hidden rounded-[2rem] border border-sand-dark bg-sand/30 transition-colors hover:border-clay/40 md:grid-cols-[0.8fr_1.2fr]"
            >
              <div
                className={`relative aspect-[4/3] bg-sand md:aspect-auto md:min-h-[320px] ${
                  i % 2 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={img(c.seed, 900, 800)}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-col justify-between p-8 md:p-12">
                <div>
                  <p className="eyebrow text-clay">
                    Colección 0{i + 1}
                  </p>
                  <h2 className="display mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)]">
                    {c.name}
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink-70">
                    {c.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-sand-dark pt-6 text-sm">
                  <span className="text-ink-50">
                    {c.products.length} productos de muestra
                  </span>
                  <span className="text-ink-50">
                    Desde {mxn(Math.min(...c.products.map((p) => p.price)))}
                  </span>
                  <span className="text-ink-50">
                    Valor de la lista {mxn(total)}
                  </span>
                  <span className="ml-auto text-ink transition-transform group-hover:translate-x-1">
                    Ver la colección →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
