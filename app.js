const cfg = window.DBL_CONFIG || {};
const $ = (s) => document.querySelector(s);
const pages = ["home","play","skins","server","settings"];
let selectedVersion = "1.8.8";
let allSkins = [];

function go(page){
  pages.forEach(p => $("#page-"+p).classList.toggle("active",p===page));
  document.querySelectorAll(".nav-item[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  $("#page-name").textContent = page.charAt(0).toUpperCase()+page.slice(1);
  window.location.hash = page;
  if(page==="skins" && !allSkins.length) loadSkins();
}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.page)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
document.querySelectorAll(".version-card").forEach(card=>card.addEventListener("click",()=>{
  selectedVersion=card.dataset.version;
  document.querySelectorAll(".version-card").forEach(c=>c.classList.toggle("selected",c===card));
  $("#selected-version").textContent="Minecraft "+selectedVersion;
}));
$("#launch-btn").addEventListener("click",()=>{
  const saved112=localStorage.getItem("dbl_112") || cfg.minecraft1122Url || "";
  const url=selectedVersion==="1.8.8"?(localStorage.getItem("dbl_188")||cfg.eaglercraftUrl||""):saved112;
  if(!url){alert("Minecraft 1.12.2 is not configured yet. Add its browser client URL in Settings.");go("settings");return;}
  window.open(url,"_blank","noopener,noreferrer");
});
async function loadSkins(){
  const grid=$("#skin-grid");
  try{
    const res=await fetch("skins.json");
    if(!res.ok) throw new Error("skins.json not found");
    allSkins=await res.json();
    const cats=[...new Set(allSkins.map(s=>s.category))].sort();
    cats.forEach(c=>{const o=document.createElement("option");o.value=c;o.textContent=c;$("#skin-category").appendChild(o)});
    $("#skin-count-nav").textContent=allSkins.length;
    renderSkins();
  }catch(e){grid.innerHTML='<div class="empty-state">Could not load the skin collection. Make sure skins.json and the skins folder are uploaded.</div>';}
}
function renderSkins(){
  const query=$("#skin-search").value.trim().toLowerCase(), cat=$("#skin-category").value;
  const shown=allSkins.filter(s=>(cat==="all"||s.category===cat)&&(s.name.toLowerCase().includes(query)||s.category.toLowerCase().includes(query)));
  $("#skin-results").textContent=shown.length+" SKINS";
  $("#skin-empty").hidden=shown.length!==0;
  $("#skin-grid").innerHTML=shown.map((s,i)=>`<article class="skin-card"><div class="skin-preview"><img loading="lazy" src="${encodeURI(s.file)}" alt="${escapeHtml(s.name)}"></div><div class="skin-card-info"><strong title="${escapeHtml(s.name)}">${escapeHtml(s.name)}</strong><small title="${escapeHtml(s.category)}">${escapeHtml(s.category)}</small><button class="download-btn" data-download="${i}">↓ DOWNLOAD</button></div></article>`).join("");
  [...$("#skin-grid").querySelectorAll("[data-download]")].forEach((b,i)=>b.addEventListener("click",()=>downloadSkin(shown[i])));
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function downloadSkin(s){
  const a=document.createElement("a");a.href=encodeURI(s.file);a.download=s.name.replace(/[^a-z0-9_-]/gi,"_")+".png";document.body.appendChild(a);a.click();a.remove();
}
$("#skin-search").addEventListener("input",renderSkins);
$("#skin-category").addEventListener("change",renderSkins);
$("#server-name").textContent=cfg.serverName||"DBSMP";
$("#server-address").textContent=cfg.serverAddress||"";
$("#copy-ip").addEventListener("click",async()=>{
  const text=cfg.serverAddress||"";
  try{await navigator.clipboard.writeText(text);$("#copy-ip").textContent="COPIED ✓";}
  catch(e){prompt("Copy the server address:",text);}
});
$("#client188").value=cfg.eaglercraftUrl||"";
$("#client112").value=cfg.minecraft1122Url||"";
$("#serverinput").value=cfg.serverAddress||"";
$("#save-settings").addEventListener("click",()=>{
  localStorage.setItem("dbl_188",$("#client188").value.trim());
  localStorage.setItem("dbl_112",$("#client112").value.trim());
  localStorage.setItem("dbl_server",$("#serverinput").value.trim());
  $("#server-address").textContent=$("#serverinput").value.trim();
  $("#save-settings").textContent="SAVED ✓";
  setTimeout(()=>$("#save-settings").innerHTML='SAVE SETTINGS <span>✓</span>',1600);
});
const start=location.hash.replace("#","");go(pages.includes(start)?start:"home");
