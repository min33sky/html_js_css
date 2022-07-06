const cube = document.querySelector('.image-cube');
const btnNext = document.querySelector('#next');
const btnPrev = document.querySelector('#prev');

let pos = 0;
let timer = 2000;

btnNext.addEventListener('click', () => {
  //? 시계방향으로 움직인다.
  pos -= 90;
  cube.style.transform = `rotateY(${pos}deg)`;
  displayButtons();
});

btnPrev.addEventListener('click', () => {
  pos += 90;
  cube.style.transform = `rotateY(${pos}deg)`;
  displayButtons();
});

/**
 ** 애니메이션 효과동안 버튼 숨기기
 */
function displayButtons() {
  btnNext.style.display = 'none';
  btnPrev.style.display = 'none';
  setTimeout(() => {
    btnNext.style.display = 'block';
    btnPrev.style.display = 'block';
  }, timer);
}
