//Create Initial references
const pickColor = document.getElementById('pick-color');
const error = document.getElementById('error');
const fileInput = document.getElementById('file');
const image = document.getElementById('image');
const hexValRef = document.getElementById('hex-val-ref');
const rgbValRef = document.getElementById('rgb-val-ref');
const customAlert = document.getElementById('custom-alert');
const pickedColorRef = document.getElementById('picked-color-ref');
const result = document.getElementById('result');
const hexButton = document.querySelector('#hex-btn');
const rgbButton = document.querySelector('#rgb-btn');
let eyeDropper;
let abortController;

/**
 * @description Check if the browser supports the EyeDropper API
 * ? 현재 Chrome, Edge, Opera 정도만 지원
 * ? https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper
 */
function isExecutable() {
  if ('EyeDropper' in window) {
    pickColor.classList.remove('hide');
    eyeDropper = new EyeDropper();
  } else {
    error.classList.remove('hide');
    error.textContent = 'EyeDropper API is not supported in this browser.';
    pickColor.classList.add('hide');
    return false;
  }
}

/**
 * 색상 선택 핸들러
 */
async function colorSelector() {
  try {
    error.innerText = '';

    //? 20초 안에 선택하지 않으면 경고 메시지
    abortController = new AbortController();
    setTimeout(() => abortController.abort('20초 안에 선택해주세요 :)'), 20000);

    const colorValue = await eyeDropper.open({
      signal: abortController.signal,
    });

    const hexValue = colorValue.sRGBHex;
    const rgbArr = [];

    //? hex 값을 rgb로 변환 (ex. #ffffff -> rgb(255, 255, 255)
    for (let i = 1; i < hexValue.length; i += 2) {
      rgbArr.push(parseInt(hexValue[i] + hexValue[i + 1], 16));
    }

    const rgbValue = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;

    result.style.display = 'grid';
    hexValRef.value = hexValue;
    hexButton.dataset.val = hexValue;
    rgbValRef.value = rgbValue;
    rgbButton.dataset.val = rgbValue;
    pickedColorRef.style.backgroundColor = rgbValue;
  } catch (err) {
    error.classList.remove('hide');
    error.innerText = err;
  }
}

/**
 * 이미지 선택 핸들러
 * - 이미지 미리보기 설정
 */
function selectImageHandler(e) {
  result.style.display = 'none';
  const file = e.target.files[0];
  const previewImage = URL.createObjectURL(file);
  image.setAttribute('src', previewImage);
}

/**
 * 클립보드에 복사
 */
function copyToClipboard(e) {
  const target = e.target.parentNode;
  const text = target.dataset.val;
  navigator.clipboard.writeText(text);
  customAlert.style.scale = 1;
  setTimeout(() => {
    customAlert.style.scale = 0;
  }, 2000);
}

window.onload = isExecutable;
pickColor.addEventListener('click', colorSelector);
fileInput.addEventListener('change', selectImageHandler);
hexButton.addEventListener('click', copyToClipboard);
rgbButton.addEventListener('click', copyToClipboard);
