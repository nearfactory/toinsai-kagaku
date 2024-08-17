var api_url = 'https://script.google.com/macros/s/AKfycbygo95cDuZTdbiHKErdWAfes1c5nX5fr6Wt4dxxXGUK3yCueIX1c2EAJdihGKCk3nTyIg/exec'; //生成したAPIのURLを指定
fetch(api_url)
.then(function (fetch_data) {
  return fetch_data.json();
})
.then(function (json) {
  for (var i in json) {  
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

stateUpdate = setInterval(function(){
  fetch(api_url)
  .then(function (fetch_data) {
    return fetch_data.json();
  })
  .then(function (json) {
    for (var i in json) {  
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

// $("#toggleWaitTimeLegends").click(function(){
//   $("#waitTimeLegends").toggleClass("active");
// })