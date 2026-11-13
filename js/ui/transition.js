/* Chuyển màn hình nhẹ nhàng: màn hình mờ dần sang một lớp phủ màu pastel nhạt, đổi màn hình khi đã phủ kín,
   rồi mờ dần ra. Chỉ đổi độ mờ (opacity), chậm và đều, không phóng to, không trượt, không màu chói. */
const FADE_IN=450,HOLD=140,FADE_OUT=650;             /* mili giây: có thể chỉnh nhanh/chậm ở đây */
const wipe=document.createElement("div");wipe.id="wipe";document.body.appendChild(wipe);
const darkMode=window.matchMedia?matchMedia("(prefers-color-scheme: dark)"):{matches:false};
let lockUntil=0;
function transitionTo(color,ev,swap){
  const t0=performance.now();if(t0<lockUntil)return;lockUntil=t0+FADE_IN+HOLD+FADE_OUT+500; /* chặn bấm liên tiếp */
  clearAllTimers();
  wipe.style.background=darkMode.matches?"":`color-mix(in srgb,${color} 16%,#fff)`;   /* pha màu ô vừa chạm thật nhạt */
  wipe.classList.add("on");
  wipe.style.transition=`opacity ${FADE_IN}ms ease-in-out`;wipe.style.opacity=1;
  setTimeout(()=>{
    swap();                                                /* đã phủ kín: đổi màn hình ở đây, bé không thấy */
    setTimeout(()=>{wipe.style.transition=`opacity ${FADE_OUT}ms ease-in-out`;wipe.style.opacity=0},HOLD);
  },FADE_IN+30);
}
wipe.addEventListener("transitionend",e=>{if(e.propertyName==="opacity"&&wipe.style.opacity==="0")wipe.classList.remove("on")});
function titleSwap(t){titleEl.classList.remove("swap");void titleEl.offsetWidth;titleEl.textContent=t;titleEl.classList.add("swap")}
function playEnter(){}  /* giữ lại cho tương thích: lớp phủ đã lo phần xuất hiện */
