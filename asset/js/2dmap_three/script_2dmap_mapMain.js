
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

// ========================================

// promiseを使用して完了まで待機するシステムにした
function fetchCSV(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(`Failed to fetch CSV: ${xhr.status}`);
        }
      }
    };
    xhr.open('GET', url);
    xhr.send();
  });
}

// 読み込んだCSVファイルを二次元配列に組みなおす
function parseCSV(csvText) {
  const lines = csvText.split(/\r\n|\n/);
  const data = [];

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    if (currentLine.length > 0) {
      data.push(currentLine);
    }
  }

  return data;
}

// ========================================

// ページの読み込み完了で初期化
window.onload = () => {
  mapInit();
}

// ========================================

// カメラの移動範囲チェック用関数
function cameraMoveCheck(ctrl) {
  ctrl.target.x = Math.max(-1*camRangeVal[0], Math.min(camRangeVal[0], ctrl.target.x)); // x軸の範囲を制限
  ctrl.target.z = Math.max(-1*camRangeVal[1], Math.min(camRangeVal[1], ctrl.target.z)); // z軸の範囲を制限
  ctrl.object.position.x = THREE.MathUtils.clamp(ctrl.object.position.x, camRangeVal[0]*-1, camRangeVal[0]);
  ctrl.object.position.z = THREE.MathUtils.clamp(ctrl.object.position.z, camRangeVal[1]*-1, camRangeVal[1]);
}

// ========================================

// サイズを指定
const width = window.innerWidth;
const height = window.innerHeight - headerHeight - footerHeight;
let rot = 0;
let mouseX = 0;

// ========================================

// シーン
var scene;
var scene2;
// カメラ
var camera;
// マップ表示用平面ジオメトリ
var plane;
// OrbitControls操作用コントローラ
var controls;

// ========================================

// CSVデータ格納用変数
var mapContent;

// ========================================

// css3Dオブジェクト
var css3Dobj;
var cssobj;

// ========================================

// 初期化用関数
const mapInit = () => {

  // DOM要素を取得
  const canvasElement = document.querySelector('#mapCanvas');

  // ========================================

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(new THREE.Color(worldColor));

  // ========================================

  const cssrenderer = new CSS3DRenderer();
	cssrenderer.setSize(width, height);
  cssrenderer.antialias = true;
	cssrenderer.domElement.style.position = 'absolute';
	cssrenderer.domElement.style.top = 0;
  cssrenderer.domElement.setAttribute("id", "cssCanvas");
	document.getElementById("sectionMap").prepend(cssrenderer.domElement);

  // ========================================

  // シーンを作成
  scene = new THREE.Scene();
  scene2 = new THREE.Scene();

  // ========================================
  
  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 500, 0);
  scene.add(directionalLight);
  
  // ========================================

  // カメラを作成
  // PerspectiveCamera(画角, アスペクト比＝縦横比, 描画開始距離, 描画終了距離);
  // TIPS: 描画開始距離を小さくしすぎると3Dワールドじたいの描画が不安定になりやすい
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  
  // カメラコントローラーを作成
  controls = new THREE.MapControls(camera, canvasElement);
  
  // 各種カメラ設定（詳細はscript_2dmap_const.jsを参照）
  controls.enableRotate = controlEnRotate;
  controls.enablePan = controlEnPan;
  controls.rotateSpeed = controlSpRotate;
  controls.zoomSpeed = controlSpZoom;
  controls.panSpeed = controlSpPan;
  controls.minPolarAngle = controlMinAngle;
  controls.maxPolarAngle = controlMaxAngle;
  controls.minDistance = minZoom;
  controls.maxDistance = maxZoom;
  controls.enableDamping = controlEnDamping;
  controls.dampingFactor = controlDampingFactor;
  
  // カメラの初期位置を設定
  camera.position.set(posInit[0], posInit[1], posInit[2]);
  controls.target.set(0, 0, 0);

  // ========================================
  
  // 平面を作成・マテリアルにテクスチャーを設定
  const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize, 1, 1);
  const planeMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(mapImgURL[floor]),
  });
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(0, -0.01, 0);
  plane.rotation.set(Math.PI / 180 * -90, 0, 0);
  scene.add(plane);

  // ========================================

  // グリッドヘルパーを追加
  if(enGrid){
    var gridHelper = new THREE.GridHelper(planeSize, 50, 0xff0000, 0xaaaaaa);
    scene.add(gridHelper);
  }
  
  // ========================================
  
  // マップコンテンツ選択用ボタンのコンテナをCSS3DObjectから追加（DOM要素を3Dワールドに追加）
  cssobj = document.getElementById("mapContentBtnContainer");
  css3Dobj = new CSS3DObject(cssobj);
  scene2.add(css3Dobj);
  css3Dobj.rotation.set(-90 / 180 * Math.PI, 0, 0);
  css3Dobj.position.set(0, 0, 0);
  css3Dobj.updateMatrixWorld();
  cssobj.style.opacity = '1';
  
  // ========================================
  
  var count = 0;
  // 毎フレーム時に実行されるループイベント
  const tick = () => {

    count = (count+1)%(60/fps);
    
    if(count == 0){
      // カメラコントローラーを更新
      cameraMoveCheck(controls);
      controls.update();

      // レンダリング
      renderer.render(scene, camera);
      cssrenderer.render(scene2, camera);
    }

    requestAnimationFrame(tick);
  }

  tick();

  // ========================================

  // リサイズの処理
  onResize();

  // リサイズイベント発生時に実行
  window.addEventListener('resize', onResize);
  function onResize() {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight - headerHeight - footerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    cssrenderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

// ========================================

// CSVファイルからマップコンテンツを読み込み
// Promiseメソッドを使用して読み込み完了まで待機
function mapContentInit() {
  Promise.all([
    fetchCSV(mapContentCSV)
  ]).then(([csvText]) => {

    // CSVを二次元配列化して格納
    mapContent = parseCSV(csvText);

    addMapContentButton(mapContent);

  }).catch(error => console.error(error));
}
mapContentInit();

// ========================================

// CSVファイルからマップ上のコンテンツボタンを作成・追加する関数
function addMapContentButton(csvArray){
  const mapContentBtnContainer = document.getElementById("mapContentBtnContainer");
  for(var i=0; i<csvArray.length-1; i++){
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("mapContentBtn");
    buttonElement.classList.add(mapContent[i+1][3]);
    if(mapContent[i+1][0] == 1){
      buttonElement.classList.add("onDisplay");
    }
    else{
      buttonElement.classList.remove("onDisplay");
    }
    buttonElement.setAttribute("id", "mapContentBtn" + String(i+1));
    buttonElement.innerHTML = i+1;
    buttonElement.style.left = mapContent[i+1][1] + "px";
    buttonElement.style.top = mapContent[i+1][2] + "px";
    mapContentBtnContainer.appendChild(buttonElement);
  }
}

// ========================================

// マップコンテンツ選択ボタン押下時の実行関数
$(document).on("click", ".mapContentBtn", function () {
  $("#mapContentWindow").addClass("active");
  const mapContentIndex = $(this).attr("id").replace("mapContentBtn", "");
  $("#mapContentClass").html(mapContent[mapContentIndex][4]);
  $("#mapContentTitle").html(mapContent[mapContentIndex][5]);
  $("#mapContentDesc").html(mapContent[mapContentIndex][6]);
  $("#mapContentImg").attr("src", "./image/" + mapContent[mapContentIndex][7] + ".webp");
})

// ========================================

$("#mapCanvas").click(function(){
  $("#mapContentWindow").removeClass("active");
})

// ========================================

function changeFloor(floorInto){
  for(var i=0; i<mapContent.length-1; i++){
    if(mapContent[i+1][0] == floorInto){
      document.getElementById("mapContentBtn" + String(i+1)).classList.add("onDisplay");
    }
    else{
      document.getElementById("mapContentBtn" + String(i+1)).classList.remove("onDisplay");
    }
  }
  if(floor != floorInto){
    plane.material = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL[floorInto])});
  }
}

$("#floor1").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active");
  changeFloor(1);  
  floor = 1;
});

$("#floor2").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active");
  changeFloor(2);
  floor = 2;
});

$("#floor3").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active");
  changeFloor(3);
  floor = 3;
});

$("#floorAll").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  plane.material = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL[1])});
});

// ========================================

$("#toggleFloor").click(function(){
  $("#floorSelect").toggleClass("active");
});

// ========================================

// 混雑状況タブの各クラスのマップリンククリック時の挙動用関数
$(".mapLink").click(function(){
  const clickedLinkIndex = $(this).attr("id").replace("mapLink","");
  const clickedLinkFloor = $(this).attr("data-floor").replace("f","");
  camera.position.x = mapContent[clickedLinkIndex][1];
  camera.position.y = 200;
  camera.position.z = mapContent[clickedLinkIndex][2];
  controls.target.set(mapContent[clickedLinkIndex][1], 0, mapContent[clickedLinkIndex][2]);
  changeFloor(clickedLinkFloor);
  floor = clickedLinkFloor;
});