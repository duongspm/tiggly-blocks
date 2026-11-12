/* Học khối: lưu chữ ký (số điểm + khoảng cách) cho từng khối */
/* ---------- học khối ---------- */
function doCalib(groups){
  const name=SHAPES[calib].name;
  if(groups.length!==1){clearTimeout(calibT);calibKey="";statusEl.textContent=`Đang học ${name}: hãy đặt đúng 1 khối lên màn hình, giữ yên…`;return}
  const s=sig(groups[0]),k=s.n+":"+s.d.map(Math.round).join(",");
  statusEl.textContent=`Đang học ${name}: thấy ${s.n} điểm, giữ yên…`;
  if(k!==calibKey){calibKey=k;clearTimeout(calibT);calibT=setTimeout(()=>{
    let clash=null;
    for(const t in samples)if(t!==calib)for(const x of samples[t])if(err(s,x)<TOL)clash=t;
    samples[calib].push(s);save();
    statusEl.textContent=`Đã lưu mẫu cho ${name} (${s.n} điểm).`+(clash?` Cảnh báo: giống ${SHAPES[clash].name}, dễ nhận nhầm.`:"")+" Nhấc khối ra; đặt lại vài lần để học thêm hoặc bấm nút để thoát.";
    beep(SHAPES[calib].freq);buildCals();
  },600)}
}
function buildCals(){
  const box=document.getElementById("cals");box.innerHTML="";
  for(const t in SHAPES){
    const b=document.createElement("button");b.textContent=`${SHAPES[t].name.replace("hình ","")} (${samples[t].length})`;
    if(calib===t)b.classList.add("on");
    b.onclick=()=>{calib=calib===t?null:t;calibKey="";statusEl.textContent=calib?`Đặt khối ${SHAPES[t].name} lên màn hình…`:"";buildCals()};
    box.appendChild(b);
  }
}
document.getElementById("reset").onclick=()=>{samples={circle:[],square:[],triangle:[],star:[]};save();buildCals();statusEl.textContent="Đã xóa dữ liệu học."};
radEl.oninput=()=>{document.getElementById("radv").textContent=radEl.value;sched()};
buildCals();
