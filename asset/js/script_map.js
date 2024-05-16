// 設定値

// 各モデルのスケール
const scaleVal = [
  0.3, // 学校
  0.3,  // ボール
  2,  // 気球
];

// カメラ操作速度
const cameraSpeedVal = [
  0.2,  // 回転
  0.175,  // ズーム
  0.4   // パン
];

// 回転可能範囲
const cameraRotateVal = [
  80
]

// パン可能範囲
const cameraRangeVal = [
  50,   // x（初期位置から奥）
  60,   // y（垂直上）
  0.1,  // y（垂直下）
  50    // z（初期位置から横）
];

// 目的地座標
const targetCoordinate = [
  new THREE.Vector3(0, 0, 0),     // 原点
  new THREE.Vector3(-8, 8, 21),   // 体育館
  new THREE.Vector3(15, 15, 15),   // 体育館
];











import * as THREE from 'three';
import { GLTFLoader } from "GLTFLoader";
import { OrbitControls } from "OrbitControls";

// 画面サイズの取得
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight - (80+30);











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
// レンダリング時の影の描画を有効化
// renderer.shadowMap.enabled = true;










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
var helperY = [0, 0.1, 0];
var helperZ = [0, 0, 0];

for (var i=0; i<3; i++){
  helpers.push(new THREE.GridHelper(60, 60, "#2288ff", "#dddddd"));
  helpers[i].position.set(helperX[i], helperY[i], helperZ[i]);
  scene.add(helpers[i]);
  helpers[i].name = "helper" + String(i);
}
helpers[0].rotation.x = Math.PI/180*90;
helpers[1].rotation.y = Math.PI/180*90;
helpers[2].rotation.z = Math.PI/180*90;










// カメラを作成
// 透視投影
const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);
// 平行投影
// const camera = new THREE.OrthographicCamera(-20, +20, 20, -20, 1, 1000);
camera.aspect = windowWidth / windowHeight;
camera.updateProjectionMatrix();
// camera.position.set(0, 30, 0);
camera.position.set(-25, 8, -20);











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
  // ライトに影を有効にする
  // lights[i].castShadow = true;
  // lights[i].shadow.mapSize.width = 2048;
  // lights[i].shadow.mapSize.height = 2048;
  scene.add(lights[i]);
}

// スポットライト用のヘルパーを作成
// const lightHelper = new THREE.SpotLightHelper(light2);
// scene.add(lightHelper);











// マウス制御
const controls = new OrbitControls(camera, renderer.domElement);

// Later in your code
controls.object.position.set(camera.position.x, camera.position.y, camera.position.z);
controls.target = new THREE.Vector3(0, 0, 0);

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
  "./3d/balloon.gltf",
];

var model = {};
var flag = 0;

loader.load(url[0], function (gltf) {
  model.school = gltf.scene;
  model.school.scale.set(scaleVal[0], scaleVal[0], scaleVal[0]);
  model.school.position.set(0, 0, 0);
  // model.school.receiveShadow = true;
  // model.school.castShadow = true;

  // 裏面も描画
  model.school.traverse((object) => { //モデルの構成要素をforEach的に走査
    if(object.isMesh) { //その構成要素がメッシュだったら
      object.material.side = THREE.DoubleSide;
    }
  });

  model.school.name = "school";

  scene.add(model.school);

  flag += 1;
});

loader.load(url[1], function (gltf) {
  model.ball = gltf.scene;
  model.ball.scale.set(scaleVal[1], scaleVal[1], scaleVal[1]);
  model.ball.position.set(-8, 8, 21);

  // 裏面も描画
  model.ball.traverse((object) => { //モデルの構成要素をforEach的に走査
    if(object.isMesh) { //その構成要素がメッシュだったら
      object.material.side = THREE.DoubleSide;
    }
  });

  model.ball.name = "gym";

  scene.add(model.ball);

  flag += 1;
});

loader.load(url[2], function (gltf) {
  model.balloon = gltf.scene;
  model.balloon.scale.set(scaleVal[2], scaleVal[2], scaleVal[2]);
  model.balloon.position.set(15, 15, 15);

  // 裏面も描画
  model.balloon.traverse((object) => { //モデルの構成要素をforEach的に走査
    if(object.isMesh) { //その構成要素がメッシュだったら
      object.material.side = THREE.DoubleSide;
    }
  });

  model.balloon.name = "balloon";

  scene.add(model.balloon);

  flag += 1;
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
  y += 0.001;

  if(flag == url.length){
    // model.ball.position.set(Math.sin(y+Math.PI)*5, 20, Math.cos(y+Math.PI)*5);
    // model.ball.rotation.set(y, y, y);
    
    cameraMoveCheck();
    console.log("x:" + String(Math.floor(camera.position.x)) + "\t\ty:" + String(Math.floor(camera.position.y)) + "\t\tz:" + String(Math.floor(camera.position.z)));

    model.balloon.position.set(15*Math.sin(y), 15, 15*Math.cos(y));
  }

  $("#map-gym").click(function(){
    // controls.object.position.set(-8, 8, 21);
    controls.target = targetCoordinate[1];
    
    // camera.position.set(camera.position.x, camera.position.y, camera.position.z);
  })
    
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// アニメーション実行
animate();











function onResize() {
  // サイズを取得
  const width = window.innerWidth;
  const height = window.innerHeight - (70+45);

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










// raycasterでタップ場所からまっすぐ伸びる光線を作成、
// 光線上のオブジェクトを取得してクリック判定を行う
let raycaster, mouse;

// レイキャスターの初期化
raycaster = new THREE.Raycaster();

// 操作用マウス/指ベクトルの作成
mouse = new THREE.Vector2();

// クリックイベントの作成
document.addEventListener('click', onMouseEvent);










// クリック時に動く関数
function onMouseEvent(event) {
  // event.preventDefault();

  // 座標を正規化する呪文
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // レイキャスティングでマウスと重なるオブジェクトを取得
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if(intersects[0].object.parent.name == "gym"){
    intersects[0].object.material.color.set("#5588ee");

  }
  else{
    intersects[0].object.material.color.set("#ffffff");
    model.ball.traverse((object) => { //モデルの構成要素をforEach的に走査
      if(object.isMesh) { //その構成要素がメッシュだったら
        object.material.color.set("#00ff00");
      }
    });
  }

  console.log(model.ball);
  
}