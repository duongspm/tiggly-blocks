/* 5. Tiggly Safari: ghép khối thành con vật sống động */
const found=new Set();
try{JSON.parse(localStorage.getItem("tiggly-found")||"[]").forEach(k=>found.add(k))}catch(e){}
const ANI={
 "circle,triangle":{n:"Con cá",e:"🐟",c:"fish",say:"Con cá! Bơi bơi bơi",fx:[[660,0],[880,130],[700,260]],
  svg:"<g class='tail'><polygon points='148,100 196,64 196,136' fill='#fab005'/></g><circle cx='98' cy='100' r='56' fill='#ff922b'/><path d='M66 74q32-28 64 0' stroke='#ffd8a8' stroke-width='8' fill='none' stroke-linecap='round'/><g class='blink'><circle cx='76' cy='94' r='11' fill='#fff'/><circle cx='79' cy='94' r='5' fill='#333'/></g><path d='M62 120q14 12 28 0' stroke='#333' stroke-width='4' fill='none' stroke-linecap='round'/><circle class='bub' cx='34' cy='70' r='7' fill='none' stroke='#74c0fc' stroke-width='3'/><circle class='bub' cx='48' cy='48' r='5' fill='none' stroke='#74c0fc' stroke-width='3' style='animation-delay:.8s'/>"},
 "square,triangle":{n:"Con mèo",e:"🐱",c:"cat",say:"Con mèo! Meo meo",fx:[[820,0],[560,180]],
  svg:"<polygon points='50,78 52,22 98,66' fill='#ffa94d'/><polygon points='150,78 148,22 102,66' fill='#ffa94d'/><polygon points='58,66 60,40 80,62' fill='#ffc9c9'/><polygon points='142,66 140,40 120,62' fill='#ffc9c9'/><rect x='40' y='62' width='120' height='112' rx='22' fill='#ffc078'/><g class='blink'><circle cx='74' cy='106' r='12' fill='#fff'/><circle cx='76' cy='106' r='6' fill='#333'/></g><g class='blink'><circle cx='126' cy='106' r='12' fill='#fff'/><circle cx='124' cy='106' r='6' fill='#333'/></g><polygon points='92,126 108,126 100,136' fill='#f06595'/><path d='M100 136q-10 12-20 4M100 136q10 12 20 4' stroke='#333' stroke-width='4' fill='none' stroke-linecap='round'/><path d='M40 124l-30-6M40 134l-30 6M160 124l30-6M160 134l30 6' stroke='#333' stroke-width='3' stroke-linecap='round'/>"},
 "circle,square":{n:"Con rùa",e:"🐢",c:"turtle",say:"Con rùa! Chậm rì rì",fx:[[220,0],[196,300]],
  svg:"<g class='head'><rect x='140' y='82' width='52' height='46' rx='14' fill='#8ce99a'/><circle cx='176' cy='98' r='6' fill='#fff'/><circle cx='178' cy='98' r='3' fill='#333'/><path d='M160 116q10 8 22 0' stroke='#333' stroke-width='3' fill='none' stroke-linecap='round'/></g><rect x='52' y='140' width='30' height='34' rx='8' fill='#8ce99a'/><rect x='112' y='140' width='30' height='34' rx='8' fill='#8ce99a'/><circle cx='96' cy='108' r='62' fill='#40c057'/><circle cx='96' cy='108' r='40' fill='none' stroke='#2f9e44' stroke-width='6'/><path d='M96 68v80M56 108h80' stroke='#2f9e44' stroke-width='5'/>"},
 "circle,square,triangle":{n:"Gà con",e:"🐥",c:"chick",say:"Gà con! Chíp chíp chíp",fx:[[1500,0],[1700,140],[1500,280]],
  svg:"<ellipse cx='50' cy='104' rx='12' ry='22' fill='#fcc419'/><ellipse cx='150' cy='104' rx='12' ry='22' fill='#fcc419'/><circle cx='100' cy='92' r='52' fill='#ffd43b'/><path d='M92 44q-4-20 8-22 12 2 8 22' fill='none' stroke='#fab005' stroke-width='5' stroke-linecap='round'/><g class='blink'><circle cx='80' cy='86' r='10' fill='#fff'/><circle cx='82' cy='86' r='5' fill='#333'/></g><g class='blink'><circle cx='120' cy='86' r='10' fill='#fff'/><circle cx='118' cy='86' r='5' fill='#333'/></g><polygon points='88,104 112,104 100,124' fill='#ff922b'/><rect x='34' y='128' width='132' height='56' rx='14' fill='#d9a066'/><path d='M50 146h100M50 164h100' stroke='#b8803f' stroke-width='4'/>"},
 "circle,star":{n:"Sao biển",e:"⭐",c:"star",say:"Sao biển! Lấp lánh",fx:[[880,0],[1100,150],[1320,300]],
  svg:"<polygon points='100,16 123,72 184,76 137,114 152,174 100,142 48,174 63,114 16,76 77,72' fill='#ff8787' stroke='#fa5252' stroke-width='8' stroke-linejoin='round'/><g class='blink'><circle cx='84' cy='98' r='9' fill='#fff'/><circle cx='86' cy='98' r='4' fill='#333'/></g><g class='blink'><circle cx='116' cy='98' r='9' fill='#fff'/><circle cx='114' cy='98' r='4' fill='#333'/></g><path d='M86 120q14 12 28 0' stroke='#333' stroke-width='4' fill='none' stroke-linecap='round'/><circle class='bub' cx='176' cy='44' r='9' fill='none' stroke='#74c0fc' stroke-width='3'/>"},
 "square,star":{n:"Con cua",e:"🦀",c:"crab",say:"Con cua! Đi ngang ngang",fx:[[500,0],[500,120],[500,240]],
  svg:"<path d='M52 100L34 84M148 100L166 84M50 130l-26 18M54 146l-24 28M150 130l26 18M146 146l24 28' stroke='#fa5252' stroke-width='9' stroke-linecap='round'/><circle cx='30' cy='72' r='22' fill='#fa5252'/><circle cx='170' cy='72' r='22' fill='#fa5252'/><rect x='45' y='88' width='110' height='72' rx='30' fill='#ff6b6b'/><path d='M80 90V66M120 90V66' stroke='#ff6b6b' stroke-width='8'/><g class='blink'><circle cx='80' cy='60' r='12' fill='#fff'/><circle cx='80' cy='60' r='5' fill='#333'/></g><g class='blink'><circle cx='120' cy='60' r='12' fill='#fff'/><circle cx='120' cy='60' r='5' fill='#333'/></g><path d='M84 128q16 14 32 0' stroke='#333' stroke-width='4' fill='none' stroke-linecap='round'/>"},
 "star,triangle":{n:"Con bướm",e:"🦋",c:"butterfly",say:"Con bướm! Vỗ cánh bay bay",fx:[[1200,0],[1500,120],[1200,240]],
  svg:"<g class='wings'><polygon points='100,100 20,30 30,100' fill='#74c0fc'/><polygon points='100,100 180,30 170,100' fill='#74c0fc'/><polygon points='100,100 30,100 50,170' fill='#da77f2'/><polygon points='100,100 170,100 150,170' fill='#da77f2'/><circle cx='56' cy='70' r='9' fill='#fff' opacity='.7'/><circle cx='144' cy='70' r='9' fill='#fff' opacity='.7'/></g><ellipse cx='100' cy='105' rx='9' ry='42' fill='#5c3d2e'/><circle cx='100' cy='60' r='11' fill='#5c3d2e'/><path d='M96 52q-8-22-20-24M104 52q8-22 20-24' stroke='#5c3d2e' stroke-width='4' fill='none' stroke-linecap='round'/>"},
 "circle,square,star":{n:"Con ếch",e:"🐸",c:"frog",say:"Con ếch! Ộp ộp",fx:[[250,0],[350,140]],
  svg:"<circle cx='62' cy='62' r='24' fill='#51cf66'/><circle cx='138' cy='62' r='24' fill='#51cf66'/><rect x='30' y='70' width='140' height='100' rx='44' fill='#40c057'/><g class='blink'><circle cx='62' cy='62' r='14' fill='#fff'/><circle cx='64' cy='62' r='7' fill='#333'/></g><g class='blink'><circle cx='138' cy='62' r='14' fill='#fff'/><circle cx='136' cy='62' r='7' fill='#333'/></g><polygon points='100,70 104,82 117,82 107,90 111,102 100,95 89,102 93,90 83,82 96,82' fill='#ffd43b'/><path d='M62 128q38 32 76 0' stroke='#2b8a3e' stroke-width='6' fill='none' stroke-linecap='round'/><circle cx='52' cy='116' r='9' fill='#ffa8a8' opacity='.7'/><circle cx='148' cy='116' r='9' fill='#ffa8a8' opacity='.7'/>"},
 "circle,star,triangle":{n:"Chim cánh cụt",e:"🐧",c:"penguin",say:"Chim cánh cụt! Lon ton lon ton",fx:[[700,0],[900,150],[700,300]],
  svg:"<ellipse cx='40' cy='118' rx='12' ry='34' fill='#212529' transform='rotate(14 40 118)'/><ellipse cx='160' cy='118' rx='12' ry='34' fill='#212529' transform='rotate(-14 160 118)'/><ellipse cx='72' cy='182' rx='20' ry='8' fill='#ff922b'/><ellipse cx='128' cy='182' rx='20' ry='8' fill='#ff922b'/><ellipse cx='100' cy='110' rx='58' ry='72' fill='#343a40'/><ellipse cx='100' cy='125' rx='38' ry='52' fill='#f8f9fa'/><g class='blink'><circle cx='82' cy='78' r='10' fill='#fff'/><circle cx='84' cy='78' r='5' fill='#333'/></g><g class='blink'><circle cx='118' cy='78' r='10' fill='#fff'/><circle cx='116' cy='78' r='5' fill='#333'/></g><polygon points='88,92 112,92 100,108' fill='#ff922b'/><polygon points='100,126 104,136 115,136 106,143 110,154 100,147 90,154 94,143 85,136 96,136' fill='#4dabf7'/>"},
 "square,star,triangle":{n:"Sư tử",e:"🦁",c:"lion",say:"Sư tử! Gầm gừm",fx:[[150,0],[110,250]],
  svg:"<polygon points='100,4 124,62 190,66 138,106 156,172 100,134 44,172 62,106 10,66 76,62' fill='#f59f00'/><polygon points='60,66 56,40 82,58' fill='#ffd43b'/><polygon points='140,66 144,40 118,58' fill='#ffd43b'/><rect x='56' y='62' width='88' height='84' rx='20' fill='#ffd43b'/><g class='blink'><circle cx='82' cy='96' r='9' fill='#fff'/><circle cx='84' cy='96' r='4' fill='#333'/></g><g class='blink'><circle cx='118' cy='96' r='9' fill='#fff'/><circle cx='116' cy='96' r='4' fill='#333'/></g><polygon points='92,112 108,112 100,122' fill='#e8590c'/><path d='M100 122q-8 12-18 6M100 122q8 12 18 6' stroke='#333' stroke-width='4' fill='none' stroke-linecap='round'/>"},
 "circle,square,star,triangle":{n:"Con voi",e:"🐘",c:"elephant",say:"Con voi! Pao pao",fx:[[330,0],[520,160],[420,320]],
  svg:"<circle cx='42' cy='88' r='36' fill='#ced4da'/><circle cx='158' cy='88' r='36' fill='#ced4da'/><circle cx='100' cy='88' r='58' fill='#adb5bd'/><g class='trunk'><path d='M100 112v52q0 20 20 16' stroke='#adb5bd' stroke-width='26' fill='none' stroke-linecap='round'/></g><polygon points='78,128 70,160 90,142' fill='#fff'/><polygon points='122,128 130,160 110,142' fill='#fff'/><g class='blink'><circle cx='78' cy='82' r='9' fill='#fff'/><circle cx='80' cy='82' r='4' fill='#333'/></g><g class='blink'><circle cx='122' cy='82' r='9' fill='#fff'/><circle cx='120' cy='82' r='4' fill='#333'/></g><polygon points='100,36 104,46 115,46 106,53 110,64 100,57 90,64 94,53 85,46 96,46' fill='#4dabf7'/>"}
};
/* Phân loại theo nơi sống: dưới biển / trên cạn / trên trời */
const HAB={"circle,triangle":"sea","square,star":"sea","circle,star":"sea","star,triangle":"sky"}; /* còn lại: trên cạn */
const habOf=k=>HAB[k]||"land";
const HABN={sea:"🌊 Dưới biển",land:"🌳 Trên cạn",sky:"☁️ Trên trời"};
const SCENE_HAB={sea:"sea",land:"safari",sky:"sky"};
const albumHtml=()=>`<div class="album">${Object.keys(HABN).map(h=>`<b>${HABN[h].slice(0,2)}</b>`+Object.entries(ANI).filter(([k])=>habOf(k)===h).map(([k,a])=>`<span data-k="${k}" class="${found.has(k)?"":"lock"}">${a.e}</span>`).join("")).join("")}</div>`;
const tipEl=document.createElement("div");tipEl.id="tip";tipEl.hidden=true;board.appendChild(tipEl);
function showTip(k){
 const a=ANI[k];if(!a)return;
 tipEl.innerHTML=`<b>${a.e} ${a.n}</b><div class="tshapes">${k.split(",").map(t=>`<span class="tsh">${svg(t)}<small>${SHAPES[t].name.replace("hình ","")}</small></span>`).join("<i>+</i>")}</div><small>Sống ở: ${HABN[habOf(k)]}</small><br><small>Gợi ý: đặt các khối này cùng lúc nhé!</small><button>Đã hiểu</button>`;
 tipEl.hidden=false;
}
hud.addEventListener("pointerdown",e=>e.stopPropagation());
hud.addEventListener("click",e=>{const s=e.target.closest("[data-k]");if(s)showTip(s.dataset.k)});
tipEl.addEventListener("pointerdown",e=>e.stopPropagation());
tipEl.addEventListener("click",e=>{if(e.target.tagName==="BUTTON")tipEl.hidden=true});
const gSaf={
 start(){st={cur:"",shown:"",fp:null,target:null};this.bind();this.idle()},
 idle(t){hudSet((t||"Đặt các khối lên để tạo con vật!")+albumHtml())},
 block(t,x,y,n){if(n)setTimeout(()=>this.check(),150)},
 lift(){setTimeout(()=>this.check(),150)},
 animal(){return board.querySelector(".animal:not(.bye)")},
 bye(e){e.classList.add("bye");e.addEventListener("animationend",()=>e.remove(),{once:true})},
 next(){ /* nút "Tiếp tục" */
  board.querySelectorAll(".animal").forEach(e=>this.bye(e));
  st.cur=st.shown="";tipEl.hidden=true;setScene("safari");this.idle();
 },
 poke(k,withTip){ /* tác động: nhảy lên, kêu, (chạm vào thì) hiện gợi ý */
  const e=this.animal(),a=ANI[k];if(!e||!a)return;
  e.classList.remove("jump");void e.offsetWidth;e.classList.add("jump");
  a.fx.forEach(([f,d])=>setTimeout(()=>beep(f),d));say(a.say);
  if(withTip)showTip(k);
 },
 check(){
  const vs=[...announced.values()],ty=[...new Set(vs.map(v=>v.t))].sort(),k=ty.join(",");
  if(k===st.cur)return;
  st.cur=k;if(!ty.length)return;                 /* nhấc hết khối: GIỮ con vật */
  const a=ANI[k];
  if(!a){if(!st.shown)this.idle(ty.length===1?"Thêm một khối nữa nhé!":"");return}
  if(k===st.shown){this.poke(k,false);return}    /* đúng tổ hợp đang hiện: chỉ kêu lại */
  tipEl.hidden=true;
  board.querySelectorAll(".animal").forEach(e=>this.bye(e));   /* con mới hiện, con cũ mờ đi */
  st.shown=k;
  const r=board.getBoundingClientRect(),cy=vs.reduce((s,v)=>s+v.y,0)/vs.length,sz=Math.max(150,Math.min(280,Math.min(r.width,r.height)*.5));
  const e=document.createElement("div");e.className="animal";
  e._p={x:r.width/2,y:cy>r.height/2?r.height*.38:r.height*.68};
  e.style.cssText=`width:${sz}px;height:${sz}px;left:0;top:0`;moveTo(e,e._p.x,e._p.y);
  e.innerHTML=`<svg viewBox='0 0 200 200' class='an-${a.c}'>${a.svg}</svg>`;board.appendChild(e);
  a.fx.forEach(([f,d])=>setTimeout(()=>beep(f),d));say(a.say);setScene(SCENE_HAB[habOf(k)]);
  const isNew=!found.has(k);found.add(k);
  try{localStorage.setItem("tiggly-found",JSON.stringify([...found]))}catch(er){}
  hudSet(`${a.n} ${a.e}${isNew?" – mới!":""}<br><small>Chạm hoặc kéo con vật nhé</small><br><button onclick="gSaf.next()">▶ Tiếp tục</button>`+albumHtml());
  if(isNew)ok();
 },
 /* con vật đi theo ngón tay */
 bind(){
  if(this.bound)return;this.bound=1;
  board.addEventListener("pointerdown",e=>{
   if(mode!=="saf"||announced.size||pts.size!==1)return;
   const an=this.animal();if(!an)return;
   const r=board.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,on=!!e.target.closest(".animal");
   st.fp=e.pointerId;st.on=on;st.moved=0;st.lx=x;st.ly=y;
   st.ox=on?an._p.x-x:0;st.oy=on?an._p.y-y:0;
   if(!on)this.follow(x,y);
  });
  board.addEventListener("pointermove",e=>{
   if(e.pointerId!==st.fp)return;
   const r=board.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
   st.moved+=Math.hypot(x-st.lx,y-st.ly);st.lx=x;st.ly=y;
   if(!st.on||st.moved>10)this.follow(x+st.ox,y+st.oy);
  });
  ["pointerup","pointercancel"].forEach(n=>window.addEventListener(n,e=>{
   if(e.pointerId!==st.fp)return;st.fp=null;
   if(st.on&&st.moved<=10&&st.shown)this.poke(st.shown,true);
  }));
 },
 follow(x,y){
  st.target={x:Math.max(0,Math.min(x,board.clientWidth||9999)),y:Math.max(0,Math.min(y,board.clientHeight||9999))};
  if(this.raf)return;
  const step=()=>{
   const e=this.animal(),t=st.target;
   if(!e||!t||mode!=="saf"){this.raf=0;return}
   const p=e._p,dx=t.x-p.x,dy=t.y-p.y;
   if(Math.hypot(dx,dy)<1){this.raf=0;return}
   p.x+=dx*.07;p.y+=dy*.07;moveTo(e,p.x,p.y);
   this.raf=requestAnimationFrame(step);
  };
  this.raf=requestAnimationFrame(step);
 }
};
