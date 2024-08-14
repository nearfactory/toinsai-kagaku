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




// for(var i=0; i<49; i++){
//   $("#grid-tate" + String(i+1)).css("left", String((i+1)*5) + "%");
//   $("#grid-yoko" + String(i+1)).css("top", String((i+1)*5) + "%");
// }

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
  console.log(mapContent);

  var mapContentBox = document.getElementById("mapContentBox");

  for(var i in mapContent){
    console.log(mapContent[i]);
    var appendContent = document.createElement("button");
    // appendContent.innerHTML = '<i class="fa-solid fa-location-dot"></i>';
    appendContent.innerHTML = Number(i)+1;
    appendContent.classList.add("mapContentBtn");
    appendContent.setAttribute("id", "mapContentBtn" + mapContent[i][0]);
    appendContent.style.left =  String(mapContent[i][4]) + "%";
    appendContent.style.top = String(mapContent[i][5]) + "%";
    mapContentBox.appendChild(appendContent);
  }
});

$(document).on("click", ".mapContentBtn", function () {
  $(this).toggleClass("active");
});