// TIMER

let pomodoroBtn = document.getElementById('pomodoro');
let shortBreakBtn = document.getElementById('shortBreak');
let longBreakBtn = document.getElementById('longBreak');

let button = document.getElementById('countdownBtn');
let countdown = document.getElementById('countdown');
let circle = document.getElementById('circle');

let startingMinutes = 25;
let time = startingMinutes * 60;

let isRunning = false;
let timer;

const FULL_DASH_ARRAY = 1068;

countdown.innerHTML = `${startingMinutes}:00`;

function onPomodoro() {
  startingMinutes = document.getElementById('pomodoroInput').value;
  pomodoroBtn.classList.add('nav__item--active');
  shortBreakBtn.classList.remove('nav__item--active');
  longBreakBtn.classList.remove('nav__item--active');
  reset();
}

function onShort() {
  startingMinutes = document.getElementById('shortBreakInput').value;
  shortBreakBtn.classList.add('nav__item--active');
  pomodoroBtn.classList.remove('nav__item--active');
  longBreakBtn.classList.remove('nav__item--active');
  reset();
}

function onLong() {
  startingMinutes = document.getElementById('longBreakInput').value;
  longBreakBtn.classList.add('nav__item--active');
  pomodoroBtn.classList.remove('nav__item--active');
  shortBreakBtn.classList.remove('nav__item--active');
  reset();
}

function start() {

  isRunning = !isRunning;

  if (isRunning == true && time > 0) {
    timer = setInterval(function () {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      countdown.innerHTML = `${minutes}:${seconds}`;
      check(time);
      setCircleDasharray();
    }, 1000);
    button.innerHTML = 'Pause';

  } else {
    pause();
    button.innerHTML = 'Resume';
  }

};

function calculateTimeFraction() {
  const rawTimeFraction = time / (startingMinutes*60);
  return rawTimeFraction - (1 / (startingMinutes*60)) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 1068`;
  circle.setAttribute('stroke-dasharray', circleDasharray);
}

function pause() {
  clearInterval(timer);
  timer = null;
};

function check(someTime) {
  if (someTime <= 0) {
    clearInterval(timer);
    setTimeout(reset, 1000);
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
  countdown.innerHTML = `${startingMinutes}:00`;
}

pomodoroBtn.addEventListener('click', onPomodoro);
shortBreakBtn.addEventListener('click', onShort);
longBreakBtn.addEventListener('click', onLong);
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