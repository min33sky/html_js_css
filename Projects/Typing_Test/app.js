//* Random Quotes Api URL
const quoteApiUrl = 'https://api.quotable.io/random?minLength=80&maxLength=100';
const quoteSection = document.getElementById('quote');
const userInput = document.getElementById('quote-input');
const mistakesElement = document.querySelector('#mistakes');
const mainBtn = document.querySelector('#main-btn');

let quote = [];
let time = 60;
let timer = ''; // 타이머 변수
let mistakes = 0;
let cursor = 0; // 현재 커서 위치
let inProgress = false; // 현재 진행중인지

/**
 ** 랜덤 인용문 생성 및 초기 설정
 */
async function renderNewQuote() {
  const fetchedData = await (await fetch(quoteApiUrl)).json();

  quote = fetchedData.content.split('').map((char) => ({
    char,
    class: '',
  }));

  /**
   *? 인용문을 문자 단위로 나누어 배열에 저장한다.
   *? 입력할 때마다 문자에 스타일을 주기위해 class를 적용
   */
  const arr = quote.map((item) => `<span class="">${item.char}</span>`);

  quoteSection.innerHTML += arr.join('');
  mistakesElement.textContent = 0;
}

//? keydown 이벤트 시 한글 체크 불가
userInput.addEventListener('input', (e) => {
  const targetDom = quoteSection.childNodes;

  //? 한글이 입력 안되도록 막기 (커서 위치 버그 생김)
  if (e.inputType === 'insertCompositionText') {
    userInput.value = userInput.value.slice(0, -1);
    return;
  }

  //? Space키와 Enter키 처리
  if (e.data === ' ' || e.data === 'insertLineBreak') {
    cursor += 1;
    return;
  }

  //? 백스페이스 처리
  if (e.inputType === 'deleteContentBackward') {
    if (cursor > 0) cursor -= 1;

    if (targetDom[cursor].classList.contains('success')) {
      targetDom[cursor].classList.remove('success');
    } else if (targetDom[cursor].classList.contains('fail')) {
      targetDom[cursor].classList.remove('fail');
    }
    return;
  }

  //? 입력한 값과 원본과 비교하기
  if (e.data === quote[cursor].char) {
    targetDom[cursor].classList.add('success');
  } else {
    targetDom[cursor].classList.add('fail');
    mistakes += 1;
    mistakesElement.textContent = mistakes;
  }

  cursor += 1;

  //? 마지막까지 입력하면 결과를 보여준다.
  if (cursor >= quote.length) displayResult();
});

function displayResult() {
  clearInterval(timer);
  userInput.disabled = true;
  document.querySelector('.result').style.display = 'block';

  let timeTaken = 1;
  if (time !== 0) {
    timeTaken = (60 - time) / 100;
  }

  document.querySelector('#wpm').textContent =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + ' wpm';

  document.querySelector('#accuracy').textContent = `${
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) || 0
  }%`;

  inProgress = false; // 현재 진행중인지
  mainBtn.textContent = 'Start Test';
}

function updateTimer() {
  if (time === 0) {
    displayResult();
  } else {
    document.querySelector('#timer').innerHTML = --time + 's';
  }
}

function startTest() {
  init();
  renderNewQuote();
  inProgress = true; // 현재 진행중인지

  userInput.disabled = false;
  userInput.focus();
  mainBtn.textContent = 'Stop';
  document.querySelector('.result').style.display = 'none';
  timer = setInterval(updateTimer, 1000);
}

function init() {
  quoteSection.innerHTML = '';
  mistakes = 0;
  time = 60;
  timer = '';
  cursor = 0;
  userInput.value = '';
}

mainBtn.addEventListener('click', () => {
  console.log('ㅎㅎ');
  if (!inProgress) {
    startTest(); // 현재 진행중인지 ();
  } else {
    displayResult();
  }
});

window.onload = () => {
  userInput.disabled = true;
};

console.log('loaded');
