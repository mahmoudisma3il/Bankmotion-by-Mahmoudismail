// N: أرقام وبيانات
const HF = "مستوحاة من HyperFrames (Apache-2.0)";
export default [
{
  code: "N401", slug: "counter", name: "عدّاد", tags: ["number","count-up"],
  desc: "رقم بيعدّ من صفر لحد الرقم اللي عايزه، ويثبت بنطّة، وتحته كلمتين.",
  dur: 3, theme: "dark", params: { to: 1000, prefix: "", suffix: "+", label: "عميل سعيد" },
  html: `<div class="stage"><div class="h1" style="font-size:260px;font-weight:900;direction:ltr" id="n">0</div><div class="h3 accent" id="l" data-p="label"></div></div>`,
  js: `const o={v:0},n=$("#n");const f=()=>n.textContent=P.prefix+Math.round(o.v).toLocaleString("en")+(o.v>=P.to?P.suffix:"");f();
tl.from("#n",{scale:.6,opacity:0,duration:.4,ease:"back.out(2)"},.1)
.to(o,{v:P.to,duration:1.6,ease:"power2.out",onUpdate:f},.2)
.to("#n",{scale:1.12,duration:.15,yoyo:true,repeat:1},1.8).from("#l",{opacity:0,y:30,duration:.4},1.7);`,
  source: "من «عدّاد» في ريل Majedteq + " + HF + ": count-up",
},
{
  code: "N402", slug: "growing-percent", name: "نسبة بتكبر", tags: ["number","percent","scale"],
  desc: "النسبة بتعدّ والرقم بيكبر في نفس الوقت، وفي الآخر علامة % بتنطّ.",
  dur: 3, params: { to: 90, label: "وفّرنا من الوقت" },
  css: `.row{display:flex;align-items:flex-start;direction:ltr;font-weight:900;line-height:1}#n{font-size:300px}#pc{font-size:140px;color:var(--accent);margin-top:30px}`,
  html: `<div class="stage"><div class="row"><span id="n">0</span><span id="pc">%</span></div><div class="h3" id="l" data-p="label"></div></div>`,
  js: `const o={v:0},n=$("#n");const f=()=>n.textContent=Math.round(o.v);
tl.fromTo(".row",{scale:.45},{scale:1,duration:1.4,ease:"power3.out"},.2).to(o,{v:P.to,duration:1.4,ease:"power3.out",onUpdate:f},.2)
.from("#pc",{scale:0,rotation:-30,duration:.4,ease:"back.out(3)"},1.4).from("#l",{opacity:0,y:30,duration:.4},1.6);`,
  source: HF + ": counting-dynamic-scale",
},
{
  code: "N403", slug: "slot-digits", name: "أرقام بتلف", tags: ["number","slot","roll"],
  desc: "كل رقم بيلف زي ماكينة القمار ويقف على الرقم الصح، رقم ورا رقم.",
  dur: 3, theme: "dark", params: { value: "2026", label: "سنة البداية" },
  css: `.digits{display:flex;direction:ltr;gap:8px}.dg{height:260px;overflow:hidden;font-size:220px;font-weight:900;line-height:260px;width:150px;text-align:center;background:var(--card);border-radius:24px}.dg div div{height:260px}`,
  html: `<div class="stage"><div class="digits" id="d"></div><div class="h3 accent" data-p="label" id="l"></div></div>`,
  js: `Array.from(P.value).forEach((c,i)=>{const col=document.createElement("div");col.className="dg";const s=document.createElement("div");const target=parseInt(c,10);
for(let k=0;k<20;k++){const x=document.createElement("div");x.textContent=k%10;s.appendChild(x);}const t=document.createElement("div");t.textContent=c;s.appendChild(t);col.appendChild(s);$("#d").appendChild(col);
tl.fromTo(s,{y:0},{y:-260*20,duration:1.2+i*.25,ease:"power3.out"},.2);});
tl.from("#l",{opacity:0,y:30,duration:.4},1.9);`,
  source: HF + ": slot-machine-roll / number-wheel",
},
{
  code: "N404", slug: "price-card", name: "كارت سعر", tags: ["number","price","offer","ecommerce"],
  desc: "كارت منتج بيطلع، السعر القديم بيتشطب، والجديد بيعدّ ويثبت ومعاه بادج الخصم.",
  dur: 3.5, params: { title: "آيفون ١٥ برو", old: "٥٠ ألف", price: 42, unit: "ألف", badge: "-16%" },
  css: `.card{position:relative;width:820px;background:var(--card);border-radius:48px;padding:70px;box-shadow:0 30px 80px rgba(0,0,0,.12);text-align:center}
.img{height:520px;border-radius:32px;background:linear-gradient(160deg,#E6DED0,#CFC3B0);margin-bottom:50px}.old{position:relative;display:inline-block;font-size:60px;color:var(--muted);font-weight:700}
.old i{position:absolute;left:-6px;right:-6px;top:52%;height:8px;background:var(--accent);transform-origin:100% 50%}.np{font-size:170px;font-weight:900;color:var(--accent);line-height:1.1}
.bd{position:absolute;top:-40px;left:-40px;width:200px;height:200px;border-radius:50%;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center;font-size:58px;font-weight:900;direction:ltr}`,
  html: `<div class="stage"><div class="card" id="c"><div class="img"></div><div class="h3" data-p="title"></div><div class="old"><span data-p="old"></span><i id="st"></i></div><div class="np"><span id="n">0</span> <span data-p="unit" style="font-size:80px"></span></div><div class="bd" id="b" data-p="badge"></div></div></div>`,
  js: `const o={v:0},n=$("#n");const f=()=>n.textContent=Math.round(o.v);f();
tl.from("#c",{y:700,rotation:-4,duration:.7,ease:"power4.out"},.1).from("#st",{scaleX:0,duration:.35},.9)
.to(o,{v:P.price,duration:.9,ease:"power2.out",onUpdate:f},1.1).fromTo("#b",{scale:0,rotation:-60},{scale:1,rotation:-12,duration:.5,ease:"back.out(3)"},1.9);`,
  source: "من «كارت سعر ٤٢ ألف» في ريل Majedteq",
},
{
  code: "N405", slug: "progress-bar", name: "شريط بيتملي", tags: ["number","progress","bar"],
  desc: "شريط بيتملي لحد النسبة اللي عايزها، والرقم بيعدّ معاه.",
  dur: 3, params: { label: "نسبة الإنجاز", value: 78 },
  css: `.box{width:860px}.top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:30px}.track{height:70px;border-radius:35px;background:rgba(0,0,0,.08);overflow:hidden}.fill{height:100%;width:100%;border-radius:35px;background:var(--accent);transform-origin:100% 50%}`,
  html: `<div class="stage"><div class="box" id="bx"><div class="top"><span class="h3" data-p="label"></span><span class="h2 accent" style="direction:ltr"><span id="n">0</span>%</span></div><div class="track"><div class="fill" id="f"></div></div></div></div>`,
  js: `const o={v:0},n=$("#n");
tl.from("#bx",{opacity:0,y:50,duration:.5},.1).fromTo("#f",{scaleX:0},{scaleX:P.value/100,duration:1.4,ease:"power2.inOut"},.5)
.to(o,{v:P.value,duration:1.4,ease:"power2.inOut",onUpdate:()=>n.textContent=Math.round(o.v)},.5);`,
  source: HF + ": stat-bars-and-fills",
},
{
  code: "N406", slug: "progress-ring", name: "دايرة بتتملي", tags: ["number","ring","circle"],
  desc: "دايرة بتترسم لحد النسبة، والرقم في نصها بيعدّ.",
  dur: 3, theme: "dark", params: { value: 85, label: "رضا العملاء" },
  css: `.ring{position:relative;width:700px;height:700px}.ring svg{width:100%;height:100%;transform:rotate(-90deg) scaleY(-1)}.ring .c{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:180px;font-weight:900;direction:ltr}`,
  html: `<div class="stage"><div class="ring"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="86" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="16"/><circle id="arc" cx="100" cy="100" r="86" fill="none" stroke="var(--accent)" stroke-width="16" stroke-linecap="round"/></svg><div class="c"><span id="n">0</span>%</div></div><div class="h3" data-p="label" id="l"></div></div>`,
  js: `const L=2*Math.PI*86,a=$("#arc"),o={v:0};a.style.strokeDasharray=L;
tl.from(".ring",{scale:.7,opacity:0,duration:.5,ease:"back.out(2)"},.1).fromTo(a,{strokeDashoffset:L},{strokeDashoffset:L*(1-P.value/100),duration:1.5,ease:"power2.inOut"},.4)
.to(o,{v:P.value,duration:1.5,ease:"power2.inOut",onUpdate:()=>$("#n").textContent=Math.round(o.v)},.4).from("#l",{opacity:0,y:30,duration:.4},1.6);`,
  source: HF + ": conic-progress-ring",
},
{
  code: "N407", slug: "bar-chart", name: "أعمدة", tags: ["number","chart","bars"],
  desc: "أعمدة بتطلع ورا بعض بأطوال مختلفة، فوق كل عمود رقمه، وآخر عمود ملوّن.",
  dur: 3.5, params: { title: "المبيعات", values: "35,55,48,72,95", labels: "يناير|فبراير|مارس|أبريل|مايو" },
  css: `.chart{display:flex;align-items:flex-end;gap:40px;height:900px}.col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:16px}.bar{width:130px;border-radius:24px 24px 8px 8px;background:var(--ink);transform-origin:50% 100%}.v{font-size:52px;font-weight:900}.lb{font-size:36px;font-weight:700;color:var(--muted)}`,
  html: `<div class="stage"><div class="h2" data-p="title" id="t"></div><div class="chart" id="ch"></div></div>`,
  js: `const V=P.values.split(",").map(Number),Lb=P.labels.split("|"),mx=Math.max(...V);
V.forEach((v,i)=>{const c=document.createElement("div");c.className="col";c.innerHTML='<div class="v">'+v+'</div><div class="bar"></div><div class="lb">'+(Lb[i]||"")+'</div>';const b=c.querySelector(".bar");b.style.height=(v/mx*700)+"px";if(i===V.length-1)b.style.background="var(--accent)";$("#ch").appendChild(c);
tl.from(b,{scaleY:0,duration:.6,ease:"power3.out"},.5+i*.15).from(c.querySelector(".v"),{opacity:0,y:30,duration:.3},.8+i*.15);});
tl.from("#t",{opacity:0,y:30,duration:.4},.1);`,
  source: HF + ": animated-bar-chart",
},
{
  code: "N408", slug: "versus", name: "قبل وبعد بالأرقام", tags: ["number","compare","versus"],
  desc: "الشاشة نصين: قبل وبعد. كل نص بيدخل من ناحية، وVS بتنطّ في النص، والأرقام بتعدّ.",
  dur: 3.5, params: { l1: "قبل", v1: 12, l2: "بعد", v2: 87, unit: "طلب" },
  css: `.half{position:absolute;left:0;right:0;height:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}#h1{top:0;background:#E3DBCD}#h2{bottom:0;background:var(--accent);color:#fff}.num{font-size:220px;font-weight:900;line-height:1}#vs{position:absolute;left:50%;top:50%;width:210px;height:210px;margin:-105px 0 0 -105px;border-radius:50%;background:var(--ink);color:#fff;font-size:80px;font-weight:900;display:flex;align-items:center;justify-content:center}`,
  html: `<div class="half" id="h1"><div class="h3" data-p="l1"></div><div class="num" id="a">0</div><div class="sub" data-p="unit"></div></div><div class="half" id="h2"><div class="h3" data-p="l2"></div><div class="num" id="b">0</div><div class="sub" style="color:#fff" data-p="unit"></div></div><div id="vs">VS</div>`,
  js: `const o={a:0,b:0};
tl.from("#h1",{xPercent:100,duration:.6,ease:"power3.out"},.1).from("#h2",{xPercent:-100,duration:.6,ease:"power3.out"},.25)
.fromTo("#vs",{scale:0,rotation:-90},{scale:1,rotation:0,duration:.5,ease:"back.out(3)"},.8)
.to(o,{a:P.v1,b:P.v2,duration:1.3,ease:"power2.out",onUpdate:()=>{$("#a").textContent=Math.round(o.a);$("#b").textContent=Math.round(o.b);}},1);`,
  source: HF + ": comparison-split",
},
{
  code: "N409", slug: "star-rating", name: "تقييم نجوم", tags: ["number","rating","stars","review"],
  desc: "5 نجوم بتتملي واحدة ورا التانية، والتقييم بيعدّ لحد 4.8.",
  dur: 3, params: { rating: 4.8, label: "تقييم أكتر من ٢٠٠٠ عميل" },
  css: `.stars{display:flex;gap:20px;direction:ltr}.st{width:150px;height:150px}.r{font-size:200px;font-weight:900;line-height:1;direction:ltr}`,
  html: `<div class="stage"><div class="r" id="r">0.0</div><div class="stars" id="s"></div><div class="sub" data-p="label" id="l"></div></div>`,
  js: `const path="M50 4 L62 36 L96 38 L69 59 L79 93 L50 73 L21 93 L31 59 L4 38 L38 36 Z";
for(let i=0;i<5;i++){const fill=Math.max(0,Math.min(1,P.rating-i));const d=document.createElement("div");d.className="st";d.innerHTML='<svg viewBox="0 0 100 100"><defs><clipPath id="c'+i+'"><rect x="0" y="0" width="'+(fill*100)+'" height="100"/></clipPath></defs><path d="'+path+'" fill="none" stroke="#E8B21E" stroke-width="5" stroke-linejoin="round"/><path d="'+path+'" fill="#F5B921" clip-path="url(#c'+i+')"/></svg>';$("#s").appendChild(d);
tl.from(d,{scale:0,rotation:-70,duration:.45,ease:"back.out(3)"},.4+i*.15);}
const o={v:0};tl.to(o,{v:P.rating,duration:1.2,ease:"power2.out",onUpdate:()=>$("#r").textContent=o.v.toFixed(1)},.4).from("#l",{opacity:0,y:20,duration:.4},1.5);`,
  source: HF + ": star-rating-fill",
},
{
  code: "N410", slug: "countdown", name: "عد تنازلي", tags: ["number","countdown","intro"],
  desc: "3، 2، 1، كل رقم بيخبط في النص ومعاه موجة، وفي الآخر كلمة البداية.",
  dur: 3.5, theme: "dark", params: { from: 3, go: "يلّا!" },
  css: `.big{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:520px;font-weight:900;opacity:0}.rg{position:absolute;left:50%;top:50%;width:700px;height:700px;margin:-350px 0 0 -350px;border-radius:50%;border:14px solid var(--accent);opacity:0}`,
  html: `<div id="h"></div>`,
  js: `const items=[];for(let i=P.from;i>=1;i--)items.push(String(i));items.push(P.go);
items.forEach((t,i)=>{const d=document.createElement("div");d.className="big";d.textContent=t;if(i===items.length-1){d.style.fontSize="260px";d.style.color="var(--accent)";}const r=document.createElement("div");r.className="rg";$("#h").appendChild(r);$("#h").appendChild(d);
const s=.2+i*.75;tl.fromTo(d,{scale:2,opacity:0},{scale:1,opacity:1,duration:.3,ease:"expo.out"},s).fromTo(r,{scale:.3,opacity:.9},{scale:1.6,opacity:0,duration:.7,ease:"power2.out"},s);
if(i<items.length-1)tl.to(d,{opacity:0,scale:.7,duration:.2},s+.55);});`,
  source: "Remotion templates (countdown-intro): إعادة بناء بـ GSAP",
},
{
  code: "N411", slug: "line-chart", name: "خط بياني", tags: ["number","chart","line"],
  desc: "خط بياني بيترسم من أوله لآخره والمساحة تحته بتتملي، وآخر نقطة بتنوّر برقمها.",
  dur: 3.5, theme: "dark", params: { values: "10,24,18,40,36,62,90", label: "نمو ٨٠٠٪" },
  css: `svg.lc{width:900px;height:700px;overflow:visible}`,
  html: `<div class="stage"><div class="h2 accent" data-p="label" id="l"></div><svg class="lc" viewBox="0 0 900 700"><defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF5A1F" stop-opacity=".45"/><stop offset="1" stop-color="#FF5A1F" stop-opacity="0"/></linearGradient></defs><path id="ar" fill="url(#gr)"/><path id="ln" fill="none" stroke="var(--accent)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><circle id="dt" r="22" fill="#fff"/></svg></div>`,
  js: `const V=P.values.split(",").map(Number),mx=Math.max(...V),pts=V.map((v,i)=>[i*(900/(V.length-1)),680-v/mx*640]);
const d="M"+pts.map(p=>p.join(" ")).join(" L");$("#ln").setAttribute("d",d);$("#ar").setAttribute("d",d+" L900 700 L0 700 Z");
const last=pts[pts.length-1];$("#dt").setAttribute("cx",last[0]);$("#dt").setAttribute("cy",last[1]);
const ln=$("#ln"),L=ln.getTotalLength();ln.style.strokeDasharray=L;
tl.fromTo(ln,{strokeDashoffset:L},{strokeDashoffset:0,duration:1.5,ease:"power2.inOut"},.3).from("#ar",{opacity:0,duration:.6},1.3)
.fromTo("#dt",{scale:0,transformOrigin:"50% 50%"},{scale:1,duration:.4,ease:"back.out(3)"},1.75).from("#l",{opacity:0,y:30,duration:.5},1.9);`,
  source: HF + ": chart-story / mk-line-graph",
},
{
  code: "N412", slug: "donut", name: "دونات", tags: ["number","chart","donut","pie"],
  desc: "رسم دونات بيترسم حتة حتة بألوان مختلفة، والرقم الأساسي في نصه.",
  dur: 3.5, params: { values: "55,30,15", labels: "إنستجرام|تيك توك|فيسبوك", center: "55%" },
  css: `.dn{position:relative;width:640px;height:640px}.dn svg{width:100%;height:100%;transform:rotate(-90deg)}.dn .c{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:150px;font-weight:900;direction:ltr}.lg{display:flex;gap:40px;font-size:40px;font-weight:700}.lg i{display:inline-block;width:30px;height:30px;border-radius:50%;margin-left:12px;vertical-align:middle}`,
  html: `<div class="stage"><div class="dn"><svg viewBox="0 0 200 200" id="sv"></svg><div class="c" data-p="center" id="c"></div></div><div class="lg" id="lg"></div></div>`,
  js: `const V=P.values.split(",").map(Number),Lb=P.labels.split("|"),T=V.reduce((a,b)=>a+b,0),C=[CSSV("accent"),CSSV("ink"),CSSV("accent2"),"#F5B921"],R=80,L=2*Math.PI*R;let acc=0;
V.forEach((v,i)=>{const c=document.createElementNS("http://www.w3.org/2000/svg","circle");Object.entries({cx:100,cy:100,r:R,fill:"none",stroke:C[i%4],"stroke-width":34}).forEach(([k,x])=>c.setAttribute(k,x));
const seg=v/T*L;c.style.strokeDasharray=seg+" "+L;c.style.strokeDashoffset=-acc;acc+=seg;$("#sv").appendChild(c);
tl.fromTo(c,{strokeDasharray:"0 "+L},{strokeDasharray:seg+" "+L,duration:.6,ease:"power2.out"},.3+i*.5);
const l=document.createElement("span");l.innerHTML='<i style="background:'+C[i%4]+'"></i>'+(Lb[i]||"");$("#lg").appendChild(l);tl.from(l,{opacity:0,y:20,duration:.3},.4+i*.5);});
tl.from("#c",{scale:0,duration:.5,ease:"back.out(2.5)"},.5);`,
  source: "Remotion templates (donut-chart): إعادة بناء بـ GSAP",
},
];
