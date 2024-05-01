// スケジュールをCSVファイルから取得

var news = [];

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

news = getCSV("./asset/csv/news.csv");

for(var i=0; i<(news.length)-1; i++){
  var newsContainer = document.getElementById("newsContainer");

  var newsBox = document.createElement('div');
  var newsDate = document.createElement('h3');
  var newsTitle = document.createElement('h1');
  var newsDesc = document.createElement('p');
  
  newsBox.classList.add("newsContent");
  newsContainer.prepend(newsBox);
  
  newsDate.textContent = news[i+1][0];
  newsBox.appendChild(newsDate);
  
  newsTitle.textContent = news[i+1][2];
  newsBox.appendChild(newsTitle);

  newsDesc.textContent = news[i+1][3];
  newsBox.appendChild(newsDesc);
}







// タップされたニュースの詳細を表示

function handle(event) {
  event.preventDefault();
}

$(".newsContent").click(function(){
  if($(this).hasClass("active")){
    $(this).removeClass("active");
    $("#newsModal").removeClass("active");
    $("#newsModalBackground").removeClass("active");
    document.removeEventListener('touchmove', handle, { passive: false });
    document.removeEventListener('mousewheel', handle, { passive: false });
  }
  else{
    // $(this).addClass("active");
    $("#newsModal").addClass("active");
    $("#newsModalBackground").addClass("active");
    document.addEventListener('touchmove', handle, { passive: false });
    document.addEventListener('mousewheel', handle, { passive: false });
  }
})

$("#newsModalBackground").click(function(){
  $(".newsContent").removeClass("active");
  $("#newsModal").removeClass("active");
  $("#newsModalBackground").removeClass("active");
  document.removeEventListener('touchmove', handle, { passive: false });
  document.removeEventListener('mousewheel', handle, { passive: false });
})