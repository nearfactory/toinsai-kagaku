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
function updateDate(){
  // var currentDate = document.getElementById("currentDate");
  // var currentTime = document.getElementById("currentTime");
  var remainingTime = document.getElementById("remainTime");
  var remainingDate = document.getElementById("remainDate");

  const festivalDate = new Date('2024-09-11 08:50:00');
  
  var now = new Date();

  var month = now.getMonth()+1;
  var day = now.getDate();
  var h = now.getHours();
  h = h < 10 ? "0"+h : h;
  var m = now.getMinutes();
  m = m < 10 ? "0"+m : m;
  var s = now.getSeconds();
  s = s < 10 ? "0"+ s : s;

  var diff = festivalDate.getTime() - now.getTime();
  
  var diffDay = Math.floor(diff / (1000*60*60*24));
  diff -= diffDay*1000*60*60*24;
  var diffH = Math.floor(diff / (1000*60*60)) < 10 ? "0" + Math.floor(diff / (1000*60*60)) : Math.floor(diff / (1000*60*60));
  diff -= diffH*1000*60*60;
  var diffM = Math.floor(diff / (1000*60)) < 10 ? "0" + Math.floor(diff / (1000*60)) : Math.floor(diff / (1000*60));
  diff -= diffM*1000*60;
  var diffS = Math.floor(diff / (1000)) < 10 ? "0" + Math.floor(diff / (1000)) : Math.floor(diff / (1000));
  diff -= diffS*1000;

  remainingDate.innerHTML = diffDay + "<small>&nbsp;日</small>";
  remainingTime.innerHTML = diffH + "<small>&nbsp;時間&nbsp;</small>" + diffM + "<small>&nbsp;分&nbsp;</small>" + diffS + "<small>&nbsp;秒&nbsp;</small>";
}

var updateDateInterval;

// $(function() {
//   const date = new Date();
//   date.setDate(date.getDate() + 1);
//   date.setHours(0, 0, 0);
//   if (Cookies.get('access_sample') == undefined) {
//     Cookies.set('access_sample', 'access', { expires: date });
//     updateDate();
//     updateDateInterval = setInterval(updateDate, 50);
//     document.getElementById("remainTimeDisplay").showModal();
//   }
// });

// $("#closeRemainTimeDisplay").click(function(){
//   clearInterval(updateDateInterval);
//   document.getElementById("remainTimeDisplay").close(); 
// });