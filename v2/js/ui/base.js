/* ===== GIAO DIỆN ===== */
const home=document.getElementById("games"),bar=document.getElementById("bar"),titleEl=document.getElementById("title"),gear=document.getElementById("gear");
function confetti(){for(let i=0;i<28;i++){const c=document.createElement("i");c.className="cf";c.style.left=Math.random()*100+"vw";c.style.background=rnd(["#ff6b6b","#fab005","#40c057","#4dabf7","#cc5de8"]);c.style.animationDelay=Math.random()*.4+"s";c.style.animationDuration=1.2+Math.random()+"s";c.addEventListener("animationend",()=>c.remove());document.body.appendChild(c)}}
function shake(){board.classList.remove("shake");void board.offsetWidth;board.classList.add("shake")}

