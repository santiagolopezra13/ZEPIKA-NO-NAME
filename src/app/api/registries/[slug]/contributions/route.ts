import { db } from "@/lib/db";
import { contributionSchema, fail, ok } from "@/lib/validators";

type Ctx = { params: Promise<{ slug: string }> };

/** GET /api/registries/[slug]/contributions — panel de agradecimientos. */
export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  const registry = await db.registry.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!registry) return fail("No encontramos esa mesa.", 404);

  const contributions = await db.contribution.findMany({
    where: { registryId: registry.id },
    orderBy: { createdAt: "desc" },
    include: {
      gift: { select: { name: true } },
      goal: { select: { name: true } },
    },
  });

  return ok({
    contributions: contributions.map((c) => ({
      id: c.id,
      guestName: c.guestName,
      amount: c.amount,
      msi: c.msi,
      message: c.message,
      thanked: c.thanked,
      concept: c.gift?.name ?? c.goal?.name ?? "Aportación libre",
      createdAt: c.createdAt,
    })),
    summary: {
      count: contributions.length,
      total: contributions
        .filter((c) => c.status === "pagado")
        .reduce((s, c) => s + c.amount, 0),
      pendingThanks: contributions.filter((c) => !c.thanked).length,
    },
  });
}

/**
 * POST /api/registries/[slug]/contributions
 * Registra un regalo o una aportación a una meta.
 * Aquí es donde entraría la pasarela de pago (Stripe / Mercado Pago):
 * hoy se marca "pagado" directo para poder ver el flujo completo.
 */
export async function POST(req: Request, { params }: Ctx) {
  const { slug } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("El cuerpo de la petición no es JSON válido.");
  }

  const parsed = contributionSchema.safeParse(body);
  if (!parsed.success) {
    return fail("Revisen los datos del regalo.", 422, parsed.error.flatten());
  }
  const input = parsed.data;

  const registry = await db.registry.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!registry) return fail("No encontramos esa mesa.", 404);

  // Validar que el regalo o la meta pertenezcan a esta mesa.
  if (input.giftId) {
    const gift = await db.gift.findFirst({
      where: { id: input.giftId, registryId: registry.id },
    });
    if (!gift) return fail("Ese regalo no pertenece a esta mesa.", 404);
    if (gift.claimed) return fail("Alguien más ya regaló esto.", 409);
  }

  if (input.goalId) {
    const goal = await db.goal.findFirst({
      where: { id: input.goalId, registryId: registry.id },
    });
    if (!goal) return fail("Esa meta no pertenece a esta mesa.", 404);
  }

  // Transacción: se crea la aportación y, si es un regalo, se marca apartado.
  const contribution = await db.$transaction(async (tx) => {
    const created = await tx.contribution.create({
      data: {
        registryId: registry.id,
        goalId: input.goalId ?? null,
        giftId: input.giftId ?? null,
        amount: input.amount,
        msi: input.msi,
        guestName: input.guestName,
        guestPhone: input.guestPhone ?? null,
        message: input.message ?? null,
        status: "pagado",
      },
    });

    if (input.giftId) {
      await tx.gift.update({
        where: { id: input.giftId },
        data: { claimed: true },
      });
    }

    return created;
  });

  return ok(
    {
      id: contribution.id,
      amount: contribution.amount,
      msi: contribution.msi,
      message:
        contribution.msi > 0
          ? `Listo. Se cargará en ${contribution.msi} pagos sin intereses.`
          : "Listo. Los anfitriones recibirán el monto completo.",
    },
    201,
  );
}
