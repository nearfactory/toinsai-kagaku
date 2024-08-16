const zoomContainer = document.querySelector('#sectionMap');
const content = document.querySelector('#content');
const contentBtn = document.getElementsByClassName('mapContentBtn');

zoomContainer.scrollLeft = 99999;
zoomContainer.scrollTop = 99999;
zoomContainer.scrollLeft = zoomContainer.scrollLeft / 2;
zoomContainer.scrollTop = zoomContainer.scrollTop / 2;

const containerWidth = zoomContainer.offsetWidth;
const containerHeight = zoomContainer.offsetHeight;
const scrollbarWidth = zoomContainer.offsetWidth - zoomContainer.clientWidth;

const contentWidth = content.offsetWidth;
const contentHeight = content.offsetHeight;

// ズームスケールの初期値
var scale = 2;
var newScale;

// ズーム最大値・最小値
const maxZoom = 5;
const minZoom = 1;

// マウスホイールによるズーム
zoomContainer.addEventListener('wheel', (event) => {
  event.preventDefault();

  // ズーム変化量（マウスホイールの回転量）
  var delta = event.deltaY > 0 ? -0.1 : 0.1;
  
  newScale = scale + delta
  // 最大値処理
  newScale = newScale > maxZoom ? maxZoom : newScale;
  // 最小値処理
  newScale = newScale < minZoom ? minZoom : newScale;

  const zoomCenterX = (zoomContainer.scrollLeft + containerWidth / 2) / scale;
  const zoomCenterY = (zoomContainer.scrollTop + containerHeight / 2) / scale;

  content.style.transform = `scale(${newScale})`;
  for(var i=0; i<contentBtn.length; i++){
    var btnScale = 2/newScale
    btnScale = btnScale < 0.5 ? 0.5 : btnScale;
    btnScale = btnScale > 2.5 ? 25 : btnScale;
    contentBtn[i].style.transform = `scale(${btnScale})`
  }

  scale = newScale;

  zoomContainer.scrollLeft = zoomCenterX * scale - containerWidth / 2;
  zoomContainer.scrollTop = zoomCenterY * scale - containerHeight / 2;
});










// タッチによるピンチイン・ピンチアウトズーム
var lastTouchDistance = null;
var currentTouchDistance;

function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

zoomContainer.addEventListener('touchstart', (event) => {
  if (event.touches.length === 2) {
    lastTouchDistance = getDistance(event.touches);
    // alert("touchStart");
  }
});

zoomContainer.addEventListener('touchmove', (event) => {
  if (event.touches.length === 2) {
    // alert("move Start");
    event.preventDefault();

    currentTouchDistance = getDistance(event.touches);
    var deltaScale = currentTouchDistance / lastTouchDistance;
    
    newScale = scale * deltaScale;
    // 最大値処理
    newScale = newScale > maxZoom ? maxZoom : newScale;
    // 最小値処理
    newScale = newScale < minZoom ? minZoom : newScale;

    const zoomCenterX = (zoomContainer.scrollLeft + containerWidth / 2) / scale;
    const zoomCenterY = (zoomContainer.scrollTop + containerHeight / 2) / scale;

    content.style.transform = `scale(${newScale})`;
    for(var i=0; i<contentBtn.length; i++){
      var btnScale = 2/newScale
      btnScale = btnScale < 0.5 ? 0.5 : btnScale;
      btnScale = btnScale > 1.5 ? 1.5 : btnScale;
      contentBtn[i].style.transform = `scale(${btnScale})`
    }

    lastTouchDistance = currentTouchDistance;
    scale = newScale;

    zoomContainer.scrollLeft = zoomCenterX * scale - containerWidth / 2;
    zoomContainer.scrollTop = zoomCenterY * scale - containerHeight / 2;
  }
});

zoomContainer.addEventListener('touchend', () => {
  if (event.touches.length === 2) {
    lastTouchDistance = null;
  }
});




$("#navMap").click(function(){
  zoomContainer.scrollLeft = 99999;
  zoomContainer.scrollTop = 99999;
  zoomContainer.scrollLeft = zoomContainer.scrollLeft / 2;
  zoomContainer.scrollTop = zoomContainer.scrollTop / 2;
})

$("#mapLink1").click(function(){ 
  scale = scale;
  newScale = 5;

  const zoomCenterX = (zoomContainer.scrollLeft + containerWidth / 2) / scale;
  const zoomCenterY = (zoomContainer.scrollTop + containerHeight / 2) / scale;

  content.style.transform = `scale(${newScale})`;
  for(var i=0; i<contentBtn.length; i++){
    var btnScale = 2/newScale
    btnScale = btnScale < 0.5 ? 0.5 : btnScale;
    btnScale = btnScale > 1.5 ? 1.5 : btnScale;
    contentBtn[i].style.transform = `scale(${btnScale})`
  }
  scale = newScale;

  zoomContainer.scrollLeft = zoomCenterX * scale - containerWidth / 2;
  zoomContainer.scrollTop = zoomCenterY * scale - containerHeight / 2;  
});