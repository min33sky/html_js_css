function countTo(from, to) {
  if (from === to) return;

  let step = to > from ? 1 : -1;
  let interval = 100;

  let intervalId = setInterval(() => {
    from += step;
    document.querySelector('#output').textContent = from;
    if (from === to) {
      clearInterval(intervalId);
    }
  }, interval);
}

countTo(-20, 10);
