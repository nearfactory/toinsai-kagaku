const test2 = 30;

// カメラ操作の有効化切り替え
const controlEnRotate = true;
const controlEnPan = true;

// カメラ操作の各スピード
const controlSpRotate = 0.1;
const controlSpZoom = 1;
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