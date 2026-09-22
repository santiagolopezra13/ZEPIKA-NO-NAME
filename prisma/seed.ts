import { PrismaClient } from "../src/generated/prisma";

const db = new PrismaClient();

const GIFTS = [
  { name: "Olla de hierro fundido 5.3 L", brand: "Fundición", price: 11500, seed: "p-olla" },
  { name: "Vajilla 16 piezas gres", brand: "Barro Nuevo", price: 4700, seed: "p-vajilla" },
  { name: "Juego de sábanas 400 hilos", brand: "Lino Casa", price: 3200, seed: "p-sabanas" },
  { name: "Batidora de pedestal", brand: "Mezcla", price: 14900, seed: "p-batidora" },
  { name: "Cristalería vino 6 piezas", brand: "Soplado", price: 2900, seed: "p-copas" },
  { name: "Asador de carbón 57 cm", brand: "Brasa", price: 7900, seed: "p-asador" },
  { name: "Molcajete de piedra volcánica", brand: "Artesanal Oaxaca", price: 1450, seed: "p-molcajete" },
  { name: "Tabla de nogal 50 cm", brand: "Taller Sur", price: 3100, seed: "p-tabla" },
];

/** Mesas secundarias para que la búsqueda tenga resultados reales. */
const OTHERS = [
  {
    slug: "mariana-y-sofia",
    title: "Mariana & Sofía",
    eventType: "Boda",
    eventDate: new Date("2027-04-03T00:00:00Z"),
    venue: "Mérida, Yucatán",
    published: true,
  },
  {
    slug: "regina-xv",
    title: "Regina Alcántara",
    eventType: "XV años",
    eventDate: new Date("2027-08-08T00:00:00Z"),
    venue: "Monterrey, Nuevo León",
    published: true,
  },
  {
    slug: "casa-nueva-perez",
    title: "Familia Pérez Gómez",
    eventType: "Casa nueva",
    eventDate: new Date("2026-11-22T00:00:00Z"),
    venue: "Guadalajara, Jalisco",
    published: false,
  },
];

async function main() {
  console.log("→ Limpiando datos anteriores…");
  await db.contribution.deleteMany();
  await db.rsvp.deleteMany();
  await db.gift.deleteMany();
  await db.goal.deleteMany();
  await db.registry.deleteMany();
  await db.host.deleteMany();

  console.log("→ Creando la mesa de demostración…");
  const demo = await db.registry.create({
    data: {
      slug: "ana-y-diego",
      title: "Ana & Diego",
      eventType: "Boda",
      eventDate: new Date("2027-02-14T00:00:00Z"),
      venue: "Hacienda El Sauce · Valle de Bravo",
      message:
        "Gracias por acompañarnos. Si quieren regalarnos algo, aquí dejamos lo que nos hace falta para empezar la casa. Su presencia ya es suficiente.",
      heroSeed: "demo-hero",
      plan: "completo",
      published: true,
      host: {
        create: {
          name: "Ana Rivera",
          phone: "5551234567",
          email: "ana@example.mx",
        },
      },
      goals: {
        create: [
          { name: "Enganche de la casa", target: 250000, sortOrder: 0 },
          { name: "Luna de miel en Oaxaca", target: 48000, sortOrder: 1 },
        ],
      },
      gifts: {
        create: GIFTS.map((g, i) => ({ ...g, sortOrder: i })),
      },
    },
    include: { goals: true, gifts: true },
  });

  const enganche = demo.goals[0];
  const luna = demo.goals[1];

  console.log("→ Sembrando aportaciones a metas…");
  // Suman 163,500 en el enganche y 41,200 en la luna de miel.
  const goalContribs: Array<[string, number, string, string | null]> = [
    [enganche.id, 50000, "Familia Rivera Solís", "Para que empiecen bien. Con todo nuestro cariño."],
    [enganche.id, 35000, "Los padrinos Hernández", "¡Que sea una casa llena de gente!"],
    [enganche.id, 25000, "Tíos Márquez", null],
    [enganche.id, 20000, "Carlos y Paulina", "Nos vemos en la pista."],
    [enganche.id, 15000, "Oficina de Ana", "De parte de todo el equipo."],
    [enganche.id, 10000, "Abuela Estela", "Dios los bendiga, mis niños."],
    [enganche.id, 8500, "Jorge Domínguez", null],
    [luna.id, 18000, "Fernanda y Luis", "Coman mole por nosotros."],
    [luna.id, 12000, "Primos de Diego", null],
    [luna.id, 6200, "Sofía Lara", "¡Que se diviertan muchísimo!"],
    [luna.id, 5000, "Vecinos del 402", null],
  ];

  await db.contribution.createMany({
    data: goalContribs.map(([goalId, amount, guestName, message]) => ({
      registryId: demo.id,
      goalId,
      amount,
      guestName,
      message,
      msi: amount >= 20000 ? 6 : 0,
      status: "pagado",
      thanked: false,
    })),
  });

  console.log("→ Marcando dos regalos como apartados…");
  const claimed = [demo.gifts[0], demo.gifts[4]]; // olla y cristalería
  for (const gift of claimed) {
    await db.gift.update({ where: { id: gift.id }, data: { claimed: true } });
    await db.contribution.create({
      data: {
        registryId: demo.id,
        giftId: gift.id,
        amount: gift.price,
        guestName: gift.id === claimed[0].id ? "Regina y Mateo" : "Andrea Bustos",
        message: gift.id === claimed[0].id ? "¡A cocinar!" : null,
        msi: 12,
        status: "pagado",
      },
    });
  }

  console.log("→ Sembrando confirmaciones de asistencia…");
  const firstNames = [
    "Regina", "Mateo", "Andrea", "Luis", "Fernanda", "Jorge", "Paulina",
    "Carlos", "Estela", "Sofía", "Emilio", "Valeria", "Rodrigo", "Ximena",
    "Bruno", "Camila", "Tomás", "Renata",
  ];
  const lastNames = [
    "Rivera", "Solís", "Hernández", "Márquez", "Domínguez", "Lara",
    "Bustos", "Ortega", "Cordero",
  ];

  await db.rsvp.createMany({
    data: firstNames.map((first, i) => {
      const attending = i < 16; // dos declinan
      return {
        registryId: demo.id,
        firstName: first,
        lastName: lastNames[i % lastNames.length],
        phone: `55${String(10000000 + i * 137).slice(0, 8)}`,
        attending,
        companions: attending ? [0, 1, 2, 1, 0, 2][i % 6] : 0,
        message: i % 5 === 0 ? "Sin cerdo, por favor." : null,
      };
    }),
  });

  console.log("→ Creando mesas secundarias para la búsqueda…");
  for (const r of OTHERS) {
    await db.registry.create({
      data: {
        ...r,
        plan: "esencial",
        gifts: {
          create: GIFTS.slice(0, 4).map((g, i) => ({ ...g, sortOrder: i })),
        },
      },
    });
  }

  const totals = await db.contribution.aggregate({ _sum: { amount: true } });
  const headcount = await db.rsvp.aggregate({
    where: { attending: true },
    _count: { _all: true },
    _sum: { companions: true },
  });

  console.log("\n✓ Listo.");
  console.log(`  Mesas:          ${await db.registry.count()}`);
  console.log(`  Recaudado:      $${(totals._sum.amount ?? 0).toLocaleString("es-MX")} MXN`);
  console.log(
    `  Invitados sí:   ${headcount._count._all + (headcount._sum.companions ?? 0)}`,
  );
  console.log("\n  Mesa demo → http://localhost:3000/mesa/ana-y-diego\n");
}

main()
  .catch((e) => {
    console.error("✗ Falló el seed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
