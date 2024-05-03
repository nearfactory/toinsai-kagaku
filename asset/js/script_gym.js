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
    scheduleBox.setAttribute("id", "schedule" + String(i+1) + "Day1");
    schedulesDay1.appendChild(scheduleBox);
    
    scheduleMainBox.classList.add("scheduleMain");
    scheduleBox.appendChild(scheduleMainBox);
    
    scheduleTime.setAttribute("id", "scheduleTime" + String(i+1) + "Day1");
    scheduleTime.textContent = day1[i][0];
    scheduleMainBox.appendChild(scheduleTime);
    
    scheduleTitle.setAttribute("id", "scheduleTitle" + String(i+1) + "Day1");
    scheduleTitle.textContent = day1[i][3];
    scheduleMainBox.appendChild(scheduleTitle);
    
    scheduleCategory.setAttribute("id", "scheduleCategory" + String(i+1) + "Day1");
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
    scheduleBox.setAttribute("id", "schedule" + String(i+1) + "Day2");
    schedulesDay2.appendChild(scheduleBox);
    
    scheduleMainBox.classList.add("scheduleMain");
    scheduleBox.appendChild(scheduleMainBox);
    
    scheduleTime.setAttribute("id", "scheduleTime" + String(i+1) + "Day2");
    scheduleTime.textContent = day2[i][0];
    scheduleMainBox.appendChild(scheduleTime);
    
    scheduleTitle.setAttribute("id", "scheduleTitle" + String(i+1) + "Day2");
    scheduleTitle.textContent = day2[i][3];
    scheduleMainBox.appendChild(scheduleTitle);
    
    scheduleCategory.setAttribute("id", "scheduleCategory" + String(i+1) + "Day2");
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

//★★★
//あまりよろしくないやり方らしいから修正必要かも
//（DOM要素をJSで追加した場合、jQueryからはクリックイベントに対応できない）

$(document).on("click", ".schedule", function () {
  if($(this).hasClass("active")){
    $(this).removeClass("active");
    activeCount -= 1;
  }
  else{
    $(this).addClass("active");
    activeCount += 1;
  }
});



// ========================================

var activeCount = 0;
var firstHeight1;
var firstHeight2;

function timeCalc(){
  var day1Start = new Date("2024-05-03 09:00:00").getTime();
  var day1End = new Date("2024-05-03 21:00:00").getTime();
  var day2Start = new Date("2024-05-04 09:00:00").getTime();
  var day2End = new Date("2024-05-04 18:00:00").getTime();
  var now = new Date().getTime();

  var day1Time = day1End - day1Start;
  var day2Time = day2End - day2Start;

  var nowP1;
  var nowP2;

  if(now < day1Start){
    var nowP1 = 0;
    var nowP2 = 0;
    $("#day1Point").removeClass("completed");
    $("#day12oint").removeClass("completed");
    console.log("haven't started");
  }
  else if(day1Start <= now && now <= day1End){
    var nowP1 = (now - day1Start) / day1Time;
    var nowP2 = 0;
    $("#day1Point").removeClass("completed");
    $("#day12oint").removeClass("completed");
    console.log("day1");
  }
  else if(day1End < now && now < day2Start){
    var nowP1 = 1;
    var nowP2 = 0;
    $("#day1Point").addClass("completed");
    $("#day12oint").removeClass("completed");
    console.log("between day1 & day2");
  }
  else if(day2Start <= now && now <= day2End){
    var nowP1 = 1;
    var nowP2 = (now - day2Start) / day2Time;
    $("#day1Point").addClass("completed");
    $("#day12oint").removeClass("completed");
    console.log("day2");
  }
  else{
    var nowP1 = 1;
    var nowP2 = 1;
    $("#day1Point").addClass("completed");
    $("#day2Point").addClass("completed");
    console.log("ended");
  }

  // console.log(nowP1);
  // console.log(nowP2);

  $("#day1Line1").css("height", "calc(" + String(firstHeight1) + "px *" + String(nowP1) + ")");
  $("#day1Line2").css("height", "calc(" + String(firstHeight1) + "px *" + String(1-nowP1) + " + " + String(activeCount*14.5) + "rem)");

  $("#day2Line1").css("height", "calc(" + String(firstHeight2) + "px *" + String(nowP2) + ")");
  $("#day2Line2").css("height", "calc(" + String(firstHeight2) + "px *" + String(1-nowP2) + " + " + String(activeCount*14.5) + "rem)");
}


setInterval(timeCalc, 10);

// ========================================

$("#sectionGym>a").click(function(){
  $(".classDesc").removeClass("current");
  $(".navItem").removeClass("current");
  $("#navMap").addClass("current");
  $(".section").removeClass("current");
  $("#sectionMap").addClass("current");
})

// ========================================