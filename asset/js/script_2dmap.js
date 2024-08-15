// var floor = 1;

// $("#floorBtn1").click(function(){
//   $("#map2d").addClass("floor1");
//   $("#map2d").removeClass("floor2");
//   $("#map2d").removeClass("floor3");
//   // $(".floorBtn").removeClass("active");
//   // $(this).addClass("active");
//   $("#floorBtnBox>span").css("left", "0rem");
// });

// $("#floorBtn2").click(function(){
//   $("#map2d").removeClass("floor1");
//   $("#map2d").addClass("floor2");
//   $("#map2d").removeClass("floor3");
//   // $(".floorBtn").removeClass("active");
//   // $(this).addClass("active");
//   $("#floorBtnBox>span").css("left", "4rem");
// });

// $("#floorBtn3").click(function(){
//   $("#map2d").removeClass("floor1");
//   $("#map2d").removeClass("floor2");
//   $("#map2d").addClass("floor3");
//   // $(".floorBtn").removeClass("active");
//   // $(this).addClass("active");
//   $("#floorBtnBox>span").css("left", "8rem");
// });




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
  var mapContent = parseCSV(csvText);

  const mapContent1F = document.getElementById("mapContent1F");
  const mapContent2F = document.getElementById("mapContent2F");
  const mapContent3F = document.getElementById("mapContent3F");

  for(var i in mapContent){
    var appendContent = document.createElement("button");
    // appendContent.innerHTML = '<i class="fa-solid fa-location-dot"></i>';
    appendContent.innerHTML = Number(i)+1;
    appendContent.classList.add("mapContentBtn");
    appendContent.classList.add(mapContent[i][1]);
    appendContent.setAttribute("id", "mapContentBtn" + mapContent[i][1]);
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

$(document).on("click", ".mapContentBtn", function () {
  $(this).toggleClass("active");
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