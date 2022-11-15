const carousel = document.querySelector('.carousel');
const arrowIcons = document.querySelectorAll('.wrapper i');
const firstImg = carousel.querySelectorAll('img')[0];

let isDragStart = false;
let isDragging = false;
let prevPageX = 0;
let prevScrollLeft = 0;
let positionDiff = 0;

/**
 * 화살표 아이콘 보이기/숨기기
 */
function showHideIcons() {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //? 최대 스크롤 너비
  arrowIcons[0].style.display = carousel.scrollLeft > 0 ? 'block' : 'none';
  arrowIcons[1].style.display =
    carousel.scrollLeft < scrollWidth ? 'block' : 'none';
}

arrowIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    let firstImgWidth = firstImg.clientWidth + 14; //? 이미지 너비 + margin (14px)
    carousel.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

/**
 * 드래그 시작 이벤트 핸들러
 * @param {MouseEvent | TouchEvent} e
 */
function dragStart(e) {
  // updating global variables value on mousedown event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX; //? 이전 마우스 커서 위치
  prevScrollLeft = carousel.scrollLeft; //? 이전 캐러셀 스크롤 위치
}

/**
 * 드래그 이벤트 핸들러
 * @param {MouseEvent | TouchEvent} e
 */
function dragging(e) {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add('dragging');

  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX; //? 현재 마우스 커서 위치 - 이전 마우스 커서 위치
  carousel.scrollLeft = prevScrollLeft - positionDiff; //? 현재 캐러셀 스크롤 위치 = 이전 캐러셀 스크롤 위치 - 현재 마우스 커서 위치 - 이전 마우스 커서 위치
  showHideIcons();
}

/**
 * 드래그 종료 이벤트 핸들러
 */
function dragStop() {
  isDragStart = false;
  carousel.classList.remove('dragging');
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
}

/**
 * 슬라이드 자동으로 넘기기
 */
function autoSlide() {
  //? 스크롤 할 이미지가 없을 경우 (가장 끝 부분)이면 함수 종료
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;

  //? 이동 거리 체크를 위해 절대값으로 변환
  positionDiff = Math.abs(positionDiff);

  let firstImgWidth = firstImg.clientWidth + 14; //? 이미지 너비 + margin (14px)

  //? 현재 슬라이드의 남은 거리 체크
  let valDifference = firstImgWidth - positionDiff;

  let skip = 0; //? 넘겨야 할 슬라이드 수

  //? 슬라이드 하나의 범위를 넘겼을 경우 음수가 리턴되고
  //? Skip 값을 슬라이드 하나당 1씩 증가시켜야 한다.
  if (valDifference < 0) {
    let absVal = Math.abs(valDifference);
    let quotient = Math.floor(absVal / firstImgWidth) + 1;
    skip = firstImgWidth * quotient;
  }

  //? 슬라이드 영역의 33%를 넘겼을 경우 슬라이드를 넘긴다.
  if (carousel.scrollLeft > prevScrollLeft) {
    carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? skip + valDifference : -positionDiff;
  } else {
    carousel.scrollLeft -=
      positionDiff > firstImgWidth / 3 ? skip + valDifference : -positionDiff;
  }
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);
carousel.addEventListener('touchend', dragStop);
