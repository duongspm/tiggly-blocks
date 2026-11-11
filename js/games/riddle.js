/* 8. Câu đố hình: đoán hình qua số cạnh, số góc, đồ vật quen thuộc; sai thì có gợi ý */
const RIDDLES=[
 ["Mình có 3 cạnh, giống mái nhà. Mình là hình gì?","triangle","có 3 cạnh và 3 góc"],
 ["Mình tròn như mặt trời, không có góc nào. Mình là hình gì?","circle","không có góc nào"],
 ["Mình có 4 cạnh bằng nhau, giống ô cửa sổ. Mình là hình gì?","square","có 4 cạnh bằng nhau"],
 ["Mình lấp lánh trên bầu trời đêm. Mình là hình gì?","star","có 5 đỉnh nhọn"],
 ["Mình lăn được như bánh xe. Mình là hình gì?","circle","tròn, không có góc"],
 ["Mình có 3 góc nhọn, giống chiếc mũ sinh nhật. Mình là hình gì?","triangle","có 3 góc nhọn"],
 ["Mình giống chiếc hộp quà, có 4 góc vuông. Mình là hình gì?","square","có 4 góc vuông"],
 ["Mình có nhiều đỉnh nhọn như sao biển. Mình là hình gì?","star","có 5 đỉnh nhọn"],
 ["Hình nào có đúng 4 cạnh?","square","có 4 cạnh"],
 ["Hình nào không có cạnh nào cả?","circle","cong tròn"],
 ["Hình nào có đúng 3 cạnh?","triangle","có 3 cạnh"],
 ["Hình nào có 5 cánh nhọn?","star","giống ngôi sao"]
];
const gRiddle={
 start(){score=0;st={r:0,q:[...RIDDLES].sort(()=>Math.random()-.5)};this.next()},
 next(){
  if(st.r>=8)return end(`Hoàn thành! ⭐${score}/8`,"Hoàn thành! Con giải đố giỏi lắm!");
  st.cur=st.q[st.r++];st.miss=0;st.lock=0;this.show(false);say(st.cur[0]);
 },
 show(hint){hudSet(`<div class="riddle">${st.cur[0]}</div>(${st.r}/8) ⭐${score}${hint?`<br><small>Gợi ý: hình này ${st.cur[2]}</small>`:""}`)},
 block(t,x,y,n){
  if(!n||st.lock)return;
  if(t===st.cur[1]){st.lock=1;if(!st.miss)score++;ok();say("Đúng rồi! Đó là "+SHAPES[t].name);setTimeout(()=>this.next(),2200)}
  else{st.miss++;no();say("Chưa đúng. Gợi ý: hình này "+st.cur[2]);this.show(true)}
 },
 lift(){}
};
