/* màn hình chính */
const TILE={free:["#ff6b6b","🎨","Vẽ cùng khối"],find:["#4dabf7","🔍","Tìm đúng hình"],pic:["#fab005","🧩","Ghép bức tranh"],count:["#845ef7","🔢","Đếm số"],pat:["#20c997","🔁","Hình tiếp theo"],riddle:["#e64980","❓","Câu đố hình"],bal:["#339af0","🎈","Bắn bóng bay"],draw:["#f06595","🎭","Tạo nhân vật"],saf:["#ff922b","🦁","Khám phá động vật"],mem:["#40c057","🧠","Nhớ thứ tự"]};
document.querySelectorAll("#games button").forEach(b=>{
 const m=b.dataset.m,[c,ic,sub]=TILE[m],go=b.onclick;
 b.className="tile";b.style.background=c;
 b.innerHTML=`<span class="ic">${ic}</span><span>${MODES[m][0]}</span><small>${sub}</small>`;
 b.onclick=ev=>transitionTo(c,ev,()=>{go();document.body.classList.remove("home");titleSwap(MODES[m][0]+" "+ic);playEnter()});
});
const logo=document.createElement("div");logo.className="brand";
logo.innerHTML=`<span class="bstar">★</span><div class="b1">Tiggly</div><div class="b2">Blocks</div><i class="bline"></i><div class="btag">Chơi · Học · Sáng tạo</div><div class="bby">by Duongg</div>`;
home.prepend(logo);
/* gom ô trò chơi theo 3 nhóm như ảnh banner */
const CATS=[["💡","Khám phá hình khối","#9c36b5",["saf","find","riddle"]],["⭐","Ghép hình sáng tạo","#2f9e44",["draw","pic","free"]],["🏆","Thử thách và nhận thưởng","#e8590c",["mem","pat","count","bal"]]];
CATS.forEach(([ic,nm,c,ms])=>{
 const s=document.createElement("section");s.className="cat";s.style.setProperty("--cc",c);
 s.innerHTML=`<h3>${ic} ${nm}</h3><div class="cgrid"></div>`;
 ms.forEach(m=>s.querySelector(".cgrid").appendChild(home.querySelector(`button[data-m="${m}"]`)));
 home.appendChild(s);
});
["circle","square","triangle","star"].forEach((t,i)=>{const d=document.createElement("div");d.className="deco d"+i;d.innerHTML=svg(t);home.appendChild(d)});
document.body.classList.add("home");
document.getElementById("homeBtn").onclick=ev=>transitionTo("#4dabf7",ev,()=>{setMode("free");document.body.classList.add("home");titleSwap("")});

