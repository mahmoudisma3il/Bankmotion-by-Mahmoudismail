# بنك الحركات — Mahmoud Ismail Bankmotion

مكتبة حركات موشن جرافيك جاهزة بالكود للريلز والفيديوهات القصيرة **(1080×1920 · 9:16)**. كل حركة ليها **كود ثابت** زي `S302`. لما تقول لأي AI (Claude أو Codex): «استخدم حركة S302»، هيلاقيها في البنك ويعرف يستخدمها.

> A library of coded motion-graphics moves for vertical short-form video, built as HyperFrames compositions (HTML + GSAP). Each move has a permanent code (e.g. `S302`) so AI agents can reuse it by name. Arabic-first (RTL, Cairo font).

## فيه إيه؟
- **96 حركة أصلية** في ٧ أقسام:
  - **T** نصوص
  - **S** انتقالات
  - **N** أرقام
  - **U** واجهات وإشعارات
  - **P** صور وكاميرا
  - **C** نهايات ولوجو
  - **B** خلفيات
- **447 عنصر من مكتبة [HyperFrames](https://github.com/heygen-com/hyperframes)** بأكواد `H001`–`H447`، وبيتركّبوا بأمر `npx hyperframes add <name>`.
- القايمة كاملة في [MOTIONS.md](MOTIONS.md)، والفهرس اللي الـAI بيقراه في [catalog.json](catalog.json).

## إزاي أستخدمه؟
1. **افتح `index.html`**: دي صفحة البنك. عدّي بالماوس على أي كارت عشان الحركة تشتغل، أو اضغط عليه تشوفها كبيرة.
2. **اختار** «أي ✓» أو «لا ✗»، وبعدين **«انسخ للـAI»** والصقه في الشات مع فكرة الفيديو.
3. الـAI بيقرا [AGENTS.md](AGENTS.md) ويعرف كل كود فين وإزاي يعدّله ويرندره.

### رندر حركة لوحدها لفيديو
```bash
node tools/render.mjs S302                  # → renders/S302.mp4
node tools/render.mjs T104 N401 --quality delivery
```
محتاج Node و[HyperFrames](https://github.com/heygen-com/hyperframes) (`npx hyperframes`).

### تعديل حركة
افتح `motions/<CODE>-.../index.html` وغيّر قيم `P` اللي في أول السكريبت (النص والأرقام والألوان). المشاهد والصور اللي في الحركات (`.scene-a` و`.photo` و`.person`) مجرد أماكن مؤقتة، بدّلها بالفيديو أو الصورة الحقيقية.

## التحديثات
البنك بيتحدّث كل شهر بحركات جديدة. الأكواد القديمة **ما بتتغيرش أبدًا**. التفاصيل في [UPDATING.md](UPDATING.md) و[CHANGELOG.md](CHANGELOG.md).

## المصادر والرخص
- كود البنك: MIT © Mahmoud Ismail.
- حركات كتير مستوحاة من [HyperFrames](https://github.com/heygen-com/hyperframes) (Apache-2.0) و[Remotion templates](https://github.com/reactvideoeditor/remotion-templates)، ومصدر كل حركة مكتوب في `meta.json` بتاعها. فكرة البنك نفسها مستوحاة من ريل Majedteq.
- عناصر `H` ملك HyperFrames/HeyGen (Apache-2.0)، والبنك بيشاور عليها بس.
- الخط Cairo تحت رخصة OFL (`fonts/OFL-Cairo.txt`). وGSAP تحت [GSAP Standard License](https://gsap.com/standard-license).
