// v2: حركات جديدة (أكتوبر 2026)
// كلها تصميم أصلي لبنك الحركات. الأفكار مستوحاة من أساليب ريلز «الأدوات المرقّمة» اللي بتشرح أدوات AI للمونتيرين.
const V = "v2";
const INSP = "تصميم أصلي: مستوحى من أسلوب ريلز «الأدوات المرقّمة»";
const GLOW = `<div class="glow" id="glow"></div>`;
const GLOW_CSS = `.glow{position:absolute;inset:-20%;background:radial-gradient(circle at 70% 30%,color-mix(in srgb,var(--accent) 55%,transparent),transparent 55%),radial-gradient(circle at 20% 80%,color-mix(in srgb,var(--accent2) 30%,transparent),transparent 50%);filter:blur(40px);opacity:.55}`;

export default [
{
  code: "U513", slug: "addon-tracker", name: "شريط الأدوات ✓", tags: ["ui","progress","checklist","series"], addedIn: V,
  desc: "شريط زجاج فوق فيه أيقونات الأدوات، وكل ما أداة تخلص تاخد ✓ والعدّاد يزيد من 1/4 لحد 4/4. معمول لريلز الأدوات المرقّمة.",
  dur: 5, theme: "dark", params: { label: "ADD-ONS", items: "11|M|◎|▶", total: 4 },
  css: GLOW_CSS + `.bar{position:absolute;top:260px;left:70px;right:70px;height:150px;border-radius:75px;background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.14);backdrop-filter:blur(20px);display:flex;align-items:center;gap:26px;padding:0 44px;direction:ltr}
.lb{font-family:ui-monospace,Menlo,monospace;font-size:34px;letter-spacing:.2em;color:var(--muted);font-weight:700;margin-right:10px}
.it{position:relative;width:96px;height:96px;border-radius:26px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:900;color:rgba(255,255,255,.35)}
.it.on{background:var(--card);color:var(--ink)}
.ck{position:absolute;top:-14px;right:-14px;width:46px;height:46px;border-radius:50%;background:var(--accent2);color:#06150c;font-size:28px;font-weight:900;display:flex;align-items:center;justify-content:center;transform:scale(0)}
.ct{margin-left:auto;font-family:ui-monospace,Menlo,monospace;font-size:52px;font-weight:800}`,
  html: GLOW + `<div class="bar" id="bar"><span class="lb" data-p="label"></span><span id="its" style="display:flex;gap:26px"></span><span class="ct"><span id="n">0</span>/<span id="t"></span></span></div>`,
  js: `const L=String(P.items).split("|");$("#t").textContent=P.total;
tl.from("#bar",{y:-300,opacity:0,duration:.7,ease:"power4.out"},.1);
L.forEach((x,i)=>{const d=document.createElement("div");d.className="it";d.innerHTML=x+'<span class="ck">✓</span>';$("#its").appendChild(d);
const s=.9+i*.95;tl.add(()=>d.classList.add("on"),s).fromTo(d,{scale:.8},{scale:1,duration:.4,ease:"back.out(3)"},s)
.to(d.querySelector(".ck"),{scale:1,duration:.35,ease:"back.out(3)"},s+.2).add(()=>{$("#n").textContent=i+1},s+.2)
.fromTo("#n",{y:-20,opacity:.3},{y:0,opacity:1,duration:.25},s+.2);});
tl.to("#glow",{rotation:25,duration:5,ease:"none"},0);`,
  source: INSP,
},
{
  code: "U514", slug: "node-link", name: "توصيل أداتين", tags: ["ui","diagram","connect","ai","mcp"], addedIn: V,
  desc: "كارتين لأداتين بيطلعوا، وخط متقطّع بيترسم بينهم وعليه كبسولة صغيرة زي MCP بتجري. لما تحب تقول إن الأداة دي بتتوصل بدي.",
  dur: 4, theme: "dark", params: { left: "Claude", right: "ElevenLabs", pill: "MCP", leftIcon: "✳", rightIcon: "II" },
  css: GLOW_CSS + `.tile{position:absolute;top:760px;width:300px;text-align:center}.tile .bx{width:300px;height:300px;border-radius:72px;display:flex;align-items:center;justify-content:center;font-size:150px;font-weight:900;box-shadow:0 30px 80px rgba(0,0,0,.45)}
.tile .nm{margin-top:34px;font-size:54px;font-weight:800;direction:ltr}#a{right:110px}#a .bx{background:#F3E3D6;color:#D9714A}#b{left:110px}#b .bx{background:#fff;color:#111}
svg{position:absolute;left:0;top:0;width:1080px;height:1920px}.pl{position:absolute;top:870px;left:50%;transform:translateX(-50%);padding:16px 40px;border-radius:50px;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.25);font-family:ui-monospace,Menlo,monospace;font-size:40px;font-weight:800;letter-spacing:.1em;direction:ltr}`,
  html: GLOW + `<svg><path id="ln" d="M 410 910 L 670 910" stroke="rgba(255,255,255,.55)" stroke-width="6" stroke-dasharray="14 14" fill="none"/></svg>
<div class="tile" id="a"><div class="bx" data-p="leftIcon"></div><div class="nm" data-p="left"></div></div>
<div class="tile" id="b"><div class="bx" data-p="rightIcon"></div><div class="nm" data-p="right"></div></div>
<div class="pl" id="pl" data-p="pill"></div>`,
  js: `tl.from("#a",{x:300,opacity:0,duration:.6,ease:"power3.out"},.2).from("#b",{x:-300,opacity:0,duration:.6,ease:"power3.out"},.35)
.fromTo("#ln",{attr:{"stroke-dashoffset":260},opacity:0},{opacity:1,attr:{"stroke-dashoffset":0},duration:.6},.9)
.from("#pl",{scale:0,duration:.45,ease:"back.out(3)"},1.3).to("#ln",{attr:{"stroke-dashoffset":-112},duration:2.4,ease:"none"},1.5)
.to("#a .bx,#b .bx",{scale:1.06,duration:.18,yoyo:true,repeat:1,stagger:.25},2.2);`,
  source: INSP,
},
{
  code: "T125", slug: "big-index", name: "رقم القسم الكبير", tags: ["text","number","section","series"], addedIn: V,
  desc: "كلمة صغيرة فوق زي ADD-ON، وتحتها رقم كبير «01» بيتقلب لحد ما يثبت، وتحته نقط بتقولك إنت فين في السلسلة.",
  dur: 3, theme: "dark", params: { label: "ADD-ON", num: 1, total: 4, title: "يعمل التعليق الصوتي" },
  css: GLOW_CSS + `.wrap{position:absolute;top:620px;right:110px;left:110px;direction:ltr;text-align:left}.lb{font-family:ui-monospace,Menlo,monospace;font-size:46px;letter-spacing:.25em;color:var(--accent);font-weight:800}
.num{font-size:420px;font-weight:900;line-height:1;letter-spacing:-.02em;overflow:hidden;height:420px}.dots{display:flex;gap:22px;margin-top:40px}.dots i{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.2)}.dots i.on{background:var(--ink)}
.tt{margin-top:70px;font-size:80px;font-weight:900;direction:rtl;text-align:right}`,
  html: GLOW + `<div class="wrap"><div class="lb" id="lb" data-p="label"></div><div class="num"><div id="n">00</div></div><div class="dots" id="d"></div><div class="tt" id="tt" data-p="title"></div></div>`,
  js: `for(let i=0;i<P.total;i++){const e=document.createElement("i");if(i<P.num)e.className="on";$("#d").appendChild(e);}
const o={v:0},n=$("#n"),f=()=>n.textContent=String(Math.round(o.v)).padStart(2,"0");f();
tl.from("#lb",{opacity:0,x:-60,duration:.4},.1).from("#n",{yPercent:100,duration:.6,ease:"power4.out"},.2)
.fromTo(o,{v:P.num+8},{v:P.num,duration:.8,ease:"power3.out",onUpdate:f},.2)
.from("#d i",{scale:0,duration:.3,stagger:.06,ease:"back.out(3)"},.8).from("#tt",{opacity:0,y:40,duration:.5},1.1);`,
  source: INSP,
},
{
  code: "N413", slug: "step-chip", name: "كبسولة العدّ", tags: ["number","counter","series","chip"], addedIn: V,
  desc: "كبسولة صغيرة مكتوب فيها «04 / 10» والرقم بيتقلب لفوق، وجنبها اسم القسم. بتتحط في ركن أي مشهد في سلسلة.",
  dur: 3, theme: "dark", params: { from: 3, to: 4, total: 10, tag: "✦ سكيلز للشكل" },
  css: `.row{position:absolute;top:220px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center}
.ch{direction:ltr;font-family:ui-monospace,Menlo,monospace;font-size:52px;font-weight:800;padding:14px 34px;border-radius:40px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.18);display:flex;gap:16px}
.win{height:66px;overflow:hidden}.win div div{height:66px;line-height:66px}.tg{font-size:44px;font-weight:800;padding:14px 34px;border-radius:40px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.18)}
.big{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:640px;font-weight:900;color:rgba(255,255,255,.04);direction:ltr}`,
  html: `<div class="big" id="bg"></div><div class="row"><div class="tg" id="tg" data-p="tag"></div><div class="ch" id="ch"><div class="win"><div id="w"></div></div><span style="opacity:.5">/ <span id="t"></span></span></div></div>`,
  js: `const p=v=>String(v).padStart(2,"0");$("#t").textContent=p(P.total);$("#bg").textContent=p(P.to);
for(let v=P.from;v<=P.to;v++){const d=document.createElement("div");d.textContent=p(v);$("#w").appendChild(d);}
tl.from("#ch",{x:-200,opacity:0,duration:.5,ease:"power3.out"},.1).from("#tg",{x:200,opacity:0,duration:.5,ease:"power3.out"},.2)
.to("#w",{y:-66*(P.to-P.from),duration:.6,ease:"back.out(2)"},.8).from("#bg",{scale:1.3,opacity:0,duration:1.2,ease:"power2.out"},.7);`,
  source: INSP,
},
{
  code: "U515", slug: "code-type", name: "كود بيتكتب", tags: ["ui","code","typewriter","developer"], addedIn: V,
  desc: "شاشة كود زجاج، السطور بتتكتب حرف حرف والمؤشر بيرمش، وفي الآخر بادج ✓ بتنطّ. لما تحب توري إن الـAI بيكتب الكود.",
  dur: 5, theme: "dark", params: { file: "Scene.tsx", badge: "✓ Opus", code: "<Sequence from={0}>|  <Title spring={?} />|  <Scene3D engine={?} />|  <Audio src={?} />|</Sequence>" },
  css: GLOW_CSS + `.ed{position:absolute;top:620px;left:70px;right:70px;border-radius:40px;background:rgba(20,20,26,.78);border:2px solid rgba(255,255,255,.12);box-shadow:0 40px 100px rgba(0,0,0,.5);direction:ltr;text-align:left;overflow:hidden}
.hd{display:flex;align-items:center;gap:14px;padding:26px 34px;border-bottom:2px solid rgba(255,255,255,.08);font-family:ui-monospace,Menlo,monospace;font-size:32px;color:var(--muted)}.hd i{width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,.25)}
.bd{margin-left:auto;color:var(--accent2);font-weight:800}.cd{padding:36px 40px 44px;font-family:ui-monospace,Menlo,monospace;font-size:44px;line-height:1.7;white-space:pre;min-height:420px}.cd .k{color:var(--accent)}
.caret{display:inline-block;width:22px;height:48px;background:var(--ink);vertical-align:middle;margin-left:4px}`,
  html: GLOW + `<div class="ed" id="ed"><div class="hd"><i></i><i></i><i></i><span data-p="file"></span><span class="bd" id="bd" data-p="badge"></span></div><div class="cd"><span id="tx"></span><span class="caret" id="cr"></span></div></div>`,
  js: `const src=String(P.code).split("|").join("\\n"),tx=$("#tx"),o={i:0};
const paint=()=>{const s=src.slice(0,Math.round(o.i)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\\?/g,'<span class="k">?</span>');tx.innerHTML=s;};
tl.from("#ed",{y:120,opacity:0,duration:.6,ease:"power3.out"},.1).set("#bd",{scale:0},0)
.to(o,{i:src.length,duration:3,ease:"none",onUpdate:paint},.6).to("#bd",{scale:1,duration:.4,ease:"back.out(3)"},3.8);
tl.to("#cr",{opacity:0,duration:.01,repeat:9,yoyo:true,repeatDelay:.25},.2);`,
  source: INSP,
},
{
  code: "U516", slug: "ease-curve", name: "منحنى التوقيت", tags: ["ui","easing","graph","motion-design"], addedIn: V,
  desc: "منحنى ease-in-out بيترسم ونقطة بتجري عليه، وتحته مربع بيتحرك بنفس التوقيت. لشرح التوقيت والـeasing.",
  dur: 4, theme: "dark", params: { label: "ease-in-out", c1: "0.65,0", c2: "0.35,1" },
  css: GLOW_CSS + `.card{position:absolute;top:560px;left:80px;right:80px;height:760px;border-radius:44px;background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.12);overflow:hidden}
svg{position:absolute;left:0;top:0;width:920px;height:760px}.lb{position:absolute;right:40px;bottom:30px;font-family:ui-monospace,Menlo,monospace;font-size:36px;color:var(--muted);direction:ltr}
.dot{position:absolute;width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:50%;background:#fff;box-shadow:0 0 30px #fff}.blk{position:absolute;top:1400px;left:120px;width:150px;height:150px;border-radius:30px;background:var(--accent)}`,
  html: GLOW + `<div class="card"><svg><path d="M120 640 H860 M120 640 V80" stroke="rgba(255,255,255,.18)" stroke-width="4" fill="none"/><path id="cv" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round"/></svg><div class="dot" id="dt"></div><div class="lb" data-p="label"></div></div><div class="blk" id="bk"></div>`,
  js: `const [x1,y1]=P.c1.split(",").map(Number),[x2,y2]=P.c2.split(",").map(Number);
const X=t=>120+740*t,Y=v=>640-520*v;const B=(t,a,b)=>3*(1-t)*(1-t)*t*a+3*(1-t)*t*t*b+t*t*t;
$("#cv").setAttribute("d","M"+X(0)+" "+Y(0)+" C"+X(x1)+" "+Y(y1)+" "+X(x2)+" "+Y(y2)+" "+X(1)+" "+Y(1));
const len=$("#cv").getTotalLength();gsap.set("#cv",{strokeDasharray:len,strokeDashoffset:len});
const o={t:0},dt=$("#dt"),card=$(".card");const mv=()=>{const t=o.t;dt.style.left=(80+X(B(t,x1,x2)))+"px";dt.style.top=(560+Y(B(t,y1,y2)))+"px";};
dt.style.position="absolute";document.getElementById("root").appendChild(dt);mv();
tl.from(".card",{opacity:0,y:80,duration:.5},.1).to("#cv",{strokeDashoffset:0,duration:1,ease:"power2.inOut"},.4)
.to(o,{t:1,duration:1.6,ease:"none",onUpdate:mv},1.5).to("#bk",{x:690,duration:1.6,ease:"power2.inOut"},1.5);`,
  source: INSP + " · مبادئ التوقيت من motion-design skill (LottieFiles, MIT)",
},
{
  code: "U517", slug: "timeline-keys", name: "تايملاين وكي فريمز", tags: ["ui","timeline","keyframes","gsap","editor"], addedIn: V,
  desc: "تايملاين فيه 4 تراكات، الكي فريمز بتنطّ عليها، والـplayhead بيعدّي وكل كي فريم يلمسه بينوّر. نفس شكل برامج المونتاج.",
  dur: 4, theme: "dark", params: { tracks: 4, label: "GSAP Timeline" },
  css: GLOW_CSS + `.tlc{position:absolute;top:620px;left:70px;right:70px;height:640px;border-radius:40px;background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.12);padding:60px 50px;direction:ltr}
.tr{position:relative;height:90px;border-radius:20px;background:rgba(255,255,255,.07);margin-bottom:42px}.k{position:absolute;top:50%;width:38px;height:38px;margin:-19px 0 0 -19px;background:var(--accent);transform:rotate(45deg) scale(0);border-radius:6px}
.k.hit{background:#fff;box-shadow:0 0 30px #fff}.ph{position:absolute;top:30px;bottom:30px;left:50px;width:6px;border-radius:3px;background:#fff;box-shadow:0 0 24px rgba(255,255,255,.8)}
.ttl{position:absolute;top:470px;left:0;right:0;text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:44px;letter-spacing:.15em;color:var(--muted);direction:ltr}`,
  html: GLOW + `<div class="ttl" id="ttl" data-p="label"></div><div class="tlc" id="tc"><div id="trs"></div><div class="ph" id="ph"></div></div>`,
  js: `const r=rng(7),W=820,keys=[];for(let t=0;t<P.tracks;t++){const d=document.createElement("div");d.className="tr";$("#trs").appendChild(d);
for(let k=0;k<3;k++){const x=60+r()*(W-120),e=document.createElement("i");e.className="k";e.style.left=x+"px";d.appendChild(e);keys.push({e,x});}}
tl.from("#tc",{opacity:0,y:80,duration:.5},.1).from("#ttl",{opacity:0,duration:.4},.2);
keys.forEach((k,i)=>tl.to(k.e,{scale:1,rotation:45,duration:.3,ease:"back.out(3)"},.5+i*.05));
tl.fromTo("#ph",{x:0},{x:W,duration:2.2,ease:"none"},1.4);
keys.forEach(k=>{const at=1.4+2.2*(k.x/W);tl.add(()=>k.e.classList.add("hit"),at).fromTo(k.e,{scale:1.5},{scale:1,duration:.3},at);});`,
  source: INSP,
},
{
  code: "B809", slug: "tint-shift", name: "نور بيغيّر لونه", tags: ["background","gradient","glow","section"], addedIn: V,
  desc: "خلفية غامقة فيها نور ناعم بيتحرك ولونه بيتغير مع كل قسم: بنفسجي، أزرق، أخضر، دهبي. تحت أي سلسلة مرقّمة.",
  dur: 8, theme: "dark", params: { colors: "#5B4FDB,#2F6BFF,#1FA37A,#D9A441" },
  css: `.l{position:absolute;width:1300px;height:1300px;border-radius:50%;filter:blur(160px);opacity:.6}#a{left:-300px;top:-200px}#b{right:-400px;bottom:-300px;opacity:.35}.grain{position:absolute;inset:0;background:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:6px 6px;opacity:.35}`,
  html: `<div class="l" id="a"></div><div class="l" id="b"></div><div class="grain"></div>`,
  js: `const C=P.colors.split(","),seg=8/C.length;gsap.set("#a",{background:C[0]});gsap.set("#b",{background:C[1%C.length]});
C.forEach((c,i)=>{if(i)tl.to("#a",{background:c,duration:.9,ease:"power2.inOut"},i*seg).to("#b",{background:C[(i+1)%C.length],duration:.9,ease:"power2.inOut"},i*seg);});
tl.to("#a",{x:260,y:380,duration:8,ease:"sine.inOut"},0).to("#b",{x:-200,y:-300,duration:8,ease:"sine.inOut"},0);`,
  source: INSP,
},
{
  code: "P613", slug: "phone-hub", name: "موبايل والأدوات حواليه", tags: ["photo","phone","mockup","outro","diagram"], addedIn: V,
  desc: "موبايل في النص وحواليه 4 كروت أدوات، خطوط بتترسم من كل أداة للموبايل وكل واحدة تاخد ✓، وتحت «MADE WITH 4/4». قفلة للريل اللي بتقول إنه معمول بالأدوات دي.",
  dur: 5, theme: "dark", params: { items: "ElevenLabs|Magnific|Chrome|Bankmotion", icons: "II|M|◎|B", footer: "MADE WITH" },
  css: GLOW_CSS + `.ph{position:absolute;left:390px;top:620px;width:300px;height:600px;border-radius:56px;background:#0b0b0e;border:10px solid #2a2a30;box-shadow:0 40px 120px rgba(0,0,0,.6);overflow:hidden}.ph .sc{position:absolute;inset:0;background:linear-gradient(170deg,var(--accent),#1a1a22 70%)}
.nd{position:absolute;width:190px;text-align:center}.nd .bx{position:relative;width:150px;height:150px;margin:0 auto;border-radius:40px;background:var(--card);border:2px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:64px;font-weight:900}
.nd .nm{margin-top:16px;font-size:30px;font-weight:700;direction:ltr}.nd .ck{position:absolute;top:-12px;right:-12px;width:46px;height:46px;border-radius:50%;background:var(--accent2);color:#06150c;font-size:28px;font-weight:900;display:flex;align-items:center;justify-content:center;transform:scale(0)}
svg{position:absolute;left:0;top:0;width:1080px;height:1920px}.ft{position:absolute;top:1420px;left:0;right:0;display:flex;justify-content:center}.ft>span{direction:ltr;font-family:ui-monospace,Menlo,monospace;font-size:38px;letter-spacing:.15em;padding:16px 36px;border-radius:40px;border:2px solid var(--accent2);color:var(--accent2)}`,
  html: GLOW + `<svg id="sv"></svg><div class="ph" id="ph"><div class="sc"></div></div><div id="nds"></div><div class="ft" id="ft"><span><span data-p="footer"></span> <span id="c">0</span>/<span id="t"></span></span></div>`,
  js: `const N=P.items.split("|"),I=P.icons.split("|");$("#t").textContent=N.length;
const pos=[[110,560],[780,560],[110,1100],[780,1100]],ph=[540,920];
N.forEach((nm,i)=>{const [x,y]=pos[i%4];const d=document.createElement("div");d.className="nd";d.style.left=x+"px";d.style.top=y+"px";d.innerHTML='<div class="bx">'+(I[i]||"•")+'<span class="ck">✓</span></div><div class="nm">'+nm+'</div>';$("#nds").appendChild(d);
const p=document.createElementNS("http://www.w3.org/2000/svg","path");const sx=x+95,sy=y+75,cx=(sx+ph[0])/2;
p.setAttribute("d","M"+sx+" "+sy+" C"+cx+" "+sy+" "+cx+" "+ph[1]+" "+ph[0]+" "+ph[1]);p.setAttribute("stroke","rgba(255,255,255,.4)");p.setAttribute("stroke-width","4");p.setAttribute("fill","none");$("#sv").appendChild(p);
const L=p.getTotalLength();gsap.set(p,{strokeDasharray:L,strokeDashoffset:L});const s=1+i*.6;
tl.from(d,{scale:0,opacity:0,duration:.45,ease:"back.out(2)"},.4+i*.12).to(p,{strokeDashoffset:0,duration:.6,ease:"power2.inOut"},s)
.to(d.querySelector(".ck"),{scale:1,duration:.35,ease:"back.out(3)"},s+.5).add(()=>{$("#c").textContent=i+1},s+.5);});
tl.from("#ph",{y:300,opacity:0,duration:.7,ease:"power3.out"},.1).from("#ft",{opacity:0,y:40,duration:.5},3.4);`,
  source: INSP,
},
{
  code: "T126", slug: "caption-pill", name: "كابشن في كبسولة", tags: ["text","caption","subtitle","pill"], addedIn: V,
  desc: "كابشن تحت جوه كبسولة زجاج، الكلام بيظهر كلمة كلمة والكلمة المهمة بتنوّر بلون تاني. لأي ريل فيه تعليق صوتي.",
  dur: 4, theme: "dark", params: { text: "بيفتح المواقع بنفسه ويصوّر الشاشة", hi: "بنفسه" },
  css: GLOW_CSS + `.capw{position:absolute;bottom:420px;left:70px;right:70px;display:flex;justify-content:center}.cap{max-width:940px;padding:26px 50px;border-radius:60px;background:rgba(20,20,26,.72);border:2px solid rgba(255,255,255,.14);backdrop-filter:blur(16px);font-size:68px;font-weight:900;line-height:1.5;text-align:center}
.cap .w{opacity:.25}.cap .w.hi{color:var(--accent2)}`,
  html: GLOW + `<div class="capw"><div class="cap" id="cap"><span id="tx" data-p="text"></span></div></div>`,
  js: `const W=words($("#tx"));W.forEach(w=>{if(w.textContent===P.hi)w.classList.add("hi");});
tl.from("#cap",{y:60,opacity:0,duration:.45,ease:"power3.out"},.1);
W.forEach((w,i)=>tl.to(w,{opacity:1,duration:.12},.5+i*.32).fromTo(w,{y:16},{y:0,duration:.25,ease:"back.out(3)"},.5+i*.32));
tl.to("#cap .hi",{scale:1.12,duration:.2,yoyo:true,repeat:1},.5+W.length*.32);`,
  source: INSP,
},
];
