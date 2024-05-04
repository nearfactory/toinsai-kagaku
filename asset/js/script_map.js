import * as THREE from 'three';
import { GLTFLoader } from "GLTFLoader";
import { OrbitControls } from "OrbitControls";


// 画面サイズの取得
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight - (80+98+50+30);

// レンダラーの作成
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(windowWidth, windowHeight);

// シーンの作成
const scene = new THREE.Scene();
// 背景色の設定(水色)
scene.background = new THREE.Color('#ffffff');

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
const light1 = new THREE.PointLight("#FCFBE8", 20000, 1000);
const light2 = new THREE.PointLight("#ffffff", 20000, 1000);
light1.position.set(0, 100, 45);
light2.position.set(0, 100, -45);
scene.add(light1);
scene.add(light2);

// マウス制御
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true; // カメラの回転を有効にする
controls.maxPolarAngle = Math.PI / 180 * 75; // カメラの仰角の最小値を90度に設定する（上から見上げる角度を制限）
controls.minDistance = 3; // 最小距離を設定
controls.maxDistance = 9; // 最大距離を設定
controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.3;
controls.enablePan = false;     //true:パン操作可能,false:パン操作不可
// controls.userPanSpeed = 2.0;   //パン速度

// 3Dモデルの読み込み
const loader = new GLTFLoader();
loader.load('./3d/toin002.gltf', function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.05, 0.05, 0.05);
    scene.add(model);
});

// アニメーション
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// アニメーション実行
animate();