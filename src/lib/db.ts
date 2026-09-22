import { PrismaClient } from "@/generated/prisma";

/**
 * Resolución de la base de datos.
 *
 * Local: SQLite en ./dev.db (se escribe normal).
 * Vercel: el filesystem es de solo lectura salvo /tmp, así que en el primer
 *   arranque copiamos la copia sembrada del repo (prisma/seed.db) a /tmp y
 *   trabajamos ahí. Los datos se reinician en cada arranque en frío — está
 *   bien para una vista previa, NO para producción real.
 *
 * Producción real: cambiar el provider del esquema a "postgresql" y apuntar
 *   DATABASE_URL a Neon / Vercel Postgres. El resto del código no cambia.
 */
function resolveDatabaseUrl(): string | undefined {
  const configured = process.env.DATABASE_URL;

  // Postgres, MySQL o cualquier URL remota: se usa tal cual.
  if (configured && !configured.startsWith("file:")) return configured;

  if (!process.env.VERCEL) return configured;

  // Vista previa en Vercel: sembrar /tmp desde la copia del repo.
  try {
    const fs = require("node:fs") as typeof import("node:fs");
    const path = require("node:path") as typeof import("node:path");

    const target = "/tmp/casalta.db";
    if (!fs.existsSync(target)) {
      const source = path.join(process.cwd(), "prisma", "seed.db");
      if (fs.existsSync(source)) {
        fs.copyFileSync(source, target);
      }
    }
    return `file:${target}`;
  } catch (e) {
    console.error("No se pudo preparar la base de datos temporal:", e);
    return configured;
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  const url = resolveDatabaseUrl();
  return new PrismaClient({
    ...(url ? { datasources: { db: { url } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
