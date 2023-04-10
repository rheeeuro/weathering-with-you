import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  DirectionalLight,
  FogExp2,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "https://threejs.org/build/three.module.js";

const canvas = document.getElementById("canvas");

const scene = new Scene();

const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 1;
camera.rotation.x = 1.16;
camera.rotation.y = -0.12;
camera.rotation.z = 0.27;

const ambient = new AmbientLight(0x555555);
scene.add(ambient);

const directional = new DirectionalLight(0xffeedd);
directional.position.set(0, 0, 1);
scene.add(directional);

const renderer = new WebGLRenderer({ canvas: canvas });
scene.fog = new FogExp2(0x11111f, 0.002);
renderer.setClearColor(scene.fog.color);
renderer.setSize(innerWidth, innerHeight);

let rain, rainBuffer;
const RAIN_COUNT = 15000;
const BG_WIDTH = 3200;
const BG_HEIGHT = 1800;
const BG_SRC = "/assets/building-sky.png";
const SPRITE_SRC = "/assets/raindrop.png";

(async function () {
  const loader = new TextureLoader();
  const texture = await loader.load(BG_SRC);
  const sprite = loader.load(SPRITE_SRC);

  scene.background = texture;
  setBackground(scene, BG_WIDTH, BG_HEIGHT);

  rainBuffer = new BufferGeometry();
  let posRain = new Float32Array(RAIN_COUNT * 3);
  let rainVelocity = new Float32Array(RAIN_COUNT);

  for (let i = 0; i < RAIN_COUNT * 3; i += 3) {
    posRain[i] = Math.random() * 400 - 200;
    posRain[i + 1] = Math.random() * 500 - 250;
    posRain[i + 2] = Math.random() * 400 - 200;
    rainVelocity[i / 3] = 0;
  }

  rainBuffer.setAttribute("position", new BufferAttribute(posRain, 3));
  let rainMaterial = new PointsMaterial({
    color: 0xaaaaaa,
    map: sprite,
    size: 0.4,
    opacity: 0.7,
    transparent: true,
  });
  rain = new Points(rainBuffer, rainMaterial);
  scene.add(rain);

  renderer.setAnimationLoop(() => {
    const positions = rain.geometry.attributes.position.array;
    for (let i = 0; i < RAIN_COUNT * 3; i += 3) {
      rainVelocity[i / 3] -= 0.1 + Math.random() * 0.1;
      positions[i + 1] += rainVelocity[i / 3];
      if (positions[i + 1] < -200) {
        positions[i + 1] = 200;
        rainVelocity[i / 3] = 0;
      }
      rain.geometry.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, camera);
  });
})();

function setBackground(scene, backgroundImageWidth, backgroundImageHeight) {
  var windowSize = function (withScrollBar) {
    var wid = 0;
    var hei = 0;
    if (typeof window.innerWidth != "undefined") {
      wid = window.innerWidth;
      hei = window.innerHeight;
    } else {
      if (document.documentElement.clientWidth == 0) {
        wid = document.body.clientWidth;
        hei = document.body.clientHeight;
      } else {
        wid = document.documentElement.clientWidth;
        hei = document.documentElement.clientHeight;
      }
    }
    return {
      width: wid - (withScrollBar ? wid - document.body.offsetWidth + 1 : 0),
      height: hei,
    };
  };

  if (scene.background) {
    var size = windowSize(true);
    var factor =
      backgroundImageWidth / backgroundImageHeight / (size.width / size.height);

    scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
    scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;

    scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
    scene.background.repeat.y = factor > 1 ? 1 : factor;
  }
}
