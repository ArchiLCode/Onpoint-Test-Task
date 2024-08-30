const bg = document.getElementById("bg");
const homeBtn = document.querySelector(".home");
const mainSlider = document.querySelector(".main-slider");
const nextBtn = document.querySelector(".next");
const nextPug = document.querySelector(".btn-next");
const prevPug = document.querySelector(".btn-prev");
const text1 = document.querySelector(".text1");
const text2 = document.querySelector(".text2");
const circlePug1 = document.querySelector(".circle1");
const circlePug2 = document.querySelector(".circle2");
const moreBtn = document.querySelector(".more");
const popup = document.querySelector(".popup");
const cross = document.querySelector(".cross");
var start = null;
var end = null;
var popupOpened = false;
var touches = [];

window.addEventListener("mousedown", (event) => {
  event.preventDefault();
  start = event.clientX;
  end = null;
});
window.addEventListener("mouseup", (event) => {
  end = event.clientX;
  if (end - start >= 20) {
    rightSwipe();
  } else if (
    start !== null &&
    end !== null &&
    start != end &&
    start - end >= 20
  ) {
    leftSwipe();
  }
  start = null;
});
homeBtn.addEventListener("click", () => {
  bg.style.left = 0 + "px";
  mainSlider.style.left = 0 + "px";
});
nextBtn.addEventListener("click", () => {
  bg.style.left = -1024 + "px";
  mainSlider.style.left = -1024 + "px";
});
moreBtn.addEventListener("click", () => {
  if (!popupOpened) {
    popup.style.visibility = "visible";
    popup.style.opacity = 1;
    popupOpened = true;
  }
});
cross.addEventListener("click", () => {
  popup.style.visibility = "hidden";
  popup.style.opacity = 0;
  popupOpened = false;
});
nextPug.addEventListener("click", () => {
  text2.style.visibility = "visible";
  text1.style.visibility = "hidden";
  text2.style.opacity = 1;
  text1.style.opacity = 0;
  circlePug1.classList.add("circle2");
  circlePug1.classList.remove("circle1");
  circlePug2.classList.add("circle1");
  circlePug2.classList.remove("circle2");
});
prevPug.addEventListener("click", () => {
  text1.style.visibility = "visible";
  text2.style.visibility = "hidden";
  text1.style.opacity = 1;
  text2.style.opacity = 0;
  circlePug1.classList.add("circle1");
  circlePug1.classList.remove("circle2");
  circlePug2.classList.add("circle2");
  circlePug2.classList.remove("circle1");
});

window.addEventListener("touchstart", (event) => {
  start = event.touches[0].clientX;
  end = null;
  touches = [];
});

window.addEventListener("touchmove", (event) => {
  touches.push(event.touches[event.touches.length - 1]);
});

window.addEventListener("touchend", (event) => {
  end = touches[touches.length - 1].clientX;

  if (end - start >= 20) {
    rightSwipe();
  } else if (
    start !== null &&
    end !== null &&
    start != end &&
    start - end >= 20
  ) {
    leftSwipe();
  }
  start = null;
});

const rightSwipe = () => {
  if (bg.style.left.slice(0, -2) < 0) {
    bg.style.left = Number(bg.style.left.slice(0, -2)) + Number(1024) + "px";
    mainSlider.style.left =
      Number(mainSlider.style.left.slice(0, -2)) + Number(1024) + "px";
  }
};

const leftSwipe = () => {
  if (bg.style.left.slice(0, -2) > -2048) {
    bg.style.left = Number(bg.style.left.slice(0, -2)) - Number(1024) + "px";
    mainSlider.style.left =
      Number(mainSlider.style.left.slice(0, -2)) - Number(1024) + "px";
  }
};
