// ページの読み込みを待つ
window.onload = () => {
  init()
}

// サイズを指定
const width = window.innerWidth;
const height = window.innerHeight - headerHeight - footerHeight;
console.log(height);
let rot = 0;
let mouseX = 0;




// カメラの移動範囲チェック用関数
function cameraMoveCheck(cam) {
  cam.position.x = cam.position.x > camRangeVal[0] ? camRangeVal[0] : cam.position.x;
  cam.position.x = cam.position.x < -1 * camRangeVal[0] ? -1 * camRangeVal[0] : cam.position.x;
  cam.position.y = cam.position.y > camRangeVal[1] ? camRangeVal[1] : cam.position.y;
  cam.position.y = cam.position.y < camRangeVal[2] ? camRangeVal[2] : cam.position.y;
  cam.position.z = cam.position.z > camRangeVal[3] ? camRangeVal[3] : cam.position.z;
  cam.position.z = cam.position.z < -1 * camRangeVal[3] ? -1 * camRangeVal[3] : cam.position.z;
}





// シーン
var scene;
// カメラ
var cam;
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
  console.log(plane);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 50, 0);
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
  // controls.minDistance = controlMinDistance;
  // controls.maxDistance = controlMaxDistance;
  controls.enableDamping = controlEnDamping;
  controls.dampingFactor = controlDampingFactor;
  controls.object.position.y = Math.exp(7);

  
  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // 原点方向を見つめる
    // camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    // カメラコントローラーを更新
    controls.update();

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);

    // console.log(Math.log(controls.object.position.y));

    // // ズームアウトしすぎを解消
    // if(Math.log(controls.object.position.y) > maxZoom){
    //   controls.object.position.y = Math.exp(maxZoom);
    // }
    // // ズームインしすぎを解消
    // else if(Math.log(controls.object.position.y) < 0){
    //   controls.object.position.y = Math.exp(0);
    // }

    // // 移動範囲を制限
    // if(controls.object.position.x > 1500){
    //   console.log(controls.object.position.x);
    //   console.log(controls.object.position.x+1);
    // }

    cameraMoveCheck(camera);
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