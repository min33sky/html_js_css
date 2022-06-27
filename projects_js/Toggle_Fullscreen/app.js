const myDocument = document.documentElement;
const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
  if (btn.textContent === 'Go Fullscreen') {
    myDocument.requestFullscreen();
    btn.textContent = 'Exit Fullscreen';
  } else {
    document.exitFullscreen();
    btn.textContent = 'Go Fullscreen';
  }
});
