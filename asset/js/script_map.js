// 設定値

// 各モデルのスケール
const scaleVal = [
  0.3, // 学校
  0.15  // ボール
];

// カメラ操作速度
const cameraSpeedVal = [
  0.1,  // 回転
  0.175,  // ズーム
  0.2   // パン
];

// パン可能範囲
const cameraRangeVal = [
  30,   // x（初期位置から奥）
  40,   // y（垂直上）
  0.5,  // y（垂直下）
  30    // z（初期位置から横）
];







import * as THREE from 'three';
import { GLTFLoader } from "GLTFLoader";
import { OrbitControls } from "OrbitControls";

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
scene.background = new THREE.Color('#BBF2FF');
// scene.background = new THREE.CubeTextureLoader()
//   .setPath( './3d/background/' )
//   .load( [
//     'sky1.jpg',
//     'sky3.jpg',
//     'sky3.jpg',
//     'sky3.jpg',
//     'sky4.jpg',
//     'sky2.jpg'
// ]);

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
const sun = new THREE.AmbientLight("#ffffff", 0.3);
// const light1 = new THREE.PointLight("#ffffff", 50, 20);
// const light2 = new THREE.PointLight("#ffffff", 50, 20);
// const light3 = new THREE.PointLight("#ffffff", 50, 20);
// const light4 = new THREE.PointLight("#ffffff", 50, 20);
// SpotLight([色], [強さ], [照射半径], [照射角度], ???, ???);
const light1 = new THREE.SpotLight("#ffffff", 1.5, 40, Math.PI/180*120, 1, 0.05);
const light2 = new THREE.SpotLight("#ffffff", 1.5, 40, Math.PI/180*120, 1, 0.05);
const light3 = new THREE.SpotLight("#ffffff", 1.5, 40, Math.PI/180*120, 1, 0.05);
const light4 = new THREE.SpotLight("#ffffff", 1.5, 40, Math.PI/180*120, 1, 0.05);
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

controls.enableRotate = true; //カメラの回転を有効にする
controls.enablePan = true;    //カメラのパンを有効にする

controls.rotateSpeed = cameraSpeedVal[0]; //回転速度
controls.zoomSpeed = cameraSpeedVal[1];   //ズーム速度
controls.panSpeed = cameraSpeedVal[2];    //パン速度

controls.maxPolarAngle = Math.PI / 180 * 80; // カメラの仰角の最小値を設定
// controls.minPolarAngle = Math.PI / 180 * 25; // カメラの仰角の最小値を設定

// controls.minDistance = 3; // 最小距離を設定
// controls.maxDistance = 9; // 最大距離を設定

// controls.minTargetRadius = 0;  //??????

controls.enableDamping = true;  //なめらかな動きを可能に
controls.dampingFactor = 0.15;   //滑らかさの係数

var y = 0;

// 3Dモデルの読み込み
const loader = new GLTFLoader();

const url = [
  "./3d/004/toin004.gltf",
  "./3d/004/test.gltf"
];

var model = {};
var flag = false;

loader.load(url[0], function (gltf) {
  model.school = gltf.scene;
  model.school.scale.set(scaleVal[0], scaleVal[0], scaleVal[0]);
  model.school.position.set(0, 0, 0);
  scene.add(model.school);
  flag = true;
});

loader.load(url[1], function (gltf) {
  model.ball = gltf.scene;
  model.ball.scale.set(scaleVal[1], scaleVal[1], scaleVal[1]);
  model.ball.position.set(0, 1.5, 0);
  scene.add(model.ball);
  flag = true;
});

// カメラの移動量制限
function cameraMoveCheck() {
  camera.position.x = camera.position.x > cameraRangeVal[0] ? cameraRangeVal[0] : camera.position.x;
  camera.position.x = camera.position.x < -1 * cameraRangeVal[0] ? -1 * cameraRangeVal[0] : camera.position.x;
  camera.position.y = camera.position.y > cameraRangeVal[1] ? cameraRangeVal[1] : camera.position.y;
  camera.position.y = camera.position.y < cameraRangeVal[2] ? cameraRangeVal[2] : camera.position.y;
  camera.position.z = camera.position.z > cameraRangeVal[3] ? cameraRangeVal[3] : camera.position.z;
  camera.position.z = camera.position.z < -1 * cameraRangeVal[3] ? -1 * cameraRangeVal[3] : camera.position.z;
}

// アニメーション
function animate() {

  y += 0.02;

  if(flag){
    model.ball.position.set(Math.sin(y)*2, 1.5, Math.cos(y)*2);
    model.ball.rotation.set(y, y, y);
    
    cameraMoveCheck();

    console.log("x:" + String(Math.floor(camera.position.x)) + "\t\ty:" + String(Math.floor(camera.position.y)) + "\t\tz:" + String(Math.floor(camera.position.z)));
  }
    
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// アニメーション実行
animate();