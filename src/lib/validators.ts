import { z } from "zod";

export const phoneMx = z
  .string()
  .transform((s) => s.replace(/\D/g, ""))
  .refine((s) => s.length === 10 || s.length === 12, {
    message: "Teléfono inválido: se esperan 10 dígitos.",
  });

export const createRegistrySchema = z.object({
  title: z.string().min(3, "El nombre es muy corto.").max(80),
  eventType: z.string().min(2).max(40).default("Boda"),
  goal: z.string().max(60).optional(),
  collection: z.string().max(60).optional(),
  eventDate: z.string().datetime().optional(),
  venue: z.string().max(140).optional(),
  message: z.string().max(600).optional(),
  hostPhone: phoneMx.optional(),
  hostName: z.string().max(80).optional(),
});

export const rsvpSchema = z.object({
  firstName: z.string().min(2, "Falta el nombre.").max(60),
  lastName: z.string().min(2, "Falta el apellido.").max(60),
  phone: phoneMx,
  attending: z.boolean().default(true),
  companions: z.coerce.number().int().min(0).max(10).default(0),
  message: z.string().max(600).optional(),
});

export const contributionSchema = z
  .object({
    goalId: z.string().optional(),
    giftId: z.string().optional(),
    amount: z.coerce.number().int().min(100, "El mínimo es $100 MXN."),
    msi: z.union([z.literal(0), z.literal(3), z.literal(6), z.literal(12)]).default(0),
    guestName: z.string().min(2, "Falta su nombre.").max(80),
    guestPhone: phoneMx.optional(),
    message: z.string().max(600).optional(),
  })
  .refine((v) => Boolean(v.goalId) !== Boolean(v.giftId), {
    message: "Indique una meta o un regalo, no ambos.",
  });

/** Respuesta de error uniforme para todas las rutas. */
export function fail(message: string, status = 400, details?: unknown) {
  return Response.json({ ok: false, error: message, details }, { status });
}

export function ok(data: unknown, status = 200) {
  return Response.json({ ok: true, data }, { status });
}
