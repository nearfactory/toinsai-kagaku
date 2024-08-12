// スケジュールをCSVファイルから取得

var news = [];

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

// news = getCSV("./asset/csv/news.csv");

const csvUrl = './asset/csv/news.csv'; // ここにCSVファイルのURLを入力する

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

fetchCSV(csvUrl, function(csvText) {
  news = parseCSV(csvText);
  console.log(news);

  for(var i=0; i<(news.length)-1; i++){
    var newsContainer = document.getElementById("newsContainer");
  
    var newsBox = document.createElement('div');
    var newsDate = document.createElement('h3');
    var newsTitle = document.createElement('h1');
    var newsPublisher = document.createElement('h4');
    var newsDesc = document.createElement('p');
    var newsImage = document.createElement('img');
    
    newsBox.classList.add("newsContent");
    newsContainer.prepend(newsBox);
    
    newsDate.textContent = news[i+1][0];
    newsBox.appendChild(newsDate);
    
    newsTitle.textContent = news[i+1][2];
    newsBox.appendChild(newsTitle);
    
    newsPublisher.textContent = news[i+1][3];
    newsBox.appendChild(newsPublisher);
  
    newsDesc.textContent = news[i+1][5];
    newsBox.appendChild(newsDesc);
  
    newsImage.src = "./image/news/" + news[i+1][4] + ".jpg";
    newsBox.appendChild(newsImage);
  }
});















// タップされたニュースの詳細を表示

const newsModal = document.querySelector("#newsModal");


$(document).on("click", ".newsContent", function () {
  var onFocusContent = $(this);
  newsModal.showModal();
  document.getElementById("newsModalTitle").innerHTML = this.children[1].innerHTML;
  document.getElementById("newsModalPublisher").innerHTML = this.children[2].innerHTML;
  document.getElementById("newsModalDate").innerHTML = this.children[0].innerHTML;
  document.getElementById("newsModalContent").innerHTML = this.children[3].innerHTML;
  document.getElementById("newsModalImg").src = this.children[4].src;
  
  $("#newsModalBackground").addClass("active");
})

$("#modalClose").click(function(){
  newsModal.close();
})