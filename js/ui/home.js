/* màn hình chính */
const TILE={free:["#ff6b6b","🎨","Vẽ cùng khối"],find:["#4dabf7","🔍","Tìm đúng hình"],pic:["#fab005","🧩","Ghép bức tranh"],saf:["#ff922b","🦁","Khám phá động vật"],mem:["#40c057","🧠","Nhớ thứ tự"]};
document.querySelectorAll("#games button").forEach(b=>{
 const m=b.dataset.m,[c,ic,sub]=TILE[m],go=b.onclick;
 b.className="tile";b.style.background=c;
 b.innerHTML=`<span class="ic">${ic}</span><span>${MODES[m][0]}</span><small>${sub}</small>`;
 b.onclick=()=>{go();document.body.classList.remove("home");titleEl.textContent=MODES[m][0]+" "+ic};
});
const logo=document.createElement("div");logo.className="logo";
logo.innerHTML=[..."Tiggly"].map((ch,i)=>`<span style="color:${["#ff6b6b","#fab005","#40c057","#4dabf7","#cc5de8","#ff922b"][i]}">${ch}</span>`).join("")+"<small>Học hình cùng các khối</small>";
home.prepend(logo);
["circle","square","triangle"].forEach((t,i)=>{const d=document.createElement("div");d.className="deco d"+i;d.innerHTML=svg(t);home.appendChild(d)});
document.body.classList.add("home");
document.getElementById("homeBtn").onclick=()=>{setMode("free");document.body.classList.add("home")};

