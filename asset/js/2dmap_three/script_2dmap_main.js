// ページの読み込みを待つ
window.onload = () => {
  init()
}

// サイズを指定
const width = window.innerWidth;
const height = window.innerHeight - headerHeight - footerHeight;
let rot = 0;
let mouseX = 0;




// カメラの移動範囲チェック用関数
function cameraMoveCheck(ctrl) {
  ctrl.target.x = Math.max(-1*camRangeVal[0], Math.min(camRangeVal[0], ctrl.target.x)); // x軸の範囲を制限
  ctrl.target.z = Math.max(-1*camRangeVal[2], Math.min(camRangeVal[2], ctrl.target.z)); // z軸の範囲を制限
  ctrl.object.position.x = THREE.MathUtils.clamp(ctrl.object.position.x, camRangeVal[0]*-1, camRangeVal[0]);
  ctrl.object.position.z = THREE.MathUtils.clamp(ctrl.object.position.z, camRangeVal[2]*-1, camRangeVal[2]);
}





// シーン
var scene;
// カメラ
var camera;
// マップ表示用平面ジオメトリ
var plane;
// OrbitControls操作用コントローラ
var controls;



// 初期化用関数
const init = () => {
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
  const planeGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
  const planeMaterial = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL), side: THREE.DoubleSide});
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
  // ズームの深度はcontrols.object.position.yで取得可能（カメラのy座標）
  // controls.minDistance = minZoom;
  controls.maxDistance = maxZoom;
  controls.enableDamping = controlEnDamping;
  controls.dampingFactor = controlDampingFactor;
  
  
  camera.position.set(0, 2500, 2500);  // 高さを適切に設定
  controls.target.set(0, 0, 0);  // ターゲットを原点に設定

  
  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // 原点方向を見つめる
    // camera.lookAt(new THREE.Vector3(0, 0, 0));
    
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
    //camera.position.set(1000, 1000, 2000);
    if (window.matchMedia('(max-width: 767px)').matches) {
      // camera.position.set(1000, 1000, 2000);
    } else if (window.matchMedia('(min-width:768px)').matches) {
      // camera.position.set(0, 0, +1300);
    }
    camera.updateProjectionMatrix();
  }

  // ----------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // -----------------------------------------------------------------------
}









$("#floor1").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  mapImgURL = "./2d/1.png";
  plane.material = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL), side: THREE.DoubleSide});
});
$("#floor2").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  mapImgURL = "./2d/002.png";
  plane.material = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL), side: THREE.DoubleSide});
});
$("#floor3").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  mapImgURL = "./2d/003.png";
  plane.material = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL), side: THREE.DoubleSide});
});
$("#floorAll").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  mapImgURL = "./2d/1.png";
  plane.material = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL), side: THREE.DoubleSide});
});

$("#toggleFloor").click(function(){
  $("#floorSelect").toggleClass("active");
});