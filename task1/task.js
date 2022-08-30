let timer = document.querySelector("#timer");
let startBtn = document.querySelector("#start-button");
let stopBtn = document.querySelector("#stop-button");
let resetBtn = document.querySelector("#reset-button");

let milliseconds = 0;
let seconds = 0;
let minutes = 0;

let interval = null;

window.onload = function (){
    resetBtn.setAttribute("disabled", "true");
    stopBtn.setAttribute("disabled", "true");
}

resetBtn.addEventListener("click", function (e) {
  e.preventDefault();
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  timer.innerText = `00:00:00`;
  startBtn.removeAttribute("disabled");
  resetBtn.setAttribute("disabled", "true");
  stopBtn.setAttribute("disabled", "true");
  clearInterval(interval);
  interval = null;
});

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetBtn.setAttribute("disabled", "true");
  startBtn.setAttribute("disabled", "true");
  stopBtn.removeAttribute("disabled");
  if (interval === null) {
    interval = setInterval(function () {
      setTimer();
    }, 1);
  }
});

stopBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetBtn.removeAttribute("disabled");
  startBtn.removeAttribute("disabled");
  stopBtn.setAttribute("disabled", "true");
  clearInterval(interval);
  interval = null;
});

function setTimer() {
  if (milliseconds < 999) {
    milliseconds++;
  } else if (milliseconds == 999) {
    milliseconds = 0;
    if (seconds < 59) {
      seconds++;
    } else if (seconds == 59) {
      minutes++;
      seconds = 0;
    }
  }
  timer.innerText = `${makeMeTwoDigits(minutes)}:${makeMeTwoDigits(
    seconds
  )}:${makeMeTwoDigits(milliseconds)}`;
}

function makeMeTwoDigits(n) {
  return (n < 10 ? "0" : "") + n;
}



