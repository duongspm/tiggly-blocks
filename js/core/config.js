/* Bộ hẹn giờ có sổ theo dõi: clearAllTimers() hủy mọi hẹn giờ của trò cũ ngay lập tức khi đổi màn hình */
const _setT=window.setTimeout.bind(window),_clrT=window.clearTimeout.bind(window),liveTimers=new Set();
window.setTimeout=(f,ms,...a)=>{const id=_setT(()=>{liveTimers.delete(id);f(...a)},ms);liveTimers.add(id);return id};
window.clearTimeout=id=>{liveTimers.delete(id);_clrT(id)};
function clearAllTimers(){liveTimers.forEach(_clrT);liveTimers.clear()}

/* Cấu hình: các khối hình (màu, âm, SVG), ngưỡng nhận diện, biến trạng thái */
const SHAPES={
  circle:{name:"hình tròn",color:"#40c057",freq:392,svg:'<circle cx="50" cy="50" r="46"/>'},
  square:{name:"hình vuông",color:"#ef5b5b",freq:440,svg:'<rect x="6" y="6" width="88" height="88" rx="10"/>'},
  triangle:{name:"hình tam giác",color:"#f2b705",freq:523,svg:'<polygon points="50,6 94,92 6,92" stroke-linejoin="round" stroke="#f2b705" stroke-width="6"/>'},
  star:{name:"hình ngôi sao",color:"#4dabf7",freq:659,svg:'<polygon points="50,5 61,37 95,37 67,57 78,91 50,70 22,91 33,57 5,37 39,37" stroke-linejoin="round" stroke="#4dabf7" stroke-width="6"/>'}
};
let TOL=0.18;const SETTLE=60; /* TOL: sai số cho phép khi so khớp khoảng cách giữa các điểm chạm */
const board=document.getElementById("board"),hint=document.getElementById("hint"),statusEl=document.getElementById("status");
const radEl=document.getElementById("rad"),keepEl=document.getElementById("keep");
let samples={circle:[],square:[],triangle:[],star:[]},calib=null,calibKey="",calibT=null,timer=null;
const pts=new Map(),announced=new Map(),pending=new Map(),gone=new Map();

