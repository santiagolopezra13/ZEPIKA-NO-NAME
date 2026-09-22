import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/lib/brand";

type Props = { params: Promise<{ doc: string }> };

const docs: Record<string, { title: string; sections: [string, string][] }> = {
  privacidad: {
    title: "Aviso de privacidad",
    sections: [
      [
        "Responsable",
        `${brand.legalName}, con domicilio en ${brand.city}, México, es responsable del tratamiento de sus datos personales.`,
      ],
      [
        "Datos que recabamos",
        "Nombre, teléfono de WhatsApp, correo electrónico y, en el caso de los anfitriones, datos bancarios para el retiro de fondos. De los invitados recabamos nombre, teléfono y el mensaje que decidan dejar.",
      ],
      [
        "Para qué los usamos",
        "Para operar su mesa de regalos, enviar invitaciones y recordatorios, procesar pagos, dispersar fondos y dar soporte. No vendemos ni rentamos datos a terceros.",
      ],
      [
        "Derechos ARCO",
        `Pueden solicitar el acceso, rectificación, cancelación u oposición al tratamiento de sus datos escribiendo a ${brand.email}. Respondemos en un máximo de 20 días hábiles.`,
      ],
      [
        "Documento pendiente",
        "Este texto es un borrador de maqueta. Antes de operar comercialmente debe ser revisado por un abogado y registrado conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
      ],
    ],
  },
  terminos: {
    title: "Términos y condiciones",
    sections: [
      [
        "El servicio",
        `${brand.name} es una plataforma que permite crear una mesa de regalos digital, un sitio de evento e invitaciones con confirmación de asistencia.`,
      ],
      [
        "Planes y comisiones",
        "El plan Esencial es gratuito y retiene 4% al momento del retiro. Los planes Completo y Atelier son de pago único y no retienen comisión sobre lo recaudado.",
      ],
      [
        "Retiros",
        "Los anfitriones pueden solicitar el retiro en cualquier momento. La dispersión se hace por SPEI a la cuenta registrada en un plazo máximo de 24 horas hábiles.",
      ],
      [
        "Cancelaciones",
        "El plan se reembolsa íntegro hasta 60 días después de la compra. Los invitados pueden solicitar la devolución de su aportación antes de que el anfitrión la retire.",
      ],
      [
        "Documento pendiente",
        "Este texto es un borrador de maqueta y no constituye un contrato vigente. Requiere revisión legal antes de operar.",
      ],
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { doc } = await params;
  return { title: docs[doc]?.title ?? "Legal" };
}

export default async function LegalPage({ params }: Props) {
  const { doc } = await params;
  const content = docs[doc];
  if (!content) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <p className="eyebrow text-sage-deep">Legal</p>
      <h1 className="display mt-4 t-hero">
        {content.title}
      </h1>

      <div className="mt-14 space-y-10">
        {content.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2 className="display text-2xl">{heading}</h2>
            <p className="mt-3 leading-relaxed text-ink-70">{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
