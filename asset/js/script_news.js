// スケジュールをCSVファイルから取得
const newsCSV = './asset/csv/news.csv'; // ここにCSVファイルのURLを入力する

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

function initNews(){
  Promise.all([
    fetchCSV(newsCSV)
  ]).then(([csvText]) => {
    
    var news = parseCSV(csvText);

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
      
      newsDate.innerHTML = news[i+1][0];
      newsBox.appendChild(newsDate);
    
      newsTitle.innerHTML = news[i+1][2];
      newsBox.appendChild(newsTitle);
      
      newsPublisher.innerHTML = news[i+1][3];
      newsBox.appendChild(newsPublisher);
      
      newsDesc.innerHTML = news[i+1][5];
      newsBox.appendChild(newsDesc);
      
      newsImage.src = "./image/" + news[i+1][4] + ".webp";
      newsBox.appendChild(newsImage);
    }
  });
}
initNews();








// タップされたニュースの詳細を表示

const newsModal = document.querySelector("#newsModal");


$(document).on("click", ".newsContent", function () {
  newsModal.showModal();
  document.getElementById("newsModalTitle").innerHTML = this.children[1].innerHTML;
  document.getElementById("newsModalPublisherDate").innerHTML = this.children[2].innerHTML + "&ensp;" + this.children[0].innerHTML;
  document.getElementById("newsModalContent").innerHTML = this.children[3].innerHTML;
  if(this.children[4].src.indexOf("none") == -1){
    document.getElementById("newsModalImg").classList.remove("noImg");
    document.getElementById("newsModalImg").src = this.children[4].src;
    if(this.children[4].src.indexOf("zenyasai.webp") != -1 || this.children[4].src.indexOf("startyuushi.webp") != -1){
      document.getElementById("newsModalImg").style.height = "auto";
    }
    else{
      document.getElementById("newsModalImg").style.height = "15rem";
    }
  }
  else{
    document.getElementById("newsModalImg").classList.add("noImg");
  }
  
  $("#newsModalBackground").addClass("active");
})

$("#modalClose").click(function(){
  newsModal.close();
})

// モーダルバックグラウンドをタップしても閉じるように設定
newsModal.addEventListener( 'click', (event) =>
  {
    newsModal.close();
  }, false );

contents = newsModal.querySelector("#modalNotBackground");
contents.addEventListener( 'click', ( event ) =>
  {
      event.stopPropagation();
  }, false );