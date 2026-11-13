/* 4. Nhớ chuỗi: xem dãy hình rồi đặt khối theo thứ tự */
const showProg=()=>hudSet(`Con nhớ chuỗi ${st.seq.length} hình: ${st.pos}/${st.seq.length}`);
const gMem={
 start(){st={len:2};this.round()},
 round(){
  st.seq=Array.from({length:st.len},()=>rnd(T));st.pos=0;st.lock=1;hudSet("Nhìn kỹ nhé!");
  st.seq.forEach((t,i)=>{
   setTimeout(()=>{hudSet(`<div class="big">${svg(t)}</div>`);beep(SHAPES[t].freq)},800+i*1100);
   setTimeout(()=>hudSet(""),1500+i*1100)});
  setTimeout(()=>{st.lock=0;showProg();say("Đến lượt con!")},800+st.seq.length*1100)},
 block(t,x,y,n){
  if(!n||st.lock)return;
  if(t===st.seq[st.pos]){
   st.pos++;beep(SHAPES[t].freq);showProg();
   if(st.pos===st.seq.length){st.lock=1;ok();say("Giỏi lắm!");st.len++;setTimeout(()=>this.round(),1600)}
  }else{no();st.lock=1;say("Sai rồi, mình thử lại nhé");setTimeout(()=>{st.len=Math.max(2,st.len-1);this.round()},1800)}},
 lift(){}
};

