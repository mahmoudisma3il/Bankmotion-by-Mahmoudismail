---
name: fox-carousel
description: Make a full Instagram/LinkedIn carousel (1080x1350 PNG slides) in the user's own brand from one topic line, with no Photoshop or Canva. Use when the user asks for a carousel, كاروسيل, slides for a post, or a swipe post.
---

# fox-carousel: كاروسيل كامل بهويتك من سطر واحد

Made by Mahmoud Ismail (Fox), part of BankMotion. You get a topic, you write the copy, you render branded PNG slides with `render.mjs`, you look at them, and you hand them over ready to post.

## Files
- `template.html`: the slide design (8 layouts, light or dark, auto-fits text).
- `render.mjs`: `node render.mjs <slides.json> [out_dir]` renders `slide-01.png`… and `preview.png` (all slides on one sheet).
- `brands/<name>/brand.json`: a brand kit. `brands/fox/` is the default.
- `examples/*.json`: four ready decks (one real, three made-up brands). Copy one to start.

Needs Node 18+ and Playwright: `npm i playwright && npx playwright install chromium` (skip if `require('playwright')` already works).

## Workflow

1. **Topic.** If the user gave one, use it. If not, ask for it in one short question. Also ask who the post is for if it isn't obvious.
2. **Brand.** Ask "نفس البراند ولا براند جديد؟" only if more than one kit exists or none fits.
   - New brand: ask for the logo file (SVG/PNG), the social handle, and 3 colors (background, text, accent). If they only send a logo or a screenshot, pick the colors from it and say which you picked. Optional: profile photo, card color, fonts.
   - Save it as `brands/<slug>/brand.json` (copy the shape of `brands/fox/brand.json`) so the next carousel reuses it.
   - A dark background switches the whole design to dark mode automatically.
3. **Copy first.** Write the deck as a short numbered list (slide type + headline) in the user's language and dialect. Show it and wait for a yes or edits before rendering. Rules:
   - 5 to 8 slides. Slide 1 is the hook, the last slide is the CTA.
   - One idea per slide. Headline ≤ 8 words, 2–3 short lines (use `\n`). Body ≤ 18 words.
   - Hook formulas that work: a number + a pain ("٥ أخطاء بتخلّي…"), a before/after, or a promise with a time ("في ١٠ دقايق").
   - Never invent stats, quotes from real people, or fake reviews. Use real numbers or none.
   - No em dashes. Write like a person.
   - CTA: save / follow / link in bio. Never "comment X and I'll send it".
4. **Write `slides.json`** next to the user's work (not inside this folder):
   ```json
   { "brand": "<path to brand.json>", "dir": "rtl", "swipe": "اسحب", "slides": [ … ] }
   ```
   Use `"dir": "ltr"` and `"swipe": "Swipe"` for English decks.
5. **Render:** `node <skill>/render.mjs slides.json out/`. Any `WARN … overflows` line means a slide is too long: shorten that text and render again.
6. **Look** at `out/preview.png`, then at least the cover full size. Check: nothing cut off, accent words make sense, the logo is readable on the background. Fix and re-render once if needed.
7. **Deliver** the PNGs (and the preview). Tell the user the slide count and one line on what to post with it.

## Slide types

All text fields accept inline marks: `*word*` accent color, `==word==` highlight box, `~~word~~` strike, `\n` new line, `[en]Latin[/en]` keeps Latin text left-to-right inside Arabic.

| type | fields | use for |
|---|---|---|
| `cover` | `kicker`, `title`, `text`, `cards` (3 short labels) or `image` | the hook |
| `point` | `n`, `kicker`, `title`, `text`, `tip` | numbered tips / mistakes |
| `step` | `kicker`, `title`, `text`, `ui` {`type`:`chat`\|`code`, `title`, `lines`} or `image` | how-to steps, app or AI demos |
| `compare` | `kicker`, `title`, `before`, `after`, `beforeLabel`, `afterLabel` | before / after, wrong / right |
| `list` | `kicker`, `title`, `items` (≤ 5) | checklists |
| `stat` | `kicker`, `value`, `title`, `text` | one big real number |
| `quote` | `title`, `by` | a line worth saving |
| `cta` | `kicker`, `title`, `text`, `button` | the last slide |

`ui.lines` for chat: `[{ "from": "me", "text": "…" }, { "from": "ai", "text": "…" }]`. For code: an array of strings.

## brand.json
```json
{ "name": "…", "handle": "@…", "logo": "logo.svg", "avatar": "avatar.jpg",
  "colors": { "bg": "#E8E8E8", "card": "#F0F0F0", "text": "#131313", "muted": "#6D6D6D", "accent": "#5B4FDB" },
  "fonts": { "main": "Dubai", "latin": "Dubai", "mono": "ui-monospace" },
  "fontFaces": [ { "family": "MyFont", "src": "fonts/MyFont.woff2", "weight": 700 } ] }
```
Paths are relative to the brand.json file. `card`, `muted`, `avatar`, `fonts` and `fontFaces` are optional. Dubai ships with the skill.
