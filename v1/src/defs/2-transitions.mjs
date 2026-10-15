// S — انتقالات (المشهد A ← المشهد B). غيّر محتوى .scene-a و .scene-b بفيديو/صورة حقيقية.
const HF = "مستوحاة من HyperFrames transitions catalog (Apache-2.0)";
const AB = `<div class="scene scene-b" id="B"><div class="label" data-p="b"></div></div>
<div class="scene scene-a" id="A"><div class="label" data-p="a"></div></div>`;
const AB2 = `<div class="scene scene-a" id="A"><div class="label" data-p="a"></div></div>
<div class="scene scene-b" id="B"><div class="label" data-p="b"></div></div>`;
const PAR = { a: "المشهد ١", b: "المشهد ٢", at: 1.2 };
export default [
{
  code: "S301", slug: "side-wipe", name: "مسحة جانبية", tags: ["transition","wipe"],
  desc: "المشهد الجديد بيتمسح فوق القديم من اليمين للشمال ومعاه شريط ملون بيقود المسحة.",
  dur: 3, theme: "dark", params: { ...PAR },
  css: `#edge{position:absolute;top:0;bottom:0;left:0;width:36px;background:var(--accent)}`,
  html: AB2 + `<div id="edge"></div>`,
  js: `tl.fromTo("#B",{clipPath:"inset(0% 0% 0% 100%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:.7,ease:"power3.inOut"},P.at)
.fromTo("#edge",{x:1080},{x:-36,duration:.7,ease:"power3.inOut"},P.at);`,
  source: HF + " — directional-wipe",
},
{
  code: "S302", slug: "zoom-blend", name: "زوم مدموج", tags: ["transition","zoom","blur"],
  desc: "المشهد القديم بيتزوم لقدام ويضبب، والجديد بيطلع من جوه واضح. من أشهر انتقالات الريلز.",
  dur: 3, theme: "dark", params: { ...PAR },
  html: AB,
  js: `tl.to("#A",{scale:2.6,filter:"blur(22px)",opacity:0,duration:.6,ease:"power3.in"},P.at)
.fromTo("#B",{scale:.55,filter:"blur(22px)"},{scale:1,filter:"blur(0px)",duration:.7,ease:"power3.out"},P.at+.35);`,
  source: "من «زوم مدموج» في ريل Majedteq + " + HF + " — zoom-through",
},
{
  code: "S303", slug: "iris", name: "دايرة بتفتح", tags: ["transition","circle","iris"],
  desc: "دايرة بتكبر من نص الشاشة وتكشف المشهد الجديد.",
  dur: 3, theme: "dark", params: { ...PAR, x: "50%", y: "50%" },
  html: AB2,
  js: `tl.fromTo("#B",{clipPath:"circle(0% at "+P.x+" "+P.y+")"},{clipPath:"circle(120% at "+P.x+" "+P.y+")",duration:.8,ease:"power2.in"},P.at);`,
  source: HF + " — iris-reveal",
},
{
  code: "S304", slug: "flash-white", name: "فلاشة بيضا", tags: ["transition","flash","light"],
  desc: "المشهد بينوّر لحد ما يبقى أبيض كله، وبعدين يفتح على المشهد الجديد.",
  dur: 3, theme: "dark", params: { ...PAR },
  css: `#f{position:absolute;inset:0;background:#fff;opacity:0}`,
  html: AB + `<div id="f"></div>`,
  js: `tl.fromTo("#A",{filter:"brightness(1)"},{filter:"brightness(2.6)",duration:.25,ease:"power2.in"},P.at)
.to("#f",{opacity:1,duration:.18,ease:"power2.in"},P.at+.1)
.set("#A",{opacity:0},P.at+.28)
.to("#f",{opacity:0,duration:.5,ease:"power2.out"},P.at+.3)
.fromTo("#B",{filter:"brightness(2)"},{filter:"brightness(1)",duration:.6},P.at+.3);`,
  source: HF + " — flash-through-white",
},
{
  code: "S305", slug: "block-cover", name: "بلوكات متتالية", tags: ["transition","blocks","cover"],
  desc: "عواميد ملونة بتطلع ورا بعض تغطي الشاشة، وبعدين تكمّل لفوق وتكشف المشهد الجديد.",
  dur: 3, theme: "dark", params: { ...PAR, cols: 5 },
  css: `.col{position:absolute;top:0;height:100%}`,
  html: AB + `<div id="cv"></div>`,
  js: `const n=P.cols,w=1080/n,cols=[];const C=[CSSV("accent"),CSSV("ink"),CSSV("accent2")];
for(let i=0;i<n;i++){const c=document.createElement("div");c.className="col";c.style.right=(i*w)+"px";c.style.width=(w+1)+"px";c.style.background=C[i%3];$("#cv").appendChild(c);cols.push(c);}
tl.fromTo(cols,{scaleY:0,transformOrigin:"50% 100%"},{scaleY:1,duration:.4,stagger:.06,ease:"power3.in"},P.at)
.set("#A",{opacity:0},P.at+.4+.06*n)
.to(cols,{scaleY:0,transformOrigin:"50% 0%",duration:.4,stagger:.06,ease:"power3.out"},P.at+.45+.06*n);`,
  source: HF + " — staggered blocks (css-cover)",
},
{
  code: "S306", slug: "blinds", name: "ستارة شرايح", tags: ["transition","blinds"],
  desc: "شرايح أفقية بتتقفل زي الستارة وبعدين تتفتح على المشهد الجديد.",
  dur: 3, theme: "dark", params: { ...PAR, rows: 8 },
  css: `.sl{position:absolute;left:0;width:100%;background:var(--ink)}`,
  html: AB + `<div id="bl"></div>`,
  js: `const n=P.rows,h=1920/n,s=[];for(let i=0;i<n;i++){const d=document.createElement("div");d.className="sl";d.style.top=(i*h)+"px";d.style.height=(h+1)+"px";$("#bl").appendChild(d);s.push(d);}
tl.fromTo(s,{scaleX:0},{scaleX:1,transformOrigin:(i)=>i%2?"0% 50%":"100% 50%",duration:.35,stagger:.03,ease:"power2.in"},P.at)
.set("#A",{opacity:0},P.at+.6)
.to(s,{scaleX:0,transformOrigin:(i)=>i%2?"100% 50%":"0% 50%",duration:.35,stagger:.03,ease:"power2.out"},P.at+.62);`,
  source: HF + " — horizontal blinds",
},
{
  code: "S307", slug: "whip-pan", name: "ويب بان", tags: ["transition","whip","motion-blur"],
  desc: "حركة كاميرا سريعة جدًا لجنب مع موشن بلور، والمشهد الجديد يدخل بنفس السرعة.",
  dur: 3, theme: "dark", params: { ...PAR },
  html: AB2,
  js: `tl.to("#A",{x:1080,filter:"blur(30px)",duration:.35,ease:"power4.in"},P.at)
.fromTo("#B",{x:-1080,filter:"blur(30px)"},{x:0,filter:"blur(0px)",duration:.45,ease:"power4.out"},P.at+.3);`,
  source: HF + " — whip-pan",
},
{
  code: "S308", slug: "glitch", name: "جليتش", tags: ["transition","glitch","rgb"],
  desc: "تشويش ديجيتال: الشاشة بتتقطع وتتهز بألوان أحمر وسماوي، وتقلب على المشهد الجديد.",
  dur: 3, theme: "dark", params: { ...PAR },
  html: AB2 + `<div id="gl" style="position:absolute;inset:0;pointer-events:none"></div>`,
  js: `const r=rng(7),B=$("#B");const red=B.cloneNode(true),cy=B.cloneNode(true);red.id="";cy.id="";
[[red,"sepia(1) saturate(9) hue-rotate(-50deg)"],[cy,"sepia(1) saturate(9) hue-rotate(150deg)"]].forEach(([e,f])=>{e.style.filter=f;e.style.mixBlendMode="screen";e.style.opacity=0;$("#gl").appendChild(e);});
const kfB=[],kfR=[],kfC=[];for(let i=0;i<10;i++){const a=r()*80,b=r()*80;kfB.push({clipPath:"inset("+a+"% 0% "+(80-a)/2+"% 0%)",x:(r()-.5)*90,duration:.05});kfR.push({x:(r()-.5)*70,opacity:.7,duration:.05});kfC.push({x:(r()-.5)*70,opacity:.7,duration:.05});}
kfB.push({clipPath:"inset(0% 0% 0% 0%)",x:0,duration:.05});kfR.push({x:0,opacity:0,duration:.05});kfC.push({x:0,opacity:0,duration:.05});
tl.set(B,{clipPath:"inset(100% 0% 0% 0%)"},0).to(B,{keyframes:kfB,ease:"none"},P.at).to(red,{keyframes:kfR,ease:"none"},P.at).to(cy,{keyframes:kfC,ease:"none"},P.at)
.to("#A",{keyframes:[{x:-30,duration:.05},{x:25,duration:.05},{x:0,duration:.05}]},P.at);`,
  source: HF + " — glitch / chromatic-aberration-wipe",
},
{
  code: "S309", slug: "push", name: "دفع", tags: ["transition","push","slide"],
  desc: "المشهد الجديد بيزق القديم ويطلعه بره الشاشة.",
  dur: 3, theme: "dark", params: { ...PAR },
  html: AB2,
  js: `tl.to("#A",{x:1080,duration:.7,ease:"power3.inOut"},P.at).fromTo("#B",{x:-1080},{x:0,duration:.7,ease:"power3.inOut"},P.at);`,
  source: HF + " — push slide",
},
{
  code: "S310", slug: "card-flip", name: "قلبة كارت", tags: ["transition","3d","flip"],
  desc: "الشاشة كلها بتتقلب زي الكارت في 3D وورا الكارت المشهد الجديد.",
  dur: 3, theme: "dark", params: { ...PAR },
  css: `#wrap{position:absolute;inset:0;perspective:2400px}#card{position:absolute;inset:0;transform-style:preserve-3d}#card .scene{backface-visibility:hidden;-webkit-backface-visibility:hidden}#card #B{transform:rotateY(180deg)}`,
  html: `<div id="wrap"><div id="card"><div class="scene scene-a" id="A"><div class="label" data-p="a"></div></div><div class="scene scene-b" id="B"><div class="label" data-p="b"></div></div></div></div>`,
  js: `tl.to("#card",{rotationY:180,duration:.9,ease:"power3.inOut"},P.at)
.to("#card",{scale:.8,duration:.45,yoyo:true,repeat:1,ease:"power2.inOut"},P.at);`,
  source: HF + " — 3D card flip",
},
{
  code: "S311", slug: "blur-cross", name: "بلور كروس", tags: ["transition","blur","dissolve"],
  desc: "المشهدين بيدوبوا في بعض مع ضباب. انتقال هادي ومريح.",
  dur: 3, theme: "dark", params: { ...PAR },
  html: AB2,
  js: `tl.to("#A",{filter:"blur(30px)",opacity:0,duration:.7,ease:"power2.inOut"},P.at)
.fromTo("#B",{filter:"blur(30px)",opacity:0},{filter:"blur(0px)",opacity:1,duration:.7,ease:"power2.inOut"},P.at+.15);`,
  source: HF + " — blur crossfade",
},
{
  code: "S312", slug: "diagonal-split", name: "شقّة قطرية", tags: ["transition","split"],
  desc: "المشهد القديم بيتشق نصين بالقطر وكل نص يطير ناحية، والجديد يبان من ورا.",
  dur: 3, theme: "dark", params: { ...PAR },
  html: AB,
  js: `const A=$("#A"),A2=A.cloneNode(true);A2.id="A2";A.parentNode.appendChild(A2);
A.style.clipPath="polygon(0 0,100% 0,0 100%)";A2.style.clipPath="polygon(100% 0,100% 100%,0 100%)";
tl.to(A,{x:-900,y:-900,duration:.8,ease:"power3.in"},P.at).to(A2,{x:900,y:900,duration:.8,ease:"power3.in"},P.at)
.from("#B",{scale:1.2,duration:1,ease:"power3.out"},P.at);`,
  source: HF + " — diagonal split",
},
{
  code: "S313", slug: "pixel-grid", name: "بكسلة", tags: ["transition","grid","pixel"],
  desc: "مربعات ملونة بتغطي الشاشة بترتيب عشوائي وبعدين تختفي وتكشف المشهد الجديد.",
  dur: 3, theme: "dark", params: { ...PAR, cols: 6, rows: 10 },
  css: `.px{position:absolute}`,
  html: AB + `<div id="g"></div>`,
  js: `const r=rng(11),C=[CSSV("accent"),CSSV("accent2"),"#FFD84D","#2B3A67","#fff"],cs=1080/P.cols,rs=1920/P.rows,cells=[];
for(let y=0;y<P.rows;y++)for(let x=0;x<P.cols;x++){const d=document.createElement("div");d.className="px";Object.assign(d.style,{left:x*cs+"px",top:y*rs+"px",width:cs+1+"px",height:rs+1+"px",background:C[Math.floor(r()*C.length)]});$("#g").appendChild(d);cells.push([r(),d]);}
const inO=cells.slice().sort((a,b)=>a[0]-b[0]).map(c=>c[1]),outO=cells.slice().sort((a,b)=>b[0]-a[0]).map(c=>c[1]);
tl.fromTo(inO,{opacity:0},{opacity:1,duration:.01,stagger:.4/inO.length},P.at).set("#A",{opacity:0},P.at+.42).to(outO,{opacity:0,duration:.01,stagger:.4/outO.length},P.at+.48);`,
  source: HF + " — grid dissolve / grid-pixelate-wipe",
},
{
  code: "S314", slug: "light-leak", name: "تسريب ضوء", tags: ["transition","light","film"],
  desc: "ضوء دافي برتقالي بيعدي على الشاشة زي أفلام الكاميرا القديمة ويقلب المشهد.",
  dur: 3, theme: "dark", params: { ...PAR },
  css: `#lk{position:absolute;width:2600px;height:2600px;left:-760px;top:-340px;border-radius:50%;background:radial-gradient(circle,rgba(255,200,120,1) 0%,rgba(255,120,40,.85) 30%,rgba(255,60,0,0) 65%);mix-blend-mode:screen;opacity:0}`,
  html: AB + `<div id="lk"></div>`,
  js: `tl.fromTo("#lk",{x:-1200,opacity:0},{x:300,opacity:1,duration:.6,ease:"power2.in"},P.at)
.fromTo("#A",{filter:"brightness(1)"},{filter:"brightness(2.2)",duration:.5},P.at+.1).set("#A",{opacity:0},P.at+.6)
.to("#lk",{x:1400,opacity:0,duration:.7,ease:"power2.out"},P.at+.6)
.fromTo("#B",{filter:"brightness(2)"},{filter:"brightness(1)",duration:.7},P.at+.6);`,
  source: HF + " — light-leak",
},
{
  code: "S315", slug: "shutter", name: "شاتر", tags: ["transition","shutter","slam"],
  desc: "لوحين أسود بيخبطوا في بعض من فوق وتحت ويتفتحوا على المشهد الجديد مع هزة.",
  dur: 3, theme: "dark", params: { ...PAR },
  css: `.sh{position:absolute;left:0;width:100%;height:50%;background:#0B0B0D}#t1{top:0}#t2{bottom:0}`,
  html: AB + `<div class="sh" id="t1"></div><div class="sh" id="t2"></div>`,
  js: `tl.fromTo("#t1",{yPercent:-100},{yPercent:0,duration:.28,ease:"power4.in"},P.at).fromTo("#t2",{yPercent:100},{yPercent:0,duration:.28,ease:"power4.in"},P.at)
.set("#A",{opacity:0},P.at+.3).to("#B",{y:16,duration:.05,yoyo:true,repeat:1},P.at+.28)
.to("#t1",{yPercent:-100,duration:.4,ease:"power3.out"},P.at+.45).to("#t2",{yPercent:100,duration:.4,ease:"power3.out"},P.at+.45);`,
  source: HF + " — shutter-slam",
},
{
  code: "S316", slug: "gravity-drop", name: "وقعة", tags: ["transition","drop","physics"],
  desc: "المشهد القديم بيقع لتحت بميلة كأن الجاذبية شدّته، والجديد تحته.",
  dur: 3, theme: "dark", params: { ...PAR },
  html: AB,
  js: `tl.to("#A",{y:2300,rotation:9,duration:.75,ease:"power2.in"},P.at).from("#B",{scale:.92,duration:.9,ease:"power2.out"},P.at+.2);`,
  source: HF + " — gravity drop",
},
{
  code: "S317", slug: "zoom-out-card", name: "زوم أوت لكارت", tags: ["transition","zoom","card"],
  desc: "المشهد بيصغر لحد ما يبقى كارت بحواف دايرية ويطير لفوق، والمشهد الجديد ورا.",
  dur: 3, theme: "dark", params: { ...PAR },
  html: AB,
  js: `tl.to("#A",{scale:.42,borderRadius:60,boxShadow:"0 40px 120px rgba(0,0,0,.5)",duration:.6,ease:"power3.inOut"},P.at)
.to("#A",{y:-1700,duration:.5,ease:"power3.in"},P.at+.6).from("#B",{scale:1.15,filter:"blur(10px)",duration:1,ease:"power2.out"},P.at+.2);`,
  source: HF + " — zoom out / pull-back-reveal",
},
{
  code: "S318", slug: "clock-wipe", name: "مسحة عقارب", tags: ["transition","clock","radial"],
  desc: "المشهد الجديد بينكشف بلفّة دايرية زي عقرب الساعة.",
  dur: 3, theme: "dark", params: { ...PAR },
  css: `#B{--a:0deg;-webkit-mask-image:conic-gradient(#000 var(--a),transparent var(--a));mask-image:conic-gradient(#000 var(--a),transparent var(--a))}`,
  html: AB2,
  js: `tl.fromTo("#B",{"--a":"0deg"},{"--a":"360deg",duration:.9,ease:"power1.inOut"},P.at);`,
  source: HF + " — clock wipe",
},
{
  code: "S319", slug: "color-dip", name: "غطسة لون", tags: ["transition","color","dip"],
  desc: "الشاشة بتغطس في لون البراند ثانية وبعدين تطلع على المشهد الجديد.",
  dur: 3, theme: "dark", params: { ...PAR, color: "#E8572A" },
  css: `#c{position:absolute;inset:0;opacity:0}`,
  html: AB + `<div id="c"></div>`,
  js: `$("#c").style.background=P.color;
tl.to("#c",{opacity:1,duration:.3,ease:"power2.in"},P.at).set("#A",{opacity:0},P.at+.3).to("#c",{opacity:0,duration:.4,ease:"power2.out"},P.at+.4);`,
  source: HF + " — color dip",
},
{
  code: "S320", slug: "beat-punch", name: "قطعات على البيت", tags: ["transition","beat","cut","punch"],
  desc: "٣ قطعات سريعة على الإيقاع، كل قطعة بزووم خبطة وفلاش صغير. ممتازة مع المزيكا.",
  dur: 3, theme: "dark", params: { a: "١", b: "٢", c: "٣", beat: 0.5 },
  css: `#fl{position:absolute;inset:0;background:#fff;opacity:0}`,
  html: `<div class="scene scene-c" id="C"><div class="label" data-p="c"></div></div><div class="scene scene-b" id="B"><div class="label" data-p="b"></div></div><div class="scene scene-a" id="A"><div class="label" data-p="a"></div></div><div id="fl"></div>`,
  js: `const S=["#A","#B","#C"];S.forEach((s,i)=>{const t=.3+i*P.beat;if(i)tl.set(S[i-1],{opacity:0},t);
tl.fromTo(s,{scale:1.18},{scale:1,duration:.35,ease:"expo.out"},t).fromTo("#fl",{opacity:.7},{opacity:0,duration:.2},t);});`,
  source: HF + " — beat-freeze-cut / beat-accent",
},
];
