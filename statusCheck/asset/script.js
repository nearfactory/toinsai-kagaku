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
    
    if(i > 8){
      $("#stockStatusItem1Stock" + String(Number(i)-8)).html(json[i].item1);
      $("#stockStatusItem2Stock" + String(Number(i)-8)).html(json[i].item2);
    }
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
    
      if(i > 8){
        $("#stockStatusItem1Stock" + String(Number(i)-8)).html(json[i].item1);
        $("#stockStatusItem2Stock" + String(Number(i)-8)).html(json[i].item2);
      }
    }
  });
}
, 10000);