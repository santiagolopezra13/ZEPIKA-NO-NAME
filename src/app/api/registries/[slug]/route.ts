import { db } from "@/lib/db";
import { fail, ok } from "@/lib/validators";
import { getRegistryBySlug } from "@/lib/registries";

type Ctx = { params: Promise<{ slug: string }> };

/** GET /api/registries/[slug] — mesa completa con metas, regalos y avances. */
export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  const registry = await getRegistryBySlug(slug);
  if (!registry) return fail("No encontramos esa mesa.", 404);
  return ok(registry);
}

/** PATCH /api/registries/[slug] — edición del anfitrión (sin auth todavía). */
export async function PATCH(req: Request, { params }: Ctx) {
  const { slug } = await params;

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail("El cuerpo de la petición no es JSON válido.");
  }

  const allowed = ["title", "venue", "message", "eventType", "published", "plan"];
  const data = Object.fromEntries(
    Object.entries(body).filter(([k]) => allowed.includes(k)),
  );
  if (Object.keys(data).length === 0) {
    return fail(`Nada que actualizar. Campos válidos: ${allowed.join(", ")}.`);
  }

  try {
    const updated = await db.registry.update({ where: { slug }, data });
    return ok(updated);
  } catch {
    return fail("No encontramos esa mesa.", 404);
  }
}
