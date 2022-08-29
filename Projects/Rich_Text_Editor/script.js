let optionsButtons = document.querySelectorAll('.option-button');
let advancedOptionButton = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let writingArea = document.getElementById('text-input');
let linkButton = document.getElementById('createLink');
let alignButtons = document.querySelectorAll('.align');
let spacingButtons = document.querySelectorAll('.spacing');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');

//List of fontlist
let fontList = [
  'Arial',
  'Verdana',
  'Times New Roman',
  'Garamond',
  'Georgia',
  'Courier New',
  'cursive',
];

function initialize() {
  console.log('loaded');
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  fontList.map((font) => {
    let option = document.createElement('option');
    option.value = font;
    option.textContent = font;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    fontSizeRef.appendChild(option);
  }

  fontSizeRef.value = 3;
}

/**
 * 버튼을 클릭했을 때 하이라이트 처리하는 함수
 * @param {array} className
 * @param {boolean} needsRemoval
 */
function highlighter(className, needsRemoval) {
  className.forEach((button) => {
    button.addEventListener('click', () => {
      //? false인 경우엔 기존 하이라이트가 있어도 다른 버튼에 하이라이트 가능하다. (굵기, 기울이기등)
      if (needsRemoval) {
        let alreadyActive = false;

        //? 같은 분류의 버튼들중에 이미 하이라이트 된 버튼이 있는지 확인한다.
        if (button.classList.contains('active')) {
          alreadyActive = true;
        }

        //? 하이라이트 된 버튼 해제
        highlighterRemover(className);

        //? 현재 버튼을 하이라이트
        if (!alreadyActive) {
          button.classList.add('active');
        }
      } else {
        //? 하이라이트가 여러개 있어도 되는 버튼들이라면 하이라이트 처리
        button.classList.toggle('active');
      }
    });
  });
}

/**
 * 버튼들의 하이라이트를 해제하는 함수
 * @param {array} className
 */
function highlighterRemover(className) {
  className.forEach((button) => {
    button.classList.remove('active');
  });
}

function modifyText(command, defaultUI, value) {
  document.execCommand(command, defaultUI, value);
}

optionsButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modifyText(button.id, false, null);
  });
});

advancedOptionButton.forEach((button) => {
  button.addEventListener('change', () => {
    modifyText(button.id, false, button.value);
  });
});

linkButton.addEventListener('click', () => {
  let userLink = prompt('Enter a URL');
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = 'http://' + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

window.onload = initialize();
