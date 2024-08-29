const bg = document.getElementById("bg");
const homeBtn = document.querySelector(".home");
const mainSlider = document.querySelector(".main-slider");
const nextBtn = document.querySelector(".next");
var start = null;
var end = null;

window.addEventListener("mousedown", (event) => {
  event.preventDefault();
  start = event.clientX;
  end = null;
});
window.addEventListener("mouseup", (event) => {
  end = event.clientX;
  if (start < end) {
    rightSwipe();
  } else if (start !== null && end !== null && start != end && start > end) {
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
// window.addEventListener("touchstart", (event) => {
//   end = event.touches[0].clientX;
//   end = null;
// });
// window.addEventListener("touchend", (event) => {
//   //end = event.touches[0];
//   console.log(event.touches);

//   start < end ? rightSwipe() : leftSwipe();
//   start = null;
// });

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
