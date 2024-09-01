// ========================================
let nowtime = 0;
let quiztime = 0;
let yourans = 0;
let yourscore = 0;
let onescore = 0;
let topscore = 1000;
let sumscore = 0;

// CSVから取得した2次元配列形式のクイズデータ格納
var quizData;
// CSV取得の終了フラグ
var quizDataFlag = false;

// クイズの並び順（毎回ランダムで変更）
var quizArrangement = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ユーザーネーム
var username = "";

// ステージ
var stage = 0;

// let exwid = 10;

if (nowtime == 0) {
  $("#msgBox1").html("トウインクイズ");
  $("#msgBox2").html("➤&ensp;を押してスタート");
}

// function letsquiz() {
  
//   if (nowtime == 0) {
//     underbar.innerHTML = "ユーザーネーム：" + yourname.value;
//   }
//   if (nowtime == 0 && yourname.value == "") {
//     explaint.innerHTML = "名前を入力して下さい";
//     nowtime = 0;
//   }
//   else if (quiztime == 10) {

//     quizreset();
//     questions.innerHTML = sumscore;
//   }
//   else if (nowtime % 2 == 1 && yourname.value == "" ) {
//     alert("答えてよ");
//   }
//   else if (nowtime % 2 == 1) {
//     yourans = yourname.value;
    
//     if(yourans < answers(quiztime)) {
//         yourscore = yourans / answers(quiztime);                    
//     }
//     else if (yourans > answers(quiztime)) {
//         yourscore = answers(quiztime) / yourans;                    
//     }
//     if (yourscore < 0) {
//         yourscore = 0;
//     }
//     if (yourscore == NaN) {
//         yourscore = 0;
//     }
//     yourscore = yourscore * topscore;
    
    
//     yourname.value = "";
//     explaint.innerHTML = answers(quiztime)+ tani(quiztime) + "  " + explains(quiztime) + "score" + Math.trunc(yourscore);
//     gobutton.value = "次のクイズ";
//     sumscore += Math.trunc(yourscore);
//     quiztime += 1;
//     nowtime += 1;
//   }
//   else {
//     questions.innerHTML =quiztime+1 + ", " + quizes(quiztime);
//     explaint.innerHTML = "";
//     gobutton.value = "回答";
//     nowtime += 1;
//   }
//   yourname.value = "";
    
// }


// function quizreset() {
//   questions.innerHTML = "桐蔭くいずー";
//   explaint.innerHTML = "名前を入力してね";
//   gobutton.value = "クイズを始める";
//   yourname.value = "";
//   nowtime = 0;
//   quiztime = 0;
//   yourans = 0;
// }

// ========================================

// クイズの問題などをCSVファイルから取得
const quizDataCSV = './asset/quiz.csv'; // ここにCSVファイルのURLを入力する

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

// ========================================

function initQuiz() {
  // promiseを使用してすべての読み込みが完了するまで待機させる
  Promise.all([
    fetchCSV(quizDataCSV)
  ]).then(([csvText]) => {
    // 二次元配列に変換してグローバル変数に格納
    quizData = parseCSV(csvText);
    quizDataFlag = true;
    console.log(quizData);
    setQuiz(quizData);
    askUsername();
  });
}

// ========================================

// クイズの並び順を初期化（ランダム化）する関数
function setQuiz(quiz){
  for(var i=0; i<100; i++){
    quizArrangement = swap(quizArrangement, Math.floor(Math.random()*10), Math.floor(Math.random()*10))
  }
}

// 配列の2つのインデックスの要素を入れ替える関数
function swap(list, a, b){
  const tmp = list[a];
  list[a] = list[b];
  list[b] = tmp;
  return list;
}

// ========================================

// ユーザーネームの取得
function askUsername(){
  return;
}

// ========================================

// ユーザーの答えを送信したときの実行関数
function submit(answer){
  console.log(Math.floor(stage/2));
  if(stage == 0){
    document.getElementById("userAnswer").innerHTML = "";
    document.getElementById("msgBox1").innerHTML = quizData[quizArrangement[Math.floor(stage/2)]][0];
    document.getElementById("msgBox2").innerHTML = quizData[quizArrangement[Math.floor(stage/2)]][2];
    stage += 1;
  }
  else if(stage == 10){
    document.getElementById("userAnswer").innerHTML = "";
    document.getElementById("msgBox1").innerHTML = "トウインクイズ";
    document.getElementById("msgBox2").innerHTML = "➤&ensp;でリスタート";
    stage = 0;
  }
  else if(stage%2 == 0){
    document.getElementById("userAnswer").innerHTML = "";
    document.getElementById("msgBox1").innerHTML = quizData[quizArrangement[Number(stage/2)]][0];
    document.getElementById("msgBox2").innerHTML = quizData[quizArrangement[Math.floor(stage/2)]][2];
    stage += 1;
  }
  else if(stage%2 == 1){
    document.getElementById("msgBox2").innerHTML = quizData[quizArrangement[Math.floor(stage/2)]][1] + "&nbsp;" + quizData[quizArrangement[Math.floor(stage/2)]][2];
    stage += 1;
  }

  // アニメーション風に一文字ずつ送信
  const deleteUserAns = setInterval(() => {
    document.getElementById("userAnswer").innerText = document.getElementById("userAnswer").innerText.slice(0, -1);
    if(document.getElementById("userAnswer").innerText.length == 0){
      clearInterval(deleteUserAns);
    }
  }, 50);
  console.log(answer);
}

setInterval(() => {
  console.log(Math.floor(stage/2))
}, 1000);

// ========================================

// 数字ボタンなどの押下時の実行関数
$(".numBtn").click(function(){
  const clickedBtn = $(this).attr("id").replace("numBtn", "");
  if(clickedBtn == "submitBtn"){
    submit(document.getElementById("userAnswer").innerText);
    return;
  }
  else if(clickedBtn == "x"){
    document.getElementById("userAnswer").innerText = document.getElementById("userAnswer").innerText.replace(quizData[quizArrangement[Math.floor(stage/2)]][2],"").slice(0, -1) + quizData[quizArrangement[Math.floor(stage/2)]][2];
    return;
  }
  if(document.getElementById("userAnswer").innerText.length >= 8 + quizData[quizArrangement[Math.floor(stage/2)]][2].length){
    return;
  }
  else if(clickedBtn == "0"){
    if(document.getElementById("userAnswer").innerText.slice(-1) != ""){
      document.getElementById("userAnswer").innerText = document.getElementById("userAnswer").innerText.replace(quizData[quizArrangement[Math.floor(stage/2)]][2],"") + clickedBtn + quizData[quizArrangement[Math.floor(stage/2)]][2];
    }
    return;
  }
  document.getElementById("userAnswer").innerText = document.getElementById("userAnswer").innerText.replace(quizData[quizArrangement[Math.floor(stage/2)]][2],"") + clickedBtn + quizData[quizArrangement[Math.floor(stage/2)]][2];
});

// ========================================

// ページ読み込み時の実行関数
$(document).ready(function(){
  initQuiz();
});