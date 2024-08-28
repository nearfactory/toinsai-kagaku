$("#floor1").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  plane.material = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL[1]), side: THREE.DoubleSide});
});
$("#floor2").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  plane.material = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL[2]), side: THREE.DoubleSide});
});
$("#floor3").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  plane.material = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL[3]), side: THREE.DoubleSide});
});
$("#floorAll").click(function(){
  $("#floorSelect>button").removeClass("active");
  $(this).addClass("active")
  plane.material = new THREE.MeshToonMaterial({map: new THREE.TextureLoader().load(mapImgURL[1]), side: THREE.DoubleSide});
});

$("#toggleFloor").click(function(){
  $("#floorSelect").toggleClass("active");
});