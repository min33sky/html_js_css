const progressbar = document.querySelector('.progressbar__circular');
const progressValue = document.querySelector('.progressbar__value');

let currentValue = 0;
let endValue = 100;
let speed = 50;

let progress = setInterval(() => {
  currentValue++;
  progressValue.textContent = `${currentValue}%`;
  progressbar.style.background = `conic-gradient(
    #4d5bf9 ${currentValue * 3.6}deg,
    #cadcff ${currentValue * 3.6}deg)`;

  if (currentValue === endValue) {
    clearInterval(progress);
  }
}, speed);
