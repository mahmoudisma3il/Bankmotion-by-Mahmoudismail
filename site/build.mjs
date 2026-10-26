// Builds the site pages from videos/videos.json:
//   index.html               — home (bank + videos)
//   videos/<slug>/index.html — one page per video
// Run from the repo root:  node site/build.mjs
// Never touches the bank version folders (v1/, v2/, ...).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";

const ROOT = new URL("..", import.meta.url).pathname;
const read = (p) => readFileSync(ROOT + p, "utf8");
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const LATEST = read("LATEST").trim(); // folder of the bank (always "bank")
const BANK_VERSION = JSON.parse(read(`${LATEST}/bank.config.json`)).version || "";
const catalog = JSON.parse(read(`${LATEST}/catalog.json`));
const motions = catalog.motions || [];
const hfCount = Array.isArray(catalog.hyperframes) ? catalog.hyperframes.length
  : (catalog.hyperframes && typeof catalog.hyperframes === "object" ? Object.keys(catalog.hyperframes).length : 0);
const catCount = Array.isArray(catalog.categories) ? catalog.categories.length
  : Object.keys(catalog.categories || {}).length;
const { videos = [] } = JSON.parse(read("videos/videos.json"));
const tools = existsSync(ROOT + "site/tools.json") ? JSON.parse(read("site/tools.json")).items || [] : [];
const latestTool = tools.reduce((a, t) => (t.addedIn > a ? t.addedIn : a), "");
const newMotions = motions.filter((m) => m.addedIn === BANK_VERSION).length;
const newSkills = (catalog.skills || []).filter((x) => x.addedIn === BANK_VERSION).length;

import { createHash } from "node:crypto";
const CSS_V = createHash("md5").update(readFileSync(ROOT + "site/site.css")).digest("hex").slice(0, 8);
const SITE = {
  name: "Mahmoud Ismail",
  title: "محمود إسماعيل — بنك الحركات والفيديوهات",
  desc: "بنك حركات موشن جاهز بالكود، وكل فيديو بعمله بطريقته والأدوات اللي اتعمل بيها — عشان تخلّي Claude يعملك فيديوهات كأني أنا اللي عاملها.",
  instagram: "https://www.instagram.com/mahmoudismail.creative/",
  facebook: "https://www.facebook.com/mahmoudismail.creative/",
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
<link rel="stylesheet" href="${base}site/site.css?v=${CSS_V}">
</head>
<body>
<div class="wrap">`;

const header = (base, current) => `
<header class="top">
  <a class="logo" href="${base}" aria-label="الرئيسية"><img src="${base}site/img/logo-BK.svg" alt="Mahmoud Ismail" width="80" height="44"></a>
  <nav class="nav">
    <a href="${base}"${current === "home" ? ' aria-current="page"' : ""}>الصفحة الأساسية</a>
    <a href="${base}${LATEST}/">بنك الحركات</a>
    <a href="${base}videos/"${current === "videos" ? ' aria-current="page"' : ""}>الفيديوهات</a>
    <a href="${base}tools/"${current === "tools" ? ' aria-current="page"' : ""}>الأدوات</a>
    <a class="work" href="${SITE.portfolio}" target="_blank" rel="noopener">شغلي ↗</a>
  </nav>
</header>`;

const footer = () => `
<footer>
  <div class="links">
    <a href="${SITE.portfolio}" target="_blank" rel="noopener">Portfolio<small>mahmoud-ismaiil.vercel.app</small></a>
    <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram<small>@mahmoudismail.creative</small></a>
    <a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook<small>@mahmoudismail.creative</small></a>
    <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn<small>in/mahmoud-ismaiil</small></a>
    <a href="${SITE.behance}" target="_blank" rel="noopener">Behance<small>mahmoud_ismaiil</small></a>
  </div>
  <small>© ${new Date().getFullYear()} Mahmoud Ismail Creative</small>
</footer>
</div>
</body>
</html>
`;

const tagList = (v) => (v.tools || []).slice(0, 4).map((t) => `<span class="tag">${esc(t.name)}</span>`).join("");

const videoCard = (v, i, pre = "videos/") => `
  <a class="vcard" href="${pre}${esc(v.slug)}/">
    <div class="thumb">
      ${v.poster ? `<img src="${pre}${esc(v.slug)}/${esc(v.poster)}" alt="" loading="lazy">` : ""}
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
${header("", "home")}
<section class="hero">
  <img class="me" src="site/img/me.webp" alt="محمود إسماعيل" width="132" height="132">
  <div>
    <h1>خلّي Claude يعملك فيديوهات <u>كأني أنا اللي عاملها</u></h1>
    <p>أنا محمود، مصمم ومونتير. هنا بنك الحركات بتاعي، وكل فيديو بنزّله بتلاقي صفحته: الفيديو، الطريقة خطوة بخطوة، والأدوات اللي اتعمل بيها.</p>
  </div>
</section>


${(catalog.highlights || []).length ? `<section class="news" aria-label="الجديد">
  <div class="news-h"><b>الجديد</b><span class="en" style="text-transform:none">BanKmotion ${esc(BANK_VERSION)} · ${esc(catalog.updated || "")}</span></div>
  <div class="news-stats">${newMotions ? `<span><b>+${newMotions}</b> حركة جديدة</span>` : ""}${newSkills ? `<span><b>+${newSkills}</b> سكيل</span>` : ""}${tools.length ? `<span><b>${tools.length}</b> أداة</span>` : ""}</div>
  <ul>${catalog.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
  <a class="btn ghost" href="${esc(LATEST)}/">شوف الجديد في البنك ←</a>
</section>` : ""}

<div class="sec"><h2>الأقسام</h2><span class="en">Sections</span></div>
<div class="sections">
  <a class="scard dark" href="${esc(LATEST)}/">
    <span class="en" style="text-transform:none">BanKmotion · ${esc(BANK_VERSION)}</span>
    <h3>بنك الحركات</h3>
    <p>مكتبة حركات موشن جاهزة بالكود. كل حركة ليها كود ثابت تطلبه من Claude أو Codex.</p>
    <div class="nums"><span><b>${motions.length}</b> حركة</span>${(catalog.skills || []).length ? `<span><b>${catalog.skills.length}</b> سكيل</span>` : ""}${hfCount ? `<span><b>${hfCount}</b> HyperFrames</span>` : ""}</div>
    <span class="go">ادخل البنك ←</span>
  </a>
  <a class="scard" href="videos/">
    <span class="en">Videos</span>
    <h3>الفيديوهات</h3>
    <p>كل فيديو بنزّله ليه صفحة: الفيديو، الطريقة خطوة بخطوة، والأدوات والحركات اللي اتعمل بيها.</p>
    <div class="nums">${videos.length ? `<span><b>${videos.length}</b> فيديو</span>` : `<span>أول فيديو نازل قريب</span>`}</div>
    <span class="go">شوف الفيديوهات ←</span>
  </a>
  <a class="scard" href="tools/">
    <span class="en">Tools</span>
    <h3>الأدوات</h3>
    <p>الأدوات اللي بستخدمها مع البنك: صوت وصور و3D وفيزيا وأنيميشن.</p>
    <div class="nums"><span><b>${tools.length}</b> أداة</span></div>
    <span class="go">شوف الأدوات ←</span>
  </a>
</div>
${footer()}`;

writeFileSync(ROOT + "index.html", home);

// ---- videos page ----
const videosPage = `${head("الفيديوهات — " + SITE.name, "كل فيديو: الفيديو، الطريقة، والأدوات.", "../")}
${header("../", "videos")}
<div class="pagehead"><span class="en">Videos · How they were made</span><h1>الفيديوهات</h1><p>كل فيديو بنزّله ليه صفحة: الفيديو نفسه، الطريقة خطوة بخطوة، والأدوات والحركات اللي اتعمل بيها.</p></div>
${videos.length
  ? `<div class="grid">${videos.map((v, i) => videoCard(v, i, "")).join("")}</div>`
  : `<div class="empty"><b>أول فيديو نازل قريب</b>كل فيديو بنزّله هيبقى ليه صفحة هنا.</div>`}
${footer()}`;
writeFileSync(ROOT + "videos/index.html", videosPage);

// ---- tools page ----
mkdirSync(ROOT + "tools", { recursive: true });
const toolsPage = `${head("الأدوات — " + SITE.name, "الأدوات اللي بستخدمها مع البنك في الفيديوهات.", "../")}
${header("../", "tools")}
<div class="pagehead"><span class="en">Tools I use</span><h1>الأدوات</h1><p>الأدوات اللي بستخدمها مع البنك في الفيديوهات. السكيلز والحركات مكانها جوه <a href="../${esc(LATEST)}/">البنك</a>.</p></div>
<div class="tools">${tools.map((t) => `<a class="tool" href="${esc(t.url)}" target="_blank" rel="noopener"><span class="en">${esc(t.type)}${t.addedIn === latestTool && latestTool ? " · new" : ""}</span><b>${esc(t.name)}</b><span>${esc(t.use)}</span></a>`).join("")}</div>
${footer()}`;
writeFileSync(ROOT + "tools/index.html", toolsPage);

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

    <p><a class="back" href="../">→ كل الفيديوهات</a></p>
  </div>
</article>
${footer()}`;
  writeFileSync(ROOT + dir + "/index.html", page);
}

console.log(`ok — home + ${videos.length} video page(s); bank → ${LATEST}/ ${BANK_VERSION} (${motions.length} motions)`);
