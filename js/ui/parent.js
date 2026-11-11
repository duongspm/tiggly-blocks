/* khu vực phụ huynh: giữ nút ⚙️ 1 giây */
const scrim=document.createElement("div");scrim.id="scrim";scrim.hidden=true;document.body.appendChild(scrim);
const h2=document.createElement("h2"),pp=document.createElement("p"),xb=document.createElement("button");
h2.textContent="Dành cho phụ huynh";pp.textContent="Bấm tên hình rồi đặt đúng khối thật lên màn hình để máy học (nên học 2-3 lần mỗi khối).";
xb.textContent="Xong";xb.className="done";
bar.prepend(h2,pp);bar.append(statusEl,xb);
const _bc=buildCals;buildCals=()=>{_bc();document.body.classList.toggle("cal",!!calib);scrim.hidden=!!calib||bar.hidden};
const openP=()=>{bar.hidden=false;scrim.hidden=!!calib},closeP=()=>{bar.hidden=scrim.hidden=true;calib=null;buildCals()};
xb.onclick=scrim.onclick=closeP;
let gt;gear.oncontextmenu=e=>e.preventDefault();
gear.onpointerdown=()=>{gt=setTimeout(openP,1000)};
["pointerup","pointerleave","pointercancel"].forEach(n=>gear.addEventListener(n,()=>clearTimeout(gt)));
