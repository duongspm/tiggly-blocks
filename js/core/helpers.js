/* Âm thanh (beep), giọng nói (say), tạo SVG khối hình */
/* ---------- âm thanh / giọng nói ---------- */
let ac;
function beep(f){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.setValueAtTime(.25,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+.4);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+.4)}catch(e){}}
function say(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="vi-VN";speechSynthesis.speak(u)}catch(e){}}
const svg=t=>`<svg viewBox="0 0 100 100" fill="${SHAPES[t].color}">${SHAPES[t].svg}</svg>`;

