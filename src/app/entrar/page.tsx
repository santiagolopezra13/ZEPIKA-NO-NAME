import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { img } from "@/lib/data";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Accedan al panel de su mesa de regalos.",
};

const field =
  "w-full rounded-xl border border-sand-dark bg-cream px-4 py-3.5 transition-colors placeholder:text-ink-50 focus:border-clay focus:outline-none";

export default function LoginPage() {
  return (
    <div className="mx-auto grid max-w-[1400px] items-stretch gap-0 px-5 py-12 md:px-10 lg:grid-cols-2 lg:gap-16">
      {/* Formulario */}
      <div className="flex flex-col justify-center py-8 lg:py-16">
        <div className="mx-auto w-full max-w-md">
          <p className="eyebrow text-clay">Panel de anfitriones</p>
          <h1 className="display mt-4 text-[clamp(2.25rem,5vw,3.5rem)]">
            Entrar a mi mesa
          </h1>
          <p className="mt-4 text-ink-70">
            Les mandamos un código por WhatsApp. Sin contraseñas que olvidar.
          </p>

          <form className="mt-10 grid gap-4">
            <input
              type="tel"
              placeholder="WhatsApp (10 dígitos)"
              aria-label="WhatsApp"
              className={field}
            />
            <button
              type="button"
              className="rounded-full bg-ink py-4 text-cream transition-colors hover:bg-clay"
            >
              Enviarme el código
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-sand-dark" />
            <span className="text-xs text-ink-50">o con correo</span>
            <span className="h-px flex-1 bg-sand-dark" />
          </div>

          <form className="grid gap-4">
            <input
              type="email"
              placeholder="tu@correo.com"
              aria-label="Correo electrónico"
              className={field}
            />
            <input
              type="password"
              placeholder="Contraseña"
              aria-label="Contraseña"
              className={field}
            />
            <button
              type="button"
              className="rounded-full border border-ink/20 py-4 transition-colors hover:border-ink/50"
            >
              Entrar
            </button>
          </form>

          <p className="mt-8 text-sm text-ink-70">
            ¿Todavía no tienen mesa?{" "}
            <Link
              href="/crear"
              className="text-clay underline decoration-clay/30 underline-offset-4"
            >
              Crearla gratis
            </Link>
          </p>
          <p className="mt-3 text-sm text-ink-70">
            ¿Son invitados buscando una mesa?{" "}
            <Link
              href="/buscar-mesa"
              className="text-clay underline decoration-clay/30 underline-offset-4"
            >
              Buscarla aquí
            </Link>
          </p>

          <p className="mt-10 text-xs text-ink-50">
            Maqueta de demostración — la autenticación real aún no está
            conectada.
          </p>
        </div>
      </div>

      {/* Visual */}
      <div className="relative hidden overflow-hidden rounded-[2rem] bg-sand lg:block">
        <Image
          src={img("login-visual", 1000, 1300)}
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <blockquote className="absolute inset-x-0 bottom-0 p-12 text-cream">
          <p className="display text-3xl leading-snug">
            “Retiramos ciento ochenta mil y llegaron ciento ochenta mil.”
          </p>
          <footer className="mt-5 text-sm text-cream/70">
            Mariana y Sofía · Boda en Mérida · {brand.name}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
