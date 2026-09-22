import { db } from "@/lib/db";
import { ok, fail } from "@/lib/validators";

export async function GET() {
  try {
    const [registries, contributions, rsvps] = await Promise.all([
      db.registry.count(),
      db.contribution.count(),
      db.rsvp.count(),
    ]);
    return ok({
      status: "ok",
      db: "conectada",
      counts: { registries, contributions, rsvps },
    });
  } catch (e) {
    return fail(
      "La base de datos no responde. ¿Corrieron `npm run db:push && npm run db:seed`?",
      503,
      e instanceof Error ? e.message : String(e),
    );
  }
}
