// P — صور وأشخاص وكاميرا (بدّل .photo و .person بصورة/فيديو حقيقي)
const HF = "مستوحاة من HyperFrames (Apache-2.0)";
const PHOTO = `<div class="photo"><div class="sun"></div><div class="hill1"></div><div class="hill2"></div></div>`;
const PERSON = `<div class="person" id="ps"><div class="head"></div><div class="body"></div></div>`;
export default [
{
  code: "P601", slug: "text-behind", name: "نص ورا الشخص", tags: ["photo","person","depth","text"],
  desc: "كلمة ضخمة بتطلع من تحت وتقف ورا الشخص (الشخص قدام النص). محتاجة صورة الشخص مقصوصة PNG.",
  dur: 3, params: { text: "الأفضل", sub: "" },
  css: `#bg{position:absolute;inset:0;background:linear-gradient(180deg,#F3E9D8,#E2CFB3)}#big{position:absolute;left:0;right:0;top:360px;text-align:center;font-size:330px;font-weight:900;color:var(--accent);line-height:1}`,
  html: `<div id="bg"></div><div id="big" data-p="text"></div>` + PERSON,
  js: `tl.from("#big",{yPercent:80,opacity:0,duration:.8,ease:"power4.out"},.2).from("#ps",{scale:1.08,transformOrigin:"50% 100%",duration:1.6,ease:"power2.out"},0)
.to("#big",{scale:1.06,duration:2,ease:"none"},.8);`,
  source: "من «النص ورا الشخص» في ريل Majedteq + " + HF + " — parallax-zoom",
},
{
  code: "P602", slug: "before-after", name: "مسحة قبل وبعد", tags: ["photo","before-after","wipe","compare"],
  desc: "خط فاصل بيتحرك على الصورة ويكشف «بعد التعديل» مكان «قبل التعديل»، بمقبض في النص.",
  dur: 4, params: { before: "قبل التعديل", after: "بعد التعديل" },
  css: `#bf{filter:grayscale(1) brightness(.85) contrast(.9)}#af{clip-path:inset(0 0 0 100%)}.tag{position:absolute;top:220px;font-size:52px;font-weight:900;color:#fff;background:rgba(0,0,0,.45);padding:10px 34px;border-radius:999px}#tb{right:60px}#ta{left:60px}
#ln{position:absolute;top:0;bottom:0;left:0;width:10px;margin-left:-5px;background:#fff}#hd{position:absolute;left:0;top:50%;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;background:#fff;box-shadow:0 8px 30px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;font-size:60px;font-weight:900;color:#111;direction:ltr}`,
  html: `<div class="scene" id="bf">${PHOTO}${PERSON}<div class="tag" id="tb" data-p="before"></div></div><div class="scene" id="af">${PHOTO}<div class="person"><div class="head"></div><div class="body"></div></div><div class="tag" id="ta" data-p="after"></div></div><div id="ln"></div><div id="hd">‹ ›</div>`,
  js: `const o={p:100};const f=()=>{$("#af").style.clipPath="inset(0 0 0 "+o.p+"%)";const x=1080*o.p/100;$("#ln").style.transform="translateX("+x+"px)";$("#hd").style.transform="translateX("+x+"px)";};f();
tl.to(o,{p:5,duration:1.4,ease:"power2.inOut",onUpdate:f},.4).to(o,{p:50,duration:1,ease:"power2.inOut",onUpdate:f},2.2);`,
  source: "من «مسحة قبل التعديل» في ريل Majedteq + " + HF + " — before-after-wipe",
},
{
  code: "P603", slug: "ken-burns", name: "كين بيرنز", tags: ["photo","zoom","pan","camera"],
  desc: "زووم بطيء مع حركة خفيفة على الصورة. بيدّي أي صورة ثابتة إحساس فيديو.",
  dur: 4, params: { from: 1, to: 1.25, panX: -60 },
  html: `<div class="scene" id="ph">${PHOTO}</div>`,
  js: `tl.fromTo("#ph",{scale:P.from,x:0},{scale:P.to,x:P.panX,duration:4,ease:"none"},0);`,
  source: HF + " — cinematic-zoom / Remotion ken-burns",
},
{
  code: "P604", slug: "punch-in", name: "زووم على نقطة", tags: ["photo","zoom","focus","camera"],
  desc: "دايرة تحديد بتظهر على حتة معينة، والكاميرا بتزوم عليها وبعدين ترجع.",
  dur: 3.5, params: { x: 700, y: 560, zoom: 2.4 },
  css: `#fr{position:absolute;width:260px;height:260px;margin:-130px 0 0 -130px;border:10px solid #fff;border-radius:50%;box-shadow:0 0 0 3000px rgba(0,0,0,.0)}`,
  html: `<div class="scene" id="cam">${PHOTO}<div id="fr"></div></div>`,
  js: `$("#fr").style.left=P.x+"px";$("#fr").style.top=P.y+"px";$("#cam").style.transformOrigin=P.x+"px "+P.y+"px";
tl.from("#fr",{scale:2,opacity:0,duration:.4,ease:"back.out(2)"},.3).to("#fr",{boxShadow:"0 0 0 3000px rgba(0,0,0,.45)",duration:.4},.5)
.to("#cam",{scale:P.zoom,duration:.8,ease:"power3.inOut"},.9).to("#cam",{scale:1,duration:.7,ease:"power3.inOut"},2.5).to("#fr",{opacity:0,duration:.3},2.5);`,
  source: HF + " — coordinate-target-zoom / push-in",
},
{
  code: "P605", slug: "polaroid-drop", name: "صور بولارويد", tags: ["photo","gallery","polaroid"],
  desc: "٣ صور بولارويد بتقع فوق بعض بميلات مختلفة وظل، زي ألبوم ذكريات.",
  dur: 3.5, params: { caption: "من الكواليس" },
  css: `.pl{position:absolute;left:50%;top:50%;width:620px;height:760px;margin:-430px 0 0 -310px;background:#fff;padding:34px 34px 140px;box-shadow:0 30px 70px rgba(0,0,0,.25)}.pl .im{width:100%;height:100%;overflow:hidden;position:relative}#cp{position:absolute;left:0;right:0;bottom:290px;text-align:center;font-size:64px;font-weight:900}`,
  html: `<div id="h"></div><div id="cp" data-p="caption"></div>`,
  js: `const G=["linear-gradient(160deg,#9CC9E8,#C98B5B)","linear-gradient(160deg,#F7A8B8,#7B5EA7)","linear-gradient(160deg,#A8E6CF,#3D84A8)"],R=[-9,7,-3];
G.forEach((g,i)=>{const d=document.createElement("div");d.className="pl";d.innerHTML='<div class="im" style="background:'+g+'"></div>';$("#h").appendChild(d);
tl.fromTo(d,{y:-1600,rotation:R[i]*3},{y:0,rotation:R[i],duration:.6,ease:"power3.in"},.2+i*.45).to(d,{scale:1.03,duration:.08,yoyo:true,repeat:1},.8+i*.45);});
tl.from("#cp",{opacity:0,y:30,duration:.4},1.8);`,
  source: "Remotion templates (polaroid-frame) — إعادة بناء بـ GSAP",
},
{
  code: "P606", slug: "grid-assemble", name: "جريد بيتجمع", tags: ["photo","grid","gallery"],
  desc: "٩ صور مربعة بتطير من أماكن عشوائية وتتجمع في جريد منظم من النص للأطراف.",
  dur: 3, theme: "dark", params: {},
  css: `#g{position:absolute;left:60px;right:60px;top:450px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.tl{aspect-ratio:1;border-radius:28px}`,
  html: `<div id="g"></div>`,
  js: `const r=rng(5),C=["#FF7A45","#2B3A67","#7CFFB2","#F5B921","#C2185B","#3D84A8","#FFD84D","#7B5EA7","#1F8A70"],T=[];
C.forEach(c=>{const d=document.createElement("div");d.className="tl";d.style.background="linear-gradient(150deg,"+c+",#111)";$("#g").appendChild(d);T.push(d);});
tl.from(T,{x:()=>(r()-.5)*1400,y:()=>(r()-.5)*2000,rotation:()=>(r()-.5)*90,scale:.4,opacity:0,duration:.9,ease:"power3.out",stagger:{each:.06,grid:[3,3],from:"center"}},.2);`,
  source: HF + " — grid-card-assemble",
},
{
  code: "P607", slug: "focus-pull", name: "فوكس على الشخص", tags: ["photo","blur","depth","focus"],
  desc: "الخلفية بتضبب تدريجيًا والشخص يفضل واضح ويقرب سنة. عزل الشخص عن الخلفية.",
  dur: 3, params: { label: "ركّز هنا" },
  css: `#lb{position:absolute;left:0;right:0;top:300px;text-align:center;font-size:80px;font-weight:900;color:#fff;text-shadow:0 6px 20px rgba(0,0,0,.4)}`,
  html: `<div class="scene" id="bg">${PHOTO}</div>${PERSON}<div id="lb" data-p="label"></div>`,
  js: `tl.fromTo("#bg",{filter:"blur(0px) brightness(1)",scale:1},{filter:"blur(16px) brightness(.8)",scale:1.05,duration:1.2,ease:"power2.inOut"},.4).to("#ps",{scale:1.06,transformOrigin:"50% 100%",duration:1.2,ease:"power2.inOut"},.4)
.from("#lb",{opacity:0,y:30,duration:.5},1.2);`,
  source: HF + " — focus-blur-resolve / rack-focus",
},
{
  code: "P608", slug: "phone-mockup", name: "موبايل بيعرض", tags: ["photo","device","phone","app"],
  desc: "موبايل بيطلع من تحت بميلة 3D وبيعتدل، وجوه الشاشة محتوى بيسكرول.",
  dur: 3.5, params: {},
  css: `#wr{position:absolute;inset:0;perspective:2400px}#ph{position:absolute;left:50%;top:50%;width:620px;height:1260px;margin:-630px 0 0 -310px;border-radius:90px;background:#111;padding:26px;box-shadow:0 50px 120px rgba(0,0,0,.35)}#sc{width:100%;height:100%;border-radius:66px;overflow:hidden;background:#F7F4EF;position:relative}#ls{position:absolute;left:0;right:0;top:0;padding:40px 30px;display:flex;flex-direction:column;gap:26px}.it{height:260px;border-radius:34px;background:linear-gradient(135deg,#E7DECF,#D3C4AE)}.it:nth-child(3n){background:linear-gradient(135deg,var(--accent),#F5B921)}`,
  html: `<div id="wr"><div id="ph"><div id="sc"><div id="ls"></div></div></div></div>`,
  js: `for(let i=0;i<12;i++){const d=document.createElement("div");d.className="it";$("#ls").appendChild(d);}
tl.from("#ph",{y:1400,rotationX:40,rotationZ:-8,duration:1,ease:"power4.out"},.1).to("#ls",{y:-1500,duration:2,ease:"power2.inOut"},1.2);`,
  source: HF + " — device-frame-stage / parallax-device-dive",
},
{
  code: "P609", slug: "camera-shake", name: "هزة كاميرا", tags: ["camera","shake","impact"],
  desc: "الكادر كله بيتهز هزة قوية مع كلمة صدمة. لأي لحظة مفاجأة.",
  dur: 3, params: { text: "إيه ده؟!" },
  css: `#tx{position:absolute;left:0;right:0;top:300px;text-align:center;font-size:160px;font-weight:900;color:#fff;text-shadow:0 8px 0 var(--accent)}`,
  html: `<div class="scene" id="cam">${PHOTO}${PERSON}</div><div id="tx" data-p="text"></div>`,
  js: `const r=rng(3),kf=[];for(let i=0;i<12;i++){const k=1-i/12;kf.push({x:(r()-.5)*70*k,y:(r()-.5)*70*k,rotation:(r()-.5)*4*k,duration:.045});}kf.push({x:0,y:0,rotation:0,duration:.05});
tl.set("#cam",{scale:1.08},0).to("#cam",{keyframes:kf,ease:"none"},.8).fromTo("#tx",{scale:2.5,opacity:0},{scale:1,opacity:1,duration:.3,ease:"expo.out"},.8);`,
  source: HF + " — camera-shake",
},
{
  code: "P610", slug: "freeze-frame", name: "لقطة متجمدة", tags: ["photo","freeze","callout","person"],
  desc: "فلاش وتجميد للكادر بالأبيض والأسود، والشخص ياخد حدود بيضا، وسهم بيشاور عليه باسمه.",
  dur: 3.5, params: { label: "ده أنا" },
  css: `#fl{position:absolute;inset:0;background:#fff;opacity:0}#nm{position:absolute;right:90px;top:300px;font-size:80px;font-weight:900;color:#fff;background:var(--accent);padding:8px 40px;border-radius:24px}#ar{position:absolute;right:300px;top:420px;width:260px;height:260px;overflow:visible}`,
  html: `<div class="scene" id="sc">${PHOTO}${PERSON}</div><div id="fl"></div><div id="nm" data-p="label"></div><svg id="ar" viewBox="0 0 100 100"><path id="ap" d="M90 5 C 70 30 60 55 30 80 M30 80 L36 58 M30 80 L52 76" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`,
  js: `const p=$("#ap"),L=p.getTotalLength();p.style.strokeDasharray=L;
tl.fromTo("#fl",{opacity:0},{opacity:.9,duration:.06},1).to("#fl",{opacity:0,duration:.4},1.06).set("#sc",{filter:"grayscale(1) contrast(1.1)"},1.06)
.set("#ps",{filter:"drop-shadow(0 0 0 #fff) drop-shadow(10px 0 0 #fff) drop-shadow(-10px 0 0 #fff) drop-shadow(0 -10px 0 #fff)"},1.06)
.to("#sc",{scale:1.08,duration:2,ease:"power1.out"},1.06).from("#nm",{scale:0,rotation:-15,duration:.4,ease:"back.out(3)"},1.3).fromTo(p,{strokeDashoffset:L},{strokeDashoffset:0,duration:.4},1.4);`,
  source: HF + " — freeze-frame-dressing",
},
{
  code: "P611", slug: "parallax", name: "بارالاكس طبقات", tags: ["photo","parallax","depth","camera"],
  desc: "٣ طبقات (خلفية بعيدة، وسط، وشخص قدام) بتتحرك بسرعات مختلفة فيبان عمق 3D.",
  dur: 4, params: {},
  css: `#l1{position:absolute;inset:-100px;background:linear-gradient(180deg,#9CC9E8,#F6D7A7)}#l2{position:absolute;left:-300px;right:-300px;bottom:-100px;height:900px}`,
  html: `<div id="l1"><div class="photo" style="background:none"><div class="sun"></div></div></div><div id="l2"><div class="photo" style="background:none"><div class="hill1"></div><div class="hill2"></div></div></div>` + PERSON,
  js: `tl.fromTo("#l1",{x:-40,scale:1.05},{x:40,scale:1.1,duration:4,ease:"none"},0).fromTo("#l2",{x:-160},{x:160,duration:4,ease:"none"},0).fromTo("#ps",{x:-260,scale:1},{x:260,scale:1.06,duration:4,ease:"none"},0);`,
  source: HF + " — parallax-zoom / camera-rig-depth-stack",
},
{
  code: "P612", slug: "spotlight", name: "سبوت لايت", tags: ["photo","spotlight","focus","mask"],
  desc: "الشاشة بتضلم كلها ماعدا دايرة نور بتتحرك وتقف على الحاجة المهمة.",
  dur: 3.5, params: { x: 540, y: 820, r: 330 },
  css: `#dk{position:absolute;inset:0;background:rgba(0,0,0,.78);--x:200px;--y:300px;--r:0px;-webkit-mask-image:radial-gradient(circle var(--r) at var(--x) var(--y),transparent 96%,#000 100%);mask-image:radial-gradient(circle var(--r) at var(--x) var(--y),transparent 96%,#000 100%)}`,
  html: `<div class="scene">${PHOTO}${PERSON}</div><div id="dk"></div>`,
  js: `tl.from("#dk",{opacity:0,duration:.4},.1).to("#dk",{"--r":"220px",duration:.4},.3)
.to("#dk",{"--x":"880px","--y":"500px",duration:.8,ease:"power2.inOut"},.7).to("#dk",{"--x":P.x+"px","--y":P.y+"px","--r":P.r+"px",duration:.9,ease:"power3.inOut"},1.6);`,
  source: HF + " — spotlight-card / vignette",
},
];
