// Builds catalog.json, index.html (the bank page) and MOTIONS.md from motions/*/meta.json
// Usage: node tools/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CATEGORIES } from "./generate.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "bank.config.json"), "utf8"));
const motions = fs.readdirSync(path.join(ROOT, "motions")).filter((d) => fs.existsSync(path.join(ROOT, "motions", d, "meta.json")))
  .map((d) => ({ ...JSON.parse(fs.readFileSync(path.join(ROOT, "motions", d, "meta.json"), "utf8")), dir: "motions/" + d }))
  .sort((a, b) => a.code.localeCompare(b.code));
const hf = JSON.parse(fs.readFileSync(path.join(ROOT, "src", "hyperframes-registry.json"), "utf8"));

const catalog = {
  name: cfg.name, version: cfg.version, updated: cfg.updated, repo: cfg.repo,
  howToResolve: "Find the code in motions[] (own motions, folder = dir) or hyperframes[] (install with the `install` command). Codes never change.",
  categories: CATEGORIES,
  motions,
  hyperframes: hf.items,
};
fs.writeFileSync(path.join(ROOT, "catalog.json"), JSON.stringify(catalog, null, 1));

const tpl = fs.readFileSync(path.join(ROOT, "tools", "page-template.html"), "utf8");
fs.writeFileSync(path.join(ROOT, "index.html"), tpl.replace("/*__DATA__*/", JSON.stringify(catalog).replace(/</g, "\\u003c")));

let md = `# قائمة الحركات — ${cfg.name} (${cfg.version})\n\n${motions.length} حركة أصلية + ${hf.items.length} من مكتبة HyperFrames.\n`;
for (const [k, c] of Object.entries(CATEGORIES)) {
  const list = motions.filter((m) => m.category === k);
  md += `\n## ${k} — ${c.name} (${c.en})\n\n| الكود | الاسم | الوصف | المدة |\n|---|---|---|---|\n`;
  md += list.map((m) => `| [\`${m.code}\`](${m.dir}/) | ${m.name} | ${m.description} | ${m.duration}s |`).join("\n") + "\n";
}
md += `\n## H — مكتبة HyperFrames\n\nبتتركّب بـ \`npx hyperframes add <name>\`. الكود H ثابت.\n\n| الكود | الاسم | النوع | الوصف |\n|---|---|---|---|\n`;
md += hf.items.map((h) => `| \`${h.code}\` | \`${h.name}\` | ${h.type} | ${h.description.replace(/\|/g, "/")} |`).join("\n") + "\n";
fs.writeFileSync(path.join(ROOT, "MOTIONS.md"), md);
console.log(`built: ${motions.length} motions + ${hf.items.length} HyperFrames items → catalog.json, index.html, MOTIONS.md`);
