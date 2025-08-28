const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

let fixedImage = document.querySelector(".fixed-image");
let elemContainer = document.querySelector(".elem-container");

function page4Animation() {
  elemContainer.addEventListener("mouseenter", function () {
    fixedImage.style.display = "block";
  });

  elemContainer.addEventListener("mouseleave", function () {
    fixedImage.style.display = "none";
  });

  let elem = document.querySelectorAll(".elem");
  elem.forEach(function (e) {
    e.addEventListener("mouseenter", () => {
      var image = e.getAttribute("data-image");
      fixedImage.style.backgroundImage = `url(${image})`;
    });
  });
}

function swiperAnimation() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 100,

  });
}

const menuBtn = document.getElementById("mobile-menu-btn");
const menuText = menuBtn.querySelector(".menu-text");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");

  if (menuBtn.classList.contains("active")) {
    menuText.textContent = "Close";
  } else {
    menuText.textContent = "Menu";
  }
});



page4Animation();
swiperAnimation();