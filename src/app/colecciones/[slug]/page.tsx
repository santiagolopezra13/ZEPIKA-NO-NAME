import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { collections, img } from "@/lib/data";
import { mxn } from "@/lib/brand";
import { Button, Section } from "@/components/section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) return { title: "Colección" };
  return { title: c.name, description: c.description };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const total = collection.products.reduce((s, p) => s + p.price, 0);
  const others = collections.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Encabezado */}
      <Section className="!pb-10 !pt-10">
        <Link
          href="/colecciones"
          className="text-sm text-ink-50 transition-colors hover:text-sage-deep"
        >
          ← Todas las colecciones
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow text-sage-deep">Colección</p>
            <h1 className="display mt-4 t-hero">
              {collection.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-70">
              {collection.description}
            </p>

            <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5">
              {[
                ["Productos de muestra", String(collection.products.length)],
                ["Valor de la lista", mxn(total)],
                [
                  "Regalo promedio",
                  mxn(Math.round(total / collection.products.length)),
                ],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow text-ink-50">{k}</dt>
                  <dd className="display mt-1.5 text-2xl">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/crear">Usar esta colección</Button>
              <Button href="/mesa/ana-y-diego" variant="outline">
                Ver cómo se ve publicada
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-shell lg:aspect-[4/4.2]">
            <Image
              src={img(collection.seed, 1000, 1100)}
              alt={collection.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Productos */}
      <Section className="!pt-10">
        <div className="rule" />
        <h2 className="display mt-12 text-3xl">Lo que incluye</h2>
        <p className="mt-2 text-ink-70">
          Una muestra de la selección. Al crear su mesa pueden quitar, agregar o
          cambiar cualquier cosa.
        </p>

        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {collection.products.map((p) => (
            <article key={p.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-shell">
                <Image
                  src={img(p.seed, 700, 700)}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-4 text-ink-50">{p.brand}</p>
              <h3 className="mt-1.5 leading-snug">{p.name}</h3>
              <p className="display mt-1.5 text-xl">{mxn(p.price)}</p>
              <p className="mt-1 text-xs text-ink-50">
                o 12 × {mxn(Math.round(p.price / 12))} sin intereses
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Otras colecciones */}
      <Section className="!pt-0">
        <div className="rule" />
        <h2 className="display mt-12 text-3xl">Otras colecciones</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/colecciones/${c.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-shell">
                <Image
                  src={img(c.seed, 700, 520)}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="display mt-3 text-xl">{c.name}</p>
              <p className="text-sm text-ink-50">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
