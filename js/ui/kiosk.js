const fsBtn=document.getElementById("fsBtn"),rootEl=document.documentElement;
const reqFS=rootEl.requestFullscreen||rootEl.webkitRequestFullscreen,exitFS=document.exitFullscreen||document.webkitExitFullscreen;
const inFS=()=>!!(document.fullscreenElement||document.webkitFullscreenElement);
const standalone=navigator.standalone===true||(window.matchMedia&&matchMedia("(display-mode: fullscreen), (display-mode: standalone)").matches);
const toastEl=document.createElement("div");toastEl.id="toast";toastEl.hidden=true;document.body.appendChild(toastEl);
let toastT;
function note(msg){toastEl.textContent=msg;toastEl.hidden=false;_clrT(toastT);toastT=_setT(()=>{toastEl.hidden=true},3500)}
const ICON_IN='<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#3b2f2f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
const ICON_OUT='<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#3b2f2f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';
function syncFS(){fsBtn.innerHTML=inFS()?ICON_OUT:ICON_IN}
syncFS();
if(standalone)fsBtn.hidden=true;
else{
 let hold=0;
 fsBtn.addEventListener("click",()=>{
  if(inFS())return;                                 /* đang toàn màn hình: phải GIỮ 1 giây mới thoát */
  if(!reqFS){note("Thiết bị này không hỗ trợ. Hãy bấm Chia sẻ → Thêm vào Màn hình chính để chạy toàn màn hình.");return}
  Promise.resolve(reqFS.call(rootEl)).catch(()=>note("Không bật được toàn màn hình"));
 });
 fsBtn.addEventListener("pointerdown",()=>{if(!inFS())return;note("Giữ 1 giây để thoát toàn màn hình");hold=_setT(()=>exitFS.call(document),1000)});
 ["pointerup","pointerleave","pointercancel"].forEach(n=>fsBtn.addEventListener(n,()=>_clrT(hold)));
 ["fullscreenchange","webkitfullscreenchange"].forEach(n=>document.addEventListener(n,syncFS));
}

/* chặn thao tác mặc định của trình duyệt */
["gesturestart","gesturechange","gestureend"].forEach(n=>document.addEventListener(n,e=>e.preventDefault()));
document.addEventListener("touchmove",e=>{if(!e.target.closest("#games,#gallery,#dtray,#bar"))e.preventDefault()},{passive:false});
["contextmenu","selectstart","dblclick","dragstart"].forEach(n=>document.addEventListener(n,e=>e.preventDefault()));
try{history.pushState({k:1},"",location.href);addEventListener("popstate",()=>history.pushState({k:1},"",location.href))}catch(e){}

/* giữ màn hình sáng khi bé đang chơi */
let wakeLock=null;
async function keepAwake(){try{if("wakeLock" in navigator)wakeLock=await navigator.wakeLock.request("screen")}catch(e){}}
document.addEventListener("pointerdown",keepAwake,{once:true});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&wakeLock)keepAwake()});