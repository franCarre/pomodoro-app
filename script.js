// TIMER

let pomodoro = document.getElementById('pomodoro');
let shortBreak = document.getElementById('shortBreak');
let longBreak = document.getElementById('longBreak');

let button = document.getElementById('countdownBtn');
let countdown = document.getElementById('countdown');

let startingMinutes = 25;
let time = startingMinutes * 60;

let isRunning = false;
let timer;

pomodoro.addEventListener('click', function() {
  startingMinutes = 25;
});

function start() {

  isRunning = !isRunning;

  if (isRunning == true && time > 0) {
    timer = setInterval(function () {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      countdown.innerHTML = `${minutes}:${seconds}`;
      check(time);
    }, 1000);
    button.innerHTML = 'Pause';

  } else {
    pause();
    button.innerHTML = 'Resume';
  }

};

function pause() {
  clearInterval(timer);
  timer = null;
};

function check(someTime) {
  if (someTime <= 0) {
    clearInterval(timer);
    setTimeout(reset, 5000);
  } else {
    someTime--;
    time--;
    time = someTime;
  }
};

function reset() {
  clearInterval(timer);
  timer = null;
  time = startingMinutes * 60;
  isRunning = false;
  button.innerHTML = 'Start';
  countdown.innerHTML = '00:00';
}

button.addEventListener('click', start);


// Modal Window
let modal = document.querySelector('.modal');
let trigger = document.querySelector('.trigger');
let closeButton = document.querySelector('.modal__close-btn');

function toggleModal() {
  modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);