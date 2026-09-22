import type { Metadata } from "next";
import CreateWizard from "@/components/create-wizard";

export const metadata: Metadata = {
  title: "Crear mi mesa",
  description:
    "Armen su mesa de regalos en minutos. Sin tarjeta, sin contratos, sin esperar aprobación.",
};

export default function CreatePage() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-sage-deep">Crear mi mesa</p>
        <h1 className="display mt-4 t-hero">
          Cuatro preguntas
          <br />
          y queda lista.
        </h1>
        <p className="mt-5 text-ink-70">
          No pedimos tarjeta ni documentos para empezar. Pueden cambiar todo
          después.
        </p>
      </div>

      <CreateWizard />
    </div>
  );
}
