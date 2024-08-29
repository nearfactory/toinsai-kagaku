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
  mapContentInit();
  // while(!mapContentCSVFlag);
  console.log(mapContentCSVFlag);
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


// ========================================


// CSVデータ格納用変数
var mapContent;

var mapContentCSVFlag = false;


// ========================================


// 初期化用関数
const mapInit = () => {
  // DOM要素を取得
  const canvasElement = document.querySelector('#mapCanvas');

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(new THREE.Color(worldColor));

  // シーンを作成
  scene = new THREE.Scene();

  // カメラを作成
  // PerspectiveCamera(画角, アスペクト比＝縦横比, 描画開始距離, 描画終了距離);
  camera = new THREE.PerspectiveCamera(45, width / height, 0.0000001, 10000000);

  // 平面を作成・マテリアルにテクスチャーを設定
  const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize, 1, 1);
  const planeMaterial = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL[floor]), side: THREE.DoubleSide});
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(0, 0, 0);
  plane.rotation.set(Math.PI / 180 * -90, 0, 0);
  scene.add(plane);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 500, 0);
  scene.add(directionalLight);

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

  console.log(mapContent);

  
  // 毎フレーム時に実行されるループイベント
  const tick = () => {
    
    // カメラコントローラーを更新
    cameraMoveCheck(controls);
    controls.update();

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }

  tick();

  // --------------------------------------------------------------------------
  // リサイズの処理
  // ----------------------------------------------------------------------------

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

function mapContentInit() {
  Promise.all([
    fetchCSV(mapContentCSV)
  ]).then(([csvText]) => {
    mapContent = parseCSV(csvText);
    mapContentCSVFlag = true;
  }).catch(error => console.error(error));
}