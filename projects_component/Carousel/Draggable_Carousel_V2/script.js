console.log('Loaded');

const wrapper = document.querySelector('.wrapper');
const carousel = document.querySelector('.carousel');
const firstCardWidth = carousel.querySelector('.card').offsetWidth;
const arrowBtns = document.querySelectorAll('.wrapper i');
const carouselChildrens = [...carousel.children];

console.log(
  `%c firstCardWidth: ${firstCardWidth}`,
  'background: #222; color: #bada55; font-size: 16px',
);
console.log(carouselChildrens);

let isDragging = false;
let isAutoPlay = true;
let startX = 0;
let startScrollLeft = 0;
let timeoutId = 0;

// 캐러셀에 한 번에 들어갈 수 있는 카드 수를 가져옵니다.
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

//  무한 스크롤링을 위해 마지막 몇 장의 카드를 캐러셀의 시작 부분에 복사합니다.
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    console.log('card', card);
    console.log('card outerHTML', card.outerHTML);
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
  });

// 무한 스크롤링을 위해 캐러셀의 마지막 부분에 처음 몇 장의 카드를 복사합니다.
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

//  파이어폭스에서 처음 몇 장의 중복 카드를 숨기기 위해 적절한 위치에 캐러셀을 스크롤합니다.
carousel.classList.add('no-transition');
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove('no-transition');

// 화살표 버튼에 이벤트 리스너를 추가하여 캐러셀을 왼쪽과 오른쪽으로 스크롤합니다.
arrowBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    carousel.scrollLeft += btn.id == 'left' ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add('dragging');
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove('dragging');
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add('no-transition');
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove('no-transition');
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add('no-transition');
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove('no-transition');
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(':hover')) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
carousel.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
wrapper.addEventListener('mouseleave', autoPlay);
