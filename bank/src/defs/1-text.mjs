// T: نصوص وتايبوجرافي
const HF = "مستوحاة من HyperFrames (heygen-com/hyperframes, Apache-2.0)";
export default [
{
  code: "T101", slug: "word-pop", name: "كلمة كلمة", tags: ["text","stagger","entrance"],
  desc: "الجملة بتطلع كلمة ورا كلمة، وكل كلمة بتنطّ نطّة صغيرة. تنفع لأي هوك أو كابشن.",
  dur: 3, params: { text: "كل كلمة بتظهر لوحدها مع الإيقاع" },
  html: `<div class="stage"><div class="h2" id="t" data-p="text"></div></div>`,
  js: `const ws=words($("#t"));
tl.from(ws,{y:90,opacity:0,scale:.6,duration:.45,ease:"back.out(2.2)",stagger:.16},.2);`,
  source: HF + ": per-word-rise / spring-pop",
},
{
  code: "T102", slug: "keyword-box", name: "كلمة في بوكس", tags: ["text","highlight","keyword"],
  desc: "الجملة بتظهر، وبعدها الكلمة المهمة بتدخل في بوكس ملوّن بخبطة. زي «المونتاج بقى أسرع».",
  dur: 3, params: { pre: "المونتاج صار", kw: "أسرع" },
  css: `.kw{position:relative;display:inline-block;padding:0 34px;color:#fff;margin-top:20px}
.kwbg{position:absolute;top:6px;bottom:-12px;left:0;right:0;background:var(--accent);border-radius:22px;transform-origin:100% 50%}
.kwt{position:relative;display:inline-block}`,
  html: `<div class="stage"><div class="h2" data-p="pre" id="pre"></div><div class="h1"><span class="kw" id="kw"><span class="kwbg"></span><span class="kwt" data-p="kw"></span></span></div></div>`,
  js: `tl.from("#pre",{y:50,opacity:0,duration:.5,ease:"power3.out"},.2)
.from(".kwbg",{scaleX:0,duration:.45,ease:"power4.out"},.75)
.from(".kwt",{opacity:0,scale:1.8,duration:.45,ease:"back.out(3)"},.9)
.to("#kw",{rotation:-4,duration:.12,yoyo:true,repeat:1,ease:"sine.inOut"},1.35);`,
  source: "من فكرة «كلمة تسبّق» في ريل Majedteq + " + HF + ": inline-highlight",
},
{
  code: "T103", slug: "typewriter", name: "آلة كاتبة", tags: ["text","typing"],
  desc: "الكلام بيتكتب حرف حرف ومعاه مؤشر بيرمش، والحروف العربي بتفضل متوصلة.",
  dur: 4, params: { text: "اكتب الفكرة… وسيب الباقي علينا", cps: 14 },
  css: `.tw{display:inline}.caret{display:inline-block;width:10px;height:110px;background:var(--accent);vertical-align:middle;margin-right:10px}`,
  html: `<div class="stage"><div class="h2"><span class="tw" id="tw"></span><span class="caret" id="caret"></span></div></div>`,
  js: `const full=Array.from(P.text),tw=$("#tw"),o={n:0};
tl.to(o,{n:full.length,duration:full.length/P.cps,ease:"none",onUpdate:()=>{tw.textContent=full.slice(0,Math.round(o.n)).join("")}},.3);
tl.to("#caret",{opacity:0,duration:.28,ease:"steps(1)",repeat:13,yoyo:true},0);`,
  source: HF + ": typewriter",
},
{
  code: "T104", slug: "beat-slam", name: "كلمات على الإيقاع", tags: ["text","kinetic","beat"],
  desc: "كل كلمة بتخبط في نص الشاشة لوحدها على الإيقاع، وآخر كلمة بلون مختلف. بتنفع في أول الفيديو.",
  dur: 3.2, theme: "dark", params: { words: "ركّز|على|الفكرة|مش|الأداة", beat: 0.45 },
  css: `.slam{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:190px;font-weight:900}`,
  html: `<div id="s" style="position:absolute;inset:0"></div>`,
  js: `const list=P.words.split("|"),host=$("#s");
list.forEach((w,i)=>{const d=document.createElement("div");d.className="slam";d.textContent=w;if(i===list.length-1)d.style.color="var(--accent)";host.appendChild(d);
const t=.15+i*P.beat;tl.fromTo(d,{scale:2.6,opacity:0},{scale:1,opacity:1,duration:.22,ease:"expo.out"},t);
tl.fromTo("#s",{x:0},{x:14,duration:.05,yoyo:true,repeat:3,ease:"none"},t+.18);
if(i<list.length-1)tl.set(d,{opacity:0},t+P.beat);});`,
  source: HF + ": kinetic-beat-slam",
},
{
  code: "T105", slug: "marker-highlight", name: "قلم فسفوري", tags: ["text","highlight","marker"],
  desc: "خط فسفوري بيترسم ورا الجملة المهمة، كأنك بتعلّم عليها في كشكول.",
  dur: 3, params: { pre: "السر كله في", kw: "أول ٣ ثواني", color: "#FFD84D" },
  css: `.mk{position:relative;display:inline-block;padding:0 14px}.mkbg{position:absolute;left:0;right:0;bottom:12%;height:46%;border-radius:10px;transform-origin:100% 50%}.mkt{position:relative}`,
  html: `<div class="stage"><div class="h2" data-p="pre" id="pre"></div><div class="h2"><span class="mk"><span class="mkbg" id="bg"></span><span class="mkt" data-p="kw"></span></span></div></div>`,
  js: `$("#bg").style.background=P.color;
tl.from("#pre,.mk",{y:40,opacity:0,duration:.5,stagger:.2,ease:"power3.out"},.2)
.from("#bg",{scaleX:0,duration:.6,ease:"power2.inOut"},1);`,
  source: HF + ": marker-highlight",
},
{
  code: "T106", slug: "hand-underline", name: "خط تحت الكلمة", tags: ["text","svg","draw"],
  desc: "خط بإيد بيترسم تحت الكلمة من اليمين للشمال.",
  dur: 3, params: { pre: "ده أهم", kw: "سطر في الفيديو" },
  css: `.ul{position:relative;display:inline-block}.ul svg{position:absolute;left:-10px;right:-10px;bottom:-34px;width:calc(100% + 20px);height:60px;overflow:visible}`,
  html: `<div class="stage"><div class="h2"><span data-p="pre"></span> <span class="ul"><span data-p="kw"></span><svg viewBox="0 0 600 40" preserveAspectRatio="none"><path id="p" d="M595 16 Q 450 2 300 16 T 5 22" fill="none" stroke="var(--accent)" stroke-width="9" stroke-linecap="round"/></svg></span></div></div>`,
  js: `const p=$("#p"),L=p.getTotalLength();p.style.strokeDasharray=L;
tl.from(".h2",{y:40,opacity:0,duration:.5,ease:"power3.out"},.2)
.fromTo(p,{strokeDashoffset:L},{strokeDashoffset:0,duration:.6,ease:"power2.out"},.9);`,
  source: HF + ": hw-underline",
},
{
  code: "T107", slug: "circle-word", name: "دايرة حوالين الكلمة", tags: ["text","svg","draw","callout"],
  desc: "دايرة بإيد بتترسم حوالين الكلمة عشان العين تروحلها.",
  dur: 3, params: { pre: "ركز على", kw: "السعر" },
  css: `.cw{position:relative;display:inline-block;padding:0 30px}.cw svg{position:absolute;left:-50px;top:-40px;width:calc(100% + 100px);height:calc(100% + 80px);overflow:visible}`,
  html: `<div class="stage"><div class="h2" data-p="pre" id="pre"></div><div class="h1"><span class="cw"><span data-p="kw"></span><svg viewBox="0 0 600 200" preserveAspectRatio="none"><path id="p" d="M560 60 C 600 140 420 190 280 185 C 120 182 10 150 20 95 C 30 35 180 10 320 12 C 450 14 585 40 548 118" fill="none" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/></svg></span></div></div>`,
  js: `const p=$("#p"),L=p.getTotalLength();p.style.strokeDasharray=L;
tl.from("#pre,.cw",{y:40,opacity:0,duration:.5,stagger:.15,ease:"power3.out"},.2)
.fromTo(p,{strokeDashoffset:L},{strokeDashoffset:0,duration:.8,ease:"power2.inOut"},1);`,
  source: HF + ": hw-callout-circle",
},
{
  code: "T108", slug: "strike-replace", name: "شطب وتبديل", tags: ["text","compare","price"],
  desc: "الكلمة بتتشطب، وتحتها بتطلع الكلمة الجديدة بخبطة. بتنفع للأسعار أو «بدل ده خد ده».",
  dur: 3, params: { old: "ساعتين مونتاج", neu: "١٠ دقايق" },
  css: `.old{position:relative;display:inline-block;color:var(--muted)}.strike{position:absolute;left:-10px;right:-10px;top:54%;height:12px;background:var(--accent);border-radius:6px;transform-origin:100% 50%}`,
  html: `<div class="stage"><div class="h2"><span class="old"><span data-p="old"></span><i class="strike"></i></span></div><div class="h1 accent" id="neu" data-p="neu"></div></div>`,
  js: `tl.from(".old",{opacity:0,y:30,duration:.4},.2)
.from(".strike",{scaleX:0,duration:.4,ease:"power3.inOut"},.8)
.from("#neu",{scale:.3,opacity:0,duration:.5,ease:"back.out(2.5)"},1.25);`,
  source: HF + ": strikethrough-replace",
},
{
  code: "T109", slug: "decode", name: "حروف بتلف", tags: ["text","scramble","tech"],
  desc: "حروف عشوائية بتلف لحد ما تقف على الكلمة الصح. شكلها تقني.",
  dur: 3, theme: "dark", params: { text: "الذكاء الاصطناعي" },
  css: `#t{font-family:"Cairo",monospace}`,
  html: `<div class="stage"><div class="h2 accent" id="t"></div><div class="sub">جاري التحليل…</div></div>`,
  js: `const real=Array.from(P.text),pool=Array.from("ابتثجحخدذرزسشصضطظعغفقكلمنهوي"),el=$("#t"),o={p:0};
function h(a,b){return Math.abs(Math.sin(a*12.9898+b*78.233)*43758.5453)%1;}
function draw(){const f=Math.floor(o.p*40);el.textContent=real.map((c,k)=>c===" "?" ":(o.p>=(k+1)/real.length?c:pool[Math.floor(h(f,k)*pool.length)])).join("");}
draw();tl.to(o,{p:1,duration:1.6,ease:"none",onUpdate:draw},.2);`,
  source: HF + ": scramble-reveal / matrix-decode",
},
{
  code: "T110", slug: "blur-in", name: "طالع من الضباب", tags: ["text","blur","soft"],
  desc: "الكلمات بتطلع من ضباب خفيف لحد ما تبان واضحة. حركة هادية.",
  dur: 3, params: { text: "التفاصيل الصغيرة بتفرق" },
  html: `<div class="stage"><div class="h2" id="t" data-p="text"></div></div>`,
  js: `const ws=words($("#t"));
tl.from(ws,{filter:"blur(24px)",opacity:0,y:24,duration:.7,ease:"power2.out",stagger:.14},.2);`,
  source: HF + ": blur-in / soft-blur-in",
},
{
  code: "T111", slug: "line-mask", name: "سطر سطر من تحت", tags: ["text","mask","lines"],
  desc: "كل سطر بيطلع من تحت خط مخفي، سطر ورا التاني. شكل نضيف.",
  dur: 3, params: { lines: "مش محتاج|برامج تقيلة|محتاج فكرة" },
  css: `.ln{overflow:hidden;padding:6px 0}.ln>div{display:block}`,
  html: `<div class="stage" id="s"></div>`,
  js: `P.lines.split("|").forEach((t,i)=>{const w=document.createElement("div");w.className="ln h2";const d=document.createElement("div");d.textContent=t;if(i===2)d.className="accent";w.appendChild(d);$("#s").appendChild(w);
tl.from(d,{yPercent:110,duration:.6,ease:"power4.out"},.2+i*.25);});`,
  source: HF + ": line-by-line-slide",
},
{
  code: "T112", slug: "center-build", name: "كلمة بتنزل من فوق", tags: ["text","scale","hook"],
  desc: "الكلمة بتبدأ ضخمة وتصغر لحد مكانها، وبعدها سطر صغير بيطلع تحتها.",
  dur: 3, theme: "dark", params: { title: "ابدأ", sub: "أول خطوة أهم خطوة" },
  html: `<div class="stage"><div class="h1" style="font-size:230px" id="t" data-p="title"></div><div class="sub" id="s" data-p="sub"></div></div>`,
  js: `tl.from("#t",{scale:6,opacity:0,filter:"blur(12px)",duration:.7,ease:"expo.out"},.2)
.from("#s",{y:40,opacity:0,duration:.5,ease:"power3.out"},.8);`,
  source: HF + ": kinetic-center-build",
},
{
  code: "T113", slug: "word-slot", name: "آخر كلمة بتتغير", tags: ["text","rotate","swap"],
  desc: "جملة ثابتة وآخر كلمة فيها بتلف وتتغير: أسرع، أسهل، أذكى.",
  dur: 4, params: { pre: "خلّي شغلك", words: "أسرع|أسهل|أذكى" },
  css: `.slot{display:inline-block;height:230px;overflow:hidden;vertical-align:bottom;color:var(--accent)}.slot .it{height:230px;line-height:230px}`,
  html: `<div class="stage"><div class="h2" data-p="pre"></div><div class="h1"><span class="slot"><div id="list"></div></span></div></div>`,
  js: `const L=P.words.split("|");L.forEach(w=>{const d=document.createElement("div");d.className="it";d.textContent=w;$("#list").appendChild(d);});
tl.from(".stage",{opacity:0,y:30,duration:.4},.1);
L.forEach((w,i)=>{if(i)tl.to("#list",{y:-230*i,duration:.45,ease:"back.inOut(1.6)"},.3+i*1.1);});`,
  source: HF + ": kinetic-type-swap / vertical-spring-ticker",
},
{
  code: "T114", slug: "shimmer", name: "لمعة على الكلام", tags: ["text","gradient","shine"],
  desc: "لمعة نور بتعدّي على الكلام من اليمين للشمال. حلوة للعناوين والعروض.",
  dur: 3, theme: "dark", params: { text: "عرض لفترة محدودة" },
  css: `.shim{background:linear-gradient(100deg,#fff 35%,var(--accent) 50%,#fff 65%);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent}`,
  html: `<div class="stage"><div class="h1 shim" id="t" data-p="text"></div></div>`,
  js: `tl.from("#t",{opacity:0,scale:.9,duration:.5,ease:"power2.out"},.1)
.fromTo("#t",{backgroundPosition:"100% 0"},{backgroundPosition:"0% 0",duration:1.4,ease:"power1.inOut"},.6);`,
  source: HF + ": text-shimmer / gloss-sweep",
},
{
  code: "T115", slug: "neon", name: "نيون", tags: ["text","glow","neon"],
  desc: "كلام نيون بيرمش أول ما يولّع، وبعدين يثبت منوّر.",
  dur: 3.5, theme: "dark", params: { text: "مفتوح ٢٤ ساعة", color: "#FF3EA5" },
  html: `<div class="stage"><div class="h1" id="t" data-p="text"></div></div>`,
  js: `const t=$("#t");t.style.color=P.color;t.style.textShadow="0 0 20px "+P.color+",0 0 60px "+P.color+",0 0 120px "+P.color;
tl.fromTo(t,{opacity:0},{keyframes:[{opacity:1,duration:.05},{opacity:.1,duration:.08},{opacity:1,duration:.05},{opacity:.2,duration:.1},{opacity:1,duration:.06}],ease:"none"},.3)
.to(t,{opacity:.82,duration:.6,yoyo:true,repeat:3,ease:"sine.inOut"},1);`,
  source: HF + ": caption-neon-glow",
},
{
  code: "T116", slug: "clip-reveal", name: "عنوان بينكشف", tags: ["text","clip-path","reveal"],
  desc: "العنوان بينكشف من تحت لفوق، وبعدين خط تحته بيتمد.",
  dur: 3, params: { title: "عنوان قوي", sub: "وسطر يشرح بسرعة" },
  css: `.bar{width:260px;height:14px;background:var(--accent);border-radius:7px;transform-origin:100% 50%}`,
  html: `<div class="stage"><div class="h1" id="t" data-p="title"></div><div class="bar" id="b"></div><div class="sub" id="s" data-p="sub"></div></div>`,
  js: `tl.fromTo("#t",{clipPath:"inset(100% 0% 0% 0%)",y:60},{clipPath:"inset(0% 0% 0% 0%)",y:0,duration:.7,ease:"power4.out"},.2)
.from("#b",{scaleX:0,duration:.5,ease:"power3.out"},.7)
.from("#s",{opacity:0,y:20,duration:.5},.9);`,
  source: HF + ": svg-mask-reveal / curtain-reveal",
},
{
  code: "T117", slug: "echo", name: "صدى الكلمة", tags: ["text","echo","trail"],
  desc: "نسخ من الكلمة بتتجمع فوق بعض وتدّي إحساس سرعة.",
  dur: 3, theme: "dark", params: { text: "بسرعة" },
  css: `.ec{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:200px;font-weight:900}`,
  html: `<div id="h"></div>`,
  js: `for(let i=5;i>=0;i--){const d=document.createElement("div");d.className="ec";d.textContent=P.text;d.style.opacity=i?0.12+0.1*(5-i):1;if(!i)d.style.color="var(--accent)";else{d.style.color="transparent";d.style.webkitTextStroke="3px #fff";}$("#h").appendChild(d);
tl.from(d,{y:i*170,opacity:0,duration:.6,ease:"power3.out"},.2+(5-i)*.06);}`,
  source: HF + ": echo-trail",
},
{
  code: "T118", slug: "title-lockup", name: "عنوان بكلمة صغيرة فوقه", tags: ["text","title","lockup"],
  desc: "كلمة صغيرة ملوّنة فوق، وتحتها العنوان كلمة كلمة، وتحته سطر صغير. بداية فيديو جاهزة.",
  dur: 3.5, params: { kicker: "حلقة جديدة", title: "إزاي تعمل ريل في ١٠ دقايق", sub: "من غير ولا برنامج" },
  css: `.kick{display:flex;align-items:center;gap:20px;font-size:44px;font-weight:800;color:var(--accent)}.kick i{display:block;width:90px;height:10px;background:var(--accent);border-radius:5px;transform-origin:100% 50%}`,
  html: `<div class="stage"><div class="kick"><i id="kb"></i><span id="kt" data-p="kicker"></span></div><div class="h2" id="t" data-p="title"></div><div class="sub" id="s" data-p="sub"></div></div>`,
  js: `const ws=words($("#t"));
tl.from("#kb",{scaleX:0,duration:.4,ease:"power3.out"},.2).from("#kt",{opacity:0,x:-30,duration:.4},.35)
.from(ws,{y:60,opacity:0,duration:.5,stagger:.08,ease:"power3.out"},.55)
.from("#s",{opacity:0,y:20,duration:.5},1.3);`,
  source: HF + ": titlecard-lockup",
},
{
  code: "T119", slug: "karaoke-caption", name: "كابشن كاريوكي", tags: ["caption","subtitle","karaoke"],
  desc: "كابشن تحت، وكل كلمة بتنوّر بخلفية ملوّنة وقت ما تتقال. ستايل الريلز المعروف.",
  dur: 4, theme: "dark", params: { text: "النهارده هوريك أسهل طريقة تعمل بيها مونتاج", wordTime: 0.38 },
  css: `.cap{position:absolute;left:80px;right:80px;bottom:420px;text-align:center;font-size:76px;font-weight:900;line-height:1.6;color:#fff;text-shadow:0 6px 18px rgba(0,0,0,.6)}.cap .w{padding:0 16px;border-radius:18px}`,
  html: `<div class="photo"><div class="sun"></div><div class="hill1"></div><div class="hill2"></div></div><div class="person"><div class="head"></div><div class="body"></div></div><div class="cap" id="c" data-p="text"></div>`,
  js: `const ws=words($("#c"));tl.from("#c",{opacity:0,y:30,duration:.3},.1);
ws.forEach((w,i)=>{const t=.4+i*P.wordTime;tl.to(w,{backgroundColor:CSSV("accent"),scale:1.12,duration:.1},t).to(w,{backgroundColor:"rgba(0,0,0,0)",scale:1,duration:.1},t+P.wordTime-.04);});`,
  source: HF + ": caption-pill-karaoke",
},
{
  code: "T120", slug: "sticker-word", name: "ستيكر جنب الكلمة", tags: ["text","sticker","badge"],
  desc: "الجملة بتظهر، وستيكر صغير بيتلزق مايل جنب كلمة منها ويتهز.",
  dur: 3, params: { text: "أحسن عرض في الموسم", sticker: "جديد" },
  css: `.wrap{position:relative;display:inline-block}.stk{position:absolute;top:-120px;left:-40px;background:var(--accent);color:#fff;font-size:52px;font-weight:900;padding:6px 34px;border-radius:999px;box-shadow:0 10px 0 rgba(0,0,0,.15)}`,
  html: `<div class="stage"><div class="wrap"><div class="h2" id="t" data-p="text"></div><div class="stk" id="k" data-p="sticker"></div></div></div>`,
  js: `const ws=words($("#t"));tl.from(ws,{opacity:0,y:40,duration:.4,stagger:.1,ease:"power3.out"},.2)
.fromTo("#k",{scale:0,rotation:-40},{scale:1,rotation:-12,duration:.5,ease:"back.out(3)"},1)
.to("#k",{rotation:-6,duration:.1,yoyo:true,repeat:3},1.5);`,
  source: HF + ": badge-pop / caption-emoji-pop",
},
{
  code: "T121", slug: "flip-3d", name: "قلبة 3D", tags: ["text","3d","flip"],
  desc: "كل كلمة بتتقلب لقدام في 3D وهي داخلة.",
  dur: 3, params: { text: "شكل جديد كل مرة" },
  css: `.stage{perspective:1200px}#t .w{transform-origin:50% 50% -60px}`,
  html: `<div class="stage"><div class="h2" id="t" data-p="text"></div></div>`,
  js: `const ws=words($("#t"));tl.from(ws,{rotationX:-100,opacity:0,duration:.7,stagger:.14,ease:"back.out(1.8)"},.2);`,
  source: HF + ": hacker-flip-3d",
},
{
  code: "T122", slug: "marquee-rows", name: "شرايط كلام", tags: ["text","marquee","background"],
  desc: "صفوف كلام ضخم بتجري يمين وشمال عكس بعض، وبعضها مفرّغ. خلفية قوية لأي إعلان.",
  dur: 4, theme: "dark", params: { text: "عروض • خصومات • جديد •" },
  css: `.row{position:absolute;right:-200px;white-space:nowrap;font-size:230px;font-weight:900;line-height:1}.row.o{color:rgba(255,255,255,.16)}`,
  html: `<div id="h"></div>`,
  js: `for(let i=0;i<7;i++){const r=document.createElement("div");r.className="row"+(i%2?" o":"");r.style.top=(i*280-40)+"px";r.textContent=(P.text+" ").repeat(4);if(i===3)r.style.color="var(--accent)";$("#h").appendChild(r);
const dir=i%2?1:-1;tl.fromTo(r,{x:dir*-300},{x:dir*300,duration:4,ease:"none"},0);}
tl.from("#h",{opacity:0,duration:.4},0);`,
  source: HF + ": perspective-marquee / ticker-takeover",
},
{
  code: "T123", slug: "question-answer", name: "سؤال وجواب", tags: ["text","hook","qa"],
  desc: "السؤال بيظهر وعلامة الاستفهام بتتنطط، وبعدين السؤال يطلع لفوق ويظهر الجواب بلون تاني.",
  dur: 4, params: { q: "عاوز تعرف السر؟", a: "التكرار كل يوم" },
  css: `#q{display:flex;align-items:center;justify-content:center}`,
  html: `<div class="stage"><div class="h2" id="q" data-p="q"></div><div class="h1 accent" id="a" data-p="a"></div></div>`,
  js: `tl.from("#q",{scale:.6,opacity:0,duration:.5,ease:"back.out(2)"},.2)
.to("#q",{y:-30,duration:.18,yoyo:true,repeat:3,ease:"power1.out"},.8)
.to("#q",{scale:.6,opacity:.45,y:-60,duration:.5,ease:"power3.inOut"},1.8)
.from("#a",{y:120,opacity:0,scale:.8,duration:.6,ease:"back.out(2)"},2);`,
  source: "تصميم أصلي",
},
{
  code: "T124", slug: "quote", name: "اقتباس", tags: ["text","quote","testimonial"],
  desc: "علامات تنصيص كبيرة بتظهر، وبعدها الاقتباس كلمة كلمة، وفي الآخر اسم صاحبه.",
  dur: 4, params: { quote: "أحسن استثمار هو إنك تتعلم حاجة جديدة كل يوم", author: "محمود إسماعيل" },
  css: `.qm{font-size:360px;line-height:.6;color:var(--accent);font-weight:900;height:180px}`,
  html: `<div class="stage"><div class="qm" id="m">”</div><div class="h3" id="t" data-p="quote"></div><div class="sub" id="a" data-p="author"></div></div>`,
  js: `const ws=words($("#t"));
tl.from("#m",{scale:0,rotation:-30,duration:.5,ease:"back.out(2.5)"},.2)
.from(ws,{opacity:0,y:20,duration:.35,stagger:.07},.6)
.from("#a",{opacity:0,x:-40,duration:.5},1.6);`,
  source: HF + ": testimonial-card",
},
];
