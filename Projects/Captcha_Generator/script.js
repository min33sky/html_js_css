const submitButton = document.querySelector('#submit-button');
const userInput = document.querySelector('#user-input');
const canvas = document.querySelector('#canvas');
const reloadBUtton = document.querySelector('#reload-button');
let text = '';

/**
 * 주어진 범위 내의 랜덤한 수를 리턴하는 함수
 * @param {number} min
 * @param {number} max
 * @returns random number
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 문자열 내의 문자 위치를 섞어주는 함수
 * @param {string} text 문자열
 */
function randomPosition(text) {
  let result = '';
  let original = [...text];

  while (original.length > 0) {
    const targetIndex = Math.floor(Math.random() * original.length);
    result += original[targetIndex];
    original.splice(targetIndex, 1);
  }

  return result;
}

/**
 * 캡챠에 사용할 문자열 생성
 * @returns 문자열
 */
function textGenerator() {
  let generatedText = '';

  //? 9자리의 Ascii value로 이루어진 문자열을 만든다.
  for (let i = 0; i < 3; i++) {
    generatedText += String.fromCharCode(randomNumber(65, 90)); //? A~Z
    generatedText += String.fromCharCode(randomNumber(97, 122)); //? a~z
    generatedText += String.fromCharCode(randomNumber(48, 57)); //? 0~9
  }

  return generatedText;
}

/**
 * 캡차 영역에 그리는 함수
 * @param {string} string 캡챠 문자열
 */
function drawStringOnCanvas(string) {
  //? The getContext() function returns the drawing context that all the drawing
  //? properties and functions needed to draw on canvas
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];

  //* 자간 설정
  const letterSpace = 150 / string.length;

  for (let i = 0; i < string.length; i++) {
    const xInitialSpace = 25; //? 초기 X 좌표 설정
    ctx.font = '20px Roboto Mono';
    ctx.fillStyle = textColors[randomNumber(0, 1)];
    ctx.fillText(
      string[i], //? i번째 문자
      xInitialSpace + i * letterSpace, //? x좌표
      randomNumber(25, 40), //? y좌표
      100 //? 최대 폭 [옵션값]
    );
  }
}

/**
 * 결과 출력
 */
function checkInput() {
  if (userInput.value === text) {
    return alert('success');
  }
  alert('Incorrect');
  trigger();
}

function trigger() {
  userInput.value = '';
  text = randomPosition(textGenerator());
  drawStringOnCanvas(text);
}

reloadBUtton.addEventListener('click', trigger);
submitButton.addEventListener('click', checkInput);
userInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    checkInput();
  }
});
window.onload = trigger;
