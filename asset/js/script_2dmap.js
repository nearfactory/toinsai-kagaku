var mapContent;

for(var i=0; i<100; i++){
  $("#grid-tate" + String(i+1)).css("left", String((i+1)*5) + "px");
  $("#grid-yoko" + String(i+1)).css("top", String((i+1)*5) + "px");
  if(i%10 == 9){
    $("#grid-tate" + String(i+1)).css("background-color", "#00000055");
    $("#grid-yoko" + String(i+1)).css("background-color", "#00000055");
  }
  if(i%20 == 19){
    $("#grid-tate" + String(i+1)).css("background-color", "#ff000055");
    $("#grid-yoko" + String(i+1)).css("background-color", "#ff000055");
  }
}

// スケジュールをCSVファイルから取得
const mapContentCSV = './asset/csv/2dmap.csv'; // ここにCSVファイルのURLを入力する

function fetchCSV(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        console.error('Failed to fetch CSV:', xhr.status);
        callback(null);
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
}

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

fetchCSV(mapContentCSV, function(csvText) {
  mapContent = parseCSV(csvText);

  const mapContent1F = document.getElementById("mapContent1F");
  const mapContent2F = document.getElementById("mapContent2F");
  const mapContent3F = document.getElementById("mapContent3F");

  for(var i in mapContent){
    var appendContent = document.createElement("button");
    // appendContent.innerHTML = '<i class="fa-solid fa-location-dot"></i>';
    if(mapContent[i][1] == "トイレ"){
      appendContent.innerHTML = '<i class="fa-solid fa-restroom"></i>';
    }
    else if(mapContent[i][1] == "ゴミ箱"){
      appendContent.innerHTML = '<i class="fa-solid fa-trash"></i>';
    }
    else{
      appendContent.innerHTML = Number(i)+1;
    }
    appendContent.classList.add("mapContentBtn");
    appendContent.classList.add(mapContent[i][1]);
    appendContent.setAttribute("id", "mapContentBtn" + String(Number(i)+1));
    appendContent.style.left =  String(mapContent[i][6]) + "px";
    appendContent.style.top = String(mapContent[i][7]) + "px";
    switch(Number(mapContent[i][0])){
      case 1:
        mapContent1F.appendChild(appendContent);
        break;
      case 2:
        mapContent2F.appendChild(appendContent);
        break;
      case 3:
        mapContent3F.appendChild(appendContent);
        break;
      default:
        console.log("error");
    }
    
  }
});

var lastId = null;

$(document).on("click", ".mapContentBtn", function () {
  $(this).toggleClass("active");
  var id = $(this).attr("id");
  id = Number(id.replace("mapContentBtn", ""));

  if(id == lastId){
    $("#mapContentWindow").removeClass("active");
    lastId = null;
  }
  else{
    $("#mapContentClass").text(mapContent[id-1][2]);
    $("#mapContentTitle").text(mapContent[id-1][3]);
    $("#mapContentDesc").text(mapContent[id-1][4]);
    $("#mapContentWindow").addClass("active");
    lastId = id;
  }
});

$("#floor1").click(function(){
  $(".mapContentBox").removeClass("active");
  $("#mapContent1F").addClass("active");
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  $(".mapContentBtn").removeClass("active");
});
$("#floor2").click(function(){
  $(".mapContentBox").removeClass("active");
  $("#mapContent2F").addClass("active");
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  $(".mapContentBtn").removeClass("active");
});
$("#floor3").click(function(){
  $(".mapContentBox").removeClass("active");
  $("#mapContent3F").addClass("active");
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  $(".mapContentBtn").removeClass("active");
});
$("#floorAll").click(function(){
  $(".mapContentBox").addClass("active");
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  $(".mapContentBtn").removeClass("active");
});

$("#toggleFloor").click(function(){
  $("#floorSelect").toggleClass("active");
});