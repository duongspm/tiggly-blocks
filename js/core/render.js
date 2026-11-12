/* Vẽ khối nhận diện được lên bảng, gọi sự kiện của trò chơi đang chạy (G.block / G.lift) */
const CONFIRM_MS=90,LIFT_MS=200; /* khối phải ổn định 90ms mới tính là "mới đặt"; mất điểm chạm 200ms mới tính là "nhấc lên" */
function render(){
  const {blocks,rest}=findBlocks(),r=board.getBoundingClientRect(),now=Date.now();
  board.querySelectorAll(".dot,.s.live").forEach(n=>n.remove());
  statusEl.textContent=`Điểm chạm: ${pts.size} · Nhận ra: ${blocks.length?blocks.map(b=>SHAPES[b.t].name.replace("hình ","")).join(", "):"chưa có"}`+(rest.length?` · Điểm lẻ: ${rest.length}`:"");
  if(pts.size)hint.style.display="none";
  for(const p of pts.values()){const d=document.createElement("div");d.className="dot";d.style.left=p.x-r.left+"px";d.style.top=p.y-r.top+"px";board.appendChild(d)}

  if(calib){doCalib();return}

  const keys=new Set();
  for(const b of blocks){
    const cx=b.x-r.left,cy=b.y-r.top,isNew=!announced.has(b.key);
    if(isNew){ /* chờ ổn định để không nhận nhầm khi nhiều khối đang được đặt xuống */
      if(!pending.has(b.key)){pending.set(b.key,now);sched();continue}
      if(now-pending.get(b.key)<CONFIRM_MS){sched();continue}
    }
    keys.add(b.key);gone.delete(b.key);
    const el=document.createElement("div");el.className="s live"+(isNew?"":" old");
    el.style.left=cx+"px";el.style.top=cy+"px";el.innerHTML=svg(b.t);board.appendChild(el);
    G.block(b.t,cx,cy,isNew);
    announced.set(b.key,{t:b.t,x:cx,y:cy});
  }
  for(const k of [...pending.keys()])if(announced.has(k)||!blocks.some(b=>b.key===k))pending.delete(k);
  for(const [k,v] of [...announced]){
    if(keys.has(k))continue;
    if(!gone.has(k)){gone.set(k,now);sched();continue}     /* mới mất: chờ thêm chút phòng nhiễu */
    if(now-gone.get(k)<LIFT_MS){sched();continue}
    G.lift(v.t);gone.delete(k);
    if(keepEl.checked){const el=document.createElement("div");el.className="s old";el.style.left=v.x+"px";el.style.top=v.y+"px";el.innerHTML=svg(v.t);board.appendChild(el)}
    announced.delete(k);
  }
}
