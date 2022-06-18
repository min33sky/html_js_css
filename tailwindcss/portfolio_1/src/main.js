import './index.css';

console.log('Script loaded....🚀');

const hamburger = document.querySelector('#hamburger');
const menuItem = document.querySelectorAll('#mobile_menu > li');
const darkmode = document.querySelector('#dark_mode');
const body = document.querySelector('body');

//? 모바일버전 메뉴를 클릭하면 메뉴 네비게이션바를 초기화
[...menuItem].forEach((menu) => {
  menu.addEventListener('click', (e) => {
    hamburger.checked = false;
  });
});

//? 다크모드 설정
darkmode.addEventListener('click', () => {
  console.log('ㅋㅋㅋ');
  body.classList.toggle('dark');
});
