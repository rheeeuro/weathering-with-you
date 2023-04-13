const music = document.getElementById("bg-music");
const musicSrc = document.getElementById("bg-music-src");
const musicTitle = document.getElementById("music-title");
const musicArtist = document.getElementById("music-artist");

const offset = [0, 1, 2, 12, 13, 14];
const TITLE = [
  "Grand Escape",
  "風たちの声",
  "大丈夫",
  "祝祭",
  "愛にできることはまだあるかい",
];
const ARTIST = [
  "RADWIMPS (feat. Toko Miura)",
  "RADWIMPS",
  "RADWIMPS",
  "RADWIMPS",
  "RADWIMPS",
];
const MUSIC_COUNT = 5;

window.addEventListener("scroll", function () {
  for (let i = 0; i < offset.length; i++) {
    if (Math.abs(window.pageYOffset - offset[i] * window.innerHeight) <= 5) {
      musicSrc.src = `./assets/music/${i + 1}.mp3`;
      console.log(i + 1, "start");
      music.load();

      musicTitle.innerHTML = TITLE[i];
      musicArtist.innerHTML = ARTIST[i];
    }
  }
});

music.volume = 0.2;
