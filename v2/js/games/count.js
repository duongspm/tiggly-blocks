/* 6. Đếm số: có mấy hình thì đặt đúng bấy nhiêu khối lên màn hình cùng lúc */
const COUNT_ITEMS=[["🍎","quả táo"],["🐥","chú gà con"],["🐟","con cá"],["🌸","bông hoa"],["🚗","chiếc xe"],["🎈","quả bóng"],["⭐","ngôi sao"],["🍪","cái bánh"]];
const NUMW=["","một","hai","ba","bốn"];
const gCount={
 start(){score=0;st={r:0};this.next()},
 next(){
  if(st.r>=8)return end(`Hoàn thành! ⭐${score}/8`,"Hoàn thành! Giỏi quá!");
  const [e,nm]=rnd(COUNT_ITEMS);
  st.r++;st.n=1+Math.floor(Math.random()*4);st.e=e;st.nm=nm;st.miss=0;st.lock=0;st.wait=announced.size>0;
  if(st.wait){hudSet("Nhấc hết khối ra nhé!");say("Nhấc hết khối ra nhé!")}else this.ask();
 },
 ask(){this.show(0);say(`Có ${NUMW[st.n]} ${st.nm}. Đặt ${NUMW[st.n]} khối lên màn hình`)},
 show(c){
  const items=[...Array(st.n)].map((_,i)=>`<span style="animation-delay:${i*.15}s">${st.e}</span>`).join("");
  hudSet(`<div class="items">${items}</div>Đặt ${st.n} khối! (${st.r}/8) ⭐${score}<div class="dots">${"●".repeat(Math.min(c,st.n))}${"○".repeat(Math.max(0,st.n-c))}</div>`);
 },
 block(){setTimeout(()=>this.check(),150)},
 lift(){setTimeout(()=>this.check(),150)},
 check(){
  if(st.lock||!st.n)return;
  const c=announced.size;
  if(st.wait){if(c===0){st.wait=0;this.ask()}return}
  this.show(c);clearTimeout(st.t);
  if(c===st.n)st.t=setTimeout(()=>{
   if(announced.size!==st.n||st.lock)return;
   st.lock=1;if(!st.miss)score++;ok();say("Đúng rồi! "+NUMW[st.n]);setTimeout(()=>this.next(),1800)},900);
  else if(c>st.n){st.miss=1;no();say("Nhiều quá! Bỏ bớt đi nhé")}
 }
};
