import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center">
      <p className="display t-hero leading-none text-line">
        404
      </p>
      <h1 className="display mt-6 text-3xl">Esta página no existe</h1>
      <p className="mt-4 text-ink-70">
        Puede que la mesa sea privada o que la liga esté mal escrita. Prueben
        buscarla por nombre.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/buscar-mesa"
          className="rounded-full bg-forest px-7 py-3.5 text-cream transition-colors hover:bg-sage-deep"
        >
          Buscar una mesa
        </Link>
        <Link
          href="/"
          className="rounded-full border border-ink/20 px-7 py-3.5 transition-colors hover:border-ink/50"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
