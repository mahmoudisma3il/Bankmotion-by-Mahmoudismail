// Render a carousel to PNGs (1080x1350) + a preview sheet.
// usage: node render.mjs <slides.json> [out_dir]
import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch { try { ({ chromium } = await import("playwright")); } catch {
  console.error("Playwright is missing. Run: npm i playwright && npx playwright install chromium"); process.exit(1); } }

const HERE = dirname(fileURLToPath(import.meta.url));
const src = resolve(process.argv[2] || "slides.json");
const out = resolve(process.argv[3] || join(dirname(src), "out"));
mkdirSync(out, { recursive: true });

const deck = JSON.parse(readFileSync(src, "utf8"));
const url = (p, base) => (!p || /^(https?:|data:|file:)/.test(p) ? p : pathToFileURL(resolve(base, p)).href);

// brand: path to brand.json, or an inline object
let brand = deck.brand || join(HERE, "brands/fox/brand.json");
let brandBase = dirname(src);
if (typeof brand === "string") {
  let p = resolve(dirname(src), brand);
  if (!existsSync(p)) p = resolve(HERE, brand);
  brandBase = dirname(p);
  brand = JSON.parse(readFileSync(p, "utf8"));
}
brand.logo = url(brand.logo, brandBase);
brand.avatar = url(brand.avatar, brandBase);
(brand.fontFaces || []).forEach((f) => (f.src = url(f.src, brandBase)));
deck.slides.forEach((s) => s.image && (s.image = url(s.image, dirname(src))));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
const files = [], warn = [];
for (let i = 0; i < deck.slides.length; i++) {
  await page.goto(pathToFileURL(join(HERE, "template.html")).href);
  await page.evaluate((D) => window.render(D), { brand, slide: deck.slides[i], index: i, total: deck.slides.length, dir: deck.dir, swipe: deck.swipe });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every((im) => im.complete));
  const ok = await page.evaluate(() => window.fit());
  if (!ok) warn.push(`slide ${i + 1}: text still overflows, shorten it`);
  const f = join(out, `slide-${String(i + 1).padStart(2, "0")}.png`);
  await page.screenshot({ path: f });
  files.push(f);
}
// preview sheet
const cols = Math.min(4, files.length), rows = Math.ceil(files.length / cols), w = 270, h = 338, g = 16;
const sheet = await browser.newPage({ viewport: { width: cols * (w + g) + g, height: rows * (h + g) + g } });
await sheet.setContent(`<body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols},${w}px);gap:${g}px;padding:${g}px">${files
  .map((f) => `<img src="data:image/png;base64,${readFileSync(f).toString("base64")}" style="width:${w}px;height:${h}px;border-radius:10px">`).join("")}</body>`);
await sheet.waitForFunction(() => [...document.images].every((im) => im.complete));
await sheet.screenshot({ path: join(out, "preview.png") });
await browser.close();
console.log(`done: ${files.length} slides -> ${out}`);
warn.forEach((x) => console.warn("WARN", x));
