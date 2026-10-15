// U — واجهات وإشعارات
const HF = "مستوحاة من HyperFrames registry (Apache-2.0)";
const WALL = `<div style="position:absolute;inset:0;background:linear-gradient(170deg,#3B4C7A,#1A1F33 60%,#0D0F18)"></div>`;
const CURSOR = `<svg id="cur" viewBox="0 0 40 40" style="position:absolute;width:110px;height:110px;left:0;top:0;filter:drop-shadow(0 6px 10px rgba(0,0,0,.35))"><path d="M6 3 L6 33 L14 25 L20 38 L26 35 L20 23 L31 23 Z" fill="#fff" stroke="#111" stroke-width="2" stroke-linejoin="round"/></svg>`;
export default [
{
  code: "U501", slug: "notification", name: "إشعار بينزل", tags: ["ui","notification","ios"],
  desc: "إشعار موبايل بينزل من فوق بنطّة، باسم التطبيق والعنوان والرسالة.",
  dur: 3, theme: "dark", params: { app: "4Sale", title: "عرض جديد على إعلانك", body: "حد عرض ٤٢ ألف على العربية", time: "الآن" },
  css: `.nt{position:absolute;top:140px;left:50px;right:50px;background:rgba(245,245,247,.92);color:#111;border-radius:52px;padding:38px 44px;display:flex;gap:30px;align-items:center;box-shadow:0 20px 60px rgba(0,0,0,.35)}
.ic{flex:none;width:120px;height:120px;border-radius:30px;background:var(--accent);color:#fff;font-weight:900;font-size:40px;display:flex;align-items:center;justify-content:center}.tx{flex:1;min-width:0}.tp{display:flex;justify-content:space-between;font-size:34px;color:#666;font-weight:700}.tt{font-size:44px;font-weight:900}.bd{font-size:40px;color:#333}`,
  html: WALL + `<div class="nt" id="n"><div class="ic" data-p="app"></div><div class="tx"><div class="tp"><span data-p="app"></span><span data-p="time"></span></div><div class="tt" data-p="title"></div><div class="bd" data-p="body"></div></div></div>`,
  js: `tl.from("#n",{y:-450,duration:.7,ease:"back.out(1.4)"},.3).to("#n",{scale:1.03,duration:.2,yoyo:true,repeat:1},1.1);`,
  source: HF + " — native-notification-pop / macos-notification",
},
{
  code: "U502", slug: "notification-pile", name: "كومة إشعارات", tags: ["ui","notification","stack"],
  desc: "إشعارات كتير بتنزل ورا بعض وكل واحد بيزق اللي قبله لتحت. إحساس «الطلبات مش بتقف».",
  dur: 4, theme: "dark", params: { items: "طلب جديد #1024|طلب جديد #1025|طلب جديد #1026|طلب جديد #1027|طلب جديد #1028", app: "المتجر" },
  css: `.nt{position:absolute;top:160px;left:60px;right:60px;height:190px;background:rgba(245,245,247,.94);color:#111;border-radius:46px;padding:0 40px;display:flex;gap:28px;align-items:center;box-shadow:0 14px 40px rgba(0,0,0,.3)}.ic{width:100px;height:100px;border-radius:26px;background:var(--accent2)}.tt{font-size:46px;font-weight:900}.ap{font-size:32px;color:#666;font-weight:700}`,
  html: WALL + `<div id="h"></div>`,
  js: `const L=P.items.split("|"),cards=[];L.forEach((t,i)=>{const d=document.createElement("div");d.className="nt";d.innerHTML='<div class="ic"></div><div><div class="ap">'+P.app+'</div><div class="tt">'+t+'</div></div>';$("#h").appendChild(d);cards.push(d);
const s=.3+i*.6;tl.from(d,{y:-400,opacity:0,duration:.5,ease:"back.out(1.5)"},s);for(let k=0;k<i;k++)tl.to(cards[k],{y:(i-k)*215,scale:1-(i-k)*.03,duration:.45,ease:"power3.out"},s);});`,
  source: HF + " — notification-pileup",
},
{
  code: "U503", slug: "chat", name: "محادثة شات", tags: ["ui","chat","messages"],
  desc: "رسايل شات بتظهر ورا بعض، ونقط «بيكتب…» قبل كل رد.",
  dur: 5, params: { msgs: "me:عندك الموديل ده؟|them:أيوه متوفر|me:بكام؟|them:٤٢ ألف بس النهارده" },
  css: `.th{position:absolute;inset:200px 60px;display:flex;flex-direction:column;gap:34px}.bb{max-width:760px;padding:30px 44px;border-radius:50px;font-size:50px;font-weight:700;line-height:1.4}.me{align-self:flex-start;background:var(--accent);color:#fff;border-bottom-right-radius:12px;transform-origin:100% 100%}.them{align-self:flex-end;background:var(--card);border-bottom-left-radius:12px;transform-origin:0% 100%;box-shadow:0 6px 20px rgba(0,0,0,.06)}
.ty{align-self:flex-end;background:var(--card);padding:0 40px;border-radius:50px;display:flex;align-items:center;gap:14px;height:0;overflow:hidden;opacity:0}.ty i{width:22px;height:22px;border-radius:50%;background:#aaa;display:block}`,
  html: `<div class="th" id="th"></div>`,
  js: `const M=P.msgs.split("|");let t=.3;M.forEach((m,i)=>{const [who,txt]=m.split(":");const th=$("#th");
if(who==="them"){const ty=document.createElement("div");ty.className="ty";ty.innerHTML="<i></i><i></i><i></i>";th.appendChild(ty);
tl.to(ty,{height:100,opacity:1,duration:.2},t).to(ty.children,{y:-14,duration:.18,stagger:.08,yoyo:true,repeat:3},t+.05).to(ty,{height:0,opacity:0,duration:.15},t+.7).set(ty,{display:"none"},t+.86);t+=.8;}
const b=document.createElement("div");b.className="bb "+who;b.textContent=txt;th.appendChild(b);tl.from(b,{scale:0,opacity:0,duration:.4,ease:"back.out(2)"},t);t+=.7;});`,
  source: HF + " — chat-thread / typing-indicator",
},
{
  code: "U504", slug: "cursor-click", name: "ماوس بيضغط", tags: ["ui","cursor","click","button"],
  desc: "سهم الماوس بيتحرك للزرار ويضغط، والزرار ينضغط وتطلع منه موجة.",
  dur: 3, params: { label: "اشتري الآن" },
  css: `.btn{position:absolute;left:50%;top:50%;width:640px;height:190px;margin:-95px 0 0 -320px;border-radius:95px;background:var(--accent);color:#fff;font-size:72px;font-weight:900;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 50px rgba(232,87,42,.35)}.rp{position:absolute;left:50%;top:50%;width:200px;height:200px;margin:-100px 0 0 -100px;border-radius:50%;border:8px solid var(--accent);opacity:0}`,
  html: `<div class="rp" id="rp"></div><div class="btn" id="b" data-p="label"></div>` + CURSOR,
  js: `tl.from("#b",{scale:.6,opacity:0,duration:.45,ease:"back.out(2)"},.1)
.fromTo("#cur",{x:900,y:1600},{keyframes:[{x:760,y:1250,duration:.4},{x:560,y:1000,duration:.4}],ease:"power2.inOut"},.4)
.to("#cur",{scale:.82,duration:.1,yoyo:true,repeat:1},1.25).to("#b",{scale:.92,duration:.1,yoyo:true,repeat:1},1.25)
.fromTo("#rp",{scale:.5,opacity:1},{scale:4,opacity:0,duration:.7,ease:"power2.out"},1.3);`,
  source: HF + " — cursor-click-ripple / press-ripple",
},
{
  code: "U505", slug: "search-typing", name: "بحث بيتكتب", tags: ["ui","search","typing"],
  desc: "خانة بحث بتظهر، كلمة البحث بتتكتب، والنتايج تنزل تحتها ورا بعض.",
  dur: 4, params: { query: "شقة للإيجار في المعادي", results: "شقة ٣ غرف – المعادي|شقة مفروشة – دجلة|استوديو – المعادي الجديدة" },
  css: `.sb{position:absolute;top:300px;left:70px;right:70px;height:170px;border-radius:85px;background:var(--card);box-shadow:0 14px 40px rgba(0,0,0,.08);display:flex;align-items:center;padding:0 60px;font-size:52px;font-weight:700;gap:24px}.ic{width:56px;height:56px;border:9px solid var(--muted);border-radius:50%;flex:none}
#q:after{content:"";display:inline-block;width:5px;height:56px;background:var(--accent);vertical-align:middle;margin-right:6px}.rs{position:absolute;left:70px;right:70px;height:180px;border-radius:40px;background:var(--card);display:flex;align-items:center;padding:0 50px;font-size:48px;font-weight:700;gap:30px}.rs i{width:110px;height:110px;border-radius:24px;background:#E3DBCD;flex:none}`,
  html: `<div class="sb" id="sb"><div class="ic"></div><span id="q"></span></div><div id="rs"></div>`,
  js: `const full=Array.from(P.query),o={n:0};tl.from("#sb",{y:-100,opacity:0,duration:.5,ease:"back.out(2)"},.1).to(o,{n:full.length,duration:full.length/16,ease:"none",onUpdate:()=>$("#q").textContent=full.slice(0,Math.round(o.n)).join("")},.5);
const t0=.6+full.length/16;P.results.split("|").forEach((r,i)=>{const d=document.createElement("div");d.className="rs";d.style.top=(560+i*210)+"px";d.innerHTML="<i></i><span>"+r+"</span>";$("#rs").appendChild(d);tl.from(d,{y:60,opacity:0,duration:.4,ease:"power3.out"},t0+i*.15);});`,
  source: HF + " — typed-prompt / input-feedback",
},
{
  code: "U506", slug: "heart-burst", name: "قلب لايك", tags: ["ui","like","heart","burst"],
  desc: "قلب لايك بيتضغط وينفجر منه دواير صغيرة، وعدد اللايكات يزيد.",
  dur: 3, theme: "dark", params: { from: 999, to: 1000 },
  css: `#hw{position:absolute;left:50%;top:44%;width:420px;height:420px;margin:-210px 0 0 -210px}#hw svg{width:100%;height:100%}.pt{position:absolute;left:50%;top:44%;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%}#cnt{position:absolute;left:0;right:0;top:60%;text-align:center;font-size:110px;font-weight:900}`,
  html: `<div id="pts"></div><div id="hw"><svg viewBox="0 0 100 100"><path id="hp" d="M50 88 C20 66 6 50 6 32 C6 18 17 8 30 8 C39 8 46 13 50 20 C54 13 61 8 70 8 C83 8 94 18 94 32 C94 50 80 66 50 88 Z" fill="none" stroke="#fff" stroke-width="6"/></svg></div><div id="cnt"></div>`,
  js: `const C=["#FF3E6C","#FFD84D","#7CFFB2","#FF5A1F"];$("#cnt").textContent=P.from.toLocaleString("en");
for(let i=0;i<12;i++){const d=document.createElement("div");d.className="pt";d.style.background=C[i%4];$("#pts").appendChild(d);const a=i/12*Math.PI*2;
tl.fromTo(d,{x:0,y:0,scale:0},{x:Math.cos(a)*360,y:Math.sin(a)*360,scale:1,duration:.5,ease:"power3.out"},1).to(d,{scale:0,duration:.3},1.4);}
tl.from("#hw",{scale:0,duration:.4,ease:"back.out(2)"},.2).to("#hw",{scale:.8,duration:.12},.8).to("#hp",{fill:"#FF3E6C",stroke:"#FF3E6C",duration:.1},.92).to("#hw",{scale:1.15,duration:.3,ease:"back.out(4)"},.92)
.set("#cnt",{textContent:P.to.toLocaleString("en")},1.1).fromTo("#cnt",{y:30},{y:0,duration:.3,ease:"back.out(3)"},1.1);`,
  source: HF + " — particle-burst / physics-press-reaction",
},
{
  code: "U507", slug: "comment-card", name: "كارت تعليق", tags: ["ui","comment","social-proof"],
  desc: "كارت تعليق من عميل بيطلع بنطّة بالصورة والاسم والكلام وعدد اللايكات.",
  dur: 3.5, params: { name: "سارة أحمد", comment: "أحسن خدمة اتعاملت معاها بجد، والتوصيل كان في نفس اليوم!", likes: "٢٤٥" },
  css: `.cm{position:absolute;left:60px;right:60px;top:700px;background:var(--card);border-radius:48px;padding:50px;box-shadow:0 24px 70px rgba(0,0,0,.12);display:flex;gap:34px}.av{width:140px;height:140px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#F5B921);flex:none}.nm{font-size:46px;font-weight:900}.ct{font-size:46px;font-weight:600;line-height:1.5;margin-top:10px}.lk{margin-top:24px;font-size:38px;font-weight:800;color:var(--accent)}`,
  html: `<div class="cm" id="c"><div class="av"></div><div><div class="nm" data-p="name"></div><div class="ct" data-p="comment" id="t"></div><div class="lk">♥ <span data-p="likes"></span></div></div></div>`,
  js: `const ws=words($("#t"));tl.from("#c",{y:400,opacity:0,rotation:3,duration:.7,ease:"back.out(1.6)"},.2).from(ws,{opacity:0,duration:.2,stagger:.05},.7).from(".lk",{scale:0,duration:.4,ease:"back.out(3)"},1.6);`,
  source: HF + " — yt-comment-card / testimonial-proof-card",
},
{
  code: "U508", slug: "success-check", name: "علامة صح", tags: ["ui","check","success"],
  desc: "دايرة بتترسم وجواها علامة صح، وبعدها كلمة «تم» بتظهر. للتأكيد أو إتمام الطلب.",
  dur: 3, params: { label: "تم الطلب بنجاح" },
  css: `#ck{width:460px;height:460px}`,
  html: `<div class="stage"><svg id="ck" viewBox="0 0 120 120"><circle id="cc" cx="60" cy="60" r="52" fill="none" stroke="var(--accent2)" stroke-width="8" stroke-linecap="round"/><path id="cp" d="M36 62 L53 78 L86 44" fill="none" stroke="var(--accent2)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg><div class="h2" data-p="label" id="l"></div></div>`,
  js: `const c=$("#cc"),p=$("#cp"),Lc=c.getTotalLength(),Lp=p.getTotalLength();c.style.strokeDasharray=Lc;p.style.strokeDasharray=Lp;
tl.fromTo(c,{strokeDashoffset:Lc},{strokeDashoffset:0,duration:.6,ease:"power2.inOut"},.2).fromTo(p,{strokeDashoffset:Lp},{strokeDashoffset:0,duration:.35,ease:"power2.out"},.75)
.to("#ck",{scale:1.12,duration:.15,yoyo:true,repeat:1},1.1).from("#l",{opacity:0,y:40,duration:.5},1.2);`,
  source: HF + " — success-check",
},
{
  code: "U509", slug: "toggle", name: "زرار تبديل", tags: ["ui","toggle","switch"],
  desc: "زرار تبديل (سويتش) بيتحرك من إيقاف لتشغيل، واللون والكلام بيتغيروا معاه.",
  dur: 3, params: { off: "الطريقة القديمة", on: "الطريقة الذكية" },
  css: `.sw{position:relative;width:420px;height:220px;border-radius:110px;background:#CFC6B8}.kn{position:absolute;top:20px;right:20px;width:180px;height:180px;border-radius:50%;background:#fff;box-shadow:0 8px 20px rgba(0,0,0,.2)}.lbs{position:relative;height:150px;width:900px}.lbs div{position:absolute;inset:0;text-align:center}`,
  html: `<div class="stage"><div class="lbs h2"><div id="l1" data-p="off"></div><div id="l2" class="accent" data-p="on"></div></div><div class="sw" id="sw"><div class="kn" id="kn"></div></div></div>`,
  js: `tl.from(".stage",{opacity:0,y:40,duration:.4},.1).set("#l2",{opacity:0,y:40},0)
.to("#kn",{x:-200,duration:.45,ease:"back.inOut(1.4)"},1).to("#sw",{backgroundColor:CSSV("accent"),duration:.3},1.05)
.to("#l1",{opacity:0,y:-40,duration:.3},1.05).to("#l2",{opacity:1,y:0,duration:.35,ease:"back.out(2)"},1.2);`,
  source: HF + " — toggle-flip / settings-toggle-flow",
},
{
  code: "U510", slug: "listing-card", name: "كارت إعلان", tags: ["ui","product","listing","ecommerce"],
  desc: "كارت إعلان/منتج بصورة وعنوان وسعر ومكان، بيطلع لفوق وبعدين بادج «مميز» بيختم عليه.",
  dur: 3.5, params: { title: "تويوتا لاندكروزر ٢٠٢٢", price: "١٢,٥٠٠ د.ك", place: "الكويت · حولي", badge: "مميز" },
  css: `.lc{position:absolute;left:90px;right:90px;top:330px;background:var(--card);border-radius:50px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.14)}.im{height:720px;background:linear-gradient(160deg,#9AA9B8,#4E5D6C)}.in{padding:46px 54px}.tt{font-size:58px;font-weight:900}.pr{font-size:72px;font-weight:900;color:var(--accent);margin:8px 0}.pl{font-size:40px;color:var(--muted);font-weight:700}
.bd{position:absolute;top:50px;right:50px;background:#F5B921;color:#1D1A17;font-size:46px;font-weight:900;padding:12px 40px;border-radius:18px}`,
  html: `<div class="lc" id="c"><div class="im" id="im"></div><div class="in"><div class="tt" data-p="title"></div><div class="pr" data-p="price" id="p"></div><div class="pl" data-p="place"></div></div><div class="bd" id="b" data-p="badge"></div></div>`,
  js: `tl.from("#c",{y:1300,duration:.8,ease:"power4.out"},.1).from("#im",{scale:1.3,duration:1.2,ease:"power2.out"},.1)
.from("#p",{scale:.5,opacity:0,duration:.4,ease:"back.out(3)"},.9).fromTo("#b",{scale:3,opacity:0,rotation:-20},{scale:1,opacity:1,rotation:-6,duration:.35,ease:"power4.in"},1.4)
.to("#c",{x:10,duration:.05,yoyo:true,repeat:3},1.75);`,
  source: "تصميم أصلي (مناسب لإعلانات 4Sale)",
},
{
  code: "U511", slug: "lower-third", name: "اسم ووظيفة (Lower third)", tags: ["ui","lower-third","name"],
  desc: "شريط ملون بيتمد وبعدين الاسم والوظيفة بيطلعوا من ورا ماسك. لأي حد بيتكلم في الفيديو.",
  dur: 4, params: { name: "محمود إسماعيل", role: "Creative Director" },
  css: `.lt{position:absolute;right:70px;bottom:520px;display:flex;align-items:stretch;gap:26px}.lb{width:18px;background:var(--accent);border-radius:9px;transform-origin:50% 100%}.mk{overflow:hidden}.nm{font-size:84px;font-weight:900;color:#fff;line-height:1.25}.rl{font-size:46px;font-weight:700;color:#F5B921}`,
  html: `<div class="photo"><div class="sun"></div><div class="hill1"></div><div class="hill2"></div></div><div class="person"><div class="head"></div><div class="body"></div></div><div class="lt"><div class="lb" id="lb"></div><div><div class="mk"><div class="nm" data-p="name" id="n"></div></div><div class="mk"><div class="rl" data-p="role" id="r"></div></div></div></div>`,
  js: `tl.from("#lb",{scaleY:0,duration:.4,ease:"power3.out"},.3).from("#n",{yPercent:110,duration:.5,ease:"power3.out"},.45).from("#r",{yPercent:110,duration:.5,ease:"power3.out"},.6)
.to("#n,#r",{yPercent:110,duration:.4,ease:"power3.in",stagger:.05},3.2).to("#lb",{scaleY:0,duration:.3},3.5);`,
  source: HF + " — lt-side-rule / lt-mask-reveal",
},
{
  code: "U512", slug: "badge-burst", name: "بادج خصم", tags: ["ui","badge","sale","offer"],
  desc: "بادج دايري بأشعة بتلف وراه بيخبط في الشاشة بخصم كبير ويهتز.",
  dur: 3, params: { top: "خصم", value: "٥٠٪", bottom: "لفترة محدودة" },
  css: `#rays{position:absolute;left:50%;top:50%;width:1400px;height:1400px;margin:-700px 0 0 -700px;border-radius:50%;background:repeating-conic-gradient(rgba(232,87,42,.18) 0 10deg,transparent 10deg 20deg)}#bd{position:absolute;left:50%;top:50%;width:640px;height:640px;margin:-320px 0 0 -320px;border-radius:50%;background:var(--accent);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 30px 80px rgba(232,87,42,.4)}#bd .v{font-size:200px;font-weight:900;line-height:1.1}#bd .t{font-size:70px;font-weight:900}#bd .b{font-size:40px;font-weight:700}`,
  html: `<div id="rays"></div><div id="bd"><div class="t" data-p="top"></div><div class="v" data-p="value"></div><div class="b" data-p="bottom"></div></div>`,
  js: `tl.fromTo("#rays",{rotation:0,scale:0},{rotation:120,scale:1,duration:3,ease:"power1.out"},0)
.fromTo("#bd",{scale:0,rotation:-180},{scale:1,rotation:-8,duration:.6,ease:"back.out(2)"},.2).to("#bd",{rotation:6,duration:.12,yoyo:true,repeat:5,ease:"sine.inOut"},.9);`,
  source: HF + " — badge-pop / sun-burst",
},
];
