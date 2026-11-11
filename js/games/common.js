/* Biến và hàm dùng chung cho mọi trò chơi */
/* ===== TRÒ CHƠI ===== */
const T=Object.keys(SHAPES),hud=document.getElementById("hud"),rnd=a=>a[Math.floor(Math.random()*a.length)];
let mode="free",score=0,st={},G;
const hudSet=h=>{hud.innerHTML=h};
const ok=()=>{confetti();[523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f),i*110))},no=()=>{beep(180);shake()};
const svgO=t=>`<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="7 6">${SHAPES[t].svg.replace(/ stroke(-linejoin|-width)?="[^"]*"/g,"")}</svg>`;
const clearTg=()=>board.querySelectorAll(".tg,.animal").forEach(e=>e.remove());
function end(m,sp){hudSet(`${m}<br><button onclick="setMode(mode)">Chơi lại</button>`);ok();say(sp)}

