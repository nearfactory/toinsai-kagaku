// Load schedules from CSV

var waitTime = [];

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

// ========================================

waitTime = getCSV("./asset/csv/waitTime.csv");




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

var waitTimeData = [];
for(var i=0; i<waitTime.length-1; i++){
  waitTimeData.push(Number(waitTime[i+1][1]));
}


function chartUpdate() {
  var firstWidth = document.getElementById("data").clientWidth;
  // console.log(firstWidth);
  for(var i=0; i<9; i++){
    var id = "#chartBar" + String(i+1);
    $(id).css("width", "calc((100% - 0rem) * " + String(waitTimeData[i]/Math.max.apply(null, waitTimeData)) + " + 0rem)");
    // $(id).attr("time-label", String(waitTimeData[i]));
  }
}

<<<<<<< Updated upstream:asset/js/script_waitTime.js
setInterval(chartUpdate, 1000);
=======
setInterval(chartUpdate, 10);
>>>>>>> Stashed changes:asset/js/script_waitTIme.js
