# AGENTS.md — Mahmoud Ismail Bankmotion (بنك الحركات)

This folder is a **motion bank**: ready-made, coded motion-graphics moves for short vertical videos (1080×1920, 9:16), built as **HyperFrames compositions** (HTML + GSAP, deterministic, seekable).
Every motion has a **permanent code** like `S302`. When the user says "use motion S302" (or "حركة S302", "s302", "استخدم 4 و 9"), resolve it from this bank. Never guess what a code means.

## 1. Resolve a code

1. Open `catalog.json` in this folder.
2. Look the code up (case-insensitive):
   - `motions[]` → an original bank motion. Its folder is `dir` (e.g. `motions/S302-zoom-blend/`), the composition is `path`.
   - `hyperframes[]` (codes `H001`…) → an item from the HyperFrames registry. Install it with its `install` command (`npx hyperframes add <name>`) inside the HyperFrames project.
3. Read the motion's `README.md` (Arabic) and the top of its `index.html`: the `P` object holds everything that is meant to be changed (text, numbers, colours, timing).

Codes by letter:

| Letter | Category | Arabic |
|---|---|---|
| T1xx | Text & typography | نصوص وتايبوجرافي |
| S3xx | Transitions (scene A → scene B) | انتقالات |
| N4xx | Numbers & data | أرقام وبيانات |
| U5xx | UI & notifications | واجهات وإشعارات |
| P6xx | Photo, people & camera | صور وأشخاص وكاميرا |
| C7xx | CTA, logo & end cards | دعوة لإجراء ولوجو ونهايات |
| B8xx | Backgrounds & effects | خلفيات وتأثيرات |
| H### | HyperFrames registry item | مكتبة HyperFrames |

If the user gives only numbers ("4 و 9 و 17"), they are usually reading the bank page cards: map each number to the code shown on the card and **confirm the list back** before building.

## 2. Use a motion in a video

Each `motions/<CODE>-<slug>/index.html` is a **standalone HyperFrames composition**: root `#root[data-composition-id]`, one paused GSAP timeline registered at `window.__timelines[id]`, fonts embedded (Cairo, base64), GSAP from jsDelivr with a local fallback (`lib/gsap.min.js`).

- **Quick render of one motion:** `node tools/render.mjs S302` → `renders/S302.mp4` (uses `npx hyperframes render`; extra flags like `--quality delivery --fps 60` pass through).
- **Customise:** copy the motion folder into the video project (or the whole bank), then edit `P` and the placeholder layers:
  - `.scene-a` / `.scene-b` / `.scene-c` = the two/three scenes of a transition → replace their contents with the real `<video>`/`<img>`.
  - `.photo` (sky/sun/hills) = placeholder picture; `.person` (dark silhouette) = placeholder for a cut-out person PNG.
- **Inside a bigger HyperFrames project:** use the motion as a sub-composition — move the root, its `<style>` and its `<script>` **inside a `<template>`** in `compositions/<code>.html`, keep the same id for the host slot, the template root and `window.__timelines[...]`, then mount it from `index.html` with `data-composition-src`, `data-start`, `data-duration`, `data-width="1080" data-height="1920"`. Follow the HyperFrames core rules (`npx hyperframes skills`, `/hyperframes-core`).
- **Other engines (Remotion, After Effects scripts, CSS):** the GSAP timeline is short and readable; port the tweens (times, eases, values) 1:1.
- Combine motions by stacking them on the timeline (e.g. `B801` background + `T104` text + `S302` to the next scene).

Rules that keep renders correct (learned from HyperFrames lint):
- Do **not** put `dir="rtl"` on `<html>` (renders black). Direction is set on `#root`.
- Split Arabic text **by words only** (`words()` helper). Never split Arabic into letters — it breaks letter joining.
- Keep everything deterministic: seeded `rng()`, no `Math.random`, no clocks, no network at render time.
- Don't tween `marginLeft/letterSpacing/top/left` for motion — use transforms (`x`, `y`, `scale`). When tweening `filter`, use `fromTo` with an explicit start (from `none`, `brightness()` starts at 0 = black frame).
- Read numeric CSS variables with `CSSV("accent")` before tweening colours; GSAP can't tween `var(--x)` strings.

## 3. Add a new motion (and keep the bank growing)

1. Pick the **next free code** in the right letter range (look at `catalog.json`). **Never renumber or reuse a code** — old videos and prompts depend on them.
2. Add a definition object to the matching file in `src/defs/` (`code, slug, name (Arabic), desc (Arabic), dur, theme, params, css, html, js, source, addedIn`).
3. `node tools/generate.mjs <CODE>` → writes `motions/<CODE>-<slug>/` (index.html, meta.json, README.md).
4. `python3 tools/check.py <CODE>` → headless check (no JS errors, timeline registered, timeline ≤ data-duration) + `poster.jpg`.
5. Optional: `npx hyperframes lint motions/<CODE>-<slug>` → must be 0 errors.
6. `node tools/build.mjs` → rebuilds `catalog.json`, `index.html` (the bank page) and `MOTIONS.md`.
7. Add a line to `CHANGELOG.md`.

If a motion was invented while editing a real video, add it here the same way so the next video can reuse it by code.

## 4. Files

| Path | What |
|---|---|
| `index.html` | The bank page: live previews, search, ✓/✗ picks, "copy for AI" |
| `catalog.json` | Machine-readable index of every code (source of truth for agents) |
| `MOTIONS.md` | Human-readable list of all codes |
| `motions/<CODE>-<slug>/` | One motion: `index.html` (composition), `meta.json`, `README.md`, `poster.jpg` |
| `src/defs/*.mjs` | Source definitions the motions are generated from |
| `src/hyperframes-registry.json` | Permanent H-code mapping of the HyperFrames registry |
| `tools/` | `generate.mjs`, `build.mjs`, `check.py`, `render.mjs`, `page-template.html` |
| `fonts/`, `lib/` | Cairo (OFL) and GSAP |
| `UPDATING.md` | The monthly update procedure |
