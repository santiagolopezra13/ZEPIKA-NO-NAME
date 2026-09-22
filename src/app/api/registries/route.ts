import { db } from "@/lib/db";
import { collections } from "@/lib/data";
import { slugify } from "@/lib/slug";
import { createRegistrySchema, fail, ok } from "@/lib/validators";

/** GET /api/registries?q=ana — búsqueda pública de mesas publicadas. */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) return ok([]);

  const rows = await db.registry.findMany({
    where: {
      OR: [
        { title: { contains: q } },
        { venue: { contains: q } },
        { eventType: { contains: q } },
      ],
    },
    orderBy: { eventDate: "asc" },
    take: 20,
    select: {
      slug: true,
      title: true,
      eventType: true,
      eventDate: true,
      venue: true,
      published: true,
    },
  });

  return ok(rows);
}

/** POST /api/registries — crea una mesa desde el asistente. */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("El cuerpo de la petición no es JSON válido.");
  }

  const parsed = createRegistrySchema.safeParse(body);
  if (!parsed.success) {
    return fail("Revisen los datos enviados.", 422, parsed.error.flatten());
  }
  const input = parsed.data;

  // Slug único: si ya existe, se le agrega sufijo.
  const base = slugify(input.title) || "mesa";
  let slug = base;
  for (let i = 2; await db.registry.findUnique({ where: { slug } }); i++) {
    slug = `${base}-${i}`;
    if (i > 50) return fail("No pudimos generar una liga única.", 409);
  }

  // La colección elegida siembra los regalos iniciales.
  const seedCollection = collections.find((c) => c.name === input.collection);

  const registry = await db.registry.create({
    data: {
      slug,
      title: input.title.trim(),
      eventType: input.eventType,
      eventDate: input.eventDate ? new Date(input.eventDate) : null,
      venue: input.venue,
      message: input.message,
      plan: "esencial",
      published: false,
      host: input.hostPhone
        ? {
            connectOrCreate: {
              where: { phone: input.hostPhone },
              create: {
                phone: input.hostPhone,
                name: input.hostName ?? input.title.trim(),
              },
            },
          }
        : undefined,
      gifts: seedCollection
        ? {
            create: seedCollection.products.map((p, i) => ({
              name: p.name,
              brand: p.brand,
              price: p.price,
              seed: p.seed,
              sortOrder: i,
            })),
          }
        : undefined,
      goals: goalsFor(input.goal),
    },
    include: { gifts: true, goals: true },
  });

  return ok(
    {
      slug: registry.slug,
      url: `/mesa/${registry.slug}`,
      gifts: registry.gifts.length,
      goals: registry.goals.length,
    },
    201,
  );
}

/** Metas iniciales sugeridas según el objetivo elegido en el asistente. */
function goalsFor(goal?: string) {
  const presets: Record<string, { name: string; target: number }[]> = {
    "Luna de miel": [
      { name: "Vuelos", target: 38000 },
      { name: "Hospedaje", target: 46000 },
    ],
    "Enganche o remodelación": [{ name: "Enganche de la casa", target: 250000 }],
    "Una mezcla de todo": [
      { name: "Enganche de la casa", target: 250000 },
      { name: "Luna de miel", target: 48000 },
    ],
  };
  const list = goal ? presets[goal] : undefined;
  if (!list) return undefined;
  return {
    create: list.map((g, i) => ({ ...g, sortOrder: i })),
  };
}
