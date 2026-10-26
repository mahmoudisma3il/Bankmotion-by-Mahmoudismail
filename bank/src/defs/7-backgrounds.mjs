// B — خلفيات وتأثيرات (حطها تحت أي محتوى)
const HF = "مستوحاة من HyperFrames (Apache-2.0)";
export default [
{
  code: "B801", slug: "gradient-drift", name: "تدرج متحرك", tags: ["background","gradient","ambient"],
  desc: "بقع لونية كبيرة مضببة بتتحرك ببطء. خلفية حلوة تحت أي نص.",
  dur: 6, theme: "dark", params: { colors: "#FF5A1F,#7B5EA7,#3D84A8,#F5B921" },
  css: `.bl{position:absolute;width:1000px;height:1000px;border-radius:50%;filter:blur(140px);opacity:.85}`,
  html: `<div id="h"></div>`,
  js: `const C=P.colors.split(","),pos=[[-200,-100],[400,500],[-150,1100],[350,1300]];
C.forEach((c,i)=>{const d=document.createElement("div");d.className="bl";d.style.background=c;d.style.left=pos[i%4][0]+"px";d.style.top=pos[i%4][1]+"px";$("#h").appendChild(d);
tl.to(d,{x:(i%2?-1:1)*260,y:(i<2?1:-1)*300,scale:1.25,duration:3,yoyo:true,repeat:1,ease:"sine.inOut"},0);});`,
  source: HF + " — mesh-gradient / aurora-drift",
},
{
  code: "B802", slug: "film-grain", name: "حبيبات فيلم", tags: ["background","grain","texture","overlay"],
  desc: "طبقة حبيبات زي أفلام الكاميرا بتتحرك كل فريم. تتحط فوق أي فيديو تدّيله إحساس سينمائي.",
  dur: 4, theme: "dark", params: { strength: 0.18, text: "سينمائي" },
  css: `#gr{position:absolute;inset:-200px;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>");mix-blend-mode:overlay}`,
  html: `<div class="scene scene-a"></div><div class="stage"><div class="h1" data-p="text"></div></div><div id="gr"></div>`,
  js: `$("#gr").style.opacity=P.strength*4;const r=rng(9),kf=[];for(let i=0;i<96;i++)kf.push({x:Math.round((r()-.5)*200),y:Math.round((r()-.5)*200),duration:1/24});
tl.to("#gr",{keyframes:kf,ease:"steps(1)"},0);`,
  source: HF + " — grain-overlay / grain-field",
},
{
  code: "B803", slug: "vignette-pulse", name: "فينييت نابض", tags: ["background","vignette","beat"],
  desc: "حواف الشاشة بتغمق وتنور على الإيقاع، بتشد العين للنص.",
  dur: 4, params: { beat: 0.5, text: "ركّز" },
  css: `#vg{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,.85) 100%)}`,
  html: `<div class="scene scene-b"></div><div class="stage"><div class="h1" style="color:#fff" data-p="text" id="t"></div></div><div id="vg"></div>`,
  js: `const n=Math.floor(4/P.beat);
tl.to("#vg",{keyframes:[{opacity:.45,duration:P.beat*.3,ease:"power2.out"},{opacity:1,duration:P.beat*.7,ease:"power2.in"}],repeat:n-1},0)
.fromTo("#t",{scale:1.08},{keyframes:[{scale:1,duration:P.beat*.6,ease:"power2.out"},{scale:1.08,duration:P.beat*.4,ease:"power2.in"}],repeat:n-1},0);`,
  source: HF + " — vignette / beat-pulse-background",
},
{
  code: "B804", slug: "bokeh", name: "بوكيه", tags: ["background","bokeh","lights"],
  desc: "دواير نور مضببة بأحجام مختلفة بتطلع لفوق ببطء. خلفية دافية وناعمة.",
  dur: 5, theme: "dark", params: { count: 22 },
  css: `.bk{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(255,200,140,.9),rgba(255,120,60,.25) 60%,transparent 70%)}`,
  html: `<div id="h"></div>`,
  js: `const r=rng(13);for(let i=0;i<P.count;i++){const d=document.createElement("div");d.className="bk";const s=80+r()*260;Object.assign(d.style,{width:s+"px",height:s+"px",left:r()*1080-s/2+"px",top:r()*1920+"px",filter:"blur("+(r()*14)+"px)"});$("#h").appendChild(d);
tl.fromTo(d,{y:0,opacity:0},{y:-400-r()*500,opacity:.3+r()*.6,duration:5,ease:"sine.inOut"},0);}`,
  source: "Remotion templates (bokeh-circles) — إعادة بناء بـ GSAP",
},
{
  code: "B805", slug: "particles", name: "جزيئات طايرة", tags: ["background","particles","dust"],
  desc: "نقط صغيرة كتير بتطير في الهوا بهدوء. لمسة حركة لأي خلفية ثابتة.",
  dur: 5, theme: "dark", params: { count: 70, color: "#FFFFFF" },
  css: `.pt{position:absolute;border-radius:50%}`,
  html: `<div class="scene scene-a"></div><div id="h"></div>`,
  js: `const r=rng(17);for(let i=0;i<P.count;i++){const d=document.createElement("div");d.className="pt";const s=4+r()*12;Object.assign(d.style,{width:s+"px",height:s+"px",left:r()*1080+"px",top:r()*1920+"px",background:P.color,opacity:.2+r()*.6});$("#h").appendChild(d);
tl.to(d,{x:(r()-.5)*200,y:-(100+r()*300),duration:5,ease:"none"},0);}`,
  source: HF + " — starfield / particle-burst",
},
{
  code: "B806", slug: "speed-lines", name: "خطوط سرعة", tags: ["background","anime","speed","impact"],
  desc: "خطوط سرعة زي الأنمي حوالين نص الشاشة بتلف وترمش، وفي النص كلمة صدمة.",
  dur: 3.2, params: { text: "واو!" },
  css: `#sl{position:absolute;left:50%;top:50%;width:2600px;height:2600px;margin:-1300px 0 0 -1300px;background:repeating-conic-gradient(#1D1A17 0 1.2deg,transparent 1.2deg 6deg);-webkit-mask-image:radial-gradient(circle,transparent 18%,#000 40%);mask-image:radial-gradient(circle,transparent 18%,#000 40%)}#tx{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:220px;font-weight:900;color:var(--accent)}`,
  html: `<div id="sl"></div><div id="tx" data-p="text"></div>`,
  js: `const kf=[];for(let i=0;i<36;i++)kf.push({rotation:(i%3)*1.7,scale:1+(i%2)*.04,duration:1/12});
tl.from("#sl",{opacity:0,scale:1.4,duration:.25},.1).to("#sl",{keyframes:kf,ease:"steps(1)"},.1).fromTo("#tx",{scale:3,opacity:0},{scale:1,opacity:1,duration:.3,ease:"expo.out"},.3);`,
  source: "تصميم أصلي (ستايل مانجا)",
},
{
  code: "B807", slug: "dot-wave", name: "موجة نقط", tags: ["background","grid","wave"],
  desc: "شبكة نقط بتعمل موجة نبض من النص للأطراف. خلفية تقنية حديثة.",
  dur: 3, theme: "dark", params: { cols: 12, rows: 21 },
  css: `#g{position:absolute;inset:40px;display:grid;gap:0}.d{width:18px;height:18px;border-radius:50%;background:#fff;opacity:.25;justify-self:center;align-self:center}`,
  html: `<div id="g"></div>`,
  js: `const g=$("#g");g.style.gridTemplateColumns="repeat("+P.cols+",1fr)";g.style.gridTemplateRows="repeat("+P.rows+",1fr)";const D=[];for(let i=0;i<P.cols*P.rows;i++){const d=document.createElement("div");d.className="d";g.appendChild(d);D.push(d);}
tl.to(D,{scale:2.4,opacity:1,backgroundColor:CSSV("accent"),duration:.35,yoyo:true,repeat:1,ease:"sine.inOut",stagger:{each:.03,grid:[P.rows,P.cols],from:"center"}},.2);`,
  source: HF + " — stagger-lattice / Remotion grid-pulse",
},
{
  code: "B808", slug: "aurora", name: "أورورا", tags: ["background","aurora","gradient"],
  desc: "شرايط ضوء ملونة زي الشفق القطبي بتتموج ببطء في السما.",
  dur: 6.6, theme: "dark", params: {},
  css: `.ab{position:absolute;left:-300px;right:-300px;height:500px;filter:blur(90px);border-radius:50%;mix-blend-mode:screen}`,
  html: `<div style="position:absolute;inset:0;background:linear-gradient(180deg,#05070F,#0B1530)"></div><div id="h"></div>`,
  js: `const C=["rgba(124,255,178,.7)","rgba(61,132,168,.75)","rgba(123,94,167,.7)"];C.forEach((c,i)=>{const d=document.createElement("div");d.className="ab";d.style.background="linear-gradient(90deg,transparent,"+c+",transparent)";d.style.top=(380+i*330)+"px";$("#h").appendChild(d);
tl.fromTo(d,{x:-200,skewY:-8,scaleY:.7},{x:200,skewY:8,scaleY:1.2,duration:3,yoyo:true,repeat:1,ease:"sine.inOut"},i*.3);});`,
  source: HF + " — aurora",
},
];
