/* 2. Tìm hình: app đọc tên, bé đặt đúng khối */
const gFind={
 start(){score=0;st={r:0};this.next()},
 next(){
  if(st.r>=8)return end(`Hoàn thành! Con được ${score}/8 ⭐`,"Hoàn thành! Giỏi quá!");
  st.r++;st.want=rnd(T);st.miss=0;st.lock=0;
  hudSet(`<div class="big">${svg(st.want)}</div>Tìm ${SHAPES[st.want].name}! (${st.r}/8) ⭐${score}`);
  say("Tìm "+SHAPES[st.want].name)},
 block(t,x,y,n){
  if(!n||st.lock)return;
  if(t===st.want){if(!st.miss)score++;st.lock=1;ok();say("Đúng rồi!");setTimeout(()=>this.next(),1600)}
  else{st.miss=1;no();say("Đây là "+SHAPES[t].name+". Thử lại nhé!")}},
 lift(){}
};

