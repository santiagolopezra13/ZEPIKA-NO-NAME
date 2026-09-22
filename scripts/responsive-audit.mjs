/**
 * Auditoría de adaptabilidad.
 *
 * Abre cada ruta en anchos reales de dispositivo y reporta:
 *   · desbordamiento horizontal de la página
 *   · elementos concretos que se salen del ancho del viewport
 *   · texto por debajo de 12 px (ilegible en móvil)
 *   · áreas táctiles menores a 40 px (difíciles de acertar con el dedo)
 *
 * Uso:  node scripts/responsive-audit.mjs [--shots]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3000";
const SHOTS = process.argv.includes("--shots");

const DEVICES = [
  { name: "iPhone SE", width: 375, height: 667, dpr: 2, mobile: true },
  { name: "iPhone 15", width: 393, height: 852, dpr: 3, mobile: true },
  { name: "iPad mini", width: 768, height: 1024, dpr: 2, mobile: true },
  { name: "Laptop", width: 1280, height: 800, dpr: 2, mobile: false },
  { name: "Escritorio", width: 1680, height: 1050, dpr: 2, mobile: false },
];

const ROUTES = [
  "/",
  "/colecciones",
  "/colecciones/primer-hogar",
  "/planes",
  "/buscar-mesa",
  "/mesa/ana-y-diego",
  "/panel/ana-y-diego",
  "/crear",
  "/entrar",
];

/** Se ejecuta dentro de la página. */
function inspect() {
  const vw = document.documentElement.clientWidth;
  const out = { scrollWidth: document.documentElement.scrollWidth, vw, wide: [], tiny: [], small: [] };

  for (const el of document.body.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) continue;

    const label = () =>
      el.tagName.toLowerCase() +
      (el.className && typeof el.className === "string"
        ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".")
        : "");

    // Se sale del viewport por la derecha o por la izquierda
    if (r.right > vw + 1 || r.left < -1) {
      if (cs.position !== "fixed" && out.wide.length < 6) {
        out.wide.push(`${label()} → ${Math.round(r.left)}…${Math.round(r.right)}px`);
      }
    }

    // Texto diminuto
    const fs = parseFloat(cs.fontSize);
    const hasText = [...el.childNodes].some(
      (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
    );
    if (hasText && fs < 12 && out.tiny.length < 6) {
      out.tiny.push(`${label()} → ${fs.toFixed(1)}px`);
    }

    // Objetivo táctil pequeño.
    //
    // WCAG 2.5.8 exime los enlaces que van dentro de una frase: su tamaño lo
    // impone el interlineado del texto que los rodea, y agrandarlos rompería
    // el renglón. Se detectan porque su contenedor tiene bastante más texto
    // que el propio enlace.
    if (["A", "BUTTON", "INPUT", "SELECT"].includes(el.tagName)) {
      const parentText = el.parentElement?.textContent?.trim().length ?? 0;
      const ownText = el.textContent?.trim().length ?? 0;
      const inlineInSentence =
        cs.display.startsWith("inline") && parentText > ownText + 10;

      if (
        !inlineInSentence &&
        (r.height < 40 || r.width < 40) &&
        r.height > 0 &&
        out.small.length < 6
      ) {
        out.small.push(
          `${label()} → ${Math.round(r.width)}×${Math.round(r.height)}px`,
        );
      }
    }
  }
  return out;
}

const browser = await chromium.launch();
if (SHOTS) mkdirSync("capturas", { recursive: true });

let problems = 0;

for (const d of DEVICES) {
  console.log(`\n${"─".repeat(60)}\n${d.name}  ${d.width}×${d.height}\n${"─".repeat(60)}`);
  const ctx = await browser.newContext({
    viewport: { width: d.width, height: d.height },
    deviceScaleFactor: d.dpr,
    isMobile: d.mobile,
    hasTouch: d.mobile,
  });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(250);
    const r = await page.evaluate(inspect);

    const overflow = r.scrollWidth - r.vw;
    const flags = [];
    if (overflow > 1) flags.push(`desborda ${overflow}px`);
    if (r.wide.length) flags.push(`${r.wide.length} elem. fuera`);
    if (r.tiny.length) flags.push(`${r.tiny.length} texto <12px`);
    if (d.mobile && r.small.length) flags.push(`${r.small.length} táctil <40px`);

    if (flags.length) {
      problems++;
      console.log(`  ✗ ${route.padEnd(26)} ${flags.join(" · ")}`);
      for (const w of r.wide) console.log(`      fuera: ${w}`);
      for (const t of r.tiny) console.log(`      chico: ${t}`);
      if (d.mobile) for (const s of r.small) console.log(`      táctil: ${s}`);
    } else {
      console.log(`  ✓ ${route}`);
    }

    if (SHOTS) {
      const slug = route.replace(/\//g, "_") || "_home";
      await page.screenshot({
        path: `capturas/${d.width}${slug}.png`,
        fullPage: route === "/",
      });
    }
  }
  await ctx.close();
}

await browser.close();
console.log(
  `\n${problems === 0 ? "✓ Sin problemas de adaptabilidad." : `✗ ${problems} combinaciones ruta/dispositivo con problemas.`}`,
);
