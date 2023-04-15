
// function showTime(timeEnd) {
//     let timeLeft = timeEnd - Math.round(new Date().getTime()/1000)
//     let mins = Math.floor(timeLeft /  60);
//     let secs = Math.floor(timeLeft %  60);
//     document.getElementById("clock")
//         .innerHTML = "Time left: "+mins+"min"+secs+"s" +"\n"+Math.round(new Date().getTime()/1000);
// }

// //showTime();
// function startTest(){
//     let timeEnd = new Date().getTime();
//     timeEnd = Math.round(timeEnd/1000)+30*60
//     countdown=30*60
//     let x = setInterval(showTime(timeEnd), 1000);
//     showTime(timeEnd)
// }
 
function startTest() {
  var countDownDate = new Date().getTime() + 1000+30 * 60 * 1000; // 30 minutes from now
  var x = setInterval(function() {
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

function getRadioValue() {
    var ele = document.getElementsByName('radios');
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        document.getElementById("resultss").innerHTML
                = "selected: "+ele[i].value;
    }
}


