/* Danh sách trò chơi (MODES) và chuyển chế độ */
const MODES={free:["Chơi tự do",gFree],find:["Tìm hình",gFind],pic:["Ghép tranh",gPic],mem:["Nhớ chuỗi",gMem],saf:["Tiggly Safari",gSaf]};
function setMode(m){
 {const id=setTimeout(()=>{},0);for(let i=0;i<=id;i++)clearTimeout(i)}
 tipEl.hidden=true;galEl.hidden=true;mode=m;G=MODES[m][1];calib=null;buildCals();clearTg();
 board.querySelectorAll(".s").forEach(e=>e.remove());announced.clear();
 keepEl.checked=m==="free";hudSet("");hint.style.display=m==="free"&&!pts.size?"grid":"none";
 document.querySelectorAll("#games button").forEach(b=>b.classList.toggle("on",b.dataset.m===m));
 if(G.start)G.start();
}
for(const m in MODES){const b=document.createElement("button");b.textContent=MODES[m][0];b.dataset.m=m;b.onclick=()=>setMode(m);document.getElementById("games").appendChild(b)}
setMode("free");

