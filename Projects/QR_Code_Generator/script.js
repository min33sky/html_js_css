const wrapper = document.querySelector('.wrapper');
const qrInput = wrapper.querySelector('form input');
const generateBtn = wrapper.querySelector('form button');
const form = wrapper.querySelector('form');
const qrImg = wrapper.querySelector('.qr-code img');
let preValue;

console.log('loaded');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let qrValue = qrInput.value.trim();
  // 입력값이 없거나, 이전 입력값과 동일하면 return
  if (!qrValue || qrValue === preValue) return;
  generateBtn.innerText = 'Generating...';
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.addEventListener('load', () => {
    wrapper.classList.add('active');
    generateBtn.innerText = 'Generate';
  });
});

qrInput.addEventListener('keyup', () => {
  //? 입력값이 없을 경우 초기화
  if (!qrInput.value.trim()) {
    wrapper.classList.remove('active');
    preValue = '';
  }
});
