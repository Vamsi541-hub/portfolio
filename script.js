const body=document.body;
const themeToggle=document.getElementById("themeToggle");
const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
const navPill=document.querySelector("#navLinks");
const navbar=document.getElementById("navbar");
const form=document.getElementById("contactForm");
const formMessage=document.getElementById("formMessage");
const year=document.getElementById("year");

const savedTheme=localStorage.getItem("theme");
if(savedTheme==="dark"){body.classList.add("dark");themeToggle.textContent="☾"}

themeToggle.addEventListener("click",()=>{
 body.classList.toggle("dark");
 const dark=body.classList.contains("dark");
 themeToggle.textContent=dark?"☾":"☼";
 localStorage.setItem("theme",dark?"dark":"light");
});

menuToggle.addEventListener("click",()=>{
 navLinks.classList.toggle("open");
 menuToggle.textContent=navLinks.classList.contains("open")?"✕":"☰";
});
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
 navLinks.classList.remove("open");menuToggle.textContent="☰";
}));

document.querySelectorAll('a[href^="#"]').forEach(link=>{
 link.addEventListener("click",e=>{
  const id=link.getAttribute("href");
  if(id==="#")return;
  const target=document.querySelector(id);
  if(!target)return;
  e.preventDefault();
  window.scrollTo({top:target.offsetTop-95,behavior:"smooth"});
 });
});

window.addEventListener("scroll",()=>{
 navbar.classList.toggle("scrolled",window.scrollY>30);
},{passive:true});

const sections=[...document.querySelectorAll("main section[id]")];
function moveNavPill(link){ if(!link||window.innerWidth<=700)return; const navRect=navLinks.getBoundingClientRect(); const rect=link.getBoundingClientRect(); navLinks.style.setProperty("--pill-left",(rect.left-navRect.left)+"px"); navLinks.style.setProperty("--pill-width",rect.width+"px"); }
function syncNavPill(){ const active=navLinks.querySelector("a.active")||navLinks.querySelector("a"); moveNavPill(active); }
window.addEventListener("resize",syncNavPill);
const links=[...navLinks.querySelectorAll("a")];
const observer=new IntersectionObserver(entries=>{
 const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
 if(!visible)return;
 links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+visible.target.id));
 moveNavPill(navLinks.querySelector("a.active"));
},{rootMargin:"-30% 0px -55% 0px",threshold:[.1,.35,.6]});
sections.forEach(s=>observer.observe(s));
requestAnimationFrame(syncNavPill);

document.querySelectorAll(".filter").forEach(button=>{
 button.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  button.classList.add("active");
  const filter=button.dataset.filter;
  document.querySelectorAll(".project-card").forEach(card=>{
   const show=filter==="all"||card.dataset.category===filter;
   card.style.display=show?"flex":"none";
  });
 });
});

const tilt=document.querySelector(".tilt-card");
if(tilt && window.matchMedia("(pointer:fine)").matches){
 tilt.addEventListener("mousemove",e=>{
  const r=tilt.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5;
  const y=(e.clientY-r.top)/r.height-.5;
  tilt.style.transform=`perspective(900px) rotateY(${x*14-8}deg) rotateX(${-y*10+3}deg) translateY(-4px)`;
 });
 tilt.addEventListener("mouseleave",()=>tilt.style.transform="perspective(900px) rotateY(-8deg) rotateX(3deg)");
}

form.addEventListener("submit",e=>{
 e.preventDefault();
 const name=document.getElementById("name").value.trim();
 const email=document.getElementById("email").value.trim();
 const message=document.getElementById("message").value.trim();
 if(!name||!email||!message){formMessage.textContent="Please fill all fields.";return}
 const subject=encodeURIComponent("Portfolio message from "+name);
 const bodyText=encodeURIComponent("Name: "+name+"\nEmail: "+email+"\n\nMessage:\n"+message);
 formMessage.textContent="Opening your email application...";
 window.location.href=`mailto:v7182616@gmail.com?subject=${subject}&body=${bodyText}`;
});
year.textContent=new Date().getFullYear();
