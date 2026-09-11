const menu=document.querySelector("#menu"),links=document.querySelector("#links");
menu.onclick=()=>links.classList.toggle("open");
async function load(){
 const box=document.querySelector("#projectsList");
 try{
  const r=await fetch("/api/projects"),ps=await r.json();
  if(!ps.length)throw 0;
  box.innerHTML=ps.map((p,i)=>`<article class="project"><span>PROJECT ${String(i+1).padStart(2,"0")}</span><h3>${safe(p.title)}</h3><p>${safe(p.description)}</p><div class="tags">${(p.tech||[]).map(x=>`<span>${safe(x)}</span>`).join("")}</div><div class="project-links">${p.github?`<a href="${p.github}" target="_blank">GITHUB ↗</a>`:""}${p.demo?`<a href="${p.demo}" target="_blank">LIVE DEMO ↗</a>`:""}</div></article>`).join("");
 }catch(e){
  box.innerHTML=[
   ["Budget Friendly Food Chatbot","Recommends food and restaurants based on a user's budget.",["JavaScript","Node.js","MongoDB"]],
   ["Smart Campus Safety","Emergency assistance concept with SOS reporting and campus support.",["Web","Backend","Database"]],
   ["Personal Portfolio","A responsive full-stack portfolio connecting frontend, API and database.",["HTML","CSS","Express"]]
  ].map((p,i)=>`<article class="project"><span>PROJECT 0${i+1}</span><h3>${p[0]}</h3><p>${p[1]}</p><div class="tags">${p[2].map(x=>`<span>${x}</span>`).join("")}</div></article>`).join("");
 }
}
function safe(x=""){return String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
document.querySelector("#form").onsubmit=async e=>{e.preventDefault();const s=document.querySelector("#status");s.textContent="Sending...";try{const r=await fetch("/api/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(e.target)))}),d=await r.json();if(!r.ok)throw Error(d.message);s.textContent=d.message;e.target.reset()}catch(x){s.textContent=x.message}};
load();