# LÖGUE

Mesa de regalos digital para el mercado mexicano: mesa de regalos, sitio de
evento, invitación y confirmación de asistencia en una sola liga.

Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 ·
Prisma · SQLite (local)**. Todo el front es React; el backend son Route
Handlers de Next en el mismo proyecto.

> El nombre de la marca vive en un solo archivo (`src/lib/brand.ts`).
> Cambiarlo ahí lo cambia en todo el sitio.

---

## Arrancar en local

```bash
npm install
npm run db:push     # crea prisma/dev.db a partir del esquema
npm run db:seed     # siembra 4 mesas, aportaciones y confirmaciones
npm run dev         # http://localhost:3000
```

Rutas que vale la pena abrir primero:

| Ruta | Qué es |
| --- | --- |
| `/` | Landing comercial |
| `/mesa/ana-y-diego` | **Mesa pública con datos reales** — regalar y confirmar escribe en la base |
| `/panel/ana-y-diego` | Panel del anfitrión: recaudado, metas, agradecimientos, confirmaciones |
| `/crear` | Asistente de 4 pasos que crea una mesa de verdad |
| `/buscar-mesa` | Búsqueda contra el API |
| `/colecciones` | Las 6 colecciones curadas |
| `/planes` | Planes y preguntas frecuentes |

---

## Backend

### API

| Método | Ruta | Qué hace |
| --- | --- | --- |
| `GET` | `/api/health` | Estado de la base y conteos |
| `GET` | `/api/registries?q=` | Búsqueda pública de mesas |
| `POST` | `/api/registries` | Crea una mesa (siembra regalos y metas según la colección elegida) |
| `GET` | `/api/registries/[slug]` | Mesa completa con avance de metas calculado |
| `PATCH` | `/api/registries/[slug]` | Edición del anfitrión |
| `GET` | `/api/registries/[slug]/rsvp` | Lista de confirmaciones + resumen |
| `POST` | `/api/registries/[slug]/rsvp` | Confirma asistencia (upsert por teléfono) |
| `GET` | `/api/registries/[slug]/contributions` | Panel de agradecimientos |
| `POST` | `/api/registries/[slug]/contributions` | Registra regalo o aportación (transacción) |

Respuesta uniforme: `{ ok: true, data }` o `{ ok: false, error, details }`.
Validación de entrada con Zod en `src/lib/validators.ts`.

### Modelo de datos

`Host → Registry → { Goal, Gift, Rsvp, Contribution }`

Lo recaudado por meta **no se guarda como columna**: se calcula agregando las
aportaciones pagadas (`src/lib/registries.ts`). Así nunca se desincroniza.

### Scripts

```bash
npm run db:push      # aplica el esquema
npm run db:seed      # siembra datos de demostración
npm run db:reset     # borra y vuelve a sembrar
npm run db:studio    # explorador visual de la base
```

---

## Estructura

```
src/
  app/
    page.tsx                    landing
    colecciones/                listado + detalle (SSG)
    planes/  como-funciona/     páginas comerciales
    buscar-mesa/  crear/  entrar/
    mesa/[slug]/                mesa pública (SSR, datos vivos)
    panel/[slug]/               panel del anfitrión
    legal/[doc]/                privacidad y términos (borradores)
    api/                        backend
  components/                   header, footer, formularios, diálogo de regalo
  lib/
    brand.ts                    nombre, contacto, formateo de pesos
    data.ts                     colecciones, planes, textos
    db.ts                       cliente de Prisma
    registries.ts               lecturas con agregados
    validators.ts               esquemas Zod
prisma/
  schema.prisma
  seed.ts
  seed.db                       copia sembrada (vista previa en Vercel)
```

---

## Pendientes antes de operar comercialmente

1. **Base de datos de producción.** Cambiar `provider` a `postgresql` en
   `prisma/schema.prisma` y apuntar `DATABASE_URL` a Neon o Vercel Postgres.
   En Vercel, SQLite solo funciona como vista previa desechable (`/tmp`).
2. **Pasarela de pago.** Hoy `POST /contributions` marca `status: "pagado"`
   directo. Falta Stripe o Mercado Pago (MSI requiere Mercado Pago o Conekta
   para tarjetas mexicanas) y el webhook que confirme el cobro.
3. **Autenticación.** `/entrar` y `/panel/[slug]` son maquetas sin sesión.
   OTP por WhatsApp, como promete la interfaz.
4. **Dispersión de fondos.** SPEI vía STP, Conekta o similar, más KYC del
   anfitrión.
5. **Fotografía propia.** Las imágenes son placeholders de `picsum.photos`
   (ver `img()` en `src/lib/data.ts`).
6. **Revisión legal.** Los textos de `/legal` son borradores, no documentos
   vigentes.
