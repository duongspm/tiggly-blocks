/* 5. Tiggly Safari: ghép khối thành con vật sống động */
const found=new Set();
try{JSON.parse(localStorage.getItem("tiggly-found")||"[]").forEach(k=>found.add(k))}catch(e){}
const ANI={
 "circle,triangle":{n:"Con cá",e:"🐟",c:"fish",say:"Con cá! Bơi bơi bơi",fx:[[660,0],[880,130],[700,260]],
  svg:"<g class='tail'><polygon points='148,100 196,64 196,136' fill='#fab005'/></g><circle cx='98' cy='100' r='56' fill='#ff922b'/><path d='M66 74q32-28 64 0' stroke='#ffd8a8' stroke-width='8' fill='none' stroke-linecap='round'/><g class='blink'><circle cx='76' cy='94' r='11' fill='#fff'/><circle cx='79' cy='94' r='5' fill='#333'/></g><path d='M62 120q14 12 28 0' stroke='#333' stroke-width='4' fill='none' stroke-linecap='round'/><circle class='bub' cx='34' cy='70' r='7' fill='none' stroke='#74c0fc' stroke-width='3'/><circle class='bub' cx='48' cy='48' r='5' fill='none' stroke='#74c0fc' stroke-width='3' style='animation-delay:.8s'/>"},
 "square,triangle":{n:"Con mèo",e:"🐱",c:"cat",say:"Con mèo! Meo meo",fx:[[820,0],[560,180]],
  svg:"<polygon points='50,78 52,22 98,66' fill='#ffa94d'/><polygon points='150,78 148,22 102,66' fill='#ffa94d'/><polygon points='58,66 60,40 80,62' fill='#ffc9c9'/><polygon points='142,66 140,40 120,62' fill='#ffc9c9'/><rect x='40' y='62' width='120' height='112' rx='22' fill='#ffc078'/><g class='blink'><circle cx='74' cy='106' r='12' fill='#fff'/><circle cx='76' cy='106' r='6' fill='#333'/></g><g class='blink'><circle cx='126' cy='106' r='12' fill='#fff'/><circle cx='124' cy='106' r='6' fill='#333'/></g><polygon points='92,126 108,126 100,136' fill='#f06595'/><path d='M100 136q-10 12-20 4M100 136q10 12 20 4' stroke='#333' stroke-width='4' fill='none' stroke-linecap='round'/><path d='M40 124l-30-6M40 134l-30 6M160 124l30-6M160 134l30 6' stroke='#333' stroke-width='3' stroke-linecap='round'/>"},
 "circle,square":{n:"Con rùa",e:"🐢",c:"turtle",say:"Con rùa! Chậm rì rì",fx:[[220,0],[196,300]],
  svg:"<g class='head'><rect x='140' y='82' width='52' height='46' rx='14' fill='#8ce99a'/><circle cx='176' cy='98' r='6' fill='#fff'/><circle cx='178' cy='98' r='3' fill='#333'/><path d='M160 116q10 8 22 0' stroke='#333' stroke-width='3' fill='none' stroke-linecap='round'/></g><rect x='52' y='140' width='30' height='34' rx='8' fill='#8ce99a'/><rect x='112' y='140' width='30' height='34' rx='8' fill='#8ce99a'/><circle cx='96' cy='108' r='62' fill='#40c057'/><circle cx='96' cy='108' r='40' fill='none' stroke='#2f9e44' stroke-width='6'/><path d='M96 68v80M56 108h80' stroke='#2f9e44' stroke-width='5'/>"},
 "circle,square,triangle":{n:"Gà con",e:"🐥",c:"chick",say:"Gà con! Chíp chíp chíp",fx:[[1500,0],[1700,140],[1500,280]],
  svg:"<ellipse cx='50' cy='104' rx='12' ry='22' fill='#fcc419'/><ellipse cx='150' cy='104' rx='12' ry='22' fill='#fcc419'/><circle cx='100' cy='92' r='52' fill='#ffd43b'/><path d='M92 44q-4-20 8-22 12 2 8 22' fill='none' stroke='#fab005' stroke-width='5' stroke-linecap='round'/><g class='blink'><circle cx='80' cy='86' r='10' fill='#fff'/><circle cx='82' cy='86' r='5' fill='#333'/></g><g class='blink'><circle cx='120' cy='86' r='10' fill='#fff'/><circle cx='118' cy='86' r='5' fill='#333'/></g><polygon points='88,104 112,104 100,124' fill='#ff922b'/><rect x='34' y='128' width='132' height='56' rx='14' fill='#d9a066'/><path d='M50 146h100M50 164h100' stroke='#b8803f' stroke-width='4'/>"},
 "circle,star":{n:"Sao biển",e:"⭐",c:"star",say:"Sao biển! Lấp lánh",fx:[[880,0],[1100,150],[1320,300]],
  svg:"<polygon points='100,16 123,72 184,76 137,114 152,174 100,142 48,174 63,114 16,76 77,72' fill='#ff8787' stroke='#fa5252' stroke-width='8' stroke-linejoin='round'/><g class='blink'><circle cx='84' cy='98' r='9' fill='#fff'/><circle cx='86' cy='98' r='4' fill='#333'/></g><g class='blink'><circle cx='116' cy='98' r='9' fill='#fff'/><circle cx='114' cy='98' r='4' fill='#333'/></g><path d='M86 120q14 12 28 0' stroke='#333' stroke-width='4' fill='none' stroke-linecap='round'/><circle class='bub' cx='176' cy='44' r='9' fill='none' stroke='#74c0fc' stroke-width='3'/>"},
 "square,star":{n:"Con cua",e:"🦀",c:"crab",say:"Con cua! Đi ngang ngang",fx:[[500,0],[500,120],[500,240]],
  svg:"<path d='M52 100L34 84M148 100L166 84M50 130l-26 18M54 146l-24 28M150 130l26 18M146 146l24 28' stroke='#fa5252' stroke-width='9' stroke-linecap='round'/><circle cx='30' cy='72' r='22' fill='#fa5252'/><circle cx='170' cy='72' r='22' fill='#fa5252'/><rect x='45' y='88' width='110' height='72' rx='30' fill='#ff6b6b'/><path d='M80 90V66M120 90V66' stroke='#ff6b6b' stroke-width='8'/><g class='blink'><circle cx='80' cy='60' r='12' fill='#fff'/><circle cx='80' cy='60' r='5' fill='#333'/></g><g class='blink'><circle cx='120' cy='60' r='12' fill='#fff'/><circle cx='120' cy='60' r='5' fill='#333'/></g><path d='M84 128q16 14 32 0' stroke='#333' stroke-width='4' fill='none' stroke-linecap='round'/>"},
 "star,triangle":{n:"Con bướm",e:"🦋",c:"butterfly",say:"Con bướm! Vỗ cánh bay bay",fx:[[1200,0],[1500,120],[1200,240]],
  svg:"<g class='wings'><polygon points='100,100 20,30 30,100' fill='#74c0fc'/><polygon points='100,100 180,30 170,100' fill='#74c0fc'/><polygon points='100,100 30,100 50,170' fill='#da77f2'/><polygon points='100,100 170,100 150,170' fill='#da77f2'/><circle cx='56' cy='70' r='9' fill='#fff' opacity='.7'/><circle cx='144' cy='70' r='9' fill='#fff' opacity='.7'/></g><ellipse cx='100' cy='105' rx='9' ry='42' fill='#5c3d2e'/><circle cx='100' cy='60' r='11' fill='#5c3d2e'/><path d='M96 52q-8-22-20-24M104 52q8-22 20-24' stroke='#5c3d2e' stroke-width='4' fill='none' stroke-linecap='round'/>"},
 "circle,square,star":{n:"Con ếch",e:"🐸",c:"frog",say:"Con ếch! Ộp ộp",fx:[[250,0],[350,140]],
  svg:"<circle cx='62' cy='62' r='24' fill='#51cf66'/><circle cx='138' cy='62' r='24' fill='#51cf66'/><rect x='30' y='70' width='140' height='100' rx='44' fill='#40c057'/><g class='blink'><circle cx='62' cy='62' r='14' fill='#fff'/><circle cx='64' cy='62' r='7' fill='#333'/></g><g class='blink'><circle cx='138' cy='62' r='14' fill='#fff'/><circle cx='136' cy='62' r='7' fill='#333'/></g><polygon points='100,70 104,82 117,82 107,90 111,102 100,95 89,102 93,90 83,82 96,82' fill='#ffd43b'/><path d='M62 128q38 32 76 0' stroke='#2b8a3e' stroke-width='6' fill='none' stroke-linecap='round'/><circle cx='52' cy='116' r='9' fill='#ffa8a8' opacity='.7'/><circle cx='148' cy='116' r='9' fill='#ffa8a8' opacity='.7'/>"},
 "circle,star,triangle":{n:"Chim cánh cụt",e:"🐧",c:"penguin",say:"Chim cánh cụt! Lon ton lon ton",fx:[[700,0],[900,150],[700,300]],
  svg:"<ellipse cx='40' cy='118' rx='12' ry='34' fill='#212529' transform='rotate(14 40 118)'/><ellipse cx='160' cy='118' rx='12' ry='34' fill='#212529' transform='rotate(-14 160 118)'/><ellipse cx='72' cy='182' rx='20' ry='8' fill='#ff922b'/><ellipse cx='128' cy='182' rx='20' ry='8' fill='#ff922b'/><ellipse cx='100' cy='110' rx='58' ry='72' fill='#343a40'/><ellipse cx='100' cy='125' rx='38' ry='52' fill='#f8f9fa'/><g class='blink'><circle cx='82' cy='78' r='10' fill='#fff'/><circle cx='84' cy='78' r='5' fill='#333'/></g><g class='blink'><circle cx='118' cy='78' r='10' fill='#fff'/><circle cx='116' cy='78' r='5' fill='#333'/></g><polygon points='88,92 112,92 100,108' fill='#ff922b'/><polygon points='100,126 104,136 115,136 106,143 110,154 100,147 90,154 94,143 85,136 96,136' fill='#4dabf7'/>"},
 "square,star,triangle":{n:"Sư tử",e:"🦁",c:"lion",say:"Sư tử! Gầm gừm",fx:[[150,0],[110,250]],
  svg:"<polygon points='100,4 124,62 190,66 138,106 156,172 100,134 44,172 62,106 10,66 76,62' fill='#f59f00'/><polygon points='60,66 56,40 82,58' fill='#ffd43b'/><polygon points='140,66 144,40 118,58' fill='#ffd43b'/><rect x='56' y='62' width='88' height='84' rx='20' fill='#ffd43b'/><g class='blink'><circle cx='82' cy='96' r='9' fill='#fff'/><circle cx='84' cy='96' r='4' fill='#333'/></g><g class='blink'><circle cx='118' cy='96' r='9' fill='#fff'/><circle cx='116' cy='96' r='4' fill='#333'/></g><polygon points='92,112 108,112 100,122' fill='#e8590c'/><path d='M100 122q-8 12-18 6M100 122q8 12 18 6' stroke='#333' stroke-width='4' fill='none' stroke-linecap='round'/>"},
 "circle,square,star,triangle":{n:"Con voi",e:"🐘",c:"elephant",say:"Con voi! Pao pao",fx:[[330,0],[520,160],[420,320]],
  svg:"<circle cx='42' cy='88' r='36' fill='#ced4da'/><circle cx='158' cy='88' r='36' fill='#ced4da'/><circle cx='100' cy='88' r='58' fill='#adb5bd'/><g class='trunk'><path d='M100 112v52q0 20 20 16' stroke='#adb5bd' stroke-width='26' fill='none' stroke-linecap='round'/></g><polygon points='78,128 70,160 90,142' fill='#fff'/><polygon points='122,128 130,160 110,142' fill='#fff'/><g class='blink'><circle cx='78' cy='82' r='9' fill='#fff'/><circle cx='80' cy='82' r='4' fill='#333'/></g><g class='blink'><circle cx='122' cy='82' r='9' fill='#fff'/><circle cx='120' cy='82' r='4' fill='#333'/></g><polygon points='100,36 104,46 115,46 106,53 110,64 100,57 90,64 94,53 85,46 96,46' fill='#4dabf7'/>"}
};
/* Phân loại theo nơi sống: dưới biển / trên cạn / trên trời */
const HAB={"circle,triangle":"sea","square,star":"sea","circle,star":"sea","star,triangle":"sky"}; /* còn lại: trên cạn */
const habOf=k=>HAB[k]||"land";
const HABN={sea:"🌊 Dưới biển",land:"🌳 Trên cạn",sky:"☁️ Trên trời"};
const SCENE_HAB={sea:"sea",land:"safari",sky:"sky"};
const albumHtml=()=>`<div class="album">${Object.keys(HABN).map(h=>`<b>${HABN[h].slice(0,2)}</b>`+Object.entries(ANI).filter(([k])=>habOf(k)===h).map(([k,a])=>`<span data-k="${k}" class="${found.has(k)?"":"lock"}">${a.e}</span>`).join("")).join("")}</div>`;
const tipEl=document.createElement("div");tipEl.id="tip";tipEl.hidden=true;board.appendChild(tipEl);
function showTip(k){
 const a=ANI[k];if(!a)return;
 tipEl.innerHTML=`<b>${a.e} ${a.n}</b><div class="tshapes">${k.split(",").map(t=>`<span class="tsh">${svg(t)}<small>${SHAPES[t].name.replace("hình ","")}</small></span>`).join("<i>+</i>")}</div><small>Sống ở: ${HABN[habOf(k)]}</small><br><small>Gợi ý: đặt các khối này cùng lúc nhé!</small><button>Đã hiểu</button>`;
 tipEl.hidden=false;
}
hud.addEventListener("pointerdown",e=>e.stopPropagation());
hud.addEventListener("click",e=>{const s=e.target.closest("[data-k]");if(s)showTip(s.dataset.k)});
tipEl.addEventListener("pointerdown",e=>e.stopPropagation());
tipEl.addEventListener("click",e=>{if(e.target.tagName==="BUTTON")tipEl.hidden=true});
ANI["circle,triangle"].face=-1; /* con cá được vẽ nhìn sang trái */
const gSaf={
 start(){
  st={list:[],sel:null,prov:null,cur:"",n:0,fp:null,target:null};
  const old=document.getElementById("cmenu");if(old)old.remove();
  const cm=this.cm=document.createElement("div");cm.id="cmenu";cm.hidden=true;board.appendChild(cm);
  cm.addEventListener("pointerdown",e=>e.stopPropagation());
  cm.addEventListener("click",e=>{
   const b=e.target.closest("[data-a]");if(!b)return;const a=b.dataset.a,x=cm._c;cm.hidden=true;
   if(a==="del")this.remove(x);else if(a==="all")this.clearAll();
  });
  this.bind();this.hud();
 },
 hud(t){hudSet((t||"Đặt các khối lên để tạo con vật!")+(st.list.length?`<br><button onclick="gSaf.askClear()">🗑 Xóa tất cả</button>`:"")+albumHtml())},
 place(el,x,y){
  x=Math.max(0,Math.min(x,board.clientWidth||9999));y=Math.max(0,Math.min(y,board.clientHeight||9999));
  const o=el._p;el._p={x,y};moveTo(el,x,y);
  if(o){this.face(el,x-o.x);this.lean(el,x-o.x)}        /* quay mặt + nghiêng người theo hướng đi */
 },
 face(e,dx){ /* đi sang phải/trái đủ ~10px thì lật con vật; ANI[..].face = hướng nhìn của hình vẽ gốc (mặc định 1 = nhìn phải) */
  e._acc=Math.sign(dx)===Math.sign(e._acc||0)?(e._acc||0)+dx:dx;
  if(Math.abs(e._acc)<10)return;
  const d=e._acc>0?1:-1;if(e._dir===d)return;
  e._dir=d;e.style.scale=`${d*(ANI[e._k].face||1)} 1`;
 },
 lean(e,dx){ /* nghiêng tối đa 8° về phía đang đi, rồi thả lỏng dần về thẳng */
  const set=()=>{e.style.rotate=e._ln+"deg"};
  e._ln=Math.max(-8,Math.min(8,(e._ln||0)*.6+(Math.abs(dx)<1?0:dx*.5)));set();
  clearTimeout(e._lt);
  const relax=()=>{e._ln*=.55;if(Math.abs(e._ln)<.4)e._ln=0;set();if(e._ln)e._lt=setTimeout(relax,40)};
  e._lt=setTimeout(relax,120);
 },
 pos(el){const p=el._p||{x:0,y:0};return [p.x,p.y]},
 sound(k){const a=ANI[k];a.fx.forEach(([f,d])=>setTimeout(()=>beep(f),d));say(a.say)},
 block(t,x,y,n){if(n)setTimeout(()=>this.check(),150)},
 lift(){setTimeout(()=>this.check(),150)},
 check(){
  const vs=[...announced.values()],ty=[...new Set(vs.map(v=>v.t))].sort(),k=ty.join(",");
  if(k===st.cur)return;
  st.cur=k;if(!ty.length)return;                           /* nhấc khối ra: các con vật vẫn ở lại */
  const a=ANI[k];
  if(!a){if(!st.prov&&!st.list.length)this.hud(ty.length===1?"Thêm một khối nữa nhé!":"");return}
  if(st.prov&&st.prov._k===k){this.sound(k);return}        /* đặt lại đúng tổ hợp đang ghép: chỉ kêu lại */
  if(st.list.length-(st.prov?1:0)>=6){say("Nhiều con vật quá, hãy xóa bớt nhé");return}
  if(st.prov)this.remove(st.prov,true);                    /* con đang ghép dở bị thay bằng con mới */
  tipEl.hidden=true;
  const r=board.getBoundingClientRect(),cy=vs.reduce((s,v)=>s+v.y,0)/vs.length,sz=Math.max(140,Math.min(260,Math.min(r.width,r.height)*.45));
  const e=document.createElement("div");e.className="animal";e._k=k;e._fin=0;
  e.style.cssText=`width:${sz}px;height:${sz}px;left:0;top:0`;
  e.innerHTML=`<svg viewBox='0 0 200 200' class='an-${a.c}'>${a.svg}</svg>`;
  const bar=document.createElement("div");bar.className="cbar";bar.innerHTML=`<button class="fin">✅ Hoàn thành</button>`;e.appendChild(bar);e._bar=bar;
  bar.addEventListener("pointerdown",ev=>ev.stopPropagation());
  bar.addEventListener("click",ev=>{if(ev.target.closest(".fin"))this.finish(e)});
  e.onpointerdown=ev=>{ev.stopPropagation();e.setPointerCapture(ev.pointerId);this.startDrag(e,ev)};
  board.appendChild(e);
  this.place(e,r.width*[.5,.25,.75][st.n++%3],cy>r.height/2?r.height*.38:r.height*.68);
  st.list.push(e);st.prov=e;this.select(e);
  this.sound(k);setScene(SCENE_HAB[habOf(k)]);
  const isNew=!found.has(k);found.add(k);
  try{localStorage.setItem("tiggly-found",JSON.stringify([...found]))}catch(er){}
  this.hud(`${a.n} ${a.e}${isNew?" – mới!":""}<br><small>Ghép xong thì bấm ✅ Hoàn thành nhé</small>`);
 },
 finish(e){ /* bấm Hoàn thành: con vật "sống dậy", di chuyển được */
  const a=ANI[e._k];e._fin=1;e._bar.hidden=true;e.classList.add("done");if(st.prov===e)st.prov=null;
  this.select(e);ok();say("Hoàn thành! "+a.n+" đã sống dậy");this.hop(e);
  this.hud(`${a.n} ${a.e} đã sống dậy!<br><small>Chạm, kéo con vật hoặc chạm chỗ trống để nó đi tới</small>`);
 },
 select(e){st.sel=e;st.list.forEach(k=>k.classList.toggle("sel",k===e))},
 hop(e){if(e.animate)e.animate([{transform:"translate(-50%,-50%)"},{transform:"translate(-50%,-85%) scale(1.08)"},{transform:"translate(-50%,-50%)"}],{duration:520,easing:"ease-out"})},
 tap(e){this.select(e);if(e._fin){this.hop(e);this.sound(e._k)}},   /* chạm vào con vật đã xong: nhảy + kêu, KHÔNG hiện gợi ý */
 /* kéo con vật; giữ lâu (không kéo) = mở tùy chọn; chạm nhẹ = chọn/tác động */
 startDrag(el,e){
  const r=board.getBoundingClientRect(),[cx,cy]=this.pos(el),ox=cx-(e.clientX-r.left),oy=cy-(e.clientY-r.top);
  let moved=0,lx=e.clientX,ly=e.clientY,menu=0,lp=setTimeout(()=>{lp=0;menu=1;this.menu(el)},600);
  el.style.zIndex=9;
  el.onpointermove=m=>{
   moved+=Math.hypot(m.clientX-lx,m.clientY-ly);lx=m.clientX;ly=m.clientY;
   if(menu||moved<=5)return;
   if(lp){clearTimeout(lp);lp=0}
   this.place(el,m.clientX-r.left+ox,m.clientY-r.top+oy);
  };
  el.onpointerup=el.onpointercancel=()=>{
   el.onpointermove=el.onpointerup=el.onpointercancel=null;el.style.zIndex="";if(lp)clearTimeout(lp);
   if(!menu&&moved<=5)this.tap(el);
  };
 },
 /* tùy chọn khi giữ lâu / xóa */
 menu(e){
  const cm=this.cm,a=ANI[e._k],[x,y]=this.pos(e);cm._c=e;
  cm.innerHTML=`<b>${a.e} ${a.n}</b><div><button data-a="del">🗑 Xóa</button><button data-a="x">Đóng</button></div>`;
  cm.style.left=x+"px";cm.style.top=Math.max(110,y-110)+"px";cm.hidden=false;beep(520);
 },
 askClear(){
  if(!st.list.length)return;const cm=this.cm;cm._c=null;
  cm.innerHTML=`<b>Xóa tất cả con vật?</b><div><button data-a="all">🗑 Xóa hết</button><button data-a="x">Không</button></div>`;
  cm.style.left=(board.clientWidth/2)+"px";cm.style.top=(board.clientHeight/2)+"px";cm.hidden=false;
 },
 gone(e){e.classList.remove("sel");e.classList.add("bye");if(e._bar)e._bar.hidden=true;e.onpointerdown=null;e.addEventListener("animationend",()=>e.remove(),{once:true})},
 remove(e,quiet){
  this.gone(e);st.list=st.list.filter(k=>k!==e);if(st.prov===e)st.prov=null;if(st.sel===e)st.sel=null;
  if(!quiet){say("Đã xóa");this.hud()}
 },
 clearAll(){st.list.forEach(e=>this.gone(e));st.list=[];st.prov=null;st.sel=null;say("Đã xóa hết");this.hud()},
 /* con vật đã hoàn thành đi theo ngón tay: chạm chỗ trống thì con vật đang chọn đi tới đó */
 bind(){
  if(this.bound)return;this.bound=1;
  const xy=e=>{const r=board.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]};
  board.addEventListener("pointerdown",e=>{
   if(mode!=="saf"||announced.size||pts.size!==1)return;
   const a=st.sel;if(!a||!a._fin)return;
   st.fp=e.pointerId;this.walk(...xy(e));
  });
  board.addEventListener("pointermove",e=>{if(e.pointerId===st.fp)this.walk(...xy(e))});
  ["pointerup","pointercancel"].forEach(n=>window.addEventListener(n,e=>{if(e.pointerId===st.fp)st.fp=null}));
 },
 walk(x,y){
  st.target={x,y};if(this.raf)return;
  const step=()=>{
   const a=st.sel,t=st.target;
   if(!a||!a._fin||!t||mode!=="saf"){this.raf=0;return}
   const [cx,cy]=this.pos(a),dx=t.x-cx,dy=t.y-cy;
   if(Math.hypot(dx,dy)<1){this.raf=0;return}
   this.place(a,cx+dx*.07,cy+dy*.07);this.raf=requestAnimationFrame(step);
  };
  this.raf=requestAnimationFrame(step);
 }
};
