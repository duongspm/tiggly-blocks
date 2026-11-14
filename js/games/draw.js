/* 10. Tạo nhân vật: đặt khối để tạo nhân vật, rồi kéo mắt, mũi, miệng, mũ... vào nhân vật */
const ACC=[ /* [id, tên, rộng, cao, viewBox, svg] */
 ["eyes","Mắt",76,46,"0 0 100 60","<circle cx='28' cy='30' r='20' fill='#fff' stroke='#333' stroke-width='4'/><circle cx='72' cy='30' r='20' fill='#fff' stroke='#333' stroke-width='4'/><circle cx='32' cy='33' r='9' fill='#333'/><circle cx='68' cy='33' r='9' fill='#333'/>"],
 ["nose","Mũi",44,34,"0 0 100 60","<ellipse cx='50' cy='30' rx='30' ry='22' fill='#ff8787' stroke='#c92a2a' stroke-width='4'/><circle cx='40' cy='30' r='5' fill='#c92a2a'/><circle cx='60' cy='30' r='5' fill='#c92a2a'/>"],
 ["mouth","Miệng",64,40,"0 0 100 60","<path d='M8 10q42 62 84 0z' fill='#c92a2a' stroke='#333' stroke-width='4' stroke-linejoin='round'/><path d='M28 34q22 18 44 0' fill='#ff8787'/>"],
 ["smile","Cười",64,28,"0 0 100 40","<path d='M10 8q40 44 80 0' fill='none' stroke='#333' stroke-width='8' stroke-linecap='round'/>"],
 ["hat","Mũ",70,44,"0 0 100 60","<rect x='24' y='4' width='52' height='38' rx='4' fill='#343a40'/><rect x='22' y='28' width='56' height='8' fill='#fa5252'/><rect x='6' y='40' width='88' height='14' rx='7' fill='#343a40'/>"],
 ["bow","Nơ",58,36,"0 0 100 60","<polygon points='50,30 6,4 6,56' fill='#f06595'/><polygon points='50,30 94,4 94,56' fill='#f06595'/><circle cx='50' cy='30' r='10' fill='#c2255c'/>"],
 ["ears","Tai",96,56,"0 0 100 60","<ellipse cx='20' cy='30' rx='14' ry='28' fill='#ffc9c9' stroke='#e03131' stroke-width='4'/><ellipse cx='80' cy='30' rx='14' ry='28' fill='#ffc9c9' stroke='#e03131' stroke-width='4'/>"],
 ["arms","Tay",150,50,"0 0 200 60","<path d='M8 8q-6 36 30 40M192 8q6 36 -30 40' fill='none' stroke='#333' stroke-width='9' stroke-linecap='round'/><circle cx='8' cy='8' r='9' fill='#ffd43b' stroke='#333' stroke-width='3'/><circle cx='192' cy='8' r='9' fill='#ffd43b' stroke='#333' stroke-width='3'/>"],
 ["legs","Chân",110,46,"0 0 100 40","<path d='M26 2v26M74 2v26' stroke='#333' stroke-width='9' stroke-linecap='round'/><ellipse cx='20' cy='34' rx='18' ry='6' fill='#333'/><ellipse cx='80' cy='34' rx='18' ry='6' fill='#333'/>"]
];
const gDraw={
 start(){
  st={ch:[],sel:null,fp:null,target:null};
  hudSet(`Đặt khối để tạo nhân vật!<br><small>Kéo mắt, mũi, miệng vào nhân vật · giữ lâu vào nhân vật để xóa/sửa</small><br><span class="scn"><button onclick="setScene('meadow')">🌳</button><button onclick="setScene('sea')">🌊</button><button onclick="setScene('safari')">🦁</button><button onclick="setScene('sky')">☁️</button></span> <button onclick="gDraw.askClear()">🗑 Xóa tất cả</button>`);
  const tr=document.createElement("div");tr.id="dtray";
  tr.innerHTML=ACC.map(a=>`<button data-a="${a[0]}"><svg viewBox="${a[4]}">${a[5]}</svg><small>${a[1]}</small></button>`).join("");
  tr.addEventListener("pointerdown",e=>{e.stopPropagation();const b=e.target.closest("[data-a]");if(!b)return;e.preventDefault();this.spawn(b.dataset.a,e)});
  board.appendChild(tr);
  const old=document.getElementById("cmenu");if(old)old.remove();
  const cm=this.cm=document.createElement("div");cm.id="cmenu";cm.hidden=true;board.appendChild(cm);
  cm.addEventListener("pointerdown",e=>e.stopPropagation());
  cm.addEventListener("click",e=>{
   const b=e.target.closest("[data-a]");if(!b)return;const a=b.dataset.a,c=cm._c;cm.hidden=true;
   if(a==="del")this.remove(c);else if(a==="edit")this.unfinish(c);else if(a==="all")this.clearAll();
  });
  this.bind();
 },
 /* ---- vị trí: lưu trong el._p và dời bằng translate (mượt, không buộc trình duyệt tính lại bố cục) ---- */
 place(el,x,y){
  x=Math.max(0,Math.min(x,board.clientWidth||9999));y=Math.max(0,Math.min(y,board.clientHeight||9999));
  const o=el._p;el._p={x,y};moveTo(el,x,y);
  if(o&&el.classList.contains("ch")){this.face(el,x-o.x);this.lean(el,x-o.x)}   /* quay mặt + nghiêng người */
 },
 face(c,dx){ /* lật nhân vật và phụ kiện của nó (đổi bên) khi đổi hướng đi */
  c._acc=Math.sign(dx)===Math.sign(c._acc||0)?(c._acc||0)+dx:dx;
  if(Math.abs(c._acc)<10)return;
  const d=c._acc>0?1:-1;if((c._dir||1)===d)return;
  c._dir=d;c.style.scale=`${d} 1`;
  this.parts(c).forEach(a=>{a._ox=-a._ox;a._dir=d;a.style.scale=`${d} 1`});
 },
 pos(el){const p=el._p||{x:0,y:0};return [p.x,p.y]},
 parts(c){return [...board.querySelectorAll(".acc")].filter(a=>a._ch===c)},
 follow(c){ /* phụ kiện đi theo nhân vật, xoay cùng góc nghiêng quanh tâm nhân vật */
  const [cx,cy]=this.pos(c),t=(c._ln||0)*Math.PI/180,co=Math.cos(t),si=Math.sin(t);
  this.parts(c).forEach(a=>{this.place(a,cx+a._ox*co-a._oy*si,cy+a._ox*si+a._oy*co);a.style.rotate=(c._ln||0)+"deg"});
 },
 lean(c,dx){ /* nghiêng tối đa 8° về phía đang đi, rồi thả lỏng dần về thẳng */
  const set=()=>{c.style.rotate=c._ln+"deg";this.follow(c)};
  c._ln=Math.max(-8,Math.min(8,(c._ln||0)*.6+(Math.abs(dx)<1?0:dx*.5)));set();
  clearTimeout(c._lt);
  const relax=()=>{c._ln*=.55;if(Math.abs(c._ln)<.4)c._ln=0;set();if(c._ln)c._lt=setTimeout(relax,40)};
  c._lt=setTimeout(relax,120);
 },
 /* ---- phụ kiện ---- */
 mkAcc(id){
  const a=ACC.find(x=>x[0]===id),el=document.createElement("div");
  el.className="acc";el.dataset.a=id;el.style.cssText=`width:${a[2]}px;height:${a[3]}px;left:0;top:0`;
  el.innerHTML=`<svg viewBox="${a[4]}">${a[5]}</svg>`;
  el.onpointerdown=ev=>{ev.stopPropagation();el.setPointerCapture(ev.pointerId);this.startDrag(el,ev)};
  board.appendChild(el);this.place(el,0,0);return el;
 },
 spawn(id,e){
  const el=this.mkAcc(id),r=board.getBoundingClientRect();
  this.place(el,e.clientX-r.left,e.clientY-r.top);
  el.setPointerCapture(e.pointerId);this.startDrag(el,e);
 },
 /* kéo nhân vật/phụ kiện; với nhân vật: giữ lâu (không kéo) = mở tùy chọn, chạm nhẹ = chọn/tác động */
 startDrag(el,e){
  const r=board.getBoundingClientRect(),[cx,cy]=this.pos(el),ox=cx-(e.clientX-r.left),oy=cy-(e.clientY-r.top),isCh=el.classList.contains("ch");
  let moved=0,lx=e.clientX,ly=e.clientY,lp=0,menu=0,det=0;
  el.style.zIndex=9;
  if(isCh)lp=setTimeout(()=>{lp=0;menu=1;this.menu(el)},600);
  el.onpointermove=m=>{
   moved+=Math.hypot(m.clientX-lx,m.clientY-ly);lx=m.clientX;ly=m.clientY;
   if(menu||moved<=5)return;
   if(lp){clearTimeout(lp);lp=0}
   if(!isCh&&el._ch&&!det){const o=el._ch;el._ch=null;det=1;this.progress(o)}   /* kéo phụ kiện ra khỏi nhân vật */
   this.place(el,m.clientX-r.left+ox,m.clientY-r.top+oy);if(isCh)this.follow(el);
  };
  el.onpointerup=el.onpointercancel=()=>{
   el.onpointermove=el.onpointerup=el.onpointercancel=null;el.style.zIndex="";if(lp)clearTimeout(lp);
   if(menu)return;
   if(isCh){if(moved<=5)this.tap(el)}else this.drop(el);
  };
 },
 drop(el){
  const [x,y]=this.pos(el),tr=document.getElementById("dtray");
  if(tr&&board.clientHeight&&y>board.clientHeight-tr.offsetHeight){el.remove();return}   /* thả xuống khay = bỏ đi */
  const c=st.ch.find(k=>!k._fin&&Math.hypot(this.pos(k)[0]-x,this.pos(k)[1]-y)<95);
  if(!c){el._ch=null;return}
  const [cx,cy]=this.pos(c);el._ch=c;el._ox=x-cx;el._oy=y-cy;el._dir=c._dir||1;el.style.scale=`${el._dir} 1`;
  el._dir=c._dir||1;el.style.scale=`${el._dir} 1`;
  beep(660);
  if(!this.progress(c))say(ACC.find(a=>a[0]===el.dataset.a)[1]);
 },
 /* ---- thanh tiến độ: cho biết khi nào nhân vật hoàn thành ---- */
 progress(c){
  const ty=new Set(this.parts(c).map(a=>a.dataset.a)),have=[ty.has("eyes"),ty.has("nose"),ty.has("mouth")||ty.has("smile")];
  c._ready=have.every(Boolean);
  if(c._fin){c._bar.hidden=true;return false}
  c._bar.hidden=false;
  c._bar.innerHTML=c._ready?`<button class="fin">✅ Hoàn thành</button>`:["👀","👃","👄"].map((e,i)=>`<span class="p${have[i]?" y":""}">${e}</span>`).join("");
  if(c._ready&&!c._said){c._said=1;beep(880);say("Nhân vật xong rồi! Bấm Hoàn thành nhé");return true}
  return false;
 },
 finish(c){ /* bấm Hoàn thành: phụ kiện dính vào nhân vật, nhân vật "sống dậy" và di chuyển được */
  c._fin=1;c._bar.hidden=true;c.classList.add("done");
  this.parts(c).forEach(a=>a.classList.add("locked"));
  this.select(c);ok();say("Hoàn thành! Nhân vật đã sống dậy");this.hop(c);this.parts(c).forEach(a=>this.hop(a));
 },
 unfinish(c){c._fin=0;c.classList.remove("done");this.parts(c).forEach(a=>a.classList.remove("locked"));this.progress(c)},
 select(c){st.sel=c;st.ch.forEach(k=>k.classList.toggle("sel",k===c))},
 hop(e){if(e.animate)e.animate([{transform:"translate(-50%,-50%)"},{transform:"translate(-50%,-85%) scale(1.08)"},{transform:"translate(-50%,-50%)"}],{duration:520,easing:"ease-out"})},
 tap(c){this.select(c);if(c._fin){this.hop(c);this.parts(c).forEach(a=>this.hop(a));beep(SHAPES[c.dataset.t].freq);say("Xin chào!")}},
 /* ---- tùy chọn khi giữ lâu / xóa ---- */
 menu(c){
  const cm=this.cm,[x,y]=this.pos(c);cm._c=c;
  cm.innerHTML=`<b>Nhân vật</b><div><button data-a="del">🗑 Xóa</button>${c._fin?'<button data-a="edit">✏️ Sửa lại</button>':""}<button data-a="x">Đóng</button></div>`;
  cm.style.left=x+"px";cm.style.top=Math.max(110,y-95)+"px";cm.hidden=false;beep(520);
 },
 askClear(){
  if(!st.ch.length)return;const cm=this.cm;cm._c=null;
  cm.innerHTML=`<b>Xóa tất cả nhân vật?</b><div><button data-a="all">🗑 Xóa hết</button><button data-a="x">Không</button></div>`;
  cm.style.left=(board.clientWidth/2)+"px";cm.style.top=(board.clientHeight/2)+"px";cm.hidden=false;
 },
 gone(e){e.classList.add("bye");e.addEventListener("animationend",()=>e.remove(),{once:true})},
 remove(c){this.parts(c).forEach(a=>this.gone(a));this.gone(c);st.ch=st.ch.filter(k=>k!==c);if(st.sel===c)st.sel=null;say("Đã xóa")},
 clearAll(){board.querySelectorAll(".acc").forEach(a=>this.gone(a));st.ch.forEach(c=>this.gone(c));st.ch=[];st.sel=null;say("Đã xóa hết")},
 /* ---- tạo nhân vật khi đặt khối ---- */
 block(t,x,y,n){
  if(!n)return;
  if(st.ch.length>=8){say("Nhiều nhân vật quá, hãy xóa bớt nhé");return}
  const c=document.createElement("div");c.className="ch";c.dataset.t=t;c.innerHTML=svg(t);c.style.cssText="left:0;top:0";
  c.onpointerdown=ev=>{ev.stopPropagation();c.setPointerCapture(ev.pointerId);this.startDrag(c,ev)};
  const bar=document.createElement("div");bar.className="cbar";c.appendChild(bar);c._bar=bar;
  bar.addEventListener("pointerdown",e=>e.stopPropagation());
  bar.addEventListener("click",e=>{if(e.target.closest(".fin"))this.finish(c)});
  board.appendChild(c);this.place(c,x,y);st.ch.push(c);this.progress(c);this.select(c);
  beep(SHAPES[t].freq);say(SHAPES[t].name);
 },
 lift(){},
 /* ---- nhân vật đã hoàn thành đi theo ngón tay: chạm chỗ trống thì nhân vật được chọn đi tới đó ---- */
 bind(){
  if(this.bound)return;this.bound=1;
  const xy=e=>{const r=board.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]};
  board.addEventListener("pointerdown",e=>{
   if(mode!=="draw"||announced.size||pts.size!==1)return;
   const c=st.sel;if(!c||!c._fin)return;
   st.fp=e.pointerId;this.walk(...xy(e));
  });
  board.addEventListener("pointermove",e=>{if(e.pointerId===st.fp)this.walk(...xy(e))});
  ["pointerup","pointercancel"].forEach(n=>window.addEventListener(n,e=>{if(e.pointerId===st.fp)st.fp=null}));
 },
 walk(x,y){
  st.target={x,y};if(this.raf)return;
  const step=()=>{
   const c=st.sel,t=st.target;
   if(!c||!c._fin||!t||mode!=="draw"){this.raf=0;return}
   const [cx,cy]=this.pos(c),dx=t.x-cx,dy=t.y-cy;
   if(Math.hypot(dx,dy)<1){this.raf=0;return}
   this.place(c,cx+dx*.07,cy+dy*.07);this.follow(c);this.raf=requestAnimationFrame(step);
  };
  this.raf=requestAnimationFrame(step);
 }
};
