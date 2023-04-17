let endedTest = false;
let endTime;
function startTimer() {
  var countDownDate = new Date().getTime() + 2000 + 30 * 60 * 1000; // 30 minutes from now
  //var countDownDate = new Date().getTime() + 4000 ;//+ 30 * 60 * 1000; // 4 sec
  var x = setInterval(function () {
    var now;
    if (!endedTest) { now = new Date().getTime(); } else { now = endTime; }
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("clock").innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("clock").innerHTML = "END";
      document.getElementById("clock").style.backgroundColor = "red";
    }
  }, 100);
}
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

let randomOrder = Array(20).fill().map((x, i) => i);
function startTest() {
  let radioval = getRadioValue();
  blockRadio();
  if (radioval == 3) {
    shuffle(randomOrder);
    if (Math.random() < 0.5) {
      radioval = 1;
    }
    else {
      radioval = 1;
    }
  }
  if (radioval == 1) {
    fetchdata('sample1.json', false);
    fetchdata('sample1ans.json', true);
  }
  if (radioval == 2) {
    fetchdata('sample2.json', false);
    fetchdata('sample2ans.json', true);
  }
  let startbutton = document.getElementById("start");
  startbutton.disabled = true;
  document.getElementById("start").innerText = "test started";
  let restartbutton = document.getElementById("restart");
  restartbutton.style.display = "block";
  startTimer();
}

function getRadioValue() {
  var ele = document.getElementsByName('radios');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      //document.getElementById("resultss").innerHTML = "selected: " + ele[i].value;
      return ele[i].value
    }
  }
}
function blockRadio() {
  var ele = document.getElementsByName('radios');
  for (i = 0; i < ele.length; i++) {
    ele[i].disabled = true;
  }
}
class Qn {
  constructor(qq, a1, a2, a3, a4, qname, delayy) { // delay doesnt work
    this.QnTemplate = `<div class="question animate" style="animationDelay: ${delayy}s">
     <div>${qname}: ${qq}<div><br>
    <input type="radio" id="A1" name=${qname} value="A1">
    <label for="radio" id="AA1">${a1}</label><br>
    <input type="radio" id="A2" name=${qname} value="A2">
    <label for="radio" id="AA2">${a2}</label><br>
    <input type="radio" id="A3" name=${qname} value="A3">
    <label for="radio" id="AA3">${a3}</label><br>
    <input type="radio" id="A4" name=${qname} value="A4">
    <label for="radio" id="AA4">${a4}</label><br>
  </div>`;
  }
}

let sample1dict = {};
let ans1dict = {};
let passScore = 17;
function fetchdata(file, ans) {
  fetch(file)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!ans) {
        appendData(data);
        displayData();
      } else {
        appendAnsData(data);
      }
    })
    .catch(function (err) {
      console.log('error: ' + err);
    });
}

function appendData(data) {
  for (let ii = 0; ii < data.length; ii++) {
    let i = randomOrder[ii];
    sample1dict["Q" + (ii + 1)] = [data[i]["Q" + (i + 1)], data[i].A1, data[i].A2, data[i].A3, data[i].A4, "Q" + (ii + 1), "Q" + (i + 1)]
  }
}
function appendAnsData(data) {
  for (let ii = 0; ii < data.length; ii++) {
    let i = randomOrder[ii];
    ans1dict["Q" + (ii + 1)] = [data[i]["Q" + (i + 1)], "Q" + (ii + 1), "Q" + (i + 1)]
  }
}
function displayData() {
  let mainContainer = document.getElementById("result1");
  result1.style.display = "block";
  let counter = 0;
  for (var key in sample1dict) {
    let div = document.createElement("div");
    let sd = sample1dict[key]
    div.innerHTML = `${new Qn(sd[0], sd[1], sd[2], sd[3], sd[4], sd[5], counter).QnTemplate}`
    counter = counter + 5;
    mainContainer.appendChild(div);
  }
  let sb = document.createElement("div");
  sb.innerHTML = `<button class="mdc-button mdc-button--raised" id="start" onclick="grade();this.disabled=true;">Submit</button>`
  mainContainer.appendChild(sb);//<div id="finalscore"></div>
  let sb1 = document.createElement("div");
  sb1.innerHTML = `<br><div id="finalscore" class="finalscore" style="display:none;"> </div>`
  mainContainer.appendChild(sb1);//
}
let nodeval;
let scores = 0;
function grade() {
  endTime = new Date().getTime();
  endedTest = true;
  const children = document.querySelectorAll('.question');
  children.forEach((node, index) => {
    let correct = false; let realans = ans1dict["Q" + (index + 1)][0];
    let varr = node.children[0].children[0].children;
    for (var childi = 0; childi < varr.length; childi++) {
      let child = varr[childi]
      //console.log([child.value,child.checked,ans1dict["Q"+(index+1)][0]]); 
      if (child.checked) {
        if (child.value == realans) {
          correct = true;
          scores++;
        } else {
        }
      }
    }
    node.style.borderWidth = "thick";
    if (correct) {
      node.style.borderColor = "rgba(50,255,50,0.8)";
      node.style.backgroundColor = "rgba(50,255,50,0.2)";
    }
    else {
      node.style.borderColor = "rgba(255,50,50,0.8)";
      node.style.backgroundColor = "rgba(255,50,50,0.2)";

      let sb = document.createElement("div");
      sb.innerHTML = `<p>correct answer is ${realans.substr(1)}</p>`
      sb.style.backgroundColor = "yellow";
      sb.style.textAlign = "center";
      sb.style.marginLeft = "10vw";
      sb.style.marginRight = "10vw";
      node.appendChild(sb)
    }
  });
  const finalscore = document.getElementById('finalscore');

  let passedtext;
  if (scores >= passScore) {
    passedtext = "[PASSED]"
  } else {
    passedtext = "[FAILED]"
  }
  finalscore.innerHTML = `Score = ${scores}/${20}. ${passedtext}`
  finalscore.style.display = "block";

}


function fillfootercontent() {
  let ftc = document.getElementById("footercontent");
  let social0 = document.createElement("div");
  social0.innerHTML = `
  <br>
  <p>Support our work. Buy me a <a href="https://www.buymeacoffee.com/alexservers"
      style="color: aquamarine;">☕coffee☕</a> .</p>
  <p>Submit your own questions. <a href="mailto:alex.mindustry+pdvl@gmail.com" style="color: aquamarine;">Email</a>.
  </p>
  <p>Back to landing page. <a href="./index.html" style="color: aquamarine;">Here</a>.</p>`
  

  let links = {};
  links["./pdvlA.html"] = "PDVL Paper A, mock Exam.";
  links["./top10tipsandtricks.html"] = "Top 10 tips and tricks to pass your PDVL exam.";
  for (var key in links) {
    let sb = document.createElement("div");
    var str = links[key];
    var lastIndex = str.lastIndexOf(" "); 
    str = str.substring(0, lastIndex);
    sb.innerHTML = str+` <a href=${key} style="color: #01af74;">${links[key].substring(lastIndex)}</a>`; 
    ftc.append(sb);
  }
  ftc.append(social0);
}


