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

function drawStringOnCanvas(string) {
  //? The getContext() function returns the drawing context that all the drawing
  //? properties and functions needed to draw on canvas
  const ctx = canvas.getContext('2d');

  //* clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  //* array of text color
  const textColors = ['rgb(0,0,0', 'rgb(130,130,130'];

  //* space between letters
  const letterSpace = 150 / string.length;

  //* loop throught string
  for (let i = 0; i < string.length; i++) {
    //Define initial space on X axis
    const xInitialSpace = 25;
    // Set font for canvas element
    ctx.font = '20px Roboto Mono';
    // set text color
    ctx.fillStyle = textColors[randomNumber(0, 1)];
    ctx.fillText(
      string[i], //? i번째 문자
      xInitialSpace + i * letterSpace, //? x좌표
      randomNumber(25, 40), //? y좌표
      100 //? 최대 폭 [옵션값]
    );
  }
}

function triggerFunction() {
  // clear Input
  userInput.value = '';
  text = textGenerator();
  console.log('text: ', text);
  //? Randomize the text so that everytime the position of numbers and small letters is random
  //TODO 개선해야함 랜덤
  text = [...text].sort(() => Math.random() - 0.5).join('');
  drawStringOnCanvas(text);
}

// call triggerFunction for reload button
reloadBUtton.addEventListener('click', triggerFunction);

// call triggerFunction when page loads
window.onload = () => triggerFunction();

// When user clicks on submit
submitButton.addEventListener('click', () => {
  // check if user input === generated text
  console.log(userInput.value, text, userInput.value === text);
  if (userInput.value === text) {
    return alert('success');
  }
  alert('Incorrect');
  triggerFunction();
});
