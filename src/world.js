import * as THREE from './three.module.js';

export let scene3d
export var scene2d
export let camera3d
export var camera2d
export var bgTexture
export var renderer
export let canvas

function initCamera() {

  var aspect = window.innerWidth / window.innerHeight
  if (camera3d == null) {
    camera3d = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
    camera2d = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 100);
    camera3d.position.z = 5;
    camera2d.position.z = 10;
  } else {
    camera3d.aspect = aspect
    camera3d.updateProjectionMatrix();
    camera2d.left = -aspect
    camera2d.right = aspect
    camera2d.updateProjectionMatrix();
  }
}

function initBackground() {
  if (!bgTexture) {
    bgTexture = new THREE.TextureLoader().load('./bgstarfield.jpg');
    bgTexture.generateMipmaps = false
    bgTexture.magFilter = THREE.LinearFilter;
    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.wrapS = THREE.RepeatWrapping
    bgTexture.wrapT = THREE.RepeatWrapping
    scene3d.background = bgTexture
  }

  const canvasAspect = canvas.clientWidth / canvas.clientHeight;
  const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1;
  let aspect = imageAspect / canvasAspect;
  bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
  bgTexture.repeat.y = aspect > 1 ? 1 : aspect;
  bgTexture.repeat.x *= 4
  bgTexture.repeat.y *= 4
}

function initScene() {
  scene3d = new THREE.Scene();
  scene3d.add(camera3d);

  scene2d = new THREE.Scene()

  renderer = new THREE.WebGLRenderer(/*{ antialias: true }*/);
  renderer.autoClearColor = false;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  canvas = renderer.domElement
}

function initLight() {
  const color = 0xFFFFFF;
  const intensity = 0.5;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 120);
  scene3d.add(light);
}

export function screenXY(obj) {

  var vector = obj.clone();
  var windowWidth = window.innerWidth;
  // var minWidth = 1280;

  // if(windowWidth < minWidth) {
  //   windowWidth = minWidth;
  // }

  var widthHalf = (windowWidth / 2);
  var heightHalf = (window.innerHeight / 2);

  vector.project(camera3d);

  vector.x = (vector.x * widthHalf) + widthHalf;
  vector.y = - (vector.y * heightHalf) + heightHalf;
  vector.z = 0;

  return vector;

};


let mouse = { x: 0, y: 0 }

export function mouseAngle(vec3) {
  var pos = screenXY(vec3);

  let d = Math.atan((mouse.y - pos.y) / (mouse.x - pos.x));
  if (mouse.x<pos.x)
    d+=Math.PI
  d += Math.PI / 2

  return d
}


function handleMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

let world = new EventDispatcher()

function onWindowResize() {

  camera3d.aspect = window.innerWidth / window.innerHeight;
  camera3d.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  initBackground()

}

export function render() {
renderer.render( scene3d, camera3d );
renderer.render( scene2d, camera2d );
}
export function init() {
  initCamera()
  initScene()
  initBackground()
  initLight()
  document.addEventListener('mousemove', handleMouseMove, true)
  window.addEventListener('resize', onWindowResize, false);
}



