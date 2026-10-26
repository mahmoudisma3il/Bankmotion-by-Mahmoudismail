// BanKmotion By Mahmoud Ismail — generator
// Turns the motion definitions in src/defs/*.mjs into standalone HyperFrames
// compositions: motions/<CODE>-<slug>/index.html + meta.json + README.md
// Usage:  node tools/generate.mjs            (all)
//         node tools/generate.mjs T101 S302  (only these codes)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFS = path.join(ROOT, "src", "defs");
const OUT = path.join(ROOT, "motions");

export const CATEGORIES = {
  T: { name: "نصوص وتايبوجرافي", en: "Text & typography" },
  S: { name: "انتقالات", en: "Transitions" },
  N: { name: "أرقام وبيانات", en: "Numbers & data" },
  U: { name: "واجهات وإشعارات", en: "UI & notifications" },
  P: { name: "صور وأشخاص وكاميرا", en: "Photo, people & camera" },
  C: { name: "دعوة لإجراء ولوجو ونهايات", en: "CTA, logo & end cards" },
  B: { name: "خلفيات وتأثيرات", en: "Backgrounds & effects" },
};

const THEMES = {
  // Brand identity (logo and color.pdf): grey + purple #5B4FDB
  light: { bg: "#E8E8E8", ink: "#131313", accent: "#5B4FDB", accent2: "#2E7D5B", muted: "#6D6D6D", card: "#F0F0F0", skin: "#3A3A3D" },
  dark: { bg: "#131313", ink: "#FFFFFF", accent: "#7B70F0", accent2: "#7CFFB2", muted: "#9A9AA3", card: "#232328", skin: "#2A2A31" },
};

const KIT = `
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
// Split text into word spans (Arabic-safe: never splits letters, so shaping stays intact)
function words(el){const t=el.textContent.trim().split(/\\s+/);el.textContent="";return t.map((w,i)=>{const s=document.createElement("span");s.className="w";s.textContent=w;el.appendChild(s);if(i<t.length-1)el.appendChild(document.createTextNode(" "));return s;});}
// Seeded random (deterministic = render-safe)
function rng(seed){let s=seed%2147483647;if(s<=0)s+=2147483646;return function(){s=(s*16807)%2147483647;return (s-1)/2147483646;};}
const CSSV=n=>getComputedStyle(document.documentElement).getPropertyValue("--"+n).trim();
$$("[data-p]").forEach(e=>{const v=P[e.dataset.p];if(v!==undefined)e.textContent=v;});
`;

const b64 = (f) => "data:font/woff2;base64," + fs.readFileSync(path.join(ROOT, "fonts", f)).toString("base64");
const FONT_AR = b64("cairo-arabic-wght-normal.woff2"), FONT_LAT = b64("cairo-latin-wght-normal.woff2");
const BASE_CSS = `
@font-face{font-family:"Cairo";src:url("${FONT_AR}") format("woff2");font-weight:200 1000;unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF,U+200C-200F;}
@font-face{font-family:"Cairo";src:url("${FONT_LAT}") format("woff2");font-weight:200 1000;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2212,U+2215,U+FEFF;}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;overflow:hidden;background:var(--bg)}
#root{position:relative;width:100%;height:100%;overflow:hidden;font-family:"Cairo",sans-serif;color:var(--ink);direction:rtl;background:var(--bg)}
.w{display:inline-block}
.stage{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 90px;text-align:center;gap:36px}
.h1{font-size:150px;font-weight:900;line-height:1.15}
.h2{font-size:116px;font-weight:900;line-height:1.3}
.h3{font-size:72px;font-weight:800;line-height:1.4}
.sub{font-size:48px;font-weight:600;color:var(--muted)}
.accent{color:var(--accent)}
.scene{position:absolute;inset:0;overflow:hidden}
.scene-a{background:linear-gradient(160deg,#2B3A67,#0E1428)}
.scene-b{background:linear-gradient(160deg,#FF7A45,#C2185B)}
.scene-c{background:linear-gradient(160deg,#1F8A70,#0B3D2E)}
.scene .label{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:150px;font-weight:900;color:#fff}
.person{position:absolute;left:50%;bottom:0;width:640px;height:1120px;margin-left:-320px}
.person .head{position:absolute;left:50%;top:0;width:300px;height:300px;margin-left:-150px;border-radius:50%;background:var(--skin)}
.person .body{position:absolute;left:0;right:0;top:330px;bottom:-60px;border-radius:320px 320px 0 0;background:var(--skin)}
.photo{position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#9CC9E8 0%,#F6D7A7 55%,#C98B5B 100%)}
.photo .sun{position:absolute;width:300px;height:300px;border-radius:50%;background:#FFE29A;left:620px;top:420px}
.photo .hill1{position:absolute;width:1600px;height:900px;border-radius:50%;background:#7E9C6B;left:-500px;top:1250px}
.photo .hill2{position:absolute;width:1500px;height:900px;border-radius:50%;background:#56744A;left:200px;top:1380px}
`;

function cssVars(theme, extra = {}) {
  const t = { ...THEMES[theme || "light"], ...extra };
  return ":root{" + Object.entries(t).map(([k, v]) => `--${k}:${v}`).join(";") + "}";
}

function previewScript(id, dur) {
  // Plays the paused timeline only for human preview (direct open, or ?play).
  // HyperFrames render (headless) and Studio (iframe) are left untouched.
  return `<script>
/* Bankmotion preview — only runs when you open this file in a browser (or add ?play). Render engines ignore it. */
(function(){var q=location.search,auto=/[?&]play/.test(q)||(window.top===window&&!navigator.webdriver);var m=q.match(/[?&]t=([\\d.]+)/);
function go(){var tl=window.__timelines&&window.__timelines["${id}"];if(!tl)return;if(m){tl.seek(parseFloat(m[1]));return;}if(!auto)return;
var d=${dur};function loop(){tl.seek(0);tl.play();setTimeout(loop,(d+0.6)*1000);}loop();}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(go);else window.addEventListener("load",go);})();
</script>`;
}

export function buildHtml(def) {
  const id = def.code.toLowerCase() + "-" + def.slug;
  const params = JSON.stringify(def.params || {}, null, 2);
  return `<!doctype html>
<html lang="ar">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<title>${def.code} — ${def.name}</title>
<!--
  BanKmotion By Mahmoud Ismail · ${def.code} · ${def.name} (${def.slug})
  ${def.desc}
  HyperFrames standalone composition · 1080×1920 (9:16) · ${def.dur}s
  Edit the P object (text, colors, numbers) at the top of the script.
-->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script>window.gsap||document.write('<script src="../../lib/gsap.min.js"><\\/script>')</script>
<style>
${cssVars(def.theme, def.vars)}
${BASE_CSS.trim()}
/* ---- motion styles ---- */
${(def.css || "").trim()}
</style>
</head>
<body>
<div id="root" data-composition-id="${id}" data-start="0" data-width="1080" data-height="1920" data-duration="${def.dur}">
${def.html.trim()}
</div>
<script>
window.__timelines = window.__timelines || {};
/* ===== P = everything you can change ===== */
const P = ${params};
${KIT.trim()}
const tl = gsap.timeline({ paused: true });
/* ---- motion ---- */
${def.js.trim()}
window.__timelines["${id}"] = tl;
</script>
${previewScript(id, def.dur)}
</body>
</html>
`;
}

function readme(def) {
  const cat = CATEGORIES[def.code[0]];
  const params = Object.entries(def.params || {})
    .map(([k, v]) => `| \`${k}\` | \`${JSON.stringify(v)}\` |`)
    .join("\n");
  return `# ${def.code} — ${def.name}

**القسم:** ${cat.name} · **المدة:** ${def.dur} ثانية · **المقاس:** 1080×1920 (9:16)

${def.desc}

## الاستخدام
- **معاينة:** افتح \`index.html\` في المتصفح (بتشتغل لوحدها وتعيد).
- **رندر فيديو:** \`node tools/render.mjs ${def.code}\` من جذر البنك، أو اعتبره HyperFrames composition عادي.
- **تعديل:** غيّر قيم \`P\` في أول السكريبت.

## القيم اللي تتغير (P)
| المفتاح | القيمة الافتراضية |
|---|---|
${params || "| — | — |"}

## المصدر
${def.source || "تصميم أصلي لبنك الحركات."}
`;
}

export async function loadDefs() {
  const files = fs.readdirSync(DEFS).filter((f) => f.endsWith(".mjs")).sort();
  const all = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(DEFS, f)).href);
    all.push(...mod.default);
  }
  const seen = new Set();
  for (const d of all) {
    if (seen.has(d.code)) throw new Error("Duplicate code " + d.code);
    seen.add(d.code);
  }
  return all;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const only = process.argv.slice(2);
  const defs = (await loadDefs()).filter((d) => !only.length || only.includes(d.code));
  for (const d of defs) {
    const dir = path.join(OUT, `${d.code}-${d.slug}`);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), buildHtml(d));
    fs.writeFileSync(path.join(dir, "README.md"), readme(d));
    const meta = {
      code: d.code, slug: d.slug, name: d.name, category: d.code[0],
      categoryName: CATEGORIES[d.code[0]].name, description: d.desc,
      duration: d.dur, size: "1080x1920", theme: d.theme || "light",
      tags: d.tags || [], params: d.params || {}, source: d.source || "original",
      path: `motions/${d.code}-${d.slug}/index.html`, addedIn: d.addedIn || "v1",
    };
    fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify(meta, null, 2));
  }
  console.log("generated", defs.length, "motions");
}
