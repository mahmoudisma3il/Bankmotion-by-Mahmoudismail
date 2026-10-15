#!/usr/bin/env node
// Bankmotion → MP4 via HyperFrames.
// Usage (from the bank root):
//   node tools/render.mjs S302                 -> renders/S302.mp4
//   node tools/render.mjs T101 N401 --quality draft --fps 60
//   node tools/render.mjs path/to/any-composition.html
// It copies the motion into a temporary HyperFrames project (with fonts + GSAP),
// then runs `npx hyperframes render`. Extra flags are passed straight to HyperFrames.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const targets = args.filter((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--") && !args[i - 1].includes("=")));
const passthrough = args.filter((a) => !targets.includes(a));
if (!targets.length) {
  console.log("Usage: node tools/render.mjs <CODE|file.html> [...] [--quality draft|looks|delivery] [--fps 30|60]");
  process.exit(1);
}

function resolveTarget(t) {
  if (t.endsWith(".html")) return path.resolve(t);
  const dir = fs.readdirSync(path.join(ROOT, "motions")).find((d) => d.toUpperCase().startsWith(t.toUpperCase() + "-"));
  if (!dir) throw new Error("Motion not found: " + t + " (see catalog.json)");
  return path.join(ROOT, "motions", dir, "index.html");
}

fs.mkdirSync(path.join(ROOT, "renders"), { recursive: true });
for (const t of targets) {
  const src = resolveTarget(t);
  const name = t.endsWith(".html") ? path.basename(path.dirname(src)) : t.toUpperCase();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bankmotion-" + name + "-"));
  fs.cpSync(path.join(ROOT, "fonts"), path.join(tmp, "fonts"), { recursive: true });
  fs.cpSync(path.join(ROOT, "lib"), path.join(tmp, "lib"), { recursive: true });
  let html = fs.readFileSync(src, "utf8").replaceAll("../../fonts/", "fonts/").replaceAll("../../lib/", "lib/");
  fs.writeFileSync(path.join(tmp, "index.html"), html);
  // copy any local assets that sit next to the composition (images/videos you dropped in)
  for (const f of fs.readdirSync(path.dirname(src))) {
    if (!["index.html", "meta.json", "README.md", "poster.jpg"].includes(f)) fs.cpSync(path.join(path.dirname(src), f), path.join(tmp, f), { recursive: true });
  }
  const out = path.join(ROOT, "renders", name + ".mp4");
  console.log(`▶ ${name}  →  ${path.relative(ROOT, out)}`);
  const r = spawnSync("npx", ["--yes", "hyperframes", "render", tmp, "--output", out, ...passthrough], { stdio: "inherit", shell: process.platform === "win32" });
  if (r.status !== 0) { console.error("✗ render failed for " + name); process.exitCode = 1; }
}
