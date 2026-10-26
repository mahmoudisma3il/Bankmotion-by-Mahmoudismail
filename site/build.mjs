// Builds the site pages from videos/videos.json:
//   index.html               — home (bank + videos)
//   videos/<slug>/index.html — one page per video
// Run from the repo root:  node site/build.mjs
// Never touches the bank version folders (v1/, v2/, ...).
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ROOT = new URL("..", import.meta.url).pathname;
const read = (p) => readFileSync(ROOT + p, "utf8");
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const LATEST = read("LATEST").trim();
const catalog = JSON.parse(read(`${LATEST}/catalog.json`));
const motions = catalog.motions || [];
const hfCount = Array.isArray(catalog.hyperframes) ? catalog.hyperframes.length
  : (catalog.hyperframes && typeof catalog.hyperframes === "object" ? Object.keys(catalog.hyperframes).length : 0);
const catCount = Array.isArray(catalog.categories) ? catalog.categories.length
  : Object.keys(catalog.categories || {}).length;
const { videos = [] } = JSON.parse(read("videos/videos.json"));

const SITE = {
  name: "Mahmoud Ismail",
  title: "محمود إسماعيل — بنك الحركات والفيديوهات",
  desc: "بنك حركات موشن جاهز بالكود، وكل فيديو بعمله بطريقته والأدوات اللي اتعمل بيها — عشان تخلّي Claude يعملك فيديوهات كأني أنا اللي عاملها.",
  instagram: "https://www.instagram.com/mahmoudismail.creative/",
  linkedin: "https://www.linkedin.com/in/mahmoud-ismaiil",
  behance: "https://behance.net/mahmoud_ismaiil",
  portfolio: "https://mahmoud-ismaiil.vercel.app",
};

const head = (title, desc, base) => `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<link rel="icon" href="${base}site/img/logo-BK.svg">
<link rel="stylesheet" href="${base}site/site.css">
</head>
<body>
<div class="wrap">`;

const header = (base, current) => `
<header class="top">
  <a class="logo" href="${base}" aria-label="الرئيسية"><img src="${base}site/img/logo-BK.svg" alt="Mahmoud Ismail" width="80" height="44"></a>
  <nav class="nav">
    <a href="${base}#bank"${current === "bank" ? ' aria-current="page"' : ""}>بنك الحركات</a>
    <a href="${base}#videos"${current === "videos" ? ' aria-current="page"' : ""}>الفيديوهات</a>
  </nav>
</header>`;

const footer = () => `
<footer>
  <div class="links">
    <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
    <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
    <a href="${SITE.behance}" target="_blank" rel="noopener">Behance</a>
    <a href="${SITE.portfolio}" target="_blank" rel="noopener">Portfolio</a>
  </div>
  <small>© ${new Date().getFullYear()} Mahmoud Ismail Creative</small>
</footer>
</div>
</body>
</html>
`;

const tagList = (v) => (v.tools || []).slice(0, 4).map((t) => `<span class="tag">${esc(t.name)}</span>`).join("");

const videoCard = (v, i) => `
  <a class="vcard" href="videos/${esc(v.slug)}/">
    <div class="thumb">
      ${v.poster ? `<img src="videos/${esc(v.slug)}/${esc(v.poster)}" alt="" loading="lazy">` : ""}
      <span class="num">${String(videos.length - i).padStart(2, "0")}</span>
    </div>
    <div class="body">
      <h3>${esc(v.title)}</h3>
      <div class="tags">${tagList(v)}</div>
    </div>
  </a>`;

const seen = new Set();
const sampleCodes = [];
for (const m of motions) { if (!seen.has(m.category)) { seen.add(m.category); sampleCodes.push(m.code); } }
for (const m of motions) { if (sampleCodes.length >= 8) break; if (!sampleCodes.includes(m.code)) sampleCodes.push(m.code); }
sampleCodes.length = Math.min(sampleCodes.length, 8);

const home = `${head(SITE.title, SITE.desc, "")}
${header("", "")}
<section class="hero">
  <img class="me" src="site/img/me.webp" alt="محمود إسماعيل" width="132" height="132">
  <div>
    <h1>خلّي Claude يعملك فيديوهات <u>كأني أنا اللي عاملها</u></h1>
    <p>أنا محمود، مصمم ومونتير. هنا بنك الحركات بتاعي، وكل فيديو بنزّله بتلاقي صفحته: الفيديو، الطريقة خطوة بخطوة، والأدوات اللي اتعمل بيها.</p>
  </div>
</section>

<p class="note">مش هقولك اكتب كومنت وهبعتلك. كل حاجة هنا — خش وشوف براحتك انت محتاج إيه.</p>

<div class="sec" id="bank"><h2>بنك الحركات</h2><span class="en">Motion Bank · ${esc(LATEST)}</span></div>
<a class="bank" href="${esc(LATEST)}/">
  <div class="txt">
    <span class="en">Open the bank</span>
    <h3>مكتبة حركات موشن جاهزة بالكود</h3>
    <p>كل حركة ليها كود ثابت زي <code>${esc(sampleCodes[0] || "S302")}</code> — تطلبه من Claude أو Codex وهو يركّبها في الفيديو بتاعك.</p>
    <div class="stats">
      <div><b>${motions.length}</b><span>حركة أصلية</span></div>
      ${hfCount ? `<div><b>${hfCount}</b><span>عنصر HyperFrames</span></div>` : ""}
      ${catCount ? `<div><b>${catCount}</b><span>أقسام</span></div>` : ""}
    </div>
    <span class="btn">افتح البنك ←</span>
  </div>
  <div class="codes" aria-hidden="true">${sampleCodes.map((c) => `<span class="mono">${esc(c)}</span>`).join("")}</div>
</a>

<div class="sec" id="videos"><h2>الفيديوهات</h2><span class="en">Videos · How they were made</span></div>
${videos.length
  ? `<div class="grid">${videos.map(videoCard).join("")}</div>`
  : `<div class="empty"><b>أول فيديو نازل قريب</b>كل فيديو بنزّله هيبقى ليه صفحة هنا: الفيديو، الطريقة، والأدوات.</div>`}
${footer()}`;

writeFileSync(ROOT + "index.html", home);

const bankLink = (code) => `../../${LATEST}/#${encodeURIComponent(code)}`;

for (const v of videos) {
  const dir = `videos/${v.slug}`;
  if (!existsSync(ROOT + dir)) { console.warn(`! missing folder ${dir}`); continue; }
  const page = `${head(`${v.title} — ${SITE.name}`, v.summary || SITE.desc, "../../")}
${header("../../", "videos")}
<article class="vpage">
  <div class="player">
    <video src="${esc(v.video)}" ${v.poster ? `poster="${esc(v.poster)}"` : ""} controls playsinline preload="metadata"></video>
  </div>
  <div>
    <span class="en">${esc(v.date || "")}</span>
    <h1>${esc(v.title)}</h1>
    ${v.summary ? `<p class="lead">${esc(v.summary)}</p>` : ""}

    ${(v.steps || []).length ? `<h2>الطريقة</h2>
    <ol class="steps">${v.steps.map((s) => `<li><div><b>${esc(s.title)}</b>${esc(s.text || "")}</div></li>`).join("")}</ol>` : ""}

    ${(v.tools || []).length ? `<h2>الأدوات</h2>
    <div class="tools">${v.tools.map((t) => `<a class="tool" href="${esc(t.url || "#")}" target="_blank" rel="noopener"><span class="en">${esc(t.type || "")}</span><b>${esc(t.name)}</b><span>${esc(t.use || "")}</span></a>`).join("")}</div>` : ""}

    ${(v.motions || []).length ? `<h2>الحركات من البنك</h2>
    <div class="codes-inline">${v.motions.map((c) => `<a class="mono" href="${bankLink(c)}">${esc(c)}</a>`).join("")}</div>` : ""}

    <p><a class="back" href="../../#videos">→ كل الفيديوهات</a></p>
  </div>
</article>
${footer()}`;
  writeFileSync(ROOT + dir + "/index.html", page);
}

console.log(`ok — home + ${videos.length} video page(s); bank → ${LATEST}/ (${motions.length} motions)`);
