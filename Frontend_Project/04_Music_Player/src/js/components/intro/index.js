export default class Intro {
  constructor() {
    this.parentElement = document.querySelector('body');
    // this.renderElement = Intro.createRenderElement();
    this.renderElement = this.createRenderElement();
  }

  createRenderElement() {
    const introContainer = document.createElement('div');
    introContainer.classList.add('intro-container');
    const introImage = document.createElement('img');
    introImage.src = 'assets/images/Logo.png';

    introContainer.appendChild(introImage);
    return introContainer;
  }

  show() {
    this.parentElement.appendChild(this.renderElement);
  }

  hide() {
    this.renderElement.style.opacity = 0;
    // fade out 효과를 주기 위해 1초뒤에 DOM을 제거한다.
    setTimeout(() => {
      this.parentElement.removeChild(this.renderElement);
    }, 1000);
  }
}
