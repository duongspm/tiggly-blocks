/* 3. Ghép tranh: đặt khối vào đúng hình mờ */
/* màn hình chọn tranh */
const donePics=new Set();
try{JSON.parse(localStorage.getItem("tiggly-pics")||"[]").forEach(n=>donePics.add(n))}catch(e){}
const donePic=i=>{donePics.add(PICS[i].n);try{localStorage.setItem("tiggly-pics",JSON.stringify([...donePics]))}catch(e){}};
const galEl=document.createElement("div");galEl.id="gallery";galEl.hidden=true;board.appendChild(galEl);
galEl.addEventListener("pointerdown",e=>e.stopPropagation());
const thumb=P=>{
 const S=110,xs=P.p.map(a=>a[1]),ys=P.p.map(a=>a[2]),mx=Math.min(...xs),my=Math.min(...ys),W=(Math.max(...xs)-mx)*S+96,H=(Math.max(...ys)-my)*S+96;
 return `<svg viewBox="0 0 ${W} ${H}">${P.p.map(([t,x,y])=>`<svg x="${(x-mx)*S}" y="${(y-my)*S}" width="96" height="96" viewBox="0 0 100 100" fill="${SHAPES[t].color}">${SHAPES[t].svg}</svg>`).join("")}</svg>`;
};
function showGallery(){
 galEl.innerHTML=`<h3>Chọn tranh để ghép</h3><div class="gal">${PICS.map((P,i)=>`<button class="card" data-i="${i}">${donePics.has(P.n)?'<em>⭐</em>':""}${thumb(P)}<span>${P.n}</span></button>`).join("")}</div>`;
 galEl.hidden=false;
}
galEl.addEventListener("click",e=>{const b=e.target.closest("[data-i]");if(!b)return;st.i=+b.dataset.i;galEl.hidden=true;gPic.load()});
const PICS=[
 {n:"Ngôi nhà",p:[["triangle",0,-1.1],["square",0,.1],["circle",1.7,-1.3]]},
 {n:"Người tuyết",p:[["circle",0,-1.3],["circle",0,-.1],["circle",0,1.1]]},
 {n:"Tàu hỏa",p:[["square",-1.2,0],["square",0,0],["circle",1.2,0],["triangle",0,-1.2]]},
 {n:"Bầu trời đêm",p:[["circle",1.3,-.9],["star",-1.3,-.9],["star",0,.6]]},
 {n:"Cây thông",p:[["triangle",0,-1.15],["triangle",0,0],["square",0,1.15],["star",1.4,-1.3]]},
 {n:"Chú cá",p:[["circle",-.6,0],["triangle",.7,0],["star",-.6,-1.2],["circle",-1.8,-.6]]},
 {n:"Mặt trời",p:[["circle",0,0],["triangle",0,-1.2],["triangle",1.2,0],["triangle",0,1.2],["triangle",-1.2,0]]},
 {n:"Thuyền buồm",p:[["triangle",0,-1.2],["square",0,0],["circle",-1.2,.8],["circle",1.2,.8],["star",1.3,-1.3]]},
 {n:"Tên lửa",p:[["triangle",0,-1.2],["square",0,0],["star",0,1.2],["triangle",-1.2,.6],["triangle",1.2,.6]]},
 {n:"Bông hoa",p:[["star",0,0],["circle",0,-1.2],["circle",1.2,0],["circle",0,1.2],["circle",-1.2,0]]},
 {n:"Chiếc ô tô",p:[["triangle",0,-1.2],["square",-.6,0],["square",.6,0],["circle",-.6,1.2],["circle",.6,1.2],["star",1.8,0]]},
 {n:"Lâu đài",p:[["triangle",-1.2,-1.2],["triangle",1.2,-1.2],["square",-1.2,0],["square",1.2,0],["star",0,-.6],["circle",0,.6]]},
 {n:"Chú robot",p:[["circle",0,-1.2],["square",0,0],["triangle",-1.2,0],["triangle",1.2,0],["square",-.6,1.2],["square",.6,1.2]]}
];
const gPic={
 start(){st={i:0,left:0};this.menu()},
 menu(){clearTg();hudSet("");st.left=0;showGallery()},
 next(){st.i=(st.i+1)%PICS.length;this.load()},
 load(){
  const P=PICS[st.i%PICS.length],r=board.getBoundingClientRect(),u=Math.max(90,Math.min(140,Math.min(r.width,r.height)/4.2));
  const xs=P.p.map(a=>a[1]),ys=P.p.map(a=>a[2]),cx=(Math.min(...xs)+Math.max(...xs))/2,cy=(Math.min(...ys)+Math.max(...ys))/2;
  clearTg();st.u=u;st.name=P.n;st.left=P.p.length;
  st.tg=P.p.map(([t,dx,dy])=>{
   const x=r.width/2+(dx-cx)*u,y=r.height/2+(dy-cy)*u,e=document.createElement("div");
   e.className="tg";e.style.cssText=`width:${u}px;height:${u}px;left:${x}px;top:${y}px`;e.innerHTML=svgO(t);board.appendChild(e);
   return{t,e,x,y,done:0}});
  hudSet(`Ghép tranh: ${P.n} (${st.i%PICS.length+1}/${PICS.length})<br><button onclick="gPic.menu()">📋 Chọn tranh</button><br>Đặt khối vào đúng hình mờ`);say("Ghép "+P.n)},
 block(t,x,y,n){
  if(!st.left)return;
  const near=a=>!a.done&&Math.hypot(a.x-x,a.y-y)<st.u*.6,g=st.tg.find(a=>near(a)&&a.t===t);
  if(g){
   g.done=1;g.e.innerHTML=svg(t);g.e.classList.add("done");beep(SHAPES[t].freq*1.5);
   if(--st.left===0){ok();say("Hoàn thành! "+st.name);hudSet(`🎉 ${st.name} hoàn thành!`);donePic(st.i%PICS.length);setTimeout(()=>hudSet(`🎉 ${st.name}!<br><button onclick="gPic.next()">Tranh tiếp theo ▶</button> <button onclick="gPic.menu()">📋 Chọn tranh</button>`),1600)}
  }else if(n&&st.tg.some(a=>near(a)&&a.t!==t))no();
 },
 lift(){}
};

