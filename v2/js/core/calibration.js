/* Học khối: lưu chữ ký (số điểm + khoảng cách) cho từng khối */
/* ---------- học khối ---------- */
function doCalib(){
  const name=SHAPES[calib].name,n=pts.size,have=samples[calib][0];
  if(n<2||n>6||(have&&have.n!==n)){
    clearTimeout(calibT);calibKey="";
    statusEl.textContent=`Đang học ${name}: đặt đúng MỘT khối${have?` (cần ${have.n} điểm chạm)`:" (thường có 3 điểm chạm)"}. Đang thấy ${n} điểm…`;return;
  }
  const s=sig([...pts.values()]),k=s.d.map(Math.round).join(",");
  statusEl.textContent=`Đang học ${name}: ${n} điểm, các khoảng cách ${s.d.map(Math.round).join(" / ")} px. Giữ yên…`;
  if(k!==calibKey){calibKey=k;clearTimeout(calibT);calibT=setTimeout(()=>{
    let near=null,ne=Infinity;
    for(const t in samples)if(t!==calib)for(const x of samples[t]){const e=err(s,x);if(e<ne){ne=e;near=t}}
    samples[calib].push(s);save();
    statusEl.textContent=`Đã lưu mẫu cho ${name} (${n} điểm).`+(near?` Khối gần giống nhất: ${SHAPES[near].name}, khác ${Math.round(ne*100)}%`+(ne<TOL?" ⚠ dễ nhận nhầm, hãy học lại hoặc giảm sai số.":"."):"")+" Nhấc khối ra, xoay hướng khác rồi đặt lại để học thêm.";
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
radEl.oninput=()=>{document.getElementById("radv").textContent=radEl.value;TOL=radEl.value/100;try{localStorage.setItem("tiggly-tol",radEl.value)}catch(e){}sched()};
try{const v=+localStorage.getItem("tiggly-tol");if(v>=8&&v<=35){radEl.value=v;document.getElementById("radv").textContent=v;TOL=v/100}}catch(e){}

/* Kiểm tra độ phân biệt: các khối có đủ khác nhau để không bị nhầm không? */
document.getElementById("sep").onclick=()=>{
  const ts=Object.keys(samples).filter(t=>samples[t].length),nm=t=>SHAPES[t].name.replace("hình ",""),out=[],intra=[];
  for(const t of ts){let m=0;for(const a of samples[t])for(const b of samples[t])if(a!==b)m=Math.max(m,err(a,b));if(samples[t].length>1)intra.push(`${nm(t)} ${Math.round(m*100)}%`)}
  for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++){let m=Infinity;for(const a of samples[ts[i]])for(const b of samples[ts[j]])m=Math.min(m,err(a,b));out.push(`${nm(ts[i])}–${nm(ts[j])}: ${m===Infinity?"khác số điểm":Math.round(m*100)+"%"}`)}
  statusEl.textContent=ts.length<2?"Cần học ít nhất 2 khối.":`Khác nhau giữa các khối (nên lớn hơn sai số ${Math.round(TOL*100)}%): ${out.join(" · ")}.`+(intra.length?` Dao động trong cùng một khối (nên nhỏ hơn sai số): ${intra.join(" · ")}.`:"");
};
buildCals();
