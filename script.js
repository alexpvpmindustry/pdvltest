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
  document.getElementById("result1").innerHTML = data;
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


