let valueDisplays = document.querySelectorAll('.num');
let interval = 4000;

valueDisplays.forEach((valuePlay) => {
  let startValue = 0;
  let endValue = parseInt(valuePlay.dataset.val);
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(() => {
    startValue += 1;
    valuePlay.textContent = startValue;
    if (startValue === endValue) {
      clearInterval(counter);
    }
  }, duration);
});
