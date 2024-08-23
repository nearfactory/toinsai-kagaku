// ページの読み込みを待つ
window.onload = () => {
  init()
}

// サイズを指定
const width = window.innerWidth;
const height = window.innerHeight;
let rot = 0;
let mouseX = 0;

const init = () => {
  const canvasElement = document.querySelector('#myCanvas');
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

  // 球体を作成・マテリアルにテクスチャーを設定
  const planeGeometry = new THREE.PlaneGeometry(2000, 1000);
  const planeMaterial = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load('earthmap1k.jpeg'), side: THREE.DoubleSide}) 
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(0, 0, 0);
  plane.rotation.set(Math.PI / 180 * -90, 0, 0)
  console.log(plane);
  scene.add(plane);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 50, 0);
  scene.add(directionalLight);

  // マウス座標はマウスが動いた時のみ取得できる
  document.addEventListener("mousemove", (event) => {
    mouseX = event.pageX;
  });

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement);

  // 各種カメラ設定（詳細はscript_2dmap_const.jsを参照）
  controls.enableRotate = controlEnRotate;
  controls.enablePan = controlEnPan;
  controls.rotateSpeed = controlSpRotate;
  controls.zoomSpeed = controlSpZoom;
  controls.panSpeed = controlSpPan;
  controls.minPolarAngle = controlMinAngle;
  controls.maxPolarAngle = controlMaxAngle;
  controls.minDistance = controlMinDistance;
  // controls.maxDistance = controlMaxDistance;

  controls.enableDamping = controlEnDamping;
  controls.dampingFactor = controlDampingFactor;

  // 毎フレーム時に実行されるループイベントです
  const tick = () => {
    // // マウスの位置に応じて角度を設定
    // // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
    // const targetRot = (mouseX / window.innerWidth) * 360;
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    // カメラコントローラーを更新
    controls.update();

    // 地球は常に回転させておく
    // earthMesh.rotation.y += 0.01;
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
    const height = window.innerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    //camera.position.set(1000, 1000, 2000);
    if (window.matchMedia('(max-width: 767px)').matches) {
      camera.position.set(1000, 1000, 2000);
    } else if (window.matchMedia('(min-width:768px)').matches) {
      camera.position.set(0, 0, +1300);
    }
    camera.updateProjectionMatrix();
  }

  // ----------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // -----------------------------------------------------------------------
}