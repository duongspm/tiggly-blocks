/* Tạo nhân vật: kho bộ phận phong phú (mắt, miệng, mũi, mũ, tai, thân, trang trí), biểu cảm có sẵn, tô màu, xúc xắc.
   Nạp SAU draw.js: thay nội dung ACC và bổ sung các hàm cho gDraw. */
const OLD=Object.fromEntries(ACC.map(a=>[a[0],a]));
const twice=(s,dx)=>s+`<g transform='translate(${dx} 0)'>${s}</g>`;
const mirror=(s,w)=>s+`<g transform='translate(${w} 0) scale(-1 1)'>${s}</g>`;
const part=(id,n,w,h,vb,svg,g)=>[id,n,w,h,vb,svg,g||""];      /* [id, tên, rộng, cao, viewBox, svg, nhóm] */
const old=(id,g)=>[...OLD[id].slice(0,6),g||""];
const STAR="22,3 28,17 43,18 31,28 35,43 22,35 9,43 13,28 1,18 16,17",HEART="M22 44C4 32 0 18 8 10c7-6 13-2 14 4 1-6 7-10 14-4 8 8 4 22-14 34z";
const LINE=(c,w)=>`fill='none' stroke='${c}' stroke-width='${w}' stroke-linecap='round'`;
ACC.splice(0,ACC.length,
 /* --- mắt, lông mày --- */
 old("eyes","eyes"),
 part("eyesHappy","Cười híp",76,46,"0 0 100 60",`<path d='M8 40q20-36 40 0M52 40q20-36 40 0' ${LINE("#333",7)}/>`,"eyes"),
 part("eyesStar","Mắt sao",80,42,"0 0 100 50",twice(`<polygon points='${STAR}' fill='#ffd43b' stroke='#333' stroke-width='3' stroke-linejoin='round'/>`,50),"eyes"),
 part("eyesHeart","Mắt tim",80,42,"0 0 100 50",twice(`<path d='${HEART}' fill='#fa5252' stroke='#c92a2a' stroke-width='3' stroke-linejoin='round'/>`,50),"eyes"),
 part("eyesBig","Mắt to",84,50,"0 0 100 60",twice("<circle cx='26' cy='30' r='24' fill='#fff' stroke='#333' stroke-width='4'/><circle cx='29' cy='32' r='15' fill='#333'/><circle cx='35' cy='25' r='6' fill='#fff'/><circle cx='25' cy='38' r='3' fill='#fff'/>",48),"eyes"),
 part("eyesWink","Nháy mắt",76,46,"0 0 100 60",`<circle cx='28' cy='30' r='20' fill='#fff' stroke='#333' stroke-width='4'/><circle cx='32' cy='33' r='9' fill='#333'/><path d='M54 36q18-34 36 0' ${LINE("#333",7)}/>`,"eyes"),
 part("eyesSleep","Ngủ gật",76,40,"0 0 100 60",`<path d='M8 24q20 24 40 0M52 24q20 24 40 0' ${LINE("#333",7)}/>`,"eyes"),
 part("eyesDot","Mắt chấm",76,40,"0 0 100 60",twice("<circle cx='26' cy='30' r='11' fill='#333'/><circle cx='30' cy='26' r='4' fill='#fff'/>",48),"eyes"),
 part("browsHappy","Lông mày",80,24,"0 0 100 30",`<path d='M8 22q16-18 32 0M60 22q16-18 32 0' ${LINE("#6d4c2f",6)}/>`,"brow"),
 part("browsAngry","Giận dữ",80,24,"0 0 100 30",`<path d='M8 6l32 16M92 6l-32 16' ${LINE("#6d4c2f",7)}/>`,"brow"),
 part("browsSad","Buồn bã",80,24,"0 0 100 30",`<path d='M8 24l32-16M92 24l-32-16' ${LINE("#6d4c2f",7)}/>`,"brow"),
 /* --- miệng --- */
 old("mouth","mouth"),old("smile","mouth"),
 part("mouthTongue","Lè lưỡi",64,40,"0 0 100 60",`<path d='M12 10q38 30 76 0' ${LINE("#333",6)}/><path d='M42 28q8 24 20 0z' fill='#ff6b81' stroke='#333' stroke-width='3' stroke-linejoin='round'/>`,"mouth"),
 part("mouthO","Ồ!",44,44,"0 0 100 60","<ellipse cx='50' cy='28' rx='15' ry='20' fill='#7a1d1d' stroke='#333' stroke-width='5'/>","mouth"),
 part("mouthCat","Miệng mèo",64,32,"0 0 100 60",`<path d='M10 10q20 30 40 0q20 30 40 0' ${LINE("#333",6)}/>`,"mouth"),
 part("mouthTeeth","Cười lộ răng",64,40,"0 0 100 60","<path d='M8 8q42 54 84 0z' fill='#fff' stroke='#333' stroke-width='5' stroke-linejoin='round'/><path d='M50 10v34M29 10v28M71 10v28' stroke='#333' stroke-width='2.5'/>","mouth"),
 part("mouthSad","Buồn",64,30,"0 0 100 60",`<path d='M14 42q36-44 72 0' ${LINE("#333",6)}/>`,"mouth"),
 part("mouthFang","Răng nanh",64,34,"0 0 100 60",`<path d='M10 10q40 36 80 0' ${LINE("#333",5)}/><polygon points='24,22 36,24 30,40' fill='#fff' stroke='#333' stroke-width='2.5'/><polygon points='64,24 76,22 70,40' fill='#fff' stroke='#333' stroke-width='2.5'/>`,"mouth"),
 /* --- mũi, má --- */
 old("nose","nose"),
 part("noseButton","Mũi tròn",40,34,"0 0 100 60","<circle cx='50' cy='30' r='22' fill='#ff6b6b' stroke='#c92a2a' stroke-width='4'/><circle cx='42' cy='22' r='6' fill='#fff' opacity='.7'/>","nose"),
 part("noseTri","Mũi tam giác",40,32,"0 0 100 60","<polygon points='28,12 72,12 50,48' fill='#f06595' stroke='#a61e4d' stroke-width='4' stroke-linejoin='round'/>","nose"),
 part("noseCarrot","Cà rốt",70,34,"0 0 100 60","<polygon points='10,14 94,30 10,46' fill='#ff922b' stroke='#d9480f' stroke-width='4' stroke-linejoin='round'/><path d='M34 24l6 6M50 24l6 6M34 36l6-4' stroke='#d9480f' stroke-width='3'/>","nose"),
 part("noseBeak","Mỏ vịt",64,34,"0 0 100 60","<path d='M8 26q42-28 84 0q-42 24-84 0z' fill='#ffd43b' stroke='#e67700' stroke-width='4' stroke-linejoin='round'/>","nose"),
 part("blush","Má hồng",130,34,"0 0 100 60","<ellipse cx='16' cy='30' rx='15' ry='10' fill='#ff8787' opacity='.75'/><ellipse cx='84' cy='30' rx='15' ry='10' fill='#ff8787' opacity='.75'/>","cheek"),
 part("freckles","Tàn nhang",110,30,"0 0 100 60","<g fill='#a0643a'><circle cx='10' cy='24' r='4'/><circle cx='22' cy='34' r='4'/><circle cx='24' cy='20' r='4'/><circle cx='90' cy='24' r='4'/><circle cx='78' cy='34' r='4'/><circle cx='76' cy='20' r='4'/></g>","cheek"),
 /* --- mũ, kính --- */
 old("hat"),
 part("hatParty","Mũ sinh nhật",56,50,"0 0 100 60","<polygon points='50,6 18,56 82,56' fill='#4dabf7' stroke='#1c7ed6' stroke-width='4' stroke-linejoin='round'/><path d='M32 38h36M25 48h50' stroke='#fff' stroke-width='4'/><circle cx='50' cy='8' r='8' fill='#ffd43b' stroke='#e67700' stroke-width='3'/>"),
 part("hatCrown","Vương miện",64,48,"0 0 100 60","<path d='M10 54V16l22 17 18-26 18 26 22-17v38z' fill='#ffd43b' stroke='#e67700' stroke-width='4' stroke-linejoin='round'/><circle cx='30' cy='44' r='4.5' fill='#fa5252'/><circle cx='50' cy='44' r='4.5' fill='#4dabf7'/><circle cx='70' cy='44' r='4.5' fill='#69db7c'/>"),
 part("hatWizard","Mũ phù thủy",70,56,"0 0 100 60","<polygon points='50,2 24,46 76,46' fill='#7950f2' stroke='#4c2fb3' stroke-width='4' stroke-linejoin='round'/><ellipse cx='50' cy='50' rx='44' ry='8' fill='#7950f2' stroke='#4c2fb3' stroke-width='4'/><polygon points='50,16 54,26 64,26 56,32 59,42 50,36 41,42 44,32 36,26 46,26' fill='#ffd43b'/>"),
 part("hatCap","Mũ lưỡi trai",70,46,"0 0 100 60","<path d='M14 46q0-42 36-42t36 42z' fill='#4dabf7' stroke='#1c7ed6' stroke-width='4' stroke-linejoin='round'/><path d='M56 46h40q0 10-16 10H56z' fill='#1c7ed6'/><circle cx='50' cy='6' r='5' fill='#ffd43b'/>"),
 part("hatFlower","Vòng hoa",64,56,"0 0 100 60","<g fill='#ff8fb1' stroke='#c2255c' stroke-width='3'><circle cx='50' cy='12' r='10'/><circle cx='66' cy='24' r='10'/><circle cx='60' cy='42' r='10'/><circle cx='40' cy='42' r='10'/><circle cx='34' cy='24' r='10'/></g><circle cx='50' cy='28' r='10' fill='#ffd43b' stroke='#e67700' stroke-width='3'/>"),
 part("glasses","Kính",86,52,"0 0 100 60","<circle cx='28' cy='30' r='21' fill='#e7f5ff' fill-opacity='.55' stroke='#333' stroke-width='5'/><circle cx='72' cy='30' r='21' fill='#e7f5ff' fill-opacity='.55' stroke='#333' stroke-width='5'/><path d='M49 28h2' stroke='#333' stroke-width='5'/>"),
 part("sunglasses","Kính râm",86,48,"0 0 100 60","<rect x='4' y='14' width='40' height='32' rx='13' fill='#212529'/><rect x='56' y='14' width='40' height='32' rx='13' fill='#212529'/><path d='M44 24h12' stroke='#212529' stroke-width='5'/><path d='M12 24h12M64 24h12' stroke='#fff' stroke-width='3' opacity='.45' stroke-linecap='round'/>"),
 /* --- tai, sừng, râu, tóc --- */
 old("ears"),
 part("earsBear","Tai gấu",130,56,"0 0 100 60",twice("<circle cx='16' cy='34' r='16' fill='#c98b5a' stroke='#8d5a2b' stroke-width='4'/><circle cx='16' cy='34' r='7' fill='#f3d1b0'/>",68)),
 part("earsCat","Tai mèo",130,56,"0 0 100 60",mirror("<polygon points='4,52 8,6 40,36' fill='#ffa94d' stroke='#d9480f' stroke-width='4' stroke-linejoin='round'/><polygon points='12,42 14,20 29,35' fill='#ffc9c9'/>",100)),
 part("horns","Sừng",120,52,"0 0 100 60",mirror("<path d='M8 54q-8-28 12-48q4 24 16 40z' fill='#ffe066' stroke='#e67700' stroke-width='4' stroke-linejoin='round'/>",100)),
 part("antennae","Râu",110,52,"0 0 100 60",`<path d='M30 58Q22 26 14 12M70 58q8-32 16-46' ${LINE("#333",5)}/><circle cx='14' cy='12' r='8' fill='#fa5252' stroke='#333' stroke-width='3'/><circle cx='86' cy='12' r='8' fill='#fa5252' stroke='#333' stroke-width='3'/>`),
 part("tuft","Chỏm tóc",44,44,"0 0 100 60",`<path d='M30 58q-8-30 6-50M48 58q0-34 6-52M66 58q8-30-2-46' ${LINE("#6d4c2f",8)}/>`),
 /* --- thân --- */
 old("arms"),old("legs"),
 part("wings","Cánh",190,56,"0 0 200 60",mirror("<path d='M34 4q-30 6-28 30q2 20 26 24q-6-18 6-28q-4-14-4-26z' fill='#fff' stroke='#74c0fc' stroke-width='4' stroke-linejoin='round'/>",200)),
 part("tail","Đuôi",60,42,"0 0 100 60",`<path d='M10 52q50 4 54-24q2-16 22-18' ${LINE("#c98b5a",10)}/><circle cx='88' cy='10' r='9' fill='#c98b5a'/>`),
 part("scarf","Khăn quàng",80,52,"0 0 100 60","<path d='M6 12q44 20 88 0v20q-44 20-88 0z' fill='#fa5252' stroke='#c92a2a' stroke-width='4' stroke-linejoin='round'/><path d='M62 34l-4 22h18l-2-20' fill='#fa5252' stroke='#c92a2a' stroke-width='4' stroke-linejoin='round'/><path d='M20 20q30 12 60 0' stroke='#fff' stroke-width='3' fill='none' opacity='.6'/>"),
 old("bow"),
 part("belly","Bụng",100,60,"0 0 100 60","<ellipse cx='50' cy='30' rx='46' ry='27' fill='#fff8e1' stroke='#ffe0a3' stroke-width='3'/>"),
 part("buttons","Cúc áo",24,64,"0 0 40 100","<g fill='#4dabf7' stroke='#1c7ed6' stroke-width='3'><circle cx='20' cy='16' r='11'/><circle cx='20' cy='50' r='11'/><circle cx='20' cy='84' r='11'/></g>"),
 part("shoes","Giày",120,40,"0 0 100 40","<path d='M2 34q0-24 26-24h12v24z' fill='#fa5252' stroke='#c92a2a' stroke-width='3' stroke-linejoin='round'/><path d='M98 34q0-24-26-24H60v24z' fill='#fa5252' stroke='#c92a2a' stroke-width='3' stroke-linejoin='round'/>"),
 /* --- trang trí --- */
 part("heart","Trái tim",44,40,"0 0 100 60","<path d='M50 56C14 36 8 14 24 6c12-6 22 2 26 10 4-8 14-16 26-10 16 8 10 30-26 50z' fill='#fa5252' stroke='#c92a2a' stroke-width='4' stroke-linejoin='round'/>"),
 part("sparkle","Lấp lánh",44,44,"0 0 100 60","<path d='M50 2q4 26 28 28-24 2-28 28-4-26-28-28 24-2 28-28z' fill='#ffd43b' stroke='#e67700' stroke-width='3' stroke-linejoin='round'/>"),
 part("flowerDeco","Bông hoa",44,44,"0 0 100 60","<g fill='#ff8fb1' stroke='#c2255c' stroke-width='3'><circle cx='50' cy='12' r='10'/><circle cx='66' cy='24' r='10'/><circle cx='60' cy='42' r='10'/><circle cx='40' cy='42' r='10'/><circle cx='34' cy='24' r='10'/></g><circle cx='50' cy='28' r='10' fill='#ffd43b' stroke='#e67700' stroke-width='3'/>"),
 part("drop","Giọt mồ hôi",26,38,"0 0 60 60","<path d='M30 4q22 24 16 34a16 16 0 0 1-32 0q-6-10 16-34z' fill='#74c0fc' stroke='#1c7ed6' stroke-width='3'/>"),
 part("tear","Giọt nước mắt",22,32,"0 0 60 60","<path d='M30 4q22 24 16 34a16 16 0 0 1-32 0q-6-10 16-34z' fill='#a5d8ff' stroke='#1c7ed6' stroke-width='3'/>"),
 part("zzz","Zzz",56,34,"0 0 100 60","<text x='6' y='50' font-size='46' font-weight='700' fill='#4c6ef5' font-family='sans-serif'>Zz</text>"),
 part("note","Nốt nhạc",40,40,"0 0 100 60","<path d='M34 8v34a12 10 0 1 1-8-9V14l36-8v28a12 10 0 1 1-8-9z' fill='#be4bdb' stroke='#862e9c' stroke-width='3' stroke-linejoin='round'/>")
);
/* --- bộ phận theo chủ đề: biển, vũ trụ, cổ tích, lễ hội --- */
ACC.push(
 part("snorkel","Kính lặn",90,52,"0 0 100 60","<path d='M94 22q10-4 4-22' fill='none' stroke='#1971c2' stroke-width='6' stroke-linecap='round'/><rect x='4' y='12' width='86' height='38' rx='16' fill='#a5d8ff' fill-opacity='.65' stroke='#1971c2' stroke-width='5'/><path d='M14 26q14-8 28-4' stroke='#fff' stroke-width='4' stroke-linecap='round' fill='none' opacity='.8'/>"),
 part("sailor","Mũ thủy thủ",70,40,"0 0 100 60","<path d='M12 44q0-38 38-38t38 38z' fill='#fff' stroke='#adb5bd' stroke-width='4' stroke-linejoin='round'/><rect x='12' y='34' width='76' height='10' fill='#4dabf7'/><path d='M8 50h84' stroke='#adb5bd' stroke-width='5' stroke-linecap='round'/>"),
 part("fin","Vây cá",60,50,"0 0 100 60","<path d='M10 58q8-48 56-54-14 18-8 54z' fill='#4dabf7' stroke='#1c7ed6' stroke-width='4' stroke-linejoin='round'/>"),
 part("shell","Vỏ sò",56,44,"0 0 100 60","<path d='M50 56L8 24q8-20 42-20t42 20z' fill='#ffc9d9' stroke='#e64980' stroke-width='4' stroke-linejoin='round'/><path d='M50 56L24 14M50 56V6M50 56l26-42' stroke='#e64980' stroke-width='3' fill='none'/>"),
 part("crab","Càng cua",160,50,"0 0 200 60",mirror("<path d='M30 56q-26-8-24-34' stroke='#fa5252' stroke-width='9' fill='none' stroke-linecap='round'/><path d='M6 22q-6-14 8-18 6 10 2 18zM16 22q4-14 18-14-2 12-12 18z' fill='#fa5252' stroke='#c92a2a' stroke-width='3' stroke-linejoin='round'/>",200)),
 part("bubbles","Bong bóng",44,44,"0 0 100 60","<g fill='#e7f5ff' fill-opacity='.7' stroke='#74c0fc' stroke-width='4'><circle cx='30' cy='40' r='16'/><circle cx='64' cy='22' r='12'/><circle cx='74' cy='48' r='8'/></g>"),
 part("antennaG","Ăng-ten",110,52,"0 0 100 60",`<path d='M30 58Q24 28 18 14M70 58q6-30 12-44' ${LINE("#2b8a3e",5)}/><circle cx='18' cy='12' r='9' fill='#69db7c' stroke='#2b8a3e' stroke-width='3'/><circle cx='82' cy='12' r='9' fill='#69db7c' stroke='#2b8a3e' stroke-width='3'/>`),
 part("ufo","Mũ UFO",76,40,"0 0 100 60","<path d='M30 34q0-26 20-26t20 26z' fill='#a5d8ff' stroke='#1c7ed6' stroke-width='4' stroke-linejoin='round'/><ellipse cx='50' cy='38' rx='44' ry='14' fill='#ced4da' stroke='#868e96' stroke-width='4'/><g fill='#ffd43b'><circle cx='24' cy='40' r='4'/><circle cx='50' cy='45' r='4'/><circle cx='76' cy='40' r='4'/></g>"),
 part("alienEyes","Mắt người ngoài hành tinh",84,52,"0 0 100 60",twice("<ellipse cx='24' cy='30' rx='16' ry='24' fill='#212529' transform='rotate(-14 24 30)'/><ellipse cx='19' cy='21' rx='4' ry='6' fill='#fff' opacity='.85'/>",52),"eyes"),
 part("planet","Hành tinh",48,40,"0 0 100 60","<circle cx='50' cy='30' r='20' fill='#ffa94d' stroke='#d9480f' stroke-width='4'/><ellipse cx='50' cy='32' rx='44' ry='10' fill='none' stroke='#ffd43b' stroke-width='5' transform='rotate(-14 50 32)'/>"),
 part("rocket","Tên lửa",34,50,"0 0 60 100","<path d='M30 4q18 16 14 52H16Q12 20 30 4z' fill='#f1f3f5' stroke='#868e96' stroke-width='3'/><circle cx='30' cy='32' r='7' fill='#4dabf7' stroke='#1c7ed6' stroke-width='3'/><path d='M16 46l-10 14 10-2zM44 46l10 14-10-2z' fill='#fa5252'/><path d='M22 58q8 26 16 0z' fill='#ffa94d'/>"),
 part("moon","Trăng khuyết",36,40,"0 0 100 60","<path d='M62 6a26 26 0 1 0 0 48 22 22 0 1 1 0-48z' fill='#ffe066' stroke='#e67700' stroke-width='4' stroke-linejoin='round'/>"),
 part("fairyWings","Cánh tiên",190,56,"0 0 200 60",mirror("<ellipse cx='54' cy='22' rx='44' ry='18' transform='rotate(-22 54 22)' fill='#e599f7' fill-opacity='.7' stroke='#ae3ec9' stroke-width='3'/><ellipse cx='56' cy='44' rx='30' ry='13' transform='rotate(22 56 44)' fill='#ffc9ff' fill-opacity='.7' stroke='#ae3ec9' stroke-width='3'/>",200)),
 part("wand","Đũa phép",46,56,"0 0 100 100","<path d='M18 94l36-46' stroke='#e67700' stroke-width='8' stroke-linecap='round'/><polygon points='66,4 74,26 98,28 80,43 86,66 66,53 46,66 52,43 34,28 58,26' fill='#ffd43b' stroke='#e67700' stroke-width='4' stroke-linejoin='round'/>"),
 part("unicornHorn","Sừng kỳ lân",30,56,"0 0 100 100","<polygon points='50,4 72,92 28,92' fill='#fff3bf' stroke='#fab005' stroke-width='5' stroke-linejoin='round'/><path d='M38 66l28-10M42 44l22-8' stroke='#fab005' stroke-width='4'/>"),
 part("tiara","Vương miện nhỏ",64,36,"0 0 100 60","<path d='M10 52q40-56 80 0' fill='none' stroke='#ffd43b' stroke-width='7' stroke-linecap='round'/><circle cx='50' cy='14' r='8' fill='#f783ac' stroke='#c2255c' stroke-width='3'/><circle cx='24' cy='28' r='5.5' fill='#74c0fc'/><circle cx='76' cy='28' r='5.5' fill='#74c0fc'/>"),
 part("rainbow","Cầu vồng",64,40,"0 0 100 60","<g fill='none' stroke-width='7'><path d='M8 56a42 42 0 0 1 84 0' stroke='#ff6b6b'/><path d='M16 56a34 34 0 0 1 68 0' stroke='#ffd43b'/><path d='M24 56a26 26 0 0 1 52 0' stroke='#69db7c'/><path d='M32 56a18 18 0 0 1 36 0' stroke='#4dabf7'/></g>"),
 part("butterfly","Bướm",50,40,"0 0 100 60","<path d='M50 30q-28-30-40-10-6 22 40 12zM50 30q28-30 40-10 6 22-40 12z' fill='#74c0fc' stroke='#1c7ed6' stroke-width='3'/><path d='M50 32q-20 22-30 14 4-14 30-14zM50 32q20 22 30 14-4-14-30-14z' fill='#da77f2' stroke='#9c36b5' stroke-width='3'/><rect x='47' y='14' width='6' height='38' rx='3' fill='#5c3d2e'/>"),
 part("santaHat","Mũ ông già Noel",70,52,"0 0 100 60","<path d='M12 48q8-42 46-42-10 16-6 28 18 4 30 14z' fill='#fa5252' stroke='#c92a2a' stroke-width='4' stroke-linejoin='round'/><rect x='8' y='44' width='84' height='14' rx='7' fill='#fff' stroke='#ced4da' stroke-width='3'/><circle cx='58' cy='8' r='8' fill='#fff' stroke='#ced4da' stroke-width='3'/>"),
 part("antlers","Sừng tuần lộc",130,52,"0 0 100 60",mirror(`<path d='M22 58q-6-30 6-52M26 34l-14-10M28 20l12-10' ${LINE("#8d5a2b",6)}/>`,100)),
 part("pumpkin","Bí ngô",44,40,"0 0 100 60","<ellipse cx='50' cy='34' rx='38' ry='24' fill='#ff922b' stroke='#d9480f' stroke-width='4'/><path d='M50 10v48M32 14q-10 20 0 40M68 14q10 20 0 40' stroke='#d9480f' stroke-width='3' fill='none'/><path d='M50 10q4-10 12-8' stroke='#2b8a3e' stroke-width='5' stroke-linecap='round' fill='none'/>"),
 part("snowflake","Bông tuyết",40,40,"0 0 100 100",`<g ${LINE("#74c0fc",7)}><path d='M50 8v84M14 29l72 42M86 29L14 71'/></g>`),
 part("gift","Hộp quà",40,40,"0 0 100 100","<rect x='12' y='38' width='76' height='54' rx='6' fill='#ff8787' stroke='#c92a2a' stroke-width='5'/><rect x='6' y='28' width='88' height='16' rx='5' fill='#fa5252' stroke='#c92a2a' stroke-width='5'/><path d='M50 28v64' stroke='#ffd43b' stroke-width='10'/><path d='M50 28q-26-24-26-8t26 8q26 16 26 0t-26-0z' fill='#ffd43b' stroke='#e67700' stroke-width='3'/>"),
 part("balloon","Bóng bay",30,50,"0 0 60 100","<ellipse cx='30' cy='34' rx='24' ry='30' fill='#fa5252' stroke='#c92a2a' stroke-width='4'/><path d='M30 64q-8 12 0 30' stroke='#868e96' stroke-width='3' fill='none'/><ellipse cx='20' cy='22' rx='5' ry='8' fill='#fff' opacity='.6'/>")
);
const partGroup=a=>(ACC.find(x=>x[0]===a.dataset.a)||[])[6]||"";
const FACE=new Set(["eyes","brow","mouth","nose","cheek"]);
const COLORS=["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#9775fa","#f783ac","#c98b5a","#ced4da"];
const TABS=[["emo","😜","Biểu cảm"],["eyes","👀","Mắt"],["mouth","👄","Miệng"],["nose","👃","Mũi & má"],["hat","🎩","Mũ & kính"],["ear","🐰","Tai & tóc"],["body","🧸","Thân"],["deco","✨","Trang trí"],["color","🎨","Màu"],["sea","🌊","Biển"],["space","🚀","Vũ trụ"],["fairy","🧚","Cổ tích"],["party","🎃","Lễ hội"],["tools","⚙️","Công cụ"]];
const TABITEMS={
 eyes:["eyes","eyesHappy","eyesStar","eyesHeart","eyesBig","eyesWink","eyesSleep","eyesDot","browsHappy","browsAngry","browsSad"],
 mouth:["mouth","smile","mouthTongue","mouthO","mouthCat","mouthTeeth","mouthSad","mouthFang"],
 nose:["nose","noseButton","noseTri","noseCarrot","noseBeak","blush","freckles"],
 hat:["hat","hatParty","hatCrown","hatWizard","hatCap","hatFlower","glasses","sunglasses"],
 ear:["ears","earsBear","earsCat","horns","antennae","tuft"],
 body:["arms","legs","wings","tail","scarf","bow","belly","buttons","shoes"],
 deco:["heart","sparkle","flowerDeco","drop","tear","zzz","note"],
 sea:["snorkel","sailor","fin","shell","crab","bubbles"],
 space:["antennaG","ufo","alienEyes","planet","rocket","moon"],
 fairy:["fairyWings","wand","unicornHorn","tiara","rainbow","butterfly"],
 party:["santaHat","antlers","pumpkin","snowflake","gift","balloon"]
};
/* biểu cảm có sẵn: [id, lệch ngang, lệch dọc] so với tâm nhân vật */
const PRESETS={
 happy:{e:"😊",n:"Vui",p:[["eyesHappy",0,-18],["noseButton",0,8],["smile",0,38],["blush",0,22]]},
 laugh:{e:"😄",n:"Cười to",p:[["eyesHappy",0,-18],["noseButton",0,8],["mouthTeeth",0,40],["blush",0,22]]},
 wow:{e:"😮",n:"Ngạc nhiên",p:[["eyesBig",0,-18],["browsHappy",0,-52],["noseButton",0,8],["mouthO",0,42]]},
 love:{e:"😍",n:"Yêu thích",p:[["eyesHeart",0,-18],["noseButton",0,8],["smile",0,38],["blush",0,22]]},
 star:{e:"🤩",n:"Mắt sao",p:[["eyesStar",0,-18],["noseButton",0,8],["mouthTeeth",0,40],["blush",0,22]]},
 silly:{e:"😜",n:"Tinh nghịch",p:[["eyesWink",0,-18],["noseButton",0,8],["mouthTongue",0,38],["blush",0,22]]},
 cool:{e:"😎",n:"Ngầu",p:[["eyesDot",0,-18],["sunglasses",0,-18],["noseTri",0,10],["smile",0,40]]},
 sleepy:{e:"😴",n:"Buồn ngủ",p:[["eyesSleep",0,-18],["noseButton",0,8],["smile",0,38],["zzz",70,-62]]},
 sad:{e:"😢",n:"Buồn",p:[["eyesDot",0,-18],["browsSad",0,-48],["noseButton",0,8],["mouthSad",0,42],["tear",-36,6]]},
 angry:{e:"😠",n:"Giận",p:[["eyesDot",0,-18],["browsAngry",0,-48],["noseButton",0,8],["mouthSad",0,42]]},
 cat:{e:"🐱",n:"Mèo",p:[["earsCat",0,-84],["eyesDot",0,-16],["noseTri",0,8],["mouthCat",0,30]]},
 bunny:{e:"🐰",n:"Thỏ",p:[["ears",0,-86],["eyesDot",0,-16],["noseButton",0,8],["smile",0,34],["blush",0,20]]},
 bear:{e:"🐻",n:"Gấu",p:[["earsBear",0,-72],["eyesDot",0,-16],["noseButton",0,8],["smile",0,34]]}
};
Object.assign(gDraw,{
 buildTray(){ /* khay thu gọn: chỉ còn một nút nhỏ khi đóng; thẻ chỉ có biểu tượng */
  const tr=document.createElement("div");tr.id="dtray";
  tr.innerHTML=`<button id="dhandle" aria-label="Bộ phận"></button><div class="dsheet"><div class="dtabs">${TABS.map(t=>`<button data-t="${t[0]}" aria-label="${t[2]}">${t[1]}</button>`).join("")}</div><div class="ditems"></div></div><div id="dtrash">🗑</div>`;
  tr.addEventListener("pointerdown",e=>{
   e.stopPropagation();
   if(e.target.closest("#dhandle")){this.tray(!tr.classList.contains("open"));return}
   const t=e.target.closest("[data-t]");if(t){this.tab(t.dataset.t);return}
   const a=e.target.closest("[data-a]");if(a){e.preventDefault();this.spawn(a.dataset.a,e);return}
   const p=e.target.closest("[data-p]");if(p){this.preset(p.dataset.p);return}
   const c=e.target.closest("[data-c]");if(c){e.preventDefault();this.spawnPaint(c.dataset.c,e);return}
   const s=e.target.closest("[data-scene]");if(s){setScene(s.dataset.scene);return}
   if(e.target.closest("[data-clear]")){this.askClear();return}
   if(e.target.closest("[data-dice]"))this.dice();
  });
  board.appendChild(tr);this.tab("emo");this.tray(false);
 },
 tray(open){const tr=document.getElementById("dtray");if(!tr)return;tr.classList.toggle("open",open);document.getElementById("dhandle").textContent=open?"▾":"🧩 ▴"},
 trash(on){const t=document.getElementById("dtrash");if(t){t.classList.toggle("on",on);if(!on)t.classList.remove("hot")}},
 overTrash(el){const [x,y]=this.pos(el),W=board.clientWidth,H=board.clientHeight;return !!W&&Math.hypot(x-W/2,y-(H-50))<60},
 tab(k){
  const tr=document.getElementById("dtray");if(!tr)return;
  tr.querySelectorAll(".dtabs button").forEach(b=>b.classList.toggle("on",b.dataset.t===k));
  const item=id=>{const a=ACC.find(x=>x[0]===id);return `<button data-a="${id}"><svg viewBox="${a[4]}">${a[5]}</svg><small>${a[1]}</small></button>`};
  const SC=[["meadow","🌳","Đồng cỏ"],["sea","🌊","Biển"],["safari","🦁","Thảo nguyên"],["sky","☁️","Bầu trời"]];
  tr.querySelector(".ditems").innerHTML=k==="emo"
   ?Object.entries(PRESETS).map(([id,p])=>`<button data-p="${id}"><span class="em">${p.e}</span><small>${p.n}</small></button>`).join("")+`<button data-dice="1"><span class="em">🎲</span><small>Ngẫu nhiên</small></button>`
   :k==="color"?COLORS.map(c=>`<button data-c="${c}"><i class="sw" style="background:${c}"></i><small>Tô màu</small></button>`).join("")
   :k==="tools"?SC.map(s=>`<button data-scene="${s[0]}"><span class="em">${s[1]}</span><small>${s[2]}</small></button>`).join("")+`<button data-clear="1"><span class="em">🗑</span><small>Xóa tất cả</small></button>`
   :TABITEMS[k].map(item).join("");
 },
 target(){ /* nhân vật chưa hoàn thành đang chọn (hoặc nhân vật chưa xong đầu tiên) */
  const c=(st.sel&&!st.sel._fin)?st.sel:st.ch.find(k=>!k._fin);
  if(!c)say("Hãy đặt một khối để tạo nhân vật trước nhé");
  return c;
 },
 addPart(c,id,dx,dy){
  const a=this.mkAcc(id),[cx,cy]=this.pos(c);this.place(a,cx+dx,cy+dy);a._ch=c;a._ox=dx;a._oy=dy;return a;
 },
 preset(id){
  const c=this.target();if(!c)return;
  const p=PRESETS[id],ids=new Set(p.p.map(x=>x[0]));
  this.parts(c).forEach(a=>{if(FACE.has(partGroup(a))||ids.has(a.dataset.a))a.remove()});  /* bỏ mặt cũ rồi vẽ biểu cảm mới */
  p.p.forEach(([pid,dx,dy])=>this.addPart(c,pid,dx,dy));
  this.select(c);beep(700);this.progress(c)||say(p.n);
 },
 dice(){ /* ngẫu nhiên: biểu cảm + mũ + màu */
  const c=this.target();if(!c)return;
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  this.preset(pick(Object.keys(PRESETS)));
  const hat=pick(["hat","hatParty","hatCrown","hatWizard","hatCap","hatFlower",null,null]);
  if(hat&&!this.parts(c).some(a=>a.dataset.a.startsWith("ears")))this.addPart(c,hat,0,-98);
  this.paint(c,pick(COLORS));
 },
 paint(c,color){c.querySelector("svg").style.fill=color},
 spawnPaint(color,e){
  const el=document.createElement("div");el.className="acc paint";el.dataset.paint=color;
  el.style.cssText=`width:44px;height:44px;left:0;top:0;background:${color}`;
  el.onpointerdown=ev=>{ev.stopPropagation();el.setPointerCapture(ev.pointerId);this.startDrag(el,ev)};
  board.appendChild(el);const r=board.getBoundingClientRect();
  this.place(el,e.clientX-r.left,e.clientY-r.top);el.setPointerCapture(e.pointerId);this.startDrag(el,e);
 }
});
{ /* thả giọt màu lên nhân vật = đổi màu thân; thả vào thùng rác = xóa */
 const dropBase=gDraw.drop;
 gDraw.drop=function(el){
  const over=this.overTrash(el);this.trash(false);
  if(over){el.remove();beep(300);return}
  if(!el.dataset.paint)return dropBase.call(this,el);
  const [x,y]=this.pos(el),tr=document.getElementById("dtray"),low=tr&&board.clientHeight&&y>board.clientHeight-tr.offsetHeight;
  const c=st.ch.find(k=>Math.hypot(this.pos(k)[0]-x,this.pos(k)[1]-y)<95);
  el.remove();
  if(c&&!low){this.paint(c,el.dataset.paint);beep(700);say("Đẹp quá!")}
 };
}
{ /* giao diện gọn: giao diện thu lại khi kéo bộ phận, tự mở khi cần */
 const start0=gDraw.start,drag0=gDraw.startDrag,place0=gDraw.place,block0=gDraw.block,tap0=gDraw.tap,fin0=gDraw.finish;
 gDraw.start=function(){start0.call(this);hudSet("Đặt khối để tạo nhân vật")};
 gDraw.startDrag=function(el,e){if(el.classList.contains("acc")){this.tray(false);this.trash(true)}drag0.call(this,el,e)};  /* kéo bộ phận: thu khay, hiện thùng rác */
 gDraw.place=function(el,x,y){place0.call(this,el,x,y);if(el.classList.contains("acc")){const t=document.getElementById("dtrash");if(t&&t.classList.contains("on"))t.classList.toggle("hot",this.overTrash(el))}};
 gDraw.block=function(t,x,y,n){const k=st.ch.length;block0.call(this,t,x,y,n);if(st.ch.length>k)this.tray(true)};          /* có nhân vật mới: mở khay */
 gDraw.tap=function(c){tap0.call(this,c);if(!c._fin)this.tray(true)};                                                    /* chạm nhân vật chưa xong: mở khay */
 gDraw.finish=function(c){fin0.call(this,c);if(!st.ch.some(k=>!k._fin))this.tray(false)};                                 /* xong hết: thu khay */
}
