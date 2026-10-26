# ADDING-VIDEOS.md — إضافة صفحة فيديو جديد للموقع

الموقع (الصفحة الرئيسية) بيتبني من `videos/videos.json`. كل فيديو بننشره = صفحة جديدة فيها: الفيديو، الطريقة، الأدوات، والحركات المستخدمة من البنك.

> القاعدة: **متعدّلش أي حاجة جوه فولدرات البنك** (`v1/`, `v2/`…). الموقع كله في: `index.html` و`site/` و`videos/`.

## الخطوات
1. اعمل فولدر للفيديو: `videos/<slug>/` (اسم إنجليزي قصير، مثلًا `counter-reel`).
2. حط فيه:
   - الفيديو: `video.mp4` (H.264، 1080×1920، يفضّل أقل من 25MB).
   - صورة الغلاف: `poster.jpg` (فريم من الفيديو، 1080×1920).
3. ضيف عنصر **في أول** قايمة `videos` في `videos/videos.json`:

```json
{
  "slug": "counter-reel",
  "title": "ريل العدّاد — 4 أدوات بيعملوا ريل كامل",
  "date": "2026-11",
  "summary": "سطر أو اتنين عن الفيديو.",
  "video": "video.mp4",
  "poster": "poster.jpg",
  "steps": [
    { "title": "الصوت", "text": "إزاي اتعمل الجزء ده." }
  ],
  "tools": [
    { "name": "ElevenLabs", "type": "Voice", "use": "التعليق الصوتي", "url": "https://elevenlabs.io" }
  ],
  "motions": ["T104", "S302"]
}
```

4. شغّل من جذر الريبو: `node site/build.mjs` — بيطلّع `index.html` وصفحة `videos/<slug>/index.html`.
5. Commit: `site: add video <slug>` وPush. GitHub Pages بيحدّث الموقع لوحده خلال دقيقة أو اتنين.

## لما ينزل إصدار جديد من البنك (v2…)
- غيّر `LATEST` زي ما `UPDATING.md` بيقول، وبعدين شغّل `node site/build.mjs` — كارت البنك في الصفحة الرئيسية هيشاور على آخر نسخة لوحده، والأرقام هتتحدّث من `catalog.json`.
