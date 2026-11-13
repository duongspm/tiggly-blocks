/* 9. Bóng bay: bóng mang hình bay lên, đặt đúng khối để làm bể; để bay mất thì tính là bỏ lỡ */
const gBalloon={
 start(){score=0;st={sp:0,gone:0,miss:0,combo:0,total:16};this.hud();this.spawn()},
 hud(){hudSet(`🎈 Bể ${score}/${st.total} · Bay mất ${st.miss}<br><small>Đặt khối giống hình trên bóng!</small>`)},
 spawn(){
  if(st.sp>=st.total)return;
  st.sp++;this.make();
  st.t=setTimeout(()=>this.spawn(),Math.max(1100,2000-st.sp*45));
 },
 make(){
  const t=rnd(T),r=board.getBoundingClientRect(),b=document.createElement("div");
  b.className="bal";b.dataset.t=t;
  b.style.cssText=`left:${10+Math.random()*Math.max(0,r.width-110)}px;--c:${SHAPES[t].color};--h:${r.height+220}px;--d:${Math.max(5.5,9-st.sp*.2)}s`;
  b.innerHTML=`<div class="bb">${svg(t)}</div><i></i>`;
  b.addEventListener("animationend",e=>{
   if(e.animationName!=="balrise"||b.classList.contains("pop"))return;
   b.remove();st.gone++;st.miss++;st.combo=0;this.hud();this.chk();
  });
  board.appendChild(b);
 },
 block(t,x,y,n){
  if(!n)return;
  const bs=[...board.querySelectorAll(`.bal[data-t="${t}"]:not(.pop)`)].sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
  if(!bs.length){no();st.combo=0;return}
  const b=bs[0];b.classList.add("pop");score++;st.combo++;
  beep(SHAPES[t].freq*(1+Math.min(st.combo,8)*.08));
  this.hud();
  setTimeout(()=>{b.remove();st.gone++;this.chk()},260);
 },
 lift(){},
 chk(){
  if(st.gone<st.total)return;
  setTimeout(()=>end(`Con làm bể ${score}/${st.total} quả bóng! ${score>=st.total*.7?"🌟":"⭐"}`,`Con làm bể ${score} quả bóng!`),400);
 }
};
