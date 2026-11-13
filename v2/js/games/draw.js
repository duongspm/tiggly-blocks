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
  st={ch:[]};
  hudSet(`Đặt khối để tạo nhân vật!<br><small>Rồi kéo mắt, mũi, miệng vào nhân vật nhé</small><br><span class="scn"><button onclick="setScene('meadow')">🌳</button><button onclick="setScene('sea')">🌊</button><button onclick="setScene('safari')">🦁</button><button onclick="setScene('sky')">☁️</button></span> <button onclick="gDraw.reset()">🗑 Làm lại</button>`);
  const tr=document.createElement("div");tr.id="dtray";
  tr.innerHTML=ACC.map(a=>`<button data-a="${a[0]}"><svg viewBox="${a[4]}">${a[5]}</svg><small>${a[1]}</small></button>`).join("");
  tr.addEventListener("pointerdown",e=>{e.stopPropagation();const b=e.target.closest("[data-a]");if(!b)return;e.preventDefault();this.spawn(b.dataset.a,e)});
  board.appendChild(tr);
 },
 reset(){board.querySelectorAll(".ch,.acc").forEach(e=>e.remove());st.ch=[]},
 place(el,x,y){el.style.left=Math.max(0,Math.min(x,board.clientWidth||9999))+"px";el.style.top=Math.max(0,Math.min(y,board.clientHeight||9999))+"px"},
 pos(el){return [parseFloat(el.style.left)||0,parseFloat(el.style.top)||0]},
 mkAcc(id){
  const a=ACC.find(x=>x[0]===id),el=document.createElement("div");
  el.className="acc";el.dataset.a=id;el.style.width=a[2]+"px";el.style.height=a[3]+"px";
  el.innerHTML=`<svg viewBox="${a[4]}">${a[5]}</svg>`;
  el.onpointerdown=ev=>{ev.stopPropagation();el.setPointerCapture(ev.pointerId);this.startDrag(el,ev)};
  board.appendChild(el);return el;
 },
 spawn(id,e){
  const el=this.mkAcc(id),r=board.getBoundingClientRect();
  this.place(el,e.clientX-r.left,e.clientY-r.top);
  el.setPointerCapture(e.pointerId);this.startDrag(el,e);
 },
 startDrag(el,e){
  const r=board.getBoundingClientRect(),[cx,cy]=this.pos(el),ox=cx-(e.clientX-r.left),oy=cy-(e.clientY-r.top);
  el.style.zIndex=9;
  el.onpointermove=m=>{this.place(el,m.clientX-r.left+ox,m.clientY-r.top+oy);if(el.classList.contains("ch"))this.follow(el)};
  el.onpointerup=el.onpointercancel=()=>{el.onpointermove=el.onpointerup=el.onpointercancel=null;el.style.zIndex="";this.drop(el)};
 },
 follow(c){const [cx,cy]=this.pos(c);board.querySelectorAll(".acc").forEach(a=>{if(a._ch===c)this.place(a,cx+a._ox,cy+a._oy)})},
 drop(el){
  if(el.classList.contains("ch"))return;
  const [x,y]=this.pos(el),tr=document.getElementById("dtray");
  if(tr&&board.clientHeight&&y>board.clientHeight-tr.offsetHeight){el.remove();return}  /* thả xuống khay = bỏ đi */
  const c=st.ch.find(k=>{const [cx,cy]=this.pos(k);return Math.hypot(cx-x,cy-y)<95});
  if(!c){el._ch=null;return}
  const [cx,cy]=this.pos(c);el._ch=c;el._ox=x-cx;el._oy=y-cy;
  beep(660);this.check(c,el);
 },
 check(c,el){
  const ty=new Set([...board.querySelectorAll(".acc")].filter(a=>a._ch===c).map(a=>a.dataset.a));
  if(!c._done&&ty.has("eyes")&&ty.has("nose")&&(ty.has("mouth")||ty.has("smile"))){
   c._done=1;ok();say("Nhân vật "+SHAPES[c.dataset.t].name.replace("hình ","")+" xinh xắn quá!");
  }else say(ACC.find(a=>a[0]===el.dataset.a)[1]);
 },
 block(t,x,y,n){
  if(!n)return;
  if(st.ch.length>=6){const o=st.ch.shift();board.querySelectorAll(".acc").forEach(a=>{if(a._ch===o)a.remove()});o.remove()}
  const c=document.createElement("div");c.className="ch";c.dataset.t=t;c.innerHTML=svg(t);
  c.onpointerdown=ev=>{ev.stopPropagation();c.setPointerCapture(ev.pointerId);this.startDrag(c,ev)};
  board.appendChild(c);this.place(c,x,y);st.ch.push(c);
  beep(SHAPES[t].freq);say(SHAPES[t].name);
 },
 lift(){}
};
