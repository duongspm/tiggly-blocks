/* Vẽ khối nhận diện được lên bảng, gọi sự kiện của trò chơi đang chạy (G.block / G.lift) */
/* ---------- vẽ ---------- */
function render(){
  const groups=cluster(),r=board.getBoundingClientRect();
  board.querySelectorAll(".dot,.s.live").forEach(n=>n.remove());
  statusEl.textContent=`Điểm chạm: ${pts.size} · Khối: ${groups.length}`;
  if(pts.size)hint.style.display="none";
  for(const p of pts.values()){const d=document.createElement("div");d.className="dot";d.style.left=p.x-r.left+"px";d.style.top=p.y-r.top+"px";board.appendChild(d)}

  if(calib){doCalib(groups);return}

  const keys=new Set();
  for(const g of groups){
    const s=sig(g),t=match(s);
    const key=g.map(p=>p.id).sort().join("-");
    const cx=g.reduce((a,p)=>a+p.x,0)/g.length-r.left,cy=g.reduce((a,p)=>a+p.y,0)/g.length-r.top;
    if(!t){statusEl.textContent+=` · Chưa nhận ra (n=${s.n}, d=${s.d.map(Math.round).join("/")})`;continue}
    keys.add(key);
    const el=document.createElement("div");el.className="s live"+(announced.has(key)?" old":"");
    el.style.left=cx+"px";el.style.top=cy+"px";el.innerHTML=svg(t);board.appendChild(el);
    G.block(t,cx,cy,!announced.has(key));
    announced.set(key,{t,x:cx,y:cy});
  }
  for(const [k,v] of announced)if(!keys.has(k)){G.lift(v.t);
    if(keepEl.checked){const el=document.createElement("div");el.className="s old";el.style.left=v.x+"px";el.style.top=v.y+"px";el.innerHTML=svg(v.t);board.appendChild(el)}
    announced.delete(k);
  }
}

