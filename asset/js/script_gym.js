// スケジュールをCSVファイルから取得
// ファイルはすべてindex.htmlからの相対パスを指定（script_gym.jsからではない）
const day0CSV = './asset/csv/day0.csv';
const day1CSV = './asset/csv/day1.csv';
const day2CSV = './asset/csv/day2.csv';

// 各日の日付を入力
const day0date = "2024-09-10T";
const day1date = "2024-08-20T";
const day2date = "2024-09-12T";

// 選択されている日付（初期設定は1日目）
var daySelect = 1;

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

var day0;
var day0StartTimes;
var day0EndTimes;

var day1;
var day1StartTimes;
var day1EndTimes;

var day2;
var day2StartTimes;
var day2EndTimes;

// ========================================

function initSchedules() {
  // promiseを使用してすべての読み込みが完了するまで待機させる
  Promise.all([
    fetchCSV(day0CSV),
    fetchCSV(day1CSV),
    fetchCSV(day2CSV)
  ]).then(([csvText0, csvText1, csvText2]) => {

    // 二次元配列に変換してグローバル変数に格納
    day0 = parseCSV(csvText0);
    day1 = parseCSV(csvText1);
    day2 = parseCSV(csvText2);

    // console.log(day0);
    // console.log(day1);
    // console.log(day2);

    // ========================================

    // 開始時刻と終了時刻を初期化・データ取得
    day0StartTimes = [];
    day0EndTimes = [];
    day1StartTimes = [];
    day1EndTimes = [];
    day2StartTimes = [];
    day2EndTimes = [];

    for(var i=0; i<day0.length-1; i++){
      day0StartTimes.push(new Date(day0date + day1[i+1][0]));
      day0EndTimes.push(new Date(day0date + day1[i+1][1]));
    }
    for(var i=0; i<day1.length-1; i++){
      day1StartTimes.push(new Date(day1date + day1[i+1][0]));
      day1EndTimes.push(new Date(day1date + day1[i+1][1]));
    }
    for(var i=0; i<day0.length-1; i++){
      day2StartTimes.push(new Date(day2date + day1[i+1][0]));
      day2EndTimes.push(new Date(day2date + day1[i+1][1]));
    }

    // ========================================

    for(var i=1; i<day0.length; i++){
      var schedulesDay0 = document.getElementById("schedulesDay0");
    
      var scheduleBox = document.createElement('div');
      var scheduleMainBox = document.createElement('div');
      var scheduleTime = document.createElement('h2');
      var scheduleTitle = document.createElement('h1');
      var scheduleCategory = document.createElement('h3');
      var scheduleImg = document.createElement('img');
      var scheduleDesc = document.createElement('p');
      
      scheduleBox.classList.add("schedule");
      scheduleBox.setAttribute("id", "schedule" + String(i));
      schedulesDay0.appendChild(scheduleBox);
      
      scheduleMainBox.classList.add("scheduleMain");
      scheduleBox.appendChild(scheduleMainBox);
      
      scheduleTime.setAttribute("id", "scheduleTime" + String(i));
      scheduleTime.textContent = day0[i][0];
      scheduleMainBox.appendChild(scheduleTime);
      
      scheduleTitle.setAttribute("id", "scheduleTitle" + String(i));
      scheduleTitle.textContent = day0[i][3];
      scheduleMainBox.appendChild(scheduleTitle);
      
      scheduleCategory.setAttribute("id", "scheduleCategory" + String(i));
      scheduleCategory.textContent = day0[i][4];
      scheduleMainBox.appendChild(scheduleCategory);
      
      scheduleImg.src = "./image/schedule/day0/" + day0[i][5];
      scheduleBox.appendChild(scheduleImg);
      
      scheduleMainBox.classList.add("scheduleDesc");
      scheduleDesc.textContent = day0[i][6];
      scheduleBox.appendChild(scheduleDesc);
    }

    for(var i=1; i<day1.length; i++){
      var schedulesDay1 = document.getElementById("schedulesDay1");
    
      var scheduleBox = document.createElement('div');
      var scheduleMainBox = document.createElement('div');
      var scheduleTime = document.createElement('h2');
      var scheduleTitle = document.createElement('h1');
      var scheduleCategory = document.createElement('h3');
      var scheduleImg = document.createElement('img');
      var scheduleDesc = document.createElement('p');
      
      scheduleBox.classList.add("schedule");
      scheduleBox.setAttribute("id", "schedule" + String(i+day0.length-1));
      schedulesDay1.appendChild(scheduleBox);
      
      scheduleMainBox.classList.add("scheduleMain");
      scheduleBox.appendChild(scheduleMainBox);
      
      scheduleTime.setAttribute("id", "scheduleTime" + String(i+day0.length-1));
      scheduleTime.textContent = day1[i][0];
      scheduleMainBox.appendChild(scheduleTime);
      
      scheduleTitle.setAttribute("id", "scheduleTitle" + String(i+day0.length-1));
      scheduleTitle.textContent = day1[i][3];
      scheduleMainBox.appendChild(scheduleTitle);
      
      scheduleCategory.setAttribute("id", "scheduleCategory" + String(i+day0.length-1));
      scheduleCategory.textContent = day1[i][4];
      scheduleMainBox.appendChild(scheduleCategory);
      
      scheduleImg.src = "./image/schedule/day1/" + day1[i][5];
      scheduleBox.appendChild(scheduleImg);
      
      scheduleMainBox.classList.add("scheduleDesc");
      scheduleDesc.textContent = day1[i][6];
      scheduleBox.appendChild(scheduleDesc);
    }

    for(var i=1; i<day2.length; i++){
      var schedulesDay2 = document.getElementById("schedulesDay2");
    
      var scheduleBox = document.createElement('div');
      var scheduleMainBox = document.createElement('div');
      var scheduleTime = document.createElement('h2');
      var scheduleTitle = document.createElement('h1');
      var scheduleCategory = document.createElement('h3');
      var scheduleImg = document.createElement('img');
      var scheduleDesc = document.createElement('p');
    
      scheduleBox.classList.add("schedule");
      scheduleBox.setAttribute("id", "schedule" + String(i+day0.length-1+day1.length-1));
      schedulesDay2.appendChild(scheduleBox);
      
      scheduleMainBox.classList.add("scheduleMain");
      scheduleBox.appendChild(scheduleMainBox);
      
      scheduleTime.setAttribute("id", "scheduleTime" + String(i+day0.length-1+day1.length-1));
      scheduleTime.textContent = day2[i][0];
      scheduleMainBox.appendChild(scheduleTime);
      
      scheduleTitle.setAttribute("id", "scheduleTitle" + String(i+day0.length-1+day1.length-1));
      scheduleTitle.textContent = day2[i][3];
      scheduleMainBox.appendChild(scheduleTitle);
      
      scheduleCategory.setAttribute("id", "scheduleCategory" + String(i+day0.length-1+day1.length-1));
      scheduleCategory.textContent = day2[i][4];
      scheduleMainBox.appendChild(scheduleCategory);
      
      scheduleImg.src = "./image/schedule/day2/" + day2[i][5];
      scheduleBox.appendChild(scheduleImg);
      
      scheduleMainBox.classList.add("scheduleDesc");
      scheduleDesc.textContent = day2[i][6];
      scheduleBox.appendChild(scheduleDesc);
    }

    // ========================================

    timeCalc();

  }).catch(error => console.error(error));
}

initSchedules();

// ========================================

var now;
var nowPosition = 0;
var scheduleOpen = 0;
var nowgoing = 0;

function timeCalc(){
  // 現在時刻を取得
  now = new Date();
  
  // 進行状況を全イベント終了状態で初期化
  nowPosition = (day1.length-1)*2;
  
  // 進行状況を取得
  for(var i=0; i<day1.length-1; i++){
    if(now < day1StartTimes[i]){
      nowPosition = i*2
      break;
    }
    else if(now < day1EndTimes[i]){
      nowPosition = i*2+1;
      break;
    }
    // console.log(day1StartTimes[i]);
    // console.log(day1EndTimes[i]);
  }
  
  // 現在進行中のイベント番号を取得
  nowgoing = Math.floor((nowPosition)/2);
  
  if(nowPosition%2 == 1){
    // イベント進行中
    $("#day1Line1").css("height", String(nowgoing*5 + 1 + 1.5 + scheduleOpen*14.5) + "rem");
    $("#day1Line2").css("height", "calc(100% - " + String(nowgoing*5 + 1 + 1.5 + scheduleOpen*14.5) + "rem)");
    $("#day1Point").css("display", "none");
    // console.log(nowgoing);

    for(var i=0; i<nowgoing; i++){
      // 完了したイベントに held クラスを付与
      $("#schedule" + String(i+1)).addClass("held");
      if($("#schedule" + String(i+1)).hasClass("nowGoing")){
        console.log("!!!!!");
        $("#schedule" + String(i+1)).removeClass("nowGoing");
      }
    }
    // 進行中のイベントに nowgoing クラスを付与
    $("#schedule" + String(nowgoing+1)).addClass("nowGoing");
  }
  else{
    // イベントとイベントの間
    $("#day1Line1").css("height", String(nowgoing*5 + scheduleOpen*14.5) + "rem");
    $("#day1Line2").css("height", "calc(100% - " + String(nowgoing*5 + scheduleOpen*14.5) + "rem)");
    $("#day1Point").css("display", "block");
    $("#day1Point").css("top", String(nowgoing*5 - 0.5 + scheduleOpen*14.5) + "rem");
    
    for(var i=0; i<nowgoing; i++){
      $("#schedule" + String(i+1)).addClass("held");
      if($("#schedule" + String(i+1)).hasClass("nowGoing")){
        console.log("!!!!!");
        $("#schedule" + String(i+1)).removeClass("nowGoing");
      }
    }
  }
}

setInterval(timeCalc, 50);

// ========================================

$("#day0").click(function(){
  $("#scheduleDay1").removeClass("active");
  $("#scheduleDay2").removeClass("active");
  $("#scheduleDay0").addClass("active");
  $("#day1").removeClass("active");
  $("#day2").removeClass("active");
  $("#day0").addClass("active");
  firstHeight0 = document.getElementById("schedulesDay0").clientHeight;
  daySelect = 0;
});

$("#day1").click(function(){
  $("#scheduleDay0").removeClass("active");
  $("#scheduleDay2").removeClass("active");
  $("#scheduleDay1").addClass("active");
  $("#day0").removeClass("active");
  $("#day2").removeClass("active");
  $("#day1").addClass("active");
  firstHeight1 = document.getElementById("schedulesDay1").clientHeight;
  daySelect = 1;
});

$("#day2").click(function(){
  $("#scheduleDay0").removeClass("active");
  $("#scheduleDay1").removeClass("active");
  $("#scheduleDay2").addClass("active");
  $("#day0").removeClass("active");
  $("#day1").removeClass("active");
  $("#day2").addClass("active");
  firstHeight2 = document.getElementById("schedulesDay2").clientHeight;
  daySelect = 2;
})

// ========================================

$("#sectionGym>a").click(function(){
  $(".classDesc").removeClass("current");
  $(".navItem").removeClass("current");
  $("#navMap").addClass("current");
  $(".section").removeClass("current");
  $("#sectionMap").addClass("current");
})

// ========================================

//★★★
//あまりよろしくないやり方らしいから修正必要かも
//（DOM要素をJSで追加した場合、jQueryからはクリックイベントに対応できない）

$(document).on("click", ".schedule", function () {
  var clickedScheduleId = Number(String(this.getAttribute("id")).replace("schedule", ""));

  if($(this).hasClass("active")){
    $(this).removeClass("active");

    if(clickedScheduleId <= nowgoing){
      scheduleOpen -= 1;
    }
  }
  else{
    $(this).addClass("active");
    
    if(clickedScheduleId <= nowgoing){
      scheduleOpen += 1;
    }
  }
});