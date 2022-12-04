console.log('script loaded');

const fileInput = document.querySelector('#imageFileInput');
const canvas = document.querySelector('#canvas');
const canvasCtx = canvas.getContext('2d');
const brightnessInput = document.querySelector('#brightness');
const saturationInput = document.querySelector('#saturation');
const blurInput = document.querySelector('#blur');
const inversionInput = document.querySelector('#inversion');
const resetButton = document.querySelector('#resetImageBtn');
const downloadLink = document.querySelector('#download');

//* 상태값
const setting = {}; // 툴바의 변수들을 담을 객체
let image = null; // 이미지 파일 객체

function resetSettings() {
  setting.brightness = '100';
  setting.saturation = '100';
  setting.blur = '0';
  setting.inversion = '0';

  brightnessInput.value = setting.brightness;
  saturationInput.value = setting.saturation;
  blurInput.value = setting.blur;
  inversionInput.value = setting.inversion;
}

function updateSetting(key, value) {
  if (!image) return;

  setting[key] = value;
  renderImage();
}

function generatorFilter() {
  const { brightness, saturation, inversion, blur } = setting;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function renderImage() {
  canvas.width = image.width;
  canvas.height = image.height;

  canvasCtx.filter = generatorFilter();
  canvasCtx.drawImage(image, 0, 0);
}

fileInput.addEventListener('change', () => {
  image = new Image();

  image.addEventListener('load', () => {
    resetSettings();
    renderImage();
  });

  image.src = URL.createObjectURL(fileInput.files[0]);
});

brightnessInput.addEventListener('change', () =>
  updateSetting('brightness', brightnessInput.value)
);
saturationInput.addEventListener('change', () =>
  updateSetting('saturation', saturationInput.value)
);
blurInput.addEventListener('change', () =>
  updateSetting('blur', blurInput.value)
);
inversionInput.addEventListener('change', () =>
  updateSetting('inversion', inversionInput.value)
);

resetButton.addEventListener('click', () => {
  resetSettings();
  renderImage();
});

function downloadImage() {
  const imageURI = canvas.toDataURL('image/png');
  downloadLink.href = imageURI;
}

downloadLink.addEventListener('click', () => downloadImage());

//* 함수 호출
resetSettings();
