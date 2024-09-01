// ========================================
// let nowtime = 0;
// let quiztime = 0;
// let yourans = 0;
// let yourscore = 0;
// let onescore = 0;
// let topscore = 1000;
// let sumscore = 0;
// let spe = "  ";
// let underbar = document.getElementById("underbar");
// let questions = document.getElementById("questions");
// let explaint = document.getElementById("explains");
// let gobutton = document.getElementById("gobutton");
// let yourname = document.getElementById("yourname");
// let button1 = document.querySelector("#numBtn1");
// let button2 = document.querySelector("#numBtn2");
// let button3 = document.querySelector("#numBtn3");
// let button4 = document.querySelector("#numBtn4");
// let button5 = document.querySelector("#numBtn5");
// let button6 = document.querySelector("#numBtn6");
// let button7 = document.querySelector("#numBtn7");
// let button8 = document.querySelector("#numBtn8");
// let button9 = document.querySelector("#numBtn9");
// let backbutton = document.querySelector("#backbutton");
// let decbutton = document.querySelector("#decbutton");
// let button1a = document.getElementById("button1");

// window.addEventListener("resize", buttonall);
// let windowWidth = document.documentElement.clientWidth;
// let typebutton = windowWidth / 12;
// button1.width = typebutton;
// button1.height = typebutton;
// button2.width = typebutton;
// button2.height = typebutton;
// button3.width = typebutton;
// button3.height = typebutton;
// button4.width = typebutton;
// button4.height = typebutton;
// button5.width = typebutton;
// button5.height = typebutton;
// button6.width = typebutton;
// button6.height = typebutton;
// button7.width = typebutton;
// button7.height = typebutton;
// button8.width = typebutton;
// button8.height = typebutton;
// button9.width = typebutton;
// button9.height = typebutton;
// button0.width = typebutton;
// button0.height = typebutton;
// backbutton.width = typebutton;
// backbutton.height = typebutton;
// decbutton.width = typebutton;
// decbutton.height = typebutton;

// let exwid = 10;

// function buttonall() {
//   window.addEventListener("resize", buttonall);
//   let windowWidth = document.documentElement.clientWidth;
//   let typebutton = windowWidth / (3 * 4);
//   button1.width = typebutton;
//   button1.height = typebutton;
//   button2.width = typebutton;
//   button2.height = typebutton;
//   button3.width = typebutton;
//   button3.height = typebutton;
//   button4.width = typebutton;
//   button4.height = typebutton;
//   button5.width = typebutton;
//   button5.height = typebutton;
//   button6.width = typebutton;
//   button6.height = typebutton;
//   button7.width = typebutton;
//   button7.height = typebutton;
//   button8.width = typebutton;
//   button8.height = typebutton;
//   button9.width = typebutton;
//   button9.height = typebutton;
//   button0.width = typebutton;
//   button0.height = typebutton;
//   backbutton.width = typebutton;
//   backbutton.height = typebutton;
//   decbutton.width = typebutton;
//   decbutton.height = typebutton;
//   alert("push");
//   //setTimeout(biggers, 100);
// }

// button1a.onclick = buttonall;


// if (nowtime == 0) {
//   questions.innerHTML = "桐蔭クイズー";
//   explaint.innerHTML = "名前を入れましょう";
// }
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

function fetchCSV(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        console.error('Failed to fetch CSV:', xhr.status);
        callback(null);
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
}

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
  });
}

$(".numBtn").click(function(){
  const clickedBtn = $(this).attr("id").replace("numBtn", "");
  console.log(clickedBtn);
  if(clickedBtn == "submitBtn"){
    return;
  }
  else if(clickedBtn == "x"){
    document.getElementById("userAnswer").innerText = document.getElementById("userAnswer").innerText.slice(0, -1);
    return;
  }
  if(document.getElementById("userAnswer").innerText.length >= 8){
    return;
  }
  else if(clickedBtn == "0"){
    if(document.getElementById("userAnswer").innerText.slice(-1) != ""){
      document.getElementById("userAnswer").innerText += clickedBtn;
    }
    return;
  }
  document.getElementById("userAnswer").innerText += clickedBtn;
})