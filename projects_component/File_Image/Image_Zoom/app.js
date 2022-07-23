// initial References
const imageContainer = document.querySelector('.image-container');
const productImage = document.querySelector('#product-image');
const overlay = document.querySelector('.overlay');
const mouseOverlay = document.querySelector('.mouse-overlay');

// 이벤트 객체
let events = {
  mouse: {
    move: 'mousemove',
  },
  touch: {
    move: 'touchmove',
  },
};

let deviceType = '';

/**
 * 장비 타입을 체크
 */
function isTouchDevice() {
  try {
    //? 데스크탑등과 같이 터치 지원을 안할시 에러 발생 후 마우스 이벤트로 설정
    deviceType = 'touch';
    document.createEvent('TouchEvent');
    return true;
  } catch (error) {
    deviceType = 'mouse';
    return false;
  }
}

function hideElement() {
  overlay.style.display = 'none';
  mouseOverlay.style.display = 'none';
}

//* 터치 이벤트를 적용할 것인지 마우스 이벤트를 적용할 것인지 체크
isTouchDevice();

/*In addEventListener we use the events object to set the event so deviceType would be set to touch or mouse since we called 'isTouchDevice()' above
E.g:
if deviceType = "mouse" => the statement for event would be events[mouse].move which equals to mousemove.
if deviceType = "touch" => the statement for event would be events[touch].move which equals to touchstart.
*/

imageContainer.addEventListener(events[deviceType].move, (e) => {
  let x, y;
  //? pageX, pageY: 현재 커서의 좌표값을 가져온다.
  try {
    x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
    y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
  } catch (error) {
    console.error('error: ', error);
  }
  // console.log('x, y: ', x, y);

  //* 이미지의 높이와 너비 가져오기
  let imageWidth = imageContainer.offsetWidth;
  let imageHeight = imageContainer.offsetHeight;

  // console.log('w,h: ', imageWidth, imageHeight);

  /**
   *? 이미지 밖으로 커서가 나갔는지 확인 후
   *? 나갔으면 오버레이를 화면에서 숨긴다.
   */
  if (
    imageWidth - (x - imageContainer.offsetLeft) < 15 ||
    x - imageContainer.offsetLeft < 15 ||
    imageHeight - (y - imageContainer.offsetTop) < 15 ||
    y - imageContainer.offsetTop < 15
  ) {
    hideElement();
  } else {
    overlay.style.display = 'block';
    mouseOverlay.style.display = 'inline-block';
  }

  let posX =
    ((x - imageContainer.offsetLeft) / imageContainer.offsetWidth).toFixed(4) *
    100;
  let posY =
    ((y - imageContainer.offsetTop) / imageContainer.offsetHeight).toFixed(4) *
    100;

  // 오버레이에 그리기
  overlay.style.backgroundPosition = `${posX}% ${posY}%`;

  //* 마우스 오버레이 그리기
  mouseOverlay.style.top = y + 'px';
  mouseOverlay.style.left = x + 'px';
});
