let [milliSeconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerElement = document.querySelector('.timer-display');
let timerId = null;

document.querySelector('#start-timer').addEventListener('click', () => {
  if (timerId !== null) clearInterval(timerId);
  timerId = setInterval(displayTimer, 10);
});

document.querySelector('#pause-timer').addEventListener('click', () => {
  clearInterval(timerId);
});

document.querySelector('#reset-timer').addEventListener('click', () => {
  clearInterval(timerId);
  [milliSeconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timerElement.querySelectorAll('span').forEach((element) => {
    element.textContent = '00';
  });
});

function displayTimer() {
  milliSeconds += 1;

  if (milliSeconds === 100) {
    milliSeconds = 0;
    seconds += 1;
  }

  if (seconds == 60) {
    seconds = 0;
    minutes += 1;
  }

  if (minutes == 60) {
    minutes = 0;
    hours += 1;
  }

  document.querySelector('.hour').textContent = String(hours).padStart(2, '0');
  document.querySelector('.min').textContent = String(minutes).padStart(2, '0');
  document.querySelector('.sec').textContent = String(seconds).padStart(2, '0');
  document.querySelector('.ms').textContent = String(milliSeconds).padStart(
    2,
    '0'
  );
}
