// C — دعوة لإجراء ولوجو ونهايات
const HF = "مستوحاة من HyperFrames (Apache-2.0)";
const CURSOR = `<svg id="cur" viewBox="0 0 40 40" style="position:absolute;width:110px;height:110px;left:0;top:0;filter:drop-shadow(0 6px 10px rgba(0,0,0,.35))"><path d="M6 3 L6 33 L14 25 L20 38 L26 35 L20 23 L31 23 Z" fill="#fff" stroke="#111" stroke-width="2" stroke-linejoin="round"/></svg>`;
export default [
{
  code: "C701", slug: "follow-button", name: "زرار متابعة", tags: ["cta","follow","social"],
  desc: "كارت بروفايل بزرار «متابعة»، الماوس بيضغط عليه فيتحول لـ«تمت المتابعة» بلون تاني.",
  dur: 3.5, theme: "dark", params: { name: "Fox Studio", handle: "@mahmoud_ismaiil", btn: "متابعة", done: "تمت المتابعة ✓" },
  css: `.pf{position:absolute;left:80px;right:80px;top:640px;background:var(--card);border-radius:50px;padding:60px;display:flex;flex-direction:column;align-items:center;gap:20px}.av{width:200px;height:200px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#F5B921)}.nm{font-size:64px;font-weight:900}.hd{font-size:40px;color:var(--muted);direction:ltr}
.bt{position:relative;margin-top:20px;width:560px;height:150px;border-radius:75px;background:var(--accent);font-size:56px;font-weight:900;color:#fff}.bt span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}`,
  html: `<div class="pf" id="pf"><div class="av"></div><div class="nm" data-p="name"></div><div class="hd" data-p="handle"></div><div class="bt" id="bt"><span id="b1" data-p="btn"></span><span id="b2" data-p="done" style="opacity:0"></span></div></div>` + CURSOR,
  js: `tl.from("#pf",{y:500,opacity:0,duration:.6,ease:"back.out(1.5)"},.1)
.fromTo("#cur",{x:900,y:1700},{x:560,y:1330,duration:.7,ease:"power2.inOut"},.6).to("#cur,#bt",{scale:.9,duration:.1,yoyo:true,repeat:1},1.35)
.to("#bt",{backgroundColor:"#2A2A31",duration:.2},1.45).to("#b1",{opacity:0,y:-30,duration:.2},1.45).fromTo("#b2",{opacity:0,y:30},{opacity:1,y:0,duration:.3,ease:"back.out(2)"},1.5);`,
  source: HF + " — instagram-follow / x-follow-card",
},
{
  code: "C702", slug: "logo-draw", name: "لوجو بيترسم", tags: ["logo","svg","draw","outro"],
  desc: "خطوط اللوجو بتترسم بالقلم، وبعدين يتملي بلون، واسم البراند يطلع تحته.",
  dur: 3.5, theme: "dark", params: { brand: "اسم البراند", tagline: "شعار البراند هنا" },
  css: `#lg{width:460px;height:460px;overflow:visible}`,
  html: `<div class="stage"><svg id="lg" viewBox="0 0 100 100"><path class="d" d="M50 6 L92 30 L92 70 L50 94 L8 70 L8 30 Z" fill="var(--accent)" fill-opacity="0" stroke="var(--accent)" stroke-width="3"/><path class="d" d="M32 66 L32 34 L50 50 L68 34 L68 66" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg><div class="h2" data-p="brand" id="b"></div><div class="sub" data-p="tagline" id="t"></div></div>`,
  js: `$$(".d").forEach((p,i)=>{const L=p.getTotalLength();p.style.strokeDasharray=L;tl.fromTo(p,{strokeDashoffset:L},{strokeDashoffset:0,duration:.9,ease:"power2.inOut"},.2+i*.4);});
tl.to(".d",{fillOpacity:1,duration:.4},1.4).to("#lg",{scale:1.08,duration:.15,yoyo:true,repeat:1},1.5).from("#b",{opacity:0,y:40,duration:.5},1.7).from("#t",{opacity:0,duration:.5},2);`,
  source: "Remotion templates (logo-stroke-draw) + " + HF + " — svg-path-draw",
},
{
  code: "C703", slug: "logo-assemble", name: "لوجو بيتجمع", tags: ["logo","shapes","sting"],
  desc: "أشكال هندسية بتطير من الأركان وتتجمع في لوجو، فلاش، واسم البراند.",
  dur: 3, params: { brand: "اسم البراند" },
  css: `#mk{position:relative;width:420px;height:420px}.sh{position:absolute}#s1{left:0;top:0;width:200px;height:200px;background:var(--accent);border-radius:30px}#s2{right:0;top:0;width:200px;height:200px;background:var(--ink);border-radius:50%}#s3{left:0;bottom:0;width:200px;height:200px;background:var(--accent2);border-radius:0 0 0 200px}#s4{right:0;bottom:0;width:200px;height:200px;background:#F5B921;border-radius:200px 0 0 0}#fl{position:absolute;inset:0;background:#fff;opacity:0}`,
  html: `<div class="stage"><div id="mk"><div class="sh" id="s1"></div><div class="sh" id="s2"></div><div class="sh" id="s3"></div><div class="sh" id="s4"></div></div><div class="h2" data-p="brand" id="b"></div></div><div id="fl"></div>`,
  js: `const F=[[-900,-1200],[900,-1200],[-900,1200],[900,1200]];["#s1","#s2","#s3","#s4"].forEach((s,i)=>tl.from(s,{x:F[i][0],y:F[i][1],rotation:(i%2?1:-1)*180,duration:.7,ease:"power4.out"},.1+i*.08));
tl.fromTo("#fl",{opacity:.8},{opacity:0,duration:.4},.85).to("#mk",{rotation:90,duration:.6,ease:"back.inOut(2)"},1).from("#b",{opacity:0,y:40,duration:.5},1.4);`,
  source: HF + " — logo-sting / logo-assemble-lockup",
},
{
  code: "C704", slug: "end-card", name: "كارت النهاية", tags: ["end-card","outro","social"],
  desc: "شاشة نهاية فيها «تابعنا» وحسابات السوشيال بتدخل ورا بعض وزرار بينبض.",
  dur: 4.5, theme: "dark", params: { title: "تابعنا لمحتوى أكتر", h1: "Instagram · @foxstudio", h2: "TikTok · @foxstudio", btn: "شارك الفيديو" },
  css: `.rw{width:840px;height:140px;border-radius:40px;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:46px;font-weight:800;direction:ltr}.bt{width:600px;height:150px;border-radius:75px;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:58px;font-weight:900;margin-top:30px}`,
  html: `<div class="stage"><div class="h2" data-p="title" id="t"></div><div class="rw" data-p="h1"></div><div class="rw" data-p="h2"></div><div class="bt" id="bt" data-p="btn"></div></div>`,
  js: `const ws=words($("#t"));tl.from(ws,{y:60,opacity:0,stagger:.08,duration:.5,ease:"power3.out"},.1).from(".rw",{x:-900,duration:.6,stagger:.15,ease:"power4.out"},.6)
.from("#bt",{scale:0,duration:.5,ease:"back.out(2.5)"},1.2).to("#bt",{scale:1.06,duration:.4,yoyo:true,repeat:5,ease:"sine.inOut"},1.8);`,
  source: "Remotion templates (end-card) — إعادة بناء بـ GSAP",
},
{
  code: "C705", slug: "cta-morph", name: "زرار بيتحول", tags: ["cta","button","morph"],
  desc: "نقطة بتكبر لزرار «اطلب دلوقتي»، السهم بيتحرك، الزرار ينضغط ويتحول لعلامة صح.",
  dur: 3.5, params: { label: "اطلب دلوقتي", arrow: "←" },
  css: `#cw{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}#bt{position:relative;width:700px;height:190px;border-radius:95px;background:var(--accent);color:#fff;font-size:68px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:24px;overflow:hidden}#ok{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:110px;opacity:0}`,
  html: `<div id="cw"><div id="bt"><span id="lb" data-p="label"></span><span id="ar" data-p="arrow"></span><div id="ok">✓</div></div></div>`,
  js: `tl.fromTo("#bt",{width:190,scale:0},{scale:1,duration:.35,ease:"back.out(2)"},.1).to("#bt",{width:700,duration:.5,ease:"power3.inOut"},.45)
.from("#lb,#ar",{opacity:0,duration:.3},.8).to("#ar",{x:-20,duration:.25,yoyo:true,repeat:3,ease:"sine.inOut"},1.1)
.to("#bt",{scale:.9,duration:.1,yoyo:true,repeat:1},2.1).to("#lb,#ar",{opacity:0,duration:.15},2.2).to("#bt",{width:190,backgroundColor:CSSV("accent2"),duration:.4,ease:"power3.inOut"},2.25).to("#ok",{opacity:1,duration:.2},2.55);`,
  source: HF + " — cta-morph-press",
},
{
  code: "C706", slug: "confetti", name: "كونفيتي", tags: ["celebration","confetti","particles"],
  desc: "انفجار ورق ملون (كونفيتي) من تحت الشاشة بيطير ويقع بالجاذبية، مع كلمة احتفال.",
  dur: 3.5, params: { text: "مبروك!", count: 90 },
  css: `.cf{position:absolute;left:540px;top:1700px;width:26px;height:40px;border-radius:5px}`,
  html: `<div class="stage"><div class="h1 accent" data-p="text" id="t"></div></div><div id="h"></div>`,
  js: `const r=rng(21),C=["#E8572A","#F5B921","#2E7D5B","#3D84A8","#C2185B","#7B5EA7"];
for(let i=0;i<P.count;i++){const d=document.createElement("div");d.className="cf";d.style.background=C[i%C.length];$("#h").appendChild(d);const vx=(r()-.5)*1300,up=-(900+r()*900),t=.25+r()*.15;
tl.fromTo(d,{x:0,y:0,rotation:0},{x:vx,y:up,rotation:r()*720,duration:.8,ease:"power2.out"},t).to(d,{y:up+1800,x:vx*1.25,rotation:"+=360",duration:1.6,ease:"power1.in"},t+.8);}
tl.from("#t",{scale:0,duration:.5,ease:"back.out(3)"},.3);`,
  source: HF + " — confetti",
},
{
  code: "C707", slug: "hand-arrow", name: "سهم بيشاور", tags: ["arrow","hand-drawn","callout"],
  desc: "سهم مرسوم باليد بيترسم ويشاور على حاجة (زرار/لينك)، وبعدين يتهز يلفت النظر.",
  dur: 3, params: { text: "اللينك في البايو" },
  css: `#ar{position:absolute;left:220px;top:620px;width:520px;height:520px;overflow:visible}#tx{position:absolute;left:0;right:0;top:330px;text-align:center}#tg{position:absolute;left:120px;top:1180px;width:420px;height:150px;border-radius:30px;border:8px dashed var(--accent)}`,
  html: `<div id="tx" class="h2" data-p="text"></div><svg id="ar" viewBox="0 0 100 100"><path id="ap" d="M85 5 C 95 40 70 70 25 82 M25 82 L40 68 M25 82 L42 92" fill="none" stroke="var(--accent)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg><div id="tg"></div>`,
  js: `const p=$("#ap"),L=p.getTotalLength();p.style.strokeDasharray=L;
tl.from("#tx",{opacity:0,y:30,duration:.4},.1).fromTo(p,{strokeDashoffset:L},{strokeDashoffset:0,duration:.7,ease:"power2.inOut"},.5).from("#tg",{scale:0,opacity:0,duration:.4,ease:"back.out(2)"},1.1)
.to("#ar",{x:-18,y:18,duration:.2,yoyo:true,repeat:5,ease:"sine.inOut"},1.5);`,
  source: HF + " — hw-arrow",
},
{
  code: "C708", slug: "sale-ticker", name: "شريط عروض", tags: ["sale","ticker","marquee","offer"],
  desc: "شريطين مايلين بيجروا عكس بعض مكتوب عليهم العرض، ورقم الخصم بيخبط في النص.",
  dur: 4, theme: "dark", params: { band: "خصم ٥٠٪ • عرض اليوم •", big: "50%" },
  css: `.bd{position:absolute;left:-400px;right:-400px;height:170px;display:flex;align-items:center;white-space:nowrap;font-size:90px;font-weight:900}#b1{top:520px;background:var(--accent);transform:rotate(-8deg)}#b2{top:1250px;background:#F5B921;color:#111;transform:rotate(6deg)}#bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:330px;font-weight:900;direction:ltr}`,
  html: `<div class="bd" id="b1"><span id="t1"></span></div><div class="bd" id="b2"><span id="t2"></span></div><div id="bg" data-p="big"></div>`,
  js: `$("#t1").textContent=$("#t2").textContent=(P.band+" ").repeat(6);
tl.fromTo("#t1",{x:-500},{x:500,duration:4,ease:"none"},0).fromTo("#t2",{x:500},{x:-500,duration:4,ease:"none"},0).from("#b1,#b2",{scaleX:0,duration:.5,stagger:.1,ease:"power3.out"},0)
.fromTo("#bg",{scale:3,opacity:0},{scale:1,opacity:1,duration:.4,ease:"expo.out"},.7).to("#bg",{scale:1.08,duration:.3,yoyo:true,repeat:5,ease:"sine.inOut"},1.2);`,
  source: HF + " — news-ticker / ticker-takeover",
},
];
