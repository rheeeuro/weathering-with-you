const sunshine = document.getElementById("scene-sunshine");
const hand = document.getElementById("sunshine-hand");
// const effect = document.getElementById("flareEffect");

sunshine.addEventListener("mouseenter", (e) => {
  hand.style.transform = `translate(-55%, -45%) scaleX(-1)`;
  // effect.style.opacity = 0.4;
});

sunshine.addEventListener("mouseleave", (e) => {
  hand.style.transform = `translate(-60%, -45%) scaleX(-1)`;
  // effect.style.opacity = 1;
});
