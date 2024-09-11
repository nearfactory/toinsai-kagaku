var api_url = 'https://script.google.com/macros/s/AKfycbySfCC1bco8J_rok4uhw6vZYsz527CK6KsswCkpsASiN9GzbG96Jyc5yV8uR5ibjc2S6Q/exec'; //生成したAPIのURLを指定
fetch(api_url)
.then(function (fetch_data) {
  return fetch_data.json();
})
.then(function (json) {
  console.log(json);
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
    console.log(json);
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

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '100%',
    height: '100%',
    videoId: 'AZpE2fziy00',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}