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
  while (currentIndex != 0) { 
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; 
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

let randomOrder = Array(100).fill().map((x, i) => i);
function startTest() {
  let radioval = getRadioValue();
  blockRadio();
  // if (radioval == 3) {
  //   shuffle(randomOrder);
  //   if (Math.random() < 0.5) {
  //     radioval = 1;
  //   }
  //   else {
  //     radioval = 1;
  //   }
  // }
  if (radioval == 1) {
    fetchdata('paperb1.txt', false);
    fetchdata('sample1ans.json', true);
  }
  if (radioval == 2) {
    fetchdata('paperb3.txt', false);
    fetchdata('sample2ans.json', true);
  }
  if (radioval == 3) {
    fetchdata('./paperb3.json', false);
    //fetchdata('sample2ans.json', true);
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
      console.log("100");
      //console.log(response.json());
      //return response.json();
    })
    .then(function (data) {
      console.log("105"+data);
    })
    .then(function (data) {
      console.log("108");
      console.log(data);
      if (!ans) {
        appendData(data);
        displayData();
      } else {
        appendAnsData(data);
      }
    })
    .catch(function (err) {
      console.log("115");
      console.log('error: ' + err);
    });
}

function appendData(data) {
  console.log(data);
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

function docEleDiv(strr){
  let ele = document.createElement("div");
  ele.innerHTML=strr;
  return ele;
}
function getLinks(){
  let links = {};
  links["./pdvlA.html"] = "PDVL Paper A, mock Exam.";
  links["./top10tipsandtricks.html"] = "Top 10 tips and tricks to pass your PDVL exam.";
  links["./pdvl-application-process.html"] = "Application Process PDVL";
  links["./pdvl-faq.html"] = "Common PDVL and TDVL questions, FAQ";
  links["./pdvl-medical-check-up.html"] = "PDVL Medical Check-up";
  links["./pdvl-regulations.html"] = "PDVL Insurance Requirements";
  links["./pdvl-renewal-process.html"] = "PDVL Renewal Fee";
  links["./pdvl-test-preparation.html"] = "PDVL Test Preparation Notes";
  links["./pdvl-training-courses.html"] = "PDVL Course Providers";
  links["./pdvl-vs-tdvl.html"] = "PDVL VS TDVL, which is better?";
  return links;
}

function selectElements(dictionary, maxlimit) {
  if (maxlimit >= Object.keys(dictionary).length) {
    return dictionary;
  }
  var selected = {};
  var count = 0;
  var keys = Object.keys(dictionary);
  shuffleArray(keys); // Shuffle the keys array
  for (var i = 0; i < keys.length; i++) {
    if (count < maxlimit) {
      selected[keys[i]] = dictionary[keys[i]];
      count++;
    } else {
      break;
    }
  }
  return selected;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function addTagsToRandomWord(sentence, linkkk) {
  var words = sentence.split(' ');
  var randomIndex = Math.floor(Math.random() * words.length);
  var randomWord = words[randomIndex];
  words[randomIndex] = `<a href=${linkkk} style="color: #01af74;">` + randomWord + '</a>';
  var newSentence = words.join(' ');
  return newSentence;
}

function fillfootercontent(maxlinks) {
  let ftc = document.getElementById("footercontent");
  let linklist =getLinks();
  let links = selectElements(linklist,maxlinks);
  let headerr= docEleDiv(`<h3>Suggested pages</h3>`);
  ftc.append(headerr);
  for (var key in links) {
    let sb = document.createElement("div");
    var str = links[key];
    //var lastIndex = str.lastIndexOf(" "); 
    //str = str.substring(0, lastIndex);
    //sb.innerHTML = str+` <a href=${key} style="color: #01af74;">${links[key].substring(lastIndex)}</a>`;
    sb.innerHTML = addTagsToRandomWord(str, key)
    ftc.append(sb);
  } 
  let headerr2= docEleDiv(`<br><h3> </h3><img src="icons3.png" style="width:45vw; max-width: 40%;" alt="social media icons">`);
  ftc.append(headerr2);
  let social0 = docEleDiv(`
  <p>Support our work. Buy us a <a href="https://www.buymeacoffee.com/alexservers"
      style="color: aquamarine;">☕coffee☕</a> .</p>
  <p>Submit your own questions. <a href="mailto:alex.mindustry+pdvl@gmail.com" style="color: aquamarine;">Email</a>.
  </p>
  <p>Back to landing page. <a href="./index.html" style="color: aquamarine;">Here</a>.</p><br>`);
  ftc.append(social0);
}


