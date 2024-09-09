$("#accessBtn").click(function(){
  var idBox = document.getElementById("accessID");
  var pwBox = document.getElementById("accessPW");

  if(idBox.value == "kagaku" && pwBox.value == "fujiking"){
    $("#access").addClass("active");
  }
});