import type { Metadata } from "next";
import Image from "next/image";
import { brand, mxn } from "@/lib/brand";
import { differentiators, img, steps } from "@/lib/data";
import { Button, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "De crear la mesa a retirar el dinero: el proceso completo, para ustedes y para sus invitados.",
};

const forGuests = [
  ["Abren la liga", "No bajan nada, no crean cuenta, no dan contraseña."],
  ["Eligen el regalo", "O aportan a una meta desde 500 pesos."],
  ["Pagan como quieran", "Tarjeta, SPEI, OXXO o hasta 12 MSI."],
  ["Dejan su mensaje", "Ustedes lo leen en su panel de agradecimientos."],
];

const forYou = [
  ["Panel en tiempo real", "Quién regaló qué, cuánto entró, quién confirmó."],
  ["Retiro cuando quieran", "Por SPEI, en menos de 24 horas hábiles."],
  ["Envío consolidado", "Guardamos los regalos y los entregamos juntos."],
  ["Un año de vigencia", "La mesa sigue viva 12 meses después del evento."],
];

export default function HowItWorksPage() {
  return (
    <>
      <Section className="!pb-12 !pt-12">
        <div className="max-w-3xl">
          <p className="eyebrow text-clay">Cómo funciona</p>
          <h1 className="display mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">
            Del primer clic
            <br />
            al retiro.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-70">
            Sin asesores obligatorios, sin cotizaciones por correo, sin esperar
            tres días a que alguien les active la cuenta. Todo el proceso se
            hace solo, desde el celular.
          </p>
        </div>
      </Section>

      {/* Pasos grandes */}
      <Section className="!pt-0">
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="grid items-center gap-0 overflow-hidden rounded-[2rem] border border-sand-dark bg-sand/30 md:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="p-9 md:p-14">
                <p className="display text-6xl text-sand-dark">{s.n}</p>
                <h2 className="display mt-5 text-[clamp(1.75rem,3.2vw,2.5rem)]">
                  {s.title}
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-70">
                  {s.body}
                </p>
              </div>
              <div
                className={`relative aspect-[4/3] bg-sand md:aspect-auto md:min-h-[340px] ${
                  i % 2 ? "md:order-first" : ""
                }`}
              >
                <Image
                  src={img(`step-${s.n}`, 900, 760)}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Dos lados */}
      <section className="border-y border-sand-dark bg-sand/40">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 md:px-10 md:py-28 lg:grid-cols-2">
          {[
            {
              eyebrow: "Para sus invitados",
              title: "Cuatro toques y ya regalaron.",
              body: "La razón número uno por la que una mesa de regalos falla es que la tía no le entendió. Aquí no hay app, ni registro, ni carrito raro.",
              items: forGuests,
            },
            {
              eyebrow: "Para ustedes",
              title: "Control total, sin llamadas.",
              body: "Todo lo que pasa en su mesa lo ven en un solo panel, y el dinero sale cuando ustedes digan.",
              items: forYou,
            },
          ].map((block) => (
            <div key={block.eyebrow}>
              <p className="eyebrow text-clay">{block.eyebrow}</p>
              <h2 className="display mt-4 text-[clamp(1.75rem,3.4vw,2.5rem)]">
                {block.title}
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-ink-70">
                {block.body}
              </p>
              <ol className="mt-9 border-t border-sand-dark">
                {block.items.map(([t, d], idx) => (
                  <li
                    key={t}
                    className="flex gap-5 border-b border-sand-dark py-5"
                  >
                    <span className="display shrink-0 text-lg text-clay">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-medium">{t}</span>
                      <span className="mt-1 block text-sm text-ink-70">
                        {d}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Por qué nosotros */}
      <Section>
        <p className="eyebrow text-clay">La diferencia</p>
        <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4.4vw,3.4rem)]">
          Cuatro cosas que nadie más está haciendo en México.
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {differentiators.map((d) => (
            <div
              key={d.title}
              className="rounded-[1.75rem] border border-sand-dark p-8 md:p-10"
            >
              <p className="display text-5xl text-clay">{d.metric}</p>
              <h3 className="display mt-5 text-2xl">{d.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-70">{d.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Button href="/crear">Crear mi mesa gratis</Button>
          <Button href={brand.whatsappUrl} variant="outline">
            Preguntar por WhatsApp
          </Button>
          <p className="text-sm text-ink-50">
            Planes desde {mxn(0)} · sin tarjeta para empezar
          </p>
        </div>
      </Section>
    </>
  );
}
