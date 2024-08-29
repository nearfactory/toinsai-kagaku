// ========================================


// ページのヘッダー高さ/フッター高さ
const headerHeight = 70;
const footerHeight = 45;


// ========================================


// マップの画像パス
var mapImgURL = 
  [,
   "./2d/1.png", 
   "./2d/2.png",
   "./2d/3.png"
  ]; 

// 選択されているフロア
var floor = 1;


// ========================================


// マップのアイコンのデータ格納CSVファイルのパス
const mapContentCSV = "./asset/csv/2dmap.csv";


// ========================================


// カメラ操作の有効化切り替え
const controlEnRotate = false;
const controlEnPan = true;

// カメラ操作の各スピード
const controlSpRotate = 0.5;
const controlSpZoom = 1;
const controlSpPan = 1;

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
const minZoom = 500;
const maxZoom = 15000;

// カメラの移動可能範囲
// [0]x: ページ水平方向
// [1]z: ページ垂直方向
const camRangeVal = [2500, 4000];

// カメラの初期位置
posInit = [0, 10000, 0];


// ========================================


// 3Dワールドの設定
const worldColor = 0xffffdd;


// ========================================


// 平面サイズ
const planeSize = 9000;