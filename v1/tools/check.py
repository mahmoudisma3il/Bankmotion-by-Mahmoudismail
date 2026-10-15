"""Bankmotion checker: loads every motion headless, reports JS errors,
verifies the timeline is registered, and writes poster.jpg (frame at ~70%).
Usage: python3 tools/check.py [CODE ...] [--strip DIR]   (needs playwright + chromium)
"""
import json, sys, pathlib, re
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
GSAP = (ROOT / "lib" / "gsap.min.js").read_text()
args = [a for a in sys.argv[1:] if not a.startswith("--")]
strip_dir = None
if "--strip" in sys.argv:
    strip_dir = pathlib.Path(sys.argv[sys.argv.index("--strip") + 1]); strip_dir.mkdir(parents=True, exist_ok=True)
    args = [a for a in args if a != str(strip_dir)]

dirs = sorted(d for d in (ROOT / "motions").iterdir() if d.is_dir())
if args:
    dirs = [d for d in dirs if d.name.split("-")[0] in args]

report = []
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1080, "height": 1920}, device_scale_factor=0.25)
    ctx.route(re.compile(r".*cdn\.jsdelivr\.net/npm/gsap.*"), lambda r: r.fulfill(body=GSAP, content_type="application/javascript"))
    for d in dirs:
        meta = json.loads((d / "meta.json").read_text())
        pg = ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append("console: " + m.text) if m.type == "error" else None)
        pg.goto((d / "index.html").as_uri())
        pg.wait_for_function("document.fonts.status==='loaded'")
        cid = pg.eval_on_selector("#root", "e=>e.dataset.compositionId")
        info = pg.evaluate("id=>{const t=window.__timelines&&window.__timelines[id];return t?{dur:t.duration()}:null}", cid)
        ok = info is not None and not errs
        if info:
            dur = meta["duration"]
            pg.evaluate("([id,t])=>{window.__timelines[id].seek(t,false)}", [cid, round(dur * 0.72, 2)])
            pg.wait_for_timeout(60)
            pg.screenshot(path=str(d / "poster.jpg"), type="jpeg", quality=82)
            if strip_dir:
                for i, f in enumerate([0.15, 0.4, 0.6, 0.95]):
                    pg.evaluate("([id,t])=>{window.__timelines[id].seek(t,false)}", [cid, round(dur * f, 2)])
                    pg.wait_for_timeout(40)
                    pg.screenshot(path=str(strip_dir / f"{meta['code']}_{i}.jpg"), type="jpeg", quality=70)
        report.append({"code": meta["code"], "ok": ok, "tl": info, "errors": errs[:3]})
        pg.close()
    b.close()

bad = [r for r in report if not r["ok"]]
for r in bad:
    print("FAIL", r["code"], r["tl"], r["errors"])
long_ = [r for r in report if r["tl"] and r["tl"]["dur"] > json.loads((ROOT / "motions" / next(x.name for x in dirs if x.name.startswith(r["code"])) / "meta.json").read_text())["duration"] + 0.01]
for r in long_:
    print("WARN timeline longer than data-duration:", r["code"], r["tl"])
print(f"{len(report) - len(bad)}/{len(report)} ok")
