import * as THREE from 'three';
import { GLTFLoader } from "GLTFLoader";
import { OrbitControls } from "OrbitControls";
import { FlyControls } from "FlyControls";

const loader2 = new THREE.CubeTextureLoader();

// 画面サイズの取得
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight - (80+90);

// レンダラーの作成
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(windowWidth, windowHeight);
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;

// シーンの作成
const scene = new THREE.Scene();

// 背景の設定
// scene.background = new THREE.Color('#ffffff');

scene.background = new THREE.CubeTextureLoader()
  .setPath( './3d/background/' )
  .load( [
    'sky1.jpg',
    'sky3.jpg',
    'sky3.jpg',
    'sky3.jpg',
    'sky4.jpg',
    'sky2.jpg'
]);

// 見やすいようにヘルパー（網目）を設定
// let gridHelper = new THREE.GridHelper();
// scene.add(gridHelper);

// カメラを作成
const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);
camera.aspect = windowWidth / windowHeight;
camera.updateProjectionMatrix();
camera.position.set(5, 2, 0);
camera.lookAt(0, 0, 0);

// ライトの作成
const sun = new THREE.AmbientLight("#ffffff", 0.2);
// const light1 = new THREE.PointLight("#ffffff", 50, 20);
// const light2 = new THREE.PointLight("#ffffff", 50, 20);
// const light3 = new THREE.PointLight("#ffffff", 50, 20);
// const light4 = new THREE.PointLight("#ffffff", 50, 20);
const light1 = new THREE.SpotLight("#ffffff", 1, 20, Math.PI/180*120, 1, 0.05);
const light2 = new THREE.SpotLight("#ffffff", 1, 20, Math.PI/180*120, 1, 0.05);
const light3 = new THREE.SpotLight("#ffffff", 1, 20, Math.PI/180*120, 1, 0.05);
const light4 = new THREE.SpotLight("#ffffff", 1, 20, Math.PI/180*120, 1, 0.05);
light1.position.set(0, 10, 7);
light2.position.set(0, 10, -7);
light3.position.set(7, 10, 0);
light4.position.set(-7, 10, 0);
scene.add(sun);
scene.add(light1);
scene.add(light2);
scene.add(light3);
scene.add(light4);

// ヘルパーを作成
// const lightHelper = new THREE.SpotLightHelper(light2);
// scene.add(lightHelper);

// マウス制御
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true; // カメラの回転を有効にする
controls.maxPolarAngle = Math.PI / 180 * 75; // カメラの仰角の最小値を設定
controls.minPolarAngle = Math.PI / 180 * 30; // カメラの仰角の最小値を設定
controls.minDistance = 3; // 最小距離を設定
controls.maxDistance = 9; // 最大距離を設定
controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.2;
controls.enablePan = false;     //true:パン操作可能,false:パン操作不可
controls.userPanSpeed = 1;   //パン速度????
controls.minTargetRadius = 0;
controls.enableDamping = true;  //なめらかな動きを可能に
controls.dampingFactor = 0.1;   //滑らかさの係数

const controls2 = new FlyControls(camera, renderer.domElement);


// 3Dモデルの読み込み
const loader = new GLTFLoader();
var model;
loader.load('./3d/004/toin004.gltf', function (gltf) {
    model = gltf.scene;
    model.scale.set(0.05, 0.05, 0.05);
    scene.add(model);
});

// アニメーション
function animate() {
    controls.update();
    // controls2.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// アニメーション実行
animate();