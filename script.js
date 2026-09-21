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


/* ================================
   GALERÍA
================================ */

const galleryCategories = document.querySelectorAll(".gallery-category");
const galleryView = document.getElementById("galleryView");
const galleryGrid = document.getElementById("galleryGrid");
const galleryTitle = document.getElementById("galleryTitle");
const galleryBack = document.getElementById("galleryBack");

const galleryData = {
  salas: {
    title: "Salas",
    images: [
      "sala1.jpeg",
      "sala2.jpeg",
      "sala3.jpeg",
      "sala4.jpeg",
      "sala5.jpeg",
      "sala6.jpeg",
      "sala7.jpeg",
      "sala8.jpeg"
    ]
  },

  belleza: {
    title: "Belleza",
    images: [
      "peinado1.jpeg",
      "peinado2.jpeg",
      "peinado3.jpg",
      "peinado4.jpeg",
      "peinado5.jpeg",
      "peinado6.jpeg",
      "peinado7.jpeg",
      "peinado8.jpeg",
      "uñas1.jpeg"
    ]
  }
};


/* ================================
   VISOR DE IMÁGENES
================================ */

const lightbox = document.createElement("div");

lightbox.className = "gallery-lightbox";

lightbox.innerHTML = `
  <button class="gallery-lightbox-close" type="button" aria-label="Cerrar">×</button>
  <img src="" alt="">
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");

const lightboxClose = lightbox.querySelector(".gallery-lightbox-close");


function openLightbox(src, alt){

  lightboxImage.src = src;

  lightboxImage.alt = alt;

  lightbox.classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeLightbox(){

  lightbox.classList.remove("open");

  lightboxImage.src = "";

  document.body.style.overflow = "";

}


lightboxClose.addEventListener("click", closeLightbox);


lightbox.addEventListener("click", (event) => {

  if(event.target === lightbox){

    closeLightbox();

  }

});


document.addEventListener("keydown", (event) => {

  if(event.key === "Escape"){

    closeLightbox();

  }

});


/* ================================
   MOSTRAR GALERÍA
================================ */

function showGallery(category){

  const data = galleryData[category];

  if(!data) return;

  galleryCategories.forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.gallery === category
    );

  });

  galleryTitle.textContent = data.title;

  galleryGrid.innerHTML = "";


  data.images.forEach((image, index) => {

    const figure = document.createElement("figure");

    figure.className = "gallery-photo";


    const img = document.createElement("img");

    img.src = `assets/${image}`;

    img.alt = `${data.title} - imagen ${index + 1}`;

    img.loading = "lazy";


    figure.appendChild(img);


    figure.addEventListener("click", () => {

      openLightbox(
        img.src,
        img.alt
      );

    });


    galleryGrid.appendChild(figure);

  });


  galleryView.classList.add("open");


  galleryView.scrollIntoView({

    behavior: "smooth",

    block: "start"

  });

}


/* ================================
   BOTONES SALAS / BELLEZA
================================ */

galleryCategories.forEach(button => {

  button.addEventListener("click", () => {

    showGallery(button.dataset.gallery);

  });

});


/* ================================
   VOLVER A CATEGORÍAS
================================ */

galleryBack.addEventListener("click", () => {

  galleryView.classList.remove("open");

  document.getElementById("galeria").scrollIntoView({

    behavior: "smooth",

    block: "start"

  });

});


/* ================================
   ENTRAR DESDE EL MENÚ
================================ */

document.querySelectorAll('a[href="#galeria"]').forEach(link => {

  link.addEventListener("click", () => {

    setTimeout(() => {

      showGallery("salas");

    }, 100);

  });

});