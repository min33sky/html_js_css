const popup = document.querySelector('#cookie-popup');
const acceptBtn = document.querySelector('#accept-cookie');

/**
 * 쿠키 승인 버튼 리스너
 */
acceptBtn.addEventListener('click', () => {
  const date = new Date();

  //? 쿠키 만료 시간을 2분 뒤로 설정
  date.setMinutes(date.getMinutes() + 2);
  document.cookie = `myCookieName=thisIsMyCookie; expires=${date};`;

  popup.classList.add('hide');
  popup.classList.remove('show');
});

/**
 * 쿠키 존재 확인
 */
function checkCookie() {
  let cookie = document.cookie.split('=');
  if (cookie[0] === 'myCookieName') {
    popup.classList.add('hide');
    popup.classList.remove('show');
  } else {
    popup.classList.add('show');
    popup.classList.remove('hide');
  }
}

window.onload = checkCookie;
