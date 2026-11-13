/* Vẽ khối nhận diện được lên bảng, gọi sự kiện của trò chơi đang chạy (G.block / G.lift) */
const CONFIRM_MS=90,LIFT_MS=200; /* khối phải ổn định 90ms mới tính là "mới đặt"; mất điểm chạm 200ms mới tính là "nhấc lên" */
const CAN_TRANSLATE=!!(window.CSS&&CSS.supports&&CSS.supports("translate","1px 1px"));
const dotEls=new Map(),liveEls=new Map();
/* dời phần tử bằng thuộc tính translate (chạy trên GPU), cũ hơn thì dùng left/top */
function moveTo(el,x,y){if(CAN_TRANSLATE)el.style.translate=`${x}px ${y}px`;else{el.style.left=x+"px";el.style.top=y+"px"}}
function mkEl(cls,html){const e=document.createElement("div");e.className=cls;if(CAN_TRANSLATE){e.style.left="0";e.style.top="0"}if(html)e.innerHTML=html;board.appendChild(e);return e}
function render(){
  const {blocks,rest}=findBlocks(),r=board.getBoundingClientRect(),now=Date.now();
  statusEl.textContent=`Điểm chạm: ${pts.size} · Nhận ra: ${blocks.length?blocks.map(b=>SHAPES[b.t].name.replace("hình ","")).join(", "):"chưa có"}`+(rest.length?` · Điểm lẻ: ${rest.length}`:"");
  if(pts.size)hint.style.display="none";
  for(const [id,p] of pts){
    let d=dotEls.get(id);if(!d||!d.isConnected){d=mkEl("dot");dotEls.set(id,d)}
    moveTo(d,p.x-r.left,p.y-r.top);
  }
  for(const [id,d] of dotEls)if(!pts.has(id)){d.remove();dotEls.delete(id)}

  if(calib){liveEls.forEach(e=>e.remove());liveEls.clear();doCalib();return}

  const keys=new Set();
  for(const b of blocks){
    const cx=b.x-r.left,cy=b.y-r.top,isNew=!announced.has(b.key);
    if(isNew){ /* chờ ổn định để không nhận nhầm khi nhiều khối đang được đặt xuống */
      if(!pending.has(b.key)){pending.set(b.key,now);sched();continue}
      if(now-pending.get(b.key)<CONFIRM_MS){sched();continue}
    }
    keys.add(b.key);gone.delete(b.key);
    let el=liveEls.get(b.key);
    if(!el||!el.isConnected){el=mkEl("s live",svg(b.t));liveEls.set(b.key,el)}
    moveTo(el,cx,cy);
    G.block(b.t,cx,cy,isNew);
    announced.set(b.key,{t:b.t,x:cx,y:cy});
  }
  for(const k of [...pending.keys()])if(announced.has(k)||!blocks.some(b=>b.key===k))pending.delete(k);
  for(const [k,v] of [...announced]){
    if(keys.has(k))continue;
    if(!gone.has(k)){gone.set(k,now);sched();continue}     /* mới mất: chờ thêm chút phòng nhiễu */
    if(now-gone.get(k)<LIFT_MS){sched();continue}
    G.lift(v.t);gone.delete(k);announced.delete(k);
    const el=liveEls.get(k);liveEls.delete(k);
    if(el){if(keepEl.checked)el.className="s old";else el.remove()}   /* giữ lại làm "con dấu" hoặc bỏ đi */
  }
}
