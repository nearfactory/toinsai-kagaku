// 設定値

// 各モデルのスケール
const scaleVal = [
  0.3, // 学校
  0.3  // ボール
];

// カメラ操作速度
const cameraSpeedVal = [
  0.1,  // 回転
  0.175,  // ズーム
  0.2   // パン
];

// 回転可能範囲
const cameraRotateVal = [
  85
]

// パン可能範囲
const cameraRangeVal = [
  30,   // x（初期位置から奥）
  60,   // y（垂直上）
  0.1,  // y（垂直下）
  30    // z（初期位置から横）
];











import * as THREE from 'three';
import { GLTFLoader } from "GLTFLoader";
import { OrbitControls } from "OrbitControls";

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
var helpers = [];
var helperX = [0, 0, 0];
var helperY = [0, 0.0000001, 0];
var helperZ = [0, 0, 0];

for (var i=0; i<3; i++){
  helpers.push(new THREE.GridHelper(60, 60, "#2288ff", "#cccccc"));
  helpers[i].position.set(helperX[i], helperY[i], helperZ[i]);
  scene.add(helpers[i]);
}
helpers[0].rotation.x = Math.PI/180*90;
helpers[1].rotation.y = Math.PI/180*90;
helpers[2].rotation.z = Math.PI/180*90;










// カメラを作成
const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);
camera.aspect = windowWidth / windowHeight;
camera.updateProjectionMatrix();
camera.position.set(-25, 8, -20);
camera.lookAt(0, 0, 0);











// ライトの作成
const sun = new THREE.AmbientLight("#ffffff", 1);
scene.add(sun);

// SpotLight([色], [強さ], [照射半径], [照射角度], ???, ???);

var lights = [];
var lightX = [0, 50, 0, -50];
var lightY = [50, 0, -50, 0];

for(var i=0; i<4; i++){
  lights.push(new THREE.SpotLight("#ffffff", 6, 100, Math.PI/180*120, 1, 0.05));
  lights[i].position.set(lightX[i], 40, lightY[i]);
  lights[i].lookAt(0, 0, 0);
  scene.add(lights[i]);
}

// スポットライト用のヘルパーを作成
// const lightHelper = new THREE.SpotLightHelper(light2);
// scene.add(lightHelper);











// マウス制御
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableRotate = true; //カメラの回転を有効にする
controls.enablePan = true;    //カメラのパンを有効にする

controls.rotateSpeed = cameraSpeedVal[0]; //回転速度
controls.zoomSpeed = cameraSpeedVal[1];   //ズーム速度
controls.panSpeed = cameraSpeedVal[2];    //パン速度

controls.maxPolarAngle = Math.PI / 180 * cameraRotateVal[0]; // 下からののぞき込み防止
// controls.minPolarAngle = Math.PI / 180 * 25; // カメラの仰角の最小値を設定

// controls.minDistance = 3; // 最小距離を設定
// controls.maxDistance = 9; // 最大距離を設定

// controls.minTargetRadius = 0;  //??????

controls.enableDamping = true;  //なめらかな動きを可能に
controls.dampingFactor = 0.15;   //滑らかさの係数












// 3Dモデルの読み込み
const loader = new GLTFLoader();

const url = [
  "./3d/005/toin005.gltf",
  "./3d/004/test.gltf",
  "./3d/004/test.gltf",
];

var model = {};
var flag = false;

loader.load(url[0], function (gltf) {
  model.school = gltf.scene;
  model.school.scale.set(scaleVal[0], scaleVal[0], scaleVal[0]);
  model.school.position.set(0, 0, 0);
  scene.add(model.school);
});

loader.load(url[1], function (gltf) {
  model.ball = gltf.scene;
  model.ball.scale.set(scaleVal[1], scaleVal[1], scaleVal[1]);
  model.ball.position.set(0, 10, 0);
  scene.add(model.ball);
  flag = true;
});

loader.load(url[2], function (gltf) {
  model.ball2 = gltf.scene;
  model.ball2.scale.set(scaleVal[1], scaleVal[1], scaleVal[1]);
  model.ball2.position.set(0, 10, 0);
  scene.add(model.ball2);
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






var y = 0;
// アニメーション
function animate() {

  y += 0.02;

  if(flag){
    model.ball.position.set(Math.sin(y+Math.PI)*5, 20, Math.cos(y+Math.PI)*5);
    model.ball2.position.set(Math.sin(y)*5, 20, Math.cos(y)*5);
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











function onResize() {
  // サイズを取得
  const width = window.innerWidth;
  const height = window.innerHeight - (80+90);

  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // カメラのアスペクト比を正す
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// 初期化のために実行
onResize();

// リサイズイベント発生時に実行
window.addEventListener('resize', onResize);