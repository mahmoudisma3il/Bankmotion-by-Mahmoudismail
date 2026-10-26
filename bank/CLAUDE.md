# CLAUDE.md

Read **AGENTS.md** in this folder — it is the full guide for this motion bank (how to resolve a code like `S302`, use it in a video, render it, and add new motions).

Short version:
- Codes live in `catalog.json` (`motions[]` = folders under `motions/`, `hyperframes[]` = `npx hyperframes add <name>`).
- Each motion is a standalone HyperFrames composition (1080×1920). Edit the `P` object, swap placeholder layers for real media.
- Render: `node tools/render.mjs <CODE>`.
- Never renumber codes. New motion → next free code → `node tools/generate.mjs CODE && python3 tools/check.py CODE && node tools/build.mjs`.
- The user writes in Egyptian Arabic; reply the same way.
