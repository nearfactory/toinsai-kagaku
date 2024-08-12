// Load schedules from CSV

// var waitTime = [];

// function getCSV(url){
//   var req = new XMLHttpRequest();
//   req.open("get", url, false);
//   req.send(null);

//   return convertCSVtoArray(req.responseText);
// }

// function convertCSVtoArray(str){
//   var result = [];
//   var tmp = str.split("\n");
//   for(var i=0; i<tmp.length; i++){
//       result.push(tmp[i].split(","));
//   }
//   return result;
// }

// const csvUrl2 = './asset/csv/waitTime.csv'; // ここにCSVファイルのURLを入力する

// function fetchCSV(url, callback) {
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       if (xhr.status === 200) {
//         callback(xhr.responseText);
//       } else {
//         console.error('Failed to fetch CSV:', xhr.status);
//         callback(null);
//       }
//     }
//   };
//   xhr.open('GET', url);
//   xhr.send();
// }

// function parseCSV(csvText) {
//   const lines = csvText.split(/\r\n|\n/);
//   const data = [];

//   for (let i = 0; i < lines.length; i++) {
//     const currentLine = lines[i].split(',');
//     if (currentLine.length > 0) {
//       data.push(currentLine);
//     }
//   }

//   return data;
// }

// fetchCSV(csvUrl2, function(csvText){
//   waitTime = parseCSV(csvText);
//   console.log(waitTime);
  
//   for(var i=1; i<waitTime.length; i++){
//     console.log(i);
    
//     if(waitTime[i][1] == "HIGH"){
//       document.getElementById("wait" + String(i)).classList.add("high");
//     }
//     else if(waitTime[i][1] == "MIDDLE"){
//       document.getElementById("wait" + String(i)).classList.add("middle");
//     }
//     else if(waitTime[i][1] == "LOW"){
//       document.getElementById("wait" + String(i)).classList.add("low");
//     }
//   }
// });

// updateWaitTime = setInterval(
//   function(){
//     fetchCSV(csvUrl2, function(csvText){
//       waitTime = parseCSV(csvText);
//       console.log(waitTime);
//     });
//   },
//   5000
// )

var api_url = 'https://script.google.com/macros/s/AKfycbzdHfQ9Roy3GjvHhrnKo4AqNDvpkI1m_08wQizMJIsi_kXLj-KsL-3DcZoAzKtUc9lrjQ/exec'; //生成したAPIのURLを指定
fetch(api_url)
.then(function (fetch_data) {
  return fetch_data.json();
})
.then(function (json) {
  for (var i in json) {
    console.log(json[i].state);

    if(json[i].state == "混雑"){
      document.getElementById("wait" + String(Number(i)+1)).classList.add("high");
    }
    else if(json[i].state == "普通"){
      document.getElementById("wait" + String(Number(i)+1)).classList.add("middle");
    }
    else if(json[i].state == "空いている"){
      document.getElementById("wait" + String(Number(i)+1)).classList.add("low");
    }
  }
});

stateUpdate = setInterval(function(){
  fetch(api_url)
  .then(function (fetch_data) {
    return fetch_data.json();
  })
  .then(function (json) {
    for (var i in json) {
      console.log(json[i].state);
  
      if(json[i].state == "混雑"){
        document.getElementById("wait" + String(Number(i)+1)).classList.add("high");
        document.getElementById("wait" + String(Number(i)+1)).classList.remove("middle");
        document.getElementById("wait" + String(Number(i)+1)).classList.remove("low");
      }
      else if(json[i].state == "普通"){
        document.getElementById("wait" + String(Number(i)+1)).classList.remove("high");
        document.getElementById("wait" + String(Number(i)+1)).classList.add("middle");
        document.getElementById("wait" + String(Number(i)+1)).classList.remove("low");
      }
      else if(json[i].state == "空いている"){
        document.getElementById("wait" + String(Number(i)+1)).classList.remove("high");
        document.getElementById("wait" + String(Number(i)+1)).classList.remove("middle");
        document.getElementById("wait" + String(Number(i)+1)).classList.add("low");
      }
      else{
        document.getElementById("wait" + String(Number(i)+1)).classList.remove("high");
        document.getElementById("wait" + String(Number(i)+1)).classList.remove("middle");
        document.getElementById("wait" + String(Number(i)+1)).classList.remove("low");

      }
    }
  });
}
, 10000);


// ========================================

$("#waitClass1").click(function(){
  if($("#classDesc1").hasClass("current")){
    $(".classDesc").removeClass("current");
  }
  else{
    $(".classDesc").removeClass("current");
    $("#classDesc1").addClass("current");
  }
});

$("#waitClass2").click(function(){
  if($("#classDesc2").hasClass("current")){
    $(".classDesc").removeClass("current");
  }
  else{
    $(".classDesc").removeClass("current");
    $("#classDesc2").addClass("current");
  }
});

$("#waitClass3").click(function(){
  if($("#classDesc3").hasClass("current")){
    $(".classDesc").removeClass("current");
  }
  else{
    $(".classDesc").removeClass("current");
    $("#classDesc3").addClass("current");
  }
});

$("#waitClass4").click(function(){
  if($("#classDesc4").hasClass("current")){
    $(".classDesc").removeClass("current");
  }
  else{
    $(".classDesc").removeClass("current");
    $("#classDesc4").addClass("current");
  }
});

$("#waitClass5").click(function(){
  if($("#classDesc5").hasClass("current")){
    $(".classDesc").removeClass("current");
  }
  else{
    $(".classDesc").removeClass("current");
    $("#classDesc5").addClass("current");
  }
});

$("#waitClass6").click(function(){
  if($("#classDesc6").hasClass("current")){
    $(".classDesc").removeClass("current");
  }
  else{
    $(".classDesc").removeClass("current");
    $("#classDesc6").addClass("current");
  }
});

$("#waitClass7").click(function(){
  if($("#classDesc7").hasClass("current")){
    $(".classDesc").removeClass("current");
  }
  else{
    $(".classDesc").removeClass("current");
    $("#classDesc7").addClass("current");
  }
});

$("#waitClass8").click(function(){
  if($("#classDesc8").hasClass("current")){
    $(".classDesc").removeClass("current");
  }
  else{
    $(".classDesc").removeClass("current");
    $("#classDesc8").addClass("current");
  }
});

$("#waitClass9").click(function(){
  if($("#classDesc9").hasClass("current")){
    $(".classDesc").removeClass("current");
  }
  else{
    $(".classDesc").removeClass("current");
    $("#classDesc9").addClass("current");
  }
});

$(".waitContainer").click(function(){
  $(this).toggleClass("active");
});

$(".classDescClose").click(function(){
  $(".classDesc").removeClass("current");
})

$("#navGym").click(function(){
  $(".classDesc").removeClass("current");
})

$("#navMap").click(function(){
  $(".classDesc").removeClass("current");
})

$("#navNews").click(function(){
  $(".classDesc").removeClass("current");
})

$("#navAboutUs").click(function(){
  $(".classDesc").removeClass("current");
})

$(".waitContainerStretch>a").click(function(){
  $(".classDesc").removeClass("current");
  $(".navItem").removeClass("current");
  $("#navMap").addClass("current");
  $(".section").removeClass("current");
  $("#sectionMap").addClass("current");
})

// var waitTimeData = [];
// for(var i=0; i<waitTime.length-1; i++){
//   waitTimeData.push(Number(waitTime[i+1][1]));
// }


// function chartUpdate() {
//   var firstWidth = document.getElementById("data").clientWidth;
//   // console.log(firstWidth);
//   for(var i=0; i<9; i++){
//     var id = "#chartBar" + String(i+1);
//     $(id).css("width", "calc((100% - 0rem) * " + String(waitTimeData[i]/Math.max.apply(null, waitTimeData)) + " + 0rem)");
//     // $(id).attr("time-label", String(waitTimeData[i]));
//   }
// }

// setInterval(chartUpdate, 10);