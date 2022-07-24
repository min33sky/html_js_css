const resultElement = document.querySelector('#element');
const codeElement = document.querySelector('#code');
const inputs = document.querySelectorAll('.sliders input');
const copyBtn = document.querySelector('#copy-btn');

/**
 * ## Box-Shadow를 생성하는 함수
 */
function generateShadow(e) {
  //* shadow option values
  let hShadow = document.getElementById('h-shadow').value;
  let vShadow = document.getElementById('v-shadow').value;
  let blurRadius = document.getElementById('blur-radius').value;
  let spreadRadius = document.getElementById('spread-radius').value;
  let shadowColor = document.getElementById('shadow-color').value;
  let shadowColorOpacity = document.getElementById(
    'shadow-color-opacity'
  ).value;
  let shadowInset = document.getElementById('shadow-inset').checked;

  //? Using ternary operator to check if inset checkbox is checked or not.
  //? If checked we add the inset prefix
  //? Else no inset prefix is added
  let boxShadow = `${
    shadowInset ? 'inset' : ''
  } ${hShadow}px ${vShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(
    shadowColor,
    shadowColorOpacity
  )}`;

  resultElement.style.boxShadow = boxShadow;
  codeElement.textContent = `box-shadow: ${boxShadow};`;
}

/**
 * ## Hex값을 rgba 문자열로 변환하는 함수
 * @param {string} color 색상 hex값
 * @param {number} opacity 투명도
 * @returns rgba 문자열
 */
function hexToRgba(color, opacity) {
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

/**
 * ## 클립보드로 복사하는 함수
 */
async function copyCode() {
  await navigator.clipboard.writeText(codeElement.textContent);
}

inputs.forEach((input) => input.addEventListener('input', generateShadow));
copyBtn.addEventListener('click', copyCode);

window.onload = generateShadow();
