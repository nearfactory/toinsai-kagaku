// ========================================
$("#navWaitTime").click(function(){
  $(".navItem").removeClass("current");
  $("#navWaitTime").addClass("current");
  $(".section").removeClass("current");
  $("#sectionWaitTime").addClass("current");
})

$("#navGym").click(function(){
  $(".navItem").removeClass("current");
  $("#navGym").addClass("current");
  $(".section").removeClass("current");
  $("#sectionGym").addClass("current");
})

$("#navMap").click(function(){
  $(".navItem").removeClass("current");
  $("#navMap").addClass("current");
  $(".section").removeClass("current");
  $("#sectionMap").addClass("current");
})

$("#navNews").click(function(){
  $(".navItem").removeClass("current");
  $("#navNews").addClass("current");
  $(".section").removeClass("current");
  $("#sectionNews").addClass("current");
})

$("#navAboutUs").click(function(){
  $(".navItem").removeClass("current");
  $("#navAboutUs").addClass("current");
  $(".section").removeClass("current");
  $("#sectionAboutUs").addClass("current");
})

$("#navBtn").click(function(){
  $("#navBtn").toggleClass("active");
  $("nav").toggleClass("active");
});

$(".navLink").click(function(){
  $("#navBtn").removeClass("active");
  $("nav").removeClass("active");
});

// ========================================

/* 現在時刻表示の挙動 */
// function updateDate(){
//   var currentDate = document.getElementById("currentDate");
//   var currentTime = document.getElementById("currentTime");
//   var remainingTime = document.getElementById("remainingTime");

//   const festivalDate = new Date('2024-09-17 09:00:00');
  
//   var now = new Date();

//   var month = now.getMonth()+1;
//   var day = now.getDate();
//   var h = now.getHours();
//   h = h < 10 ? "0"+h : h;
//   var m = now.getMinutes();
//   m = m < 10 ? "0"+m : m;
//   var s = now.getSeconds();
//   s = s < 10 ? "0"+s : s;

//   var diff = festivalDate.getTime() - now.getTime();
  
//   var diffDay = Math.floor(diff / (1000*60*60*24));
//   diff -= diffDay*1000*60*60*24;
//   var diffH = Math.floor(diff / (1000*60*60));
//   diff -= diffH*1000*60*60;
//   var diffM = Math.floor(diff / (1000*60));
//   diff -= diffM*1000*60;
//   var diffS = Math.floor(diff / (1000));
//   diff -= diffS*1000;

  
//   currentDate.innerHTML = month + "月" + day + "日";
//   currentTime.innerHTML = h + ":" + m + ":" + s;
//   remainingTime.innerHTML = "文化祭まで&nbsp;&nbsp;" + diffDay + "日&nbsp;" + diffH + "時間&nbsp;" + diffM + "分&nbsp;" + diffS + "秒";
// }

// setInterval(updateDate, 50);

// ==================================================

var darkColor = ["#111E34", "#010E04", "#1d3255", "#111E3488", "#E6E6E6", "#CCCCCC"];
var lightColor = ["#ffffff", "#f1f1f1", "#f9f9f9", "#f1f1f188", "#222222", "#777777"];
var darkMode = false;

$("#colorMode").click(function(){
  if(darkMode == false){
    document.documentElement.style.setProperty('--background1', darkColor[0]);
    document.documentElement.style.setProperty('--background2', darkColor[1]);
    document.documentElement.style.setProperty('--background3', darkColor[2]);
    document.documentElement.style.setProperty('--header', darkColor[3]);
    document.documentElement.style.setProperty('--text', darkColor[4]);
    document.documentElement.style.setProperty('--textPale', darkColor[5]);

    document.getElementById("colorMode").innerHTML = '<i class="fa-solid fa-brush"></i>LightMode';
    darkMode = true;
  }
  else{
    document.documentElement.style.setProperty('--background1', lightColor[0]);
    document.documentElement.style.setProperty('--background2', lightColor[1]);
    document.documentElement.style.setProperty('--background3', lightColor[2]);
    document.documentElement.style.setProperty('--header', lightColor[3]);
    document.documentElement.style.setProperty('--text', lightColor[4]);
    document.documentElement.style.setProperty('--textPale', lightColor[5]);

    document.getElementById("colorMode").innerHTML = '<i class="fa-solid fa-brush"></i>DarkMode';
    darkMode = false;
  }
})

// ==================================================