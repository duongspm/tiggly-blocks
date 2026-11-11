/* Theo dõi điểm chạm, gom điểm thành khối, so khớp chữ ký */
/* ---------- theo dõi điểm chạm ---------- */
board.addEventListener("pointerdown",e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});sched()});
board.addEventListener("pointermove",e=>{if(pts.has(e.pointerId)){pts.set(e.pointerId,{x:e.clientX,y:e.clientY});sched()}});
["pointerup","pointercancel"].forEach(n=>window.addEventListener(n,e=>{if(pts.delete(e.pointerId))sched()}));
board.addEventListener("touchmove",e=>e.preventDefault(),{passive:false});
board.addEventListener("contextmenu",e=>e.preventDefault());
function sched(){clearTimeout(timer);timer=setTimeout(render,SETTLE)}

/* ---------- gom điểm thành khối ---------- */
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function cluster(){
  const R=+radEl.value,a=[...pts].map(([id,p])=>({id,x:p.x,y:p.y})),seen=new Set(),out=[];
  for(const p of a){
    if(seen.has(p.id))continue;
    const g=[p];seen.add(p.id);
    for(let i=0;i<g.length;i++)for(const q of a)if(!seen.has(q.id)&&dist(g[i],q)<R){seen.add(q.id);g.push(q)}
    out.push(g);
  }
  return out;
}
function sig(g){
  const d=[];
  for(let i=0;i<g.length;i++)for(let j=i+1;j<g.length;j++)d.push(dist(g[i],g[j]));
  return {n:g.length,d:d.sort((a,b)=>a-b)};
}
function err(a,b){
  if(a.n!==b.n)return Infinity;
  let m=0;
  for(let i=0;i<a.d.length;i++)m=Math.max(m,Math.abs(a.d[i]-b.d[i])/Math.max(b.d[i],20));
  return m;
}
function match(s){
  let best=null,be=TOL;
  for(const t in samples)for(const x of samples[t]){const e=err(s,x);if(e<be){be=e;best=t}}
  return best;
}

