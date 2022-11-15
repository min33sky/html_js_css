const carousel = document.querySelector('.carousel');
const arrowIcons = document.querySelectorAll('.wrapper i');
const firstImg = carousel.querySelectorAll('img')[0];

let isDragStart = false;
let isDragging = false;
let prevPageX = 0;
let prevScrollLeft = 0;
let positionDiff = 0;

function showHideIcons() {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //? 최대 스크롤 너비
  arrowIcons[0].style.display = carousel.scrollLeft > 0 ? 'block' : 'none';
  arrowIcons[1].style.display =
    carousel.scrollLeft < scrollWidth ? 'block' : 'none';
}

arrowIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    let firstImgWidth = firstImg.clientWidth + 14; //? 이미지 너비 + margin
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

function autoSlide() {
  // if there is no image left to scroll then return from here
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14; //? 이미지 너비 + margin (14px)

  let valDifference = firstImgWidth - positionDiff;

  let skip = 0;

  if (valDifference < 0) {
    let absVal = Math.abs(valDifference);
    let quotient = Math.floor(absVal / firstImgWidth) + 1;
    skip = firstImgWidth * quotient;
  }

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
