import { db } from "@/lib/db";

export type RegistryDetail = Awaited<ReturnType<typeof getRegistryBySlug>>;

/**
 * Lee una mesa con sus metas y regalos, y calcula lo recaudado por meta
 * a partir de las aportaciones pagadas. Se usa tanto en el API como en
 * el render de la página pública.
 */
export async function getRegistryBySlug(slug: string) {
  const registry = await db.registry.findUnique({
    where: { slug },
    include: {
      goals: { orderBy: { sortOrder: "asc" } },
      gifts: { orderBy: { sortOrder: "asc" } },
      _count: { select: { rsvps: true, contributions: true } },
    },
  });

  if (!registry) return null;

  const [byGoal, confirmed, totals] = await Promise.all([
    db.contribution.groupBy({
      by: ["goalId"],
      where: { registryId: registry.id, status: "pagado" },
      _sum: { amount: true },
    }),
    db.rsvp.aggregate({
      where: { registryId: registry.id, attending: true },
      _count: { _all: true },
      _sum: { companions: true },
    }),
    db.contribution.aggregate({
      where: { registryId: registry.id, status: "pagado" },
      _sum: { amount: true },
    }),
  ]);

  const raisedFor = new Map(
    byGoal.map((r) => [r.goalId, r._sum.amount ?? 0] as const),
  );

  return {
    id: registry.id,
    slug: registry.slug,
    title: registry.title,
    eventType: registry.eventType,
    eventDate: registry.eventDate,
    venue: registry.venue,
    message: registry.message,
    heroSeed: registry.heroSeed,
    plan: registry.plan,
    published: registry.published,
    goals: registry.goals.map((g) => {
      const raised = raisedFor.get(g.id) ?? 0;
      return {
        id: g.id,
        name: g.name,
        target: g.target,
        raised,
        pct: g.target > 0 ? Math.min(100, Math.round((raised / g.target) * 100)) : 0,
      };
    }),
    gifts: registry.gifts.map((g) => ({
      id: g.id,
      name: g.name,
      brand: g.brand,
      price: g.price,
      seed: g.seed,
      claimed: g.claimed,
    })),
    stats: {
      guestsConfirmed:
        confirmed._count._all + (confirmed._sum.companions ?? 0),
      rsvps: registry._count.rsvps,
      contributions: registry._count.contributions,
      totalRaised: totals._sum.amount ?? 0,
      giftsAvailable: registry.gifts.filter((g) => !g.claimed).length,
      giftsTotal: registry.gifts.length,
    },
  };
}
