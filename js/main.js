const videoContainer = document.getElementById("scene-main");
const title = document.getElementById("main-title");
const backToTop = document.getElementById("button-top");

const LERP_ALPHA = 0.5;

let titlePos = {
  x: -50,
  y: -50,
};

videoContainer.addEventListener("mousemove", (e) => {
  const x = -50 + ((e.pageX - innerWidth / 2) / (innerWidth / 2)) * 2;
  const y = -50 + ((e.pageY - innerHeight / 2) / (innerHeight / 2)) * 2;

  titlePos.x = titlePos.x * (1 - LERP_ALPHA) + x * LERP_ALPHA;
  titlePos.y = titlePos.y * (1 - LERP_ALPHA) + y * LERP_ALPHA;
});

videoContainer.addEventListener("mouseout", (e) => {
  titlePos.x = titlePos.x * (1 - LERP_ALPHA) + -50 * LERP_ALPHA;
  titlePos.y = titlePos.y * (1 - LERP_ALPHA) + -50 * LERP_ALPHA;
});

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("scroll", (event) => {
  const y = window.scrollY;
  if (y >= innerHeight) {
    backToTop.style.opacity = 0.7;
  } else {
    backToTop.style.opacity = 0;
  }
});

setInterval(function () {
  title.style.transform = `translate(${titlePos.x}%, ${titlePos.y}%)`;
}, 10);

document.addEventListener("contextmenu", (event) => event.preventDefault());
