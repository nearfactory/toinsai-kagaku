// スケジュールをCSVファイルから取得
// ファイルはすべてindex.htmlからの相対パスを指定（script_gym.jsからではない）
const day0CSV = './asset/csv/day0.csv';
const day1CSV = './asset/csv/day1.csv';
const day2CSV = './asset/csv/day2.csv';

// 各日の日付を入力
const day0date = "2024/09/10 ";
const day1date = "2024/08/20 ";
const day2date = "2024/09/12 ";

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
      day0StartTimes.push(new Date(day0date + String(day1[i+1][0])));
      day0EndTimes.push(new Date(day0date + String(day1[i+1][1])));
    }
    for(var i=0; i<day1.length-1; i++){
      day1StartTimes.push(new Date(day1date + String(day1[i+1][0])));
      day1EndTimes.push(new Date(day1date + String(day1[i+1][1])));
    }
    for(var i=0; i<day0.length-1; i++){
      day2StartTimes.push(new Date(day2date + String(day1[i+1][0])));
      day2EndTimes.push(new Date(day2date + String(day1[i+1][1])));
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
      
      scheduleImg.src = "./image/" + day0[i][5];
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
      scheduleBox.setAttribute("id", "schedule" + String(i));
      schedulesDay1.appendChild(scheduleBox);
      
      scheduleMainBox.classList.add("scheduleMain");
      scheduleBox.appendChild(scheduleMainBox);
      
      scheduleTime.setAttribute("id", "scheduleTime" + String(i));
      scheduleTime.textContent = day1[i][0];
      scheduleMainBox.appendChild(scheduleTime);
      
      scheduleTitle.setAttribute("id", "scheduleTitle" + String(i));
      scheduleTitle.textContent = day1[i][3];
      scheduleMainBox.appendChild(scheduleTitle);
      
      scheduleCategory.setAttribute("id", "scheduleCategory" + String(i));
      scheduleCategory.textContent = day1[i][4];
      scheduleMainBox.appendChild(scheduleCategory);
      
      scheduleImg.src = "./image/" + day1[i][5];
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
      scheduleBox.setAttribute("id", "schedule" + String(i+day1.length-1));
      schedulesDay2.appendChild(scheduleBox);
      
      scheduleMainBox.classList.add("scheduleMain");
      scheduleBox.appendChild(scheduleMainBox);
      
      scheduleTime.setAttribute("id", "scheduleTime" + String(i+day1.length-1));
      scheduleTime.textContent = day2[i][0];
      scheduleMainBox.appendChild(scheduleTime);
      
      scheduleTitle.setAttribute("id", "scheduleTitle" + String(i+day1.length-1));
      scheduleTitle.textContent = day2[i][3];
      scheduleMainBox.appendChild(scheduleTitle);
      
      scheduleCategory.setAttribute("id", "scheduleCategory" + String(i+day1.length-1));
      scheduleCategory.textContent = day2[i][4];
      scheduleMainBox.appendChild(scheduleCategory);
      
      scheduleImg.src = "./image/" + day2[i][5];
      scheduleBox.appendChild(scheduleImg);
      
      scheduleMainBox.classList.add("scheduleDesc");
      scheduleDesc.textContent = day2[i][6];
      scheduleBox.appendChild(scheduleDesc);
    }

    // ========================================

  }).catch(error => console.error(error));
}

initSchedules();










// fetchCSV(day0CSV, function(csvText) {
//   day0 = parseCSV(csvText);
//   day0StartTimes = [];
//   day0EndTimes = [];

//   for(var i=0; i<day0.length-1; i++){
//     day0StartTimes.push(new Date("2024/08/19 " + String(day1[i+1][0])));
//     day0EndTimes.push(new Date("2024/08/19 " + String(day1[i+1][1])));
//   }

//   for(var i=1; i<day0.length; i++){
//     var schedulesDay0 = document.getElementById("schedulesDay0");
  
//     var scheduleBox = document.createElement('div');
//     var scheduleMainBox = document.createElement('div');
//     var scheduleTime = document.createElement('h2');
//     var scheduleTitle = document.createElement('h1');
//     var scheduleCategory = document.createElement('h3');
//     var scheduleImg = document.createElement('img');
//     var scheduleDesc = document.createElement('p');
    
//     scheduleBox.classList.add("schedule");
//     scheduleBox.setAttribute("id", "schedule" + String(i));
//     schedulesDay0.appendChild(scheduleBox);
    
//     scheduleMainBox.classList.add("scheduleMain");
//     scheduleBox.appendChild(scheduleMainBox);
    
//     scheduleTime.setAttribute("id", "scheduleTime" + String(i));
//     scheduleTime.textContent = day0[i][0];
//     scheduleMainBox.appendChild(scheduleTime);
    
//     scheduleTitle.setAttribute("id", "scheduleTitle" + String(i));
//     scheduleTitle.textContent = day0[i][3];
//     scheduleMainBox.appendChild(scheduleTitle);
    
//     scheduleCategory.setAttribute("id", "scheduleCategory" + String(i));
//     scheduleCategory.textContent = day0[i][4];
//     scheduleMainBox.appendChild(scheduleCategory);
    
//     scheduleImg.src = "./image/" + day0[i][5];
//     scheduleBox.appendChild(scheduleImg);
    
//     scheduleMainBox.classList.add("scheduleDesc");
//     scheduleDesc.textContent = day0[i][6];
//     scheduleBox.appendChild(scheduleDesc);
//   }
// });

// // ========================================

// fetchCSV(day1CSV, function(csvText) {
//   day1 = parseCSV(csvText);
//   day1StartTimes = [];
//   day1EndTimes = [];

//   for(var i=0; i<day1.length-1; i++){
//     if(day1[i+1][2] != "###"){
//       day1StartTimes.push(new Date("2024/08/19 " + String(day1[i+1][0])))
//       day1EndTimes.push(new Date("2024/08/19 " + String(day1[i+1][1])))
//     }
//   }

//   for(var i=1; i<day1.length; i++){
//     var schedulesDay1 = document.getElementById("schedulesDay1");
  
//     var scheduleBox = document.createElement('div');
//     var scheduleMainBox = document.createElement('div');
//     var scheduleTime = document.createElement('h2');
//     var scheduleTitle = document.createElement('h1');
//     var scheduleCategory = document.createElement('h3');
//     var scheduleImg = document.createElement('img');
//     var scheduleDesc = document.createElement('p');
    
//     scheduleBox.classList.add("schedule");
//     scheduleBox.setAttribute("id", "schedule" + String(i));
//     schedulesDay1.appendChild(scheduleBox);
    
//     scheduleMainBox.classList.add("scheduleMain");
//     scheduleBox.appendChild(scheduleMainBox);
    
//     scheduleTime.setAttribute("id", "scheduleTime" + String(i));
//     scheduleTime.textContent = day1[i][0];
//     scheduleMainBox.appendChild(scheduleTime);
    
//     scheduleTitle.setAttribute("id", "scheduleTitle" + String(i));
//     scheduleTitle.textContent = day1[i][3];
//     scheduleMainBox.appendChild(scheduleTitle);
    
//     scheduleCategory.setAttribute("id", "scheduleCategory" + String(i));
//     scheduleCategory.textContent = day1[i][4];
//     scheduleMainBox.appendChild(scheduleCategory);
    
//     scheduleImg.src = "./image/" + day1[i][5];
//     scheduleBox.appendChild(scheduleImg);
    
//     scheduleMainBox.classList.add("scheduleDesc");
//     scheduleDesc.textContent = day1[i][6];
//     scheduleBox.appendChild(scheduleDesc);
//   }
// });

// // ========================================

// fetchCSV(day2CSV, function(csvText){
//   var day2 = parseCSV(csvText);
//   var day2StartTimes = [];
//   var day2EndTimes = [];

//   for(var i=0; i<day2.length-1; i++){
//     if(day2[i+1][2] != "###"){
//       day2StartTimes.push(new Date("2024/09/12 " + String(day2[i+1][0])))
//       day2EndTimes.push(new Date("2024/09/12 " + String(day2[i+1][1])))
//     }
//   }

//   for(var i=1; i<day2.length; i++){
//     var schedulesDay2 = document.getElementById("schedulesDay2");
  
//     var scheduleBox = document.createElement('div');
//     var scheduleMainBox = document.createElement('div');
//     var scheduleTime = document.createElement('h2');
//     var scheduleTitle = document.createElement('h1');
//     var scheduleCategory = document.createElement('h3');
//     var scheduleImg = document.createElement('img');
//     var scheduleDesc = document.createElement('p');

//     alert(day2[i][3]);
  
//     scheduleBox.classList.add("schedule");
//     scheduleBox.setAttribute("id", "schedule" + String(i+day1.length-1));
//     schedulesDay2.appendChild(scheduleBox);
    
//     scheduleMainBox.classList.add("scheduleMain");
//     scheduleBox.appendChild(scheduleMainBox);
    
//     scheduleTime.setAttribute("id", "scheduleTime" + String(i+day1.length-1));
//     scheduleTime.textContent = day2[i][0];
//     scheduleMainBox.appendChild(scheduleTime);
    
//     scheduleTitle.setAttribute("id", "scheduleTitle" + String(i+day1.length-1));
//     scheduleTitle.textContent = day2[i][3];
//     scheduleMainBox.appendChild(scheduleTitle);
    
//     scheduleCategory.setAttribute("id", "scheduleCategory" + String(i+day1.length-1));
//     scheduleCategory.textContent = day2[i][4];
//     scheduleMainBox.appendChild(scheduleCategory);
    
//     scheduleImg.src = "./image/" + day2[i][5];
//     scheduleBox.appendChild(scheduleImg);
    
//     scheduleMainBox.classList.add("scheduleDesc");
//     scheduleDesc.textContent = day2[i][6];
//     scheduleBox.appendChild(scheduleDesc);
//   }
// })

// ========================================

$("#day0").click(function(){
  $("#scheduleDay1").removeClass("active");
  $("#scheduleDay2").removeClass("active");
  $("#scheduleDay0").addClass("active");
  $("#day1").removeClass("active");
  $("#day2").removeClass("active");
  $("#day0").addClass("active");
  firstHeight1 = document.getElementById("schedulesDay1").clientHeight;
});

$("#day1").click(function(){
  $("#scheduleDay0").removeClass("active");
  $("#scheduleDay2").removeClass("active");
  $("#scheduleDay1").addClass("active");
  $("#day0").removeClass("active");
  $("#day2").removeClass("active");
  $("#day1").addClass("active");
  firstHeight1 = document.getElementById("schedulesDay1").clientHeight;
});

$("#day2").click(function(){
  $("#scheduleDay0").removeClass("active");
  $("#scheduleDay1").removeClass("active");
  $("#scheduleDay2").addClass("active");
  $("#day0").removeClass("active");
  $("#day1").removeClass("active");
  $("#day2").addClass("active");
  firstHeight2 = document.getElementById("schedulesDay2").clientHeight;
})

// ========================================

var now;
var nowPosition = 0;
var scheduleOpen = 0;
var nowgoing = 0;

function timeCalc(){
  now = new Date();
  nowPosition = (day1.length-1)*2;

  for(var i=0; i<day1.length-1; i++){
    if(now < day1StartTimes[i]){
      nowPosition = i*2
      break;
    }
    else if(now < day1EndTimes[i]){
      nowPosition = i*2+1;
      break;
    }
  }

  // console.log(nowPosition);
  nowgoing = Math.floor(nowPosition/2);
  // console.log(nowgoing);

  if(nowPosition%2 == 1){
    $("#day1Line1").css("height", String(nowgoing*4 + 1 + scheduleOpen*14.5) + "rem");
    $("#day1Line2").css("height", "calc(100% - " + String(nowgoing*4 + 1 + scheduleOpen*14.5) + "rem)");
    $("#day1Point").css("display", "none");
    
    for(var i=0; i<nowgoing; i++){
      $("#schedule" + String(i+1)).addClass("held");
    }
    $("#schedule" + String(nowgoing+1)).addClass("nowGoing");
  }
  else{
    $("#day1Line1").css("height", String((nowgoing)*4 + 1 + scheduleOpen*14.5) + "rem");
    $("#day1Line2").css("height", "calc(100% - " + String(nowgoing*4 + 1 + scheduleOpen*14.5) + "rem)");
    
    for(var i=0; i<nowgoing; i++){
      $("#schedule" + String(i+1)).addClass("held");
    }

    $("#day1Point").css("display", "block");
    $("#day1Point").css("top", String((nowgoing)*4 + 1 - 0.4 + scheduleOpen*14.5) + "rem");
  }
}


setInterval(timeCalc, 5);

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