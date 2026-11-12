/* Theo dõi điểm chạm và nhận diện khối.
   Mỗi khối có vài điểm chạm cố định (thường 3) khác nhau về khoảng cách và vị trí.
   Máy không gom điểm theo "độ gần" nữa mà thử mọi nhóm điểm có thể, so với mẫu đã học,
   rồi chọn các nhóm khớp nhất sao cho mỗi điểm chạm chỉ thuộc về MỘT khối. */
board.addEventListener("pointerdown",e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});sched()});
board.addEventListener("pointermove",e=>{if(pts.has(e.pointerId)){pts.set(e.pointerId,{x:e.clientX,y:e.clientY});sched()}});
["pointerup","pointercancel"].forEach(n=>window.addEventListener(n,e=>{if(pts.delete(e.pointerId))sched()}));
board.addEventListener("touchmove",e=>e.preventDefault(),{passive:false});
board.addEventListener("contextmenu",e=>e.preventDefault());
function sched(){clearTimeout(timer);timer=setTimeout(render,SETTLE)}

/* ---------- chữ ký của một nhóm điểm: các khoảng cách giữa mọi cặp điểm, xếp tăng dần ---------- */
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function sig(g){
  const d=[];
  for(let i=0;i<g.length;i++)for(let j=i+1;j<g.length;j++)d.push(dist(g[i],g[j]));
  return {n:g.length,d:d.sort((a,b)=>a-b)};
}
function err(a,b){ /* độ lệch tương đối lớn nhất giữa hai chữ ký (0 = giống hệt) */
  if(a.n!==b.n)return Infinity;
  let m=0;
  for(let i=0;i<a.d.length;i++)m=Math.max(m,Math.abs(a.d[i]-b.d[i])/Math.max(b.d[i],20));
  return m;
}
function matchSig(s){ /* khối nào khớp nhất với chữ ký này? */
  let best=null,be=TOL;
  for(const t in samples)for(const x of samples[t]){const e=err(s,x);if(e<be){be=e;best=t}}
  return best?{t:best,e:be}:null;
}

/* ---------- tìm tất cả khối đang đặt trên màn hình ---------- */
function findBlocks(){
  const P=[...pts].slice(0,14).map(([id,p])=>({id,x:p.x,y:p.y})),cand=[];
  const sizes=new Set();let span=0;
  for(const t in samples)for(const x of samples[t]){sizes.add(x.n);span=Math.max(span,x.d[x.d.length-1])}
  span*=1+TOL;
  if(!sizes.size)return {blocks:[],rest:P};
  const near=P.map(a=>P.map(b=>a!==b&&dist(a,b)<=span)); /* hai điểm quá xa nhau thì không thể cùng một khối */
  for(const k of sizes){
    const cur=[];
    (function rec(from){
      if(cur.length===k){const g=cur.map(i=>P[i]),m=matchSig(sig(g));if(m)cand.push({t:m.t,e:m.e,k,g});return}
      for(let i=from;i<P.length;i++)if(cur.every(j=>near[i][j])){cur.push(i);rec(i+1);cur.pop()}
    })(0);
  }
  /* chọn tập nhóm không trùng điểm: phủ được nhiều điểm nhất, rồi tổng sai số nhỏ nhất */
  cand.sort((a,b)=>a.e-b.e||b.k-a.k);
  const C=cand.slice(0,60);let best=[],bs=[-1,0],steps=0;
  (function dfs(i,used,ch,cover,sum){
    if(cover>bs[0]||(cover===bs[0]&&sum<bs[1])){best=ch.slice();bs=[cover,sum]}
    for(let j=i;j<C.length&&steps<20000;j++){
      const c=C[j];if(c.g.some(p=>used.has(p.id)))continue;
      steps++;c.g.forEach(p=>used.add(p.id));ch.push(c);
      dfs(j+1,used,ch,cover+c.k,sum+c.e);
      ch.pop();c.g.forEach(p=>used.delete(p.id));
    }
  })(0,new Set(),[],0,0);
  const used=new Set(),blocks=best.map(c=>{
    c.g.forEach(p=>used.add(p.id));
    return {t:c.t,e:c.e,g:c.g,key:c.g.map(p=>p.id).sort((a,b)=>a-b).join("-"),
      x:c.g.reduce((s,p)=>s+p.x,0)/c.g.length,y:c.g.reduce((s,p)=>s+p.y,0)/c.g.length};
  });
  return {blocks,rest:P.filter(p=>!used.has(p.id))};
}
