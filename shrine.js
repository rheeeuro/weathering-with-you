const image = document.querySelector(".shrine-frame-img");

let loadedImageCount = 0;
let totalImageCount = 136;
const videoImages = [];

function loadImages() {
  for (let i = 0; i < totalImageCount; i++) {
    let imgElem = new Image();
    imgElem.src = `./assets/shrine/frame/frame-${i + 101}.jpg`;
    videoImages.push(imgElem);

    imgElem.addEventListener("load", function () {
      loadedImageCount++;
      if (loadedImageCount === totalImageCount) {
        console.log("frame loaded");
        init();
      }
    });
  }
}

loadImages();

let progress;
let currentFrame;

function init() {
  window.addEventListener("scroll", function () {
    progress =
      (window.pageYOffset - window.innerHeight * 2) / (window.innerHeight * 8);
    console.log(progress, window.pageYOffset - window.innerHeight * 2);
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    requestAnimationFrame(function () {
      currentFrame = Math.round((totalImageCount - 1) * progress);
      image.src = videoImages[currentFrame].src;
    });
  });
}
