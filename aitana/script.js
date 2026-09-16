const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const mobileNav = document.getElementById("mobileNav");
const menuOverlay = document.getElementById("menuOverlay");

function setMenu(open){
  mobileNav.classList.toggle("open", open);
  menuOverlay.classList.toggle("open", open);
  mobileNav.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
}

menuToggle.addEventListener("click", () => setMenu(true));
menuClose.addEventListener("click", () => setMenu(false));
menuOverlay.addEventListener("click", () => setMenu(false));

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, {passive:true});
