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

function isExecutable() {
  //? Check if the browser supports the API
  //? 현재 Chrome, Edge, Opera 정도만 지원
  //? https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper
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

function rgbToHex(r, g, b) {
  return (
    '#' + [r, g, b].map((x) => Number(x).toString(16).padStart(2, 0)).join('')
  );
}

async function colorSelector() {
  try {
    error.innerText = '';

    abortController = new AbortController();
    setTimeout(() => abortController.abort('10초 안에 선택해주세요 :)'), 10000);

    const colorValue = await eyeDropper.open({
      signal: abortController.signal,
    });

    const rgb = colorValue.sRGBHex;
    const rgbArr = rgb
      .replace(/[^0-9]/g, ' ')
      .trim()
      .split(' ')
      .filter((n) => !!n);
    const hex = rgbToHex(...rgbArr);

    result.style.display = 'grid';
    hexValRef.value = hex;
    hexButton.dataset.val = hex;
    rgbValRef.value = rgb;
    rgbButton.dataset.val = rgb;
    pickedColorRef.style.backgroundColor = rgb;
  } catch (err) {
    error.classList.remove('hide');
    error.innerText = err;
  }
}

function selectImageHandler(e) {
  result.style.display = 'none';
  const file = e.target.files[0];
  const previewImage = URL.createObjectURL(file);
  image.setAttribute('src', previewImage);
}

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
