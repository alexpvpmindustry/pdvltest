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
  constructor(price, title, image, description) {
    this.QnTemplate = `
<div class="mdc-form-field">
<div class="mdc-radio">
  <input class="mdc-radio__native-control" type="radio" id="radio-1" name="radios" value="1" checked>
  <div class="mdc-radio__background">
    <div class="mdc-radio__outer-circle"></div>
    <div class="mdc-radio__inner-circle"></div>
  </div>
  <div class="mdc-radio__ripple"></div>
</div>
<label for="radio-1">Sample A</label>
<div class="mdc-radio">
  <input class="mdc-radio__native-control" type="radio" id="radio-2" name="radios" value="2">
  <div class="mdc-radio__background">
    <div class="mdc-radio__outer-circle"></div>
    <div class="mdc-radio__inner-circle"></div>
  </div>
  <div class="mdc-radio__ripple"></div>
</div>
<label for="radio-1">Sample B</label>
<div class="mdc-radio">
  <input class="mdc-radio__native-control" type="radio" id="radio-3" name="radios" value="3">
  <div class="mdc-radio__background">
    <div class="mdc-radio__outer-circle"></div>
    <div class="mdc-radio__inner-circle"></div>
  </div>
  <div class="mdc-radio__ripple"></div>
</div>
<label for="radio-1">Random</label>
</div>`;
  }
}

let sample1dict={};
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

function appendData(data) {
  let mainContainer = document.getElementById("result1");
  for (let i = 0; i < data.length; i++) {
    //let div = document.createElement("div");
    //div.innerHTML = data[i]["Q"+(i+1)]+'<br>A1: ' + data[i].A1 + '<br>A2' + data[i].A2;
    //mainContainer.appendChild(div); 
    sample1dict["Q"+(i+1)] = [data[i]["Q"+(i+1)],data[i].A1,data[i].A2,data[i].A3,data[i].A4]
  }
  for (let i = 0; i < data.length; i++) {
    let div = document.createElement("div");
    //div.innerHTML = data[i]["Q"+(i+1)]+'<br>A1: ' + data[i].A1 + '<br>A2' + data[i].A2;
    div.innerHTML = ("Q"+(i+1))+sample1dict["Q"+(i+1)][0]
    mainContainer.appendChild(div); 
    //sample1dict["Q"+(i+1)] = [data[i].A1,data[i].A2,data[i].A3,data[i].A4]
  }
}
