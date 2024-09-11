// 混雑状況の取得
var api_url = 'https://script.google.com/macros/s/AKfycbySfCC1bco8J_rok4uhw6vZYsz527CK6KsswCkpsASiN9GzbG96Jyc5yV8uR5ibjc2S6Q/exec'; //生成したAPIのURLを指定
fetch(api_url)
.then(function (fetch_data) {
  return fetch_data.json();
})
.then(function (json) {
  for (var i in json) {
    if(json[i].state == "混雑"){
      $("#waitStatusStatus" + String(Number(i)+1)).removeClass();
      $("#waitStatusStatus" + String(Number(i)+1)).addClass("high");
      $("#waitStatusClass" + String(Number(i)+1)).addClass("high");
      $("#waitStatusStatus" + String(Number(i)+1)).html("混雑");
    }
    else if(json[i].state == "普通"){
      $("#waitStatusStatus" + String(Number(i)+1)).removeClass();
      $("#waitStatusClass" + String(Number(i)+1)).removeClass();
      $("#waitStatusStatus" + String(Number(i)+1)).addClass("middle");
      $("#waitStatusClass" + String(Number(i)+1)).addClass("middle");
      $("#waitStatusStatus" + String(Number(i)+1)).html("普通");
    }
    else if(json[i].state == "空いている"){
      $("#waitStatusStatus" + String(Number(i)+1)).removeClass();
      $("#waitStatusClass" + String(Number(i)+1)).removeClass();
      $("#waitStatusStatus" + String(Number(i)+1)).addClass("low");
      $("#waitStatusClass" + String(Number(i)+1)).addClass("low");
      $("#waitStatusStatus" + String(Number(i)+1)).html("空き");
    }
    else{
      $("#waitStatusStatus" + String(Number(i)+1)).removeClass();
      $("#waitStatusClass" + String(Number(i)+1)).removeClass();
      $("#waitStatusStatus" + String(Number(i)+1)).html("取得中");
    }
    
    // if(i > 8){
    //   $("#stockStatusItem1Stock" + String(Number(i)-8)).html(json[i].item1);
    //   $("#stockStatusItem2Stock" + String(Number(i)-8)).html(json[i].item2);
    // }
  }
});

stateUpdate = setInterval(function(){
  fetch(api_url)
  .then(function (fetch_data) {
    return fetch_data.json();
  })
  .then(function (json) {
    for (var i in json) {
      if(json[i].state == "混雑"){
        $("#waitStatusStatus" + String(Number(i)+1)).removeClass();
        $("#waitStatusStatus" + String(Number(i)+1)).addClass("high");
        $("#waitStatusClass" + String(Number(i)+1)).addClass("high");
        $("#waitStatusStatus" + String(Number(i)+1)).html("混雑");
      }
      else if(json[i].state == "普通"){
        $("#waitStatusStatus" + String(Number(i)+1)).removeClass();
        $("#waitStatusClass" + String(Number(i)+1)).removeClass();
        $("#waitStatusStatus" + String(Number(i)+1)).addClass("middle");
        $("#waitStatusClass" + String(Number(i)+1)).addClass("middle");
        $("#waitStatusStatus" + String(Number(i)+1)).html("普通");
      }
      else if(json[i].state == "空いている"){
        $("#waitStatusStatus" + String(Number(i)+1)).removeClass();
        $("#waitStatusClass" + String(Number(i)+1)).removeClass();
        $("#waitStatusStatus" + String(Number(i)+1)).addClass("low");
        $("#waitStatusClass" + String(Number(i)+1)).addClass("low");
        $("#waitStatusStatus" + String(Number(i)+1)).html("空き");
      }
      else{
        $("#waitStatusStatus" + String(Number(i)+1)).removeClass();
        $("#waitStatusClass" + String(Number(i)+1)).removeClass();
        $("#waitStatusStatus" + String(Number(i)+1)).html("取得中");
      }
    
      // if(i > 8){
      //   $("#stockStatusItem1Stock" + String(Number(i)-8)).html(json[i].item1);
      //   $("#stockStatusItem2Stock" + String(Number(i)-8)).html(json[i].item2);
      // }
    }
  });
}
, 10000);






// 配信画面のYouTube映像を再生
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '100%',
    height: '100%',
    videoId: 'fVLbzHNeGZ8', // YouTube映像の動画IDをここに貼付
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}





// ニュースの読み込み
// スケジュールをCSVファイルから取得
const newsCSV = '../asset/csv/news.csv'; // ここにCSVファイルのURLを入力する

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
    $("#newsTitle").html(news[news.length-1][2]);
    $("#newsContent1").html(news[news.length-1][5]);
    $("#newsContent2").html(news[news.length-1][5]);
  });
}
initNews();
setInterval(initNews, 50);