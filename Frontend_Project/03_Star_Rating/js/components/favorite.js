export default class Favorite {
  constructor() {
    //? 버튼에 이벤트를 걸지않고 버튼의 부모에 이벤트를 거는 이벤트 위임방식을 사용한다.
    this.favoriteElement = document.querySelector('.content-favorite');
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.favoriteElement.addEventListener('click', (event) => {
      const cPath = event.composedPath();

      const element = cPath.find((element) => element.tagName === 'BUTTON');

      if (!element) return;

      element.classList.toggle('active');
    });
  }
}
