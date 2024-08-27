var mapImgURL = "./2d/1.png"




const test2 = 30;

// カメラ操作の有効化切り替え
const controlEnRotate = false;
const controlEnPan = true;

// カメラ操作の各スピード
const controlSpRotate = 0.75;
const controlSpZoom = 0.5;
const controlSpPan = 0.75;

// カメラの仰角の最大値/最小値
// 仰角＝カメラの視線の線と地球を南北に貫く軸の角度の大きさ
const controlMinAngle = Math.PI / 180 * 0;
const controlMaxAngle = Math.PI / 180 * 0;

// カメラの最大距離/最小距離
const controlMinDistance = 3;
const controlMaxDistance = 9;

// カメラの滑らかな動きの有効化切り替え
const controlEnDamping = true;

// カメラの滑らかな動きの係数
const controlDampingFactor = 0.25;

// カメラのズームの最大値/最小値
const maxZoom = 6000

// カメラの移動可能範囲
const camRangeVal = [1000, 100000, 1000];





// ページのヘッダー高さ/フッター高さ
const headerHeight = 70;
const footerHeight = 45;





// 3Dワールドの設定
const worldColor = 0xffffff;