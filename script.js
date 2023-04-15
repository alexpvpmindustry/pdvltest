function startTimer() {
  var countDownDate = new Date().getTime() + 1000 + 30 * 60 * 1000; // 30 minutes from now
  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("clock").innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("clock").innerHTML = "EXPIRED";
    }
  }, 100);
}

function startTest() {
  startTimer();
  //document.getElementById("result1").innerHTML = data;
  fetchdata();
}

function getRadioValue() {
  var ele = document.getElementsByName('radios');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      document.getElementById("resultss").innerHTML = "selected: " + ele[i].value;
      return ele[i].value
    }
  }
}
class Qn { 
  constructor(qq, a1, a2, a3,a4,qname) {
    this.QnTemplate = `<div class="question">
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

let sample1dict={};
function fetchdata(){
  fetch('sample1.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log('error: ' + err);
    });

}
function appendData(data) {
  let mainContainer = document.getElementById("result1");
  for (let i = 0; i < data.length; i++) { 
    sample1dict["Q"+(i+1)] = [data[i]["Q"+(i+1)],data[i].A1,data[i].A2,data[i].A3,data[i].A4]
  }
  for (let i = 0; i < data.length; i++) {
    let div = document.createElement("div");
    //div.innerHTML = data[i]["Q"+(i+1)]+'<br>A1: ' + data[i].A1 + '<br>A2' + data[i].A2;
    //div.innerHTML = ("Q"+(i+1))+sample1dict["Q"+(i+1)][0]
    let sd = sample1dict["Q"+(i+1)]
    div.innerHTML = `${new Qn(sd[0],sd[1],sd[2],sd[3],sd[4],"Q"+(i+1)).QnTemplate}`
    mainContainer.appendChild(div); 
    //sample1dict["Q"+(i+1)] = [data[i].A1,data[i].A2,data[i].A3,data[i].A4]
  }
  let sb = document.createElement("div");
  sb.innerHTML = `  <button class="mdc-button mdc-button--raised" id="start" onclick="alert('yes');">
  Submit
</button>`
  mainContainer.appendChild(sb);
}
