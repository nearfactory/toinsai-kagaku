// Load schedules from CSV

var day1 = [];
var day2 = [];

function getCSV(url){
  var req = new XMLHttpRequest();
  req.open("get", url, false);
  req.send(null);

  return convertCSVtoArray(req.responseText);
}

function convertCSVtoArray(str){
  var result = [];
  var tmp = str.split("\n");
  for(var i=0; i<tmp.length; i++){
      result.push(tmp[i].split(","));
  }
  return result;
}

// ========================================

day1 = getCSV("./asset/csv/day1.csv");
day2 = getCSV("./asset/csv/day2.csv");

var day1StartTimes = [];
var day1EndTimes = [];
var day2StartTimes = [];
var day2EndTimes = [];

for(var i=0; i<day1.length-1; i++){
  if(day1[i+1][2] != "###"){
    day1StartTimes.push(new Date("2024/05/04 " + String(day1[i+1][0])))
    day1EndTimes.push(new Date("2024/05/04 " + String(day1[i+1][1])))
  }
}

for(var i=0; i<day2.length-1; i++){
  if(day2[i+1][2] != "###"){
    day2StartTimes.push(new Date("2024/05/05 " + String(day2[i+1][0])))
    day2EndTimes.push(new Date("2024/05/05 " + String(day2[i+1][1])))
  }
}

// ========================================

for(var i=1; i<day1.length; i++){
  var schedulesDay1 = document.getElementById("schedulesDay1");

  var scheduleBox = document.createElement('div');
  var scheduleMainBox = document.createElement('div');
  var scheduleTime = document.createElement('h2');
  var scheduleTitle = document.createElement('h1');
  var scheduleCategory = document.createElement('h3');
  var scheduleImg = document.createElement('img');
  var scheduleDesc = document.createElement('p');
  
  if(day1[i][2] != "###"){
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
    scheduleBox.appendChild(scheduleDesc)
  }
  else{
    scheduleBox.classList.add("scheduleSpan");
    schedulesDay1.appendChild(scheduleBox);
  }
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
  
  if(day2[i][2] != "###"){
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
  else{
    scheduleBox.classList.add("scheduleSpan");
    schedulesDay2.appendChild(scheduleBox);
  }
}

// ========================================

$("#day1").click(function(){
  $("#scheduleDay2").removeClass("active");
  $("#scheduleDay1").addClass("active");
  $("#day2").removeClass("active");
  $("#day1").addClass("active");
  firstHeight1 = document.getElementById("schedulesDay1").clientHeight;
});

$("#day2").click(function(){
  $("#scheduleDay1").removeClass("active");
  $("#scheduleDay2").addClass("active");
  $("#day1").removeClass("active");
  $("#day2").addClass("active");
  firstHeight2 = document.getElementById("schedulesDay2").clientHeight;
})



// ========================================


var now;
var nowPosition = 0;
var scheduleOpenHeight = 0;
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
    $("#day1Line1").css("height", String(nowgoing*4 + 1 + scheduleOpenHeight) + "rem");
    $("#day1Line2").css("height", "calc(100% - " + String(nowgoing*4 + 1 + scheduleOpenHeight) + "rem)");
    $("#day1Point").css("display", "none");
    
    for(var i=0; i<nowgoing; i++){
      $("#schedule" + String(i+1)).addClass("held");
    }
    $("#schedule" + String(nowgoing+1)).addClass("nowGoing");
  }
  else{
    $("#day1Line1").css("height", String((nowgoing)*4 + 1 + scheduleOpenHeight) + "rem");
    $("#day1Line2").css("height", "calc(100% - " + String(nowgoing*4 + 1 + scheduleOpenHeight) + "rem)");
    
    for(var i=0; i<nowgoing; i++){
      $("#schedule" + String(i+1)).addClass("held");
    }

    $("#day1Point").css("display", "block");
    $("#day1Point").css("top", String((nowgoing)*4 + 1 - 0.4 + scheduleOpenHeight) + "rem");
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
      scheduleOpenHeight -= 14.5;
    }
  }
  else{
    $(this).addClass("active");
    
    if(clickedScheduleId <= nowgoing){
      scheduleOpenHeight += 14.5;
    }
  }
});