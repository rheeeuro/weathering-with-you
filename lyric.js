import { lyric_01 } from "./lyric/01.js";
import { lyric_02 } from "./lyric/02.js";
import { lyric_03 } from "./lyric/03.js";
import { lyric_04 } from "./lyric/04.js";
import { lyric_05 } from "./lyric/05.js";

const lyric = document.getElementById("lyric");
const original = document.getElementById("lyric-original");
const pronunciation = document.getElementById("lyric-pronunciation");
const korean = document.getElementById("lyric-korean");
const mainTitle = document.getElementById("main-title");

const audio = document.getElementById("bgm");
const audioSrc = document.getElementById("bgm-src");

let data = null;

audio.addEventListener("play", function (e) {
  mainTitle.style.display = "none";
});

audio.addEventListener("timeupdate", function (e) {
  if (audioSrc.src.slice(-5)[0] === "1") {
    data = lyric_01;
  }
  if (audioSrc.src.slice(-5)[0] === "2") {
    data = lyric_02;
  }
  if (audioSrc.src.slice(-5)[0] === "3") {
    data = lyric_03;
  }
  if (audioSrc.src.slice(-5)[0] === "4") {
    data = lyric_04;
  }
  if (audioSrc.src.slice(-5)[0] === "5") {
    data = lyric_05;
    if (audio.currentTime > 415) {
      audio.pause();
    }
  }
});

audio.addEventListener("loadeddata", function () {
  original.innerText = "";
  pronunciation.innerText = "";
  korean.innerText = "";
});

audio.addEventListener("seeking", function () {
  mainTitle.style.display = "none";
  original.innerText = "";
  pronunciation.innerText = "";
  korean.innerText = "";
});

window.addEventListener("scroll", function () {
  mainTitle.style.display = "block";
  if (audioSrc.src.slice(-5)[0] !== "3") {
    original.innerText = "";
    pronunciation.innerText = "";
    korean.innerText = "";
  }
});

setInterval(function () {
  if (data) {
    for (let i = 0; i < data.length; i++) {
      const duration =
        i === data.length - 1
          ? audio.duration - data[i].time
          : data[i + 1].time - data[i].time;
      if (
        data[i].time <= audio.currentTime &&
        audio.currentTime < data[i].time + duration
      ) {
        original.innerText = data[i].original;
        pronunciation.innerText = data[i].pronunciation;
        korean.innerText = data[i].korean;

        if (Math.abs(data[i].time - audio.currentTime) < 0.1) {
          lyric.classList.remove("lyric-fade");

          // trigger a DOM reflow
          void lyric.offsetWidth;

          lyric.classList.add("lyric-fade");
        }
        break;
      }
    }
  }
}, 50);
