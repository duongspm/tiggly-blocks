/* 7. Tìm quy luật: dãy hình lặp lại, chọn hình tiếp theo (khó dần theo từng cặp vòng) */
const PAT_LV=[["ABABAB","AABAAB"],["ABBABB","ABCABC"],["AABBAABB","ABCABCAB"],["ABCDABCD","AABCAABC"]];
const gPat={
 start(){score=0;st={r:0};this.next()},
 next(){
  if(st.r>=8)return end(`Hoàn thành! ⭐${score}/8`,"Hoàn thành! Con thật giỏi!");
  const tp=rnd(PAT_LV[Math.floor(st.r/2)]),ty=[...T].sort(()=>Math.random()-.5),map={A:ty[0],B:ty[1],C:ty[2],D:ty[3]};
  st.r++;st.seq=[...tp].map(c=>map[c]);st.ans=st.seq.pop();st.miss=0;st.lock=0;
  this.show(false);say("Hình nào tiếp theo?");
 },
 show(done){
  const row=st.seq.map(t=>`<span class="pit">${svg(t)}</span>`).join("");
  hudSet(`Hình nào tiếp theo? (${st.r}/8) ⭐${score}<div class="pseq">${row}<span class="pit q">${done?svg(st.ans):"?"}</span></div>${st.miss>1?`<small>Gợi ý: ${SHAPES[st.ans].name}</small>`:""}`);
 },
 block(t,x,y,n){
  if(!n||st.lock)return;
  if(t===st.ans){st.lock=1;if(!st.miss)score++;this.show(true);ok();say("Đúng rồi!");setTimeout(()=>this.next(),2000)}
  else{st.miss++;no();say("Chưa đúng, nhìn kỹ lại nhé");this.show(false)}
 },
 lift(){}
};
