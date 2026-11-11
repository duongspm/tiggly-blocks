/* Lưu dữ liệu học khối vào localStorage */
/* ---------- lưu dữ liệu học ---------- */
try{const s=JSON.parse(localStorage.getItem("tiggly-samples")||"null");if(s)samples=Object.assign(samples,s)}catch(e){}
function save(){try{localStorage.setItem("tiggly-samples",JSON.stringify(samples))}catch(e){}}

