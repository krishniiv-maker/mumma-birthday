const intro=document.getElementById("intro");
const app=document.getElementById("app");
const birthday=document.getElementById("birthday");
const magic=document.getElementById("magic");
const progress=document.getElementById("progress");
const current=document.getElementById("current");
const scenes=[...document.querySelectorAll(".scene")];
let index=0;

function magicDust(){
  const symbols=["✦","✧","♡","·","✦"];
  for(let i=0;i<7;i++){
    const s=document.createElement("span");
    s.className="spark";
    s.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    s.style.left=Math.random()*100+"vw";
    s.style.top=(65+Math.random()*35)+"vh";
    s.style.fontSize=(8+Math.random()*15)+"px";
    s.style.animationDelay=(Math.random()*2)+"s";
    magic.appendChild(s);
    setTimeout(()=>s.remove(),4500);
  }
}
setInterval(magicDust,900);

function showScene(n){
  index=Math.max(0,Math.min(scenes.length-1,n));
  scenes.forEach((s,i)=>s.classList.toggle("active",i===index));
  current.textContent=String(index+1).padStart(2,"0");
  progress.style.width=((index+1)/scenes.length*100)+"%";
  if(navigator.vibrate) navigator.vibrate(18);
  magicBurst(18);
}

document.getElementById("begin").onclick=()=>{
  intro.classList.add("hide");
  app.style.display="block";
  magicBurst(35);
};

document.querySelectorAll(".next").forEach(b=>b.addEventListener("click",()=>showScene(index+1)));

document.getElementById("celebrate").onclick=()=>{
  birthday.classList.add("show");
  magicBurst(140);
};

document.getElementById("replay").onclick=()=>{
  birthday.classList.remove("show");
  showScene(0);
  intro.classList.remove("hide");
};

function magicBurst(count){
  const symbols=["♥","♡","✦","✧","✿"];
  for(let i=0;i<count;i++){
    const s=document.createElement("span");
    s.className="spark";
    s.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    s.style.left=(45+Math.random()*20)+"vw";
    s.style.top=(45+Math.random()*15)+"vh";
    s.style.fontSize=(10+Math.random()*22)+"px";
    s.style.animationDuration=(2+Math.random()*3)+"s";
    magic.appendChild(s);
    setTimeout(()=>s.remove(),5200);
  }
}

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight" || e.key===" "){e.preventDefault(); if(!intro.classList.contains("hide")) return; if(index<scenes.length-1)showScene(index+1);}
  if(e.key==="ArrowLeft"){if(index>0)showScene(index-1)}
});

let wheelLock=false;
window.addEventListener("wheel",e=>{
  if(intro.classList.contains("hide")===false || wheelLock) return;
  wheelLock=true;
  if(e.deltaY>0 && index<scenes.length-1)showScene(index+1);
  else if(e.deltaY<0 && index>0)showScene(index-1);
  setTimeout(()=>wheelLock=false,900);
},{passive:true});
