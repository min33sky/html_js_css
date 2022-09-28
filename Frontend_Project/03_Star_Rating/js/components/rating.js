//? hover 상태에 따라 보여줄 별 이미지
const starImageSourceMap = {
  empty: 'assets/icon_empty_star.png',
  half: 'assets/icon_half_star.png',
  full: 'assets/icon_full_star.png',
};

export default class Rating {
  constructor() {
    this.starContentElement = document.querySelector('.content-star');
    this.starBackgroundElement =
      this.starContentElement.querySelector('.star-background');
    this.starImages = this.starBackgroundElement.querySelectorAll('img');
    this.starPointResetButton =
      this.starContentElement.querySelector('.icon-remove-star');
    this.lockedStarPoint = false; //? 별점을 고정한 상태인지 알려주는 상태값
  }

  init() {
    this.bindEvents();
  }

  lockStarPoint() {
    this.lockedStarPoint = true;
  }

  unlockStarPoint() {
    this.lockedStarPoint = false;
  }

  isLockedStarPoint() {
    return this.lockedStarPoint;
  }

  bindEvents() {
    this.starBackgroundElement.addEventListener('mousemove', (event) => {
      //* 별점을 고정한 상태라면 이벤트를 실행하지 않는다.
      if (this.isLockedStarPoint()) return;

      //* offsetX: target의 마우스 포인터의 X축 위치를 반환한다.
      const { target, offsetX: currentUserPoint } = event;
      const { point } = target.dataset;
      const starPointIndex = parseInt(point, 10) - 1; //? index는 0부터 시작하기 때문에 -1을 해준다.
      //* getClientRects(): target의 좌표와 크기를 반환한다.
      const [starImageClientRect] = target.getClientRects();
      const starImageWidth = starImageClientRect.width;
      const isOverHalf = currentUserPoint > starImageWidth / 2;
      this.renderStarPointImages(starPointIndex, isOverHalf);
    });

    this.starBackgroundElement.addEventListener('click', (evnet) => {
      this.lockStarPoint();
    });

    this.starPointResetButton.addEventListener('click', (event) => {
      this.unlockStarPoint();
      this.resetStartPointImages();
    });

    this.starBackgroundElement.addEventListener('mouseleave', (event) => {
      !this.isLockedStarPoint() && this.resetStartPointImages();
    });
  }

  /**
   * 별점 이미지를 렌더링한다.
   * @param {number} drawableLimitIndex 별이 그려질 마지막 인덱스
   * @param {boolean} isOverHalf 마우스가 별의 절반을 넘어갔는지 여부
   */
  renderStarPointImages(drawableLimitIndex = -1, isOverHalf = false) {
    console.log(drawableLimitIndex, isOverHalf);
    this.starImages.forEach((starImage, index) => {
      let imageSource =
        index < drawableLimitIndex
          ? starImageSourceMap.full
          : starImageSourceMap.empty;

      if (index === drawableLimitIndex) {
        imageSource = isOverHalf
          ? starImageSourceMap.full
          : starImageSourceMap.half;
      }

      starImage.src = imageSource;
    });
  }

  resetStartPointImages() {
    this.renderStarPointImages();
  }
}
