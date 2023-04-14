const music = document.getElementById("bgm");
const musicSrc = document.getElementById("bgm-src");
const musicTitle = document.getElementById("bgm-info-title");
const musicTitleKorean = document.getElementById("bgm-info-title-korean");
const musicArtist = document.getElementById("bgm-info-artist");

const MUSIC_INFO = [
  {
    title: "Grand Escape",
    titleKorean: "그랜드 이스케이프",
    artist: "RADWIMPS (feat. Toko Miura)",
    screenOffset: 0,
  },
  {
    title: "風たちの声",
    titleKorean: "바람의 소리",
    artist: "RADWIMPS",
    screenOffset: 1,
  },
  {
    title: "大丈夫",
    titleKorean: "괜찮아",
    artist: "RADWIMPS",
    screenOffset: 2,
  },
  {
    title: "祝祭",
    titleKorean: "축제",
    artist: "RADWIMPS",
    screenOffset: 12,
  },
  {
    title: "愛にできることはまだあるかい",
    titleKorean: "사랑이 할 수 있는 일은 없을까",
    artist: "RADWIMPS",
    screenOffset: 13,
  },
];
window.addEventListener("scroll", function () {
  for (let i = 0; i < MUSIC_INFO.length; i++) {
    if (
      window.pageYOffset ===
      MUSIC_INFO[i].screenOffset * window.innerHeight
    ) {
      musicSrc.src = `./assets/music/${i + 1}.mp3`;
      music.load();

      musicTitle.innerHTML = MUSIC_INFO[i].title;
      musicTitleKorean.innerHTML = MUSIC_INFO[i].titleKorean;
      musicArtist.innerHTML = MUSIC_INFO[i].artist;
    }
  }
});

music.volume = 0.5;
