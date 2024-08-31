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
// カメラ
var camera;
// マップ表示用平面ジオメトリ
var plane;
// OrbitControls操作用コントローラ
var controls;

// マップコンテンツグループ
var contentGroup;

// ========================================

// CSVデータ格納用変数
var mapContent;
// CSVデータ取得フラグ
var mapContentFlag = false;

// ========================================

// 初期化用関数
const mapInit = () => {

  // DOM要素を取得
  const canvasElement = document.querySelector('#mapCanvas');

  // ========================================

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  renderer.setSize(width, height);
  renderer.setClearColor(new THREE.Color(worldColor));

  // ========================================

  // シーンを作成
  scene = new THREE.Scene();

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
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(0, -0.01, 0);
  plane.rotation.set(Math.PI / 180 * -90, 0, 0);
  scene.add(plane);

  // ========================================
  
  // マップコンテンツを作成・追加
  // contentGroup = new THREE.Group();
  // for(var i=0; i<mapContent.length-1; i++){
  //   // ジオメトリとマテリアルを作成
  //   const mapContentGeometry = new THREE.CircleGeometry(contentSize, 100);
  //   const mapContentMaterial = new THREE.MeshBasicMaterial({
  //     color: new THREE.Color(0xabcdef),
  //     side: THREE.DoubleSide,
  //   });

  //   // ジオメトリとマテリアルからメッシュを作成
  //   const mapContentObject = new THREE.Mesh(mapContentGeometry, mapContentMaterial);
    
  //   // オブジェクトの各種アトリビュートを設定
  //   mapContentObject.rotation.set(Math.PI / 180 * -90, 0, 0);
  //   mapContentObject.position.set(mapContent[i+1][1], mapContent[i+1][2], mapContent[i+1][3]);
  //   mapContentObject.name = "content" + String(i+1);
    
  //   // 枠線を作成
  //   const outline = new THREE.LineSegments(
  //     new THREE.EdgesGeometry(mapContentGeometry), // 線を生成する元になるgeometry
  //     new THREE.LineBasicMaterial({ color: 0x000000 }) // 線のmaterial
  //   );
    
  //   // オブジェクトに枠線を追加
  //   mapContentObject.add(outline);
    
  //   // オブジェクトをシーンに追加
  //   scene.add(mapContentObject);
  // }

  // ========================================

  // グリッドヘルパーを追加
  if(enGrid){
    var gridHelper = new THREE.GridHelper(planeSize, 50, 0xff0000, 0xaaaaaa);
    scene.add(gridHelper);
  }
  var count = 0;

  // ========================================

  // 毎フレーム時に実行されるループイベント
  const tick = () => {

    count = (count+1)%(60/fps);
    
    if(count == 0){
      // カメラコントローラーを更新
      cameraMoveCheck(controls);
      controls.update();
  
      // レンダリング
      renderer.render(scene, camera);
  
    }

    $("#mapContentBtnContainer").css("transform", "scale(" + String(500/camera.position.y) + ")");

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
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

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
    mapContentFlag = true;

    addMapContentButton(mapContent);

  }).catch(error => console.error(error));
}
mapContentInit();

// ========================================

// // raycasterでタップ場所からまっすぐ伸びる光線を作成、
// // 光線上のオブジェクトを取得してクリック判定を行う
// let raycaster, mouse;

// // 操作用マウス/指ベクトルの作成
// mouse = new THREE.Vector2();
// // レイキャスターの初期化
// raycaster = new THREE.Raycaster();

// // クリックイベントの作成
// document.addEventListener('click', onMouseEvent);

// // クリック時に動く関数
// function onMouseEvent(event) {
//   if(!($("#sectionMap").hasClass("current"))){
//     return;
//   }
//   // event.preventDefault();

//   // 座標を正規化する呪文
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   // mouse.y = -(event.clientY / (window.innerHeight + headerHeight)) * 2 + 1;
//   mouse.y = -(event.clientY / (window.innerHeight)) * 2 + 1;
//   // mouse.y = -(event.clientY / (window.innerHeight - headerHeight)) * 2 + 1;
//   // mouse.y = -(event.clientY / (window.innerHeight - headerHeight - footerHeight)) * 2 + 1;
//   // console.log(mouse.x);
//   // console.log(mouse.y);

//   // レイキャスティングでマウスと重なるオブジェクトを取得
//   raycaster.setFromCamera(mouse, camera);
//   var intersect = raycaster.intersectObjects(scene.children)[0];

//   // 交差したオブジェクトの名前を取得してマップコンテンツかチェック
//   if(intersect.object.name.indexOf("content") != -1){

//     // まずすべてのマップコンテンツの色を初期化
//     for(var i=0; i<mapContent.length-1; i++){
//       console.log(scene.children[i+2].name);
//       scene.children[i+2].material.color.set(new THREE.Color(0x123456));
//     }

//     // 交差したマップコンテンツのみ色を更新
//     intersect.object.material.color.set(new THREE.Color(0x00ffff));
//     intersect.mapClass = "checked";

//     // 交差したマップコンテンツの名前からインデックスを取得してウィンドウのテキストを更新
//     const contentIndex = intersect.object.name.replace("content", "");
//     $("#mapContentClass").text(mapContent[contentIndex][4]);
//     $("#mapContentTitle").text(mapContent[contentIndex][5]);
//     $("#mapContentDesc").text(mapContent[contentIndex][6]);
//     $("#mapContentDesc").text(mapContent[contentIndex][6]);
//     console.log(intersect.mapClass);

//     // ウィンドウを表示
//     $("#mapContentWindow").addClass("active");
//   }
//   else{
//     // すべてのマップコンテンツの色を初期化
//     for(var i=0; i<mapContent.length-1; i++){
//       console.log(scene.children[i+2].name);
//       scene.children[i+2].material.color.set(new THREE.Color(0x123456));
//     }

//     // ウィンドウの非表示化
//     $("#mapContentWindow").removeClass("active");
//   }
// }

setInterval(() => {
  console.log(camera.position);
}, 100);

function addMapContentButton(csvArray){
  const sectionMap = document.getElementById("mapContentBtnContainer");
  for(var i=0; i<csvArray.length-1; i++){
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("mapContentBtn");
    buttonElement.setAttribute("id", "mapContentBtn" + String(i+1));
    buttonElement.innerHTML = "TEST";
    sectionMap.appendChild(buttonElement);
  }
}