import { db } from "@/lib/db";
import { fail, ok, rsvpSchema } from "@/lib/validators";

type Ctx = { params: Promise<{ slug: string }> };

/** GET /api/registries/[slug]/rsvp — lista de confirmaciones (panel del anfitrión). */
export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  const registry = await db.registry.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!registry) return fail("No encontramos esa mesa.", 404);

  const rsvps = await db.rsvp.findMany({
    where: { registryId: registry.id },
    orderBy: { createdAt: "desc" },
  });

  const attending = rsvps.filter((r) => r.attending);
  return ok({
    rsvps,
    summary: {
      total: rsvps.length,
      attending: attending.length,
      declined: rsvps.length - attending.length,
      headcount:
        attending.length + attending.reduce((s, r) => s + r.companions, 0),
    },
  });
}

/** POST /api/registries/[slug]/rsvp — confirmación de un invitado. */
export async function POST(req: Request, { params }: Ctx) {
  const { slug } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("El cuerpo de la petición no es JSON válido.");
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return fail("Revisen los datos del formulario.", 422, parsed.error.flatten());
  }
  const input = parsed.data;

  const registry = await db.registry.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!registry) return fail("No encontramos esa mesa.", 404);

  // Un mismo teléfono puede corregir su respuesta: se sobrescribe.
  const rsvp = await db.rsvp.upsert({
    where: { registryId_phone: { registryId: registry.id, phone: input.phone } },
    create: { registryId: registry.id, ...input },
    update: {
      firstName: input.firstName,
      lastName: input.lastName,
      attending: input.attending,
      companions: input.attending ? input.companions : 0,
      message: input.message,
    },
  });

  return ok(
    {
      id: rsvp.id,
      attending: rsvp.attending,
      companions: rsvp.companions,
      message: rsvp.attending
        ? "Confirmación registrada. Enviaremos recordatorios por WhatsApp."
        : "Gracias por avisar. Registramos que no podrán asistir.",
    },
    201,
  );
}
