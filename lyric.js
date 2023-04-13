import { lyric_01 } from "./lyric/01.js";

const lyric = document.getElementById("lyric");
const original = document.getElementById("lyric-original");
const pronunciation = document.getElementById("lyric-pronunciation");
const korean = document.getElementById("lyric-korean");
const mainTitle = document.getElementById("title");

const audio = document.getElementById("bg-music");
const audioSrc = document.getElementById("bg-music-src");

let data = null;

audio.addEventListener("play", function (e) {
  mainTitle.style.display = "none";
});

audio.addEventListener("timeupdate", function (e) {
  if (audioSrc.src.slice(-5)[0] === "1") {
    data = lyric_01;
  }
});

window.addEventListener("scroll", function () {
  mainTitle.style.display = "block";
  original.innerText = "";
  pronunciation.innerText = "";
  korean.innerText = "";
});

setInterval(function () {
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (Math.abs(data[i].time - audio.currentTime) < 0.1) {
        original.innerText = data[i].original;
        pronunciation.innerText = data[i].pronunciation;
        korean.innerText = data[i].korean;

        break;
      }
    }
  }
}, 50);
