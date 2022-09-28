import { findIndexListElement, getClosestElement } from '../../utils/index.js';

export default class TabButtons {
  constructor() {
    this.renderElement = this.createRenderElement();
    this.bindEvents();
  }

  createRenderElement() {
    const tabContainer = document.createElement('ul');
    tabContainer.classList.add('app-controller');
    const tabs = [
      {
        title: 'Top5',
        iconName: 'icon-top5',
      },
      {
        title: 'Playlist',
        iconName: 'icon-playlist',
      },
      {
        title: 'Search',
        iconName: 'icon-search',
      },
    ];

    tabContainer.innerHTML = tabs
      .map(
        (tab) =>
          `
      <li>
        <button type="button" class="button-app-controller">
          <i class="tab-icon ${tab.iconName}"></i>
          ${tab.title}
        </button>
      </li>
      `,
      )
      .join('');

    return tabContainer;
  }

  bindEvents() {
    this.renderElement.addEventListener('click', (event) => {
      const element = getClosestElement(event.target, 'li'); //? 이벤트 위임을 위해 가장 가까운 li를 찾는다.
      const currentIndex = findIndexListElement(element); //? li의 인덱스 번호를 찾는다.
      this.emit('clickTab', { currentIndex }); //? 선택된 탭의 이벤트를 발생시킨다.
    });
  }

  /**
   * 이벤트를 등록하는 메서드
   * @param {*} eventName
   * @param {*} callback
   */
  on(eventName, callback) {
    console.log('시ㅣ발');
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  /**
   * App component와 이벤트를 발생시키는 메서드
   * @param {*} eventName
   * @param {*} payload
   */
  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }

  render() {
    return this.renderElement;
  }
}
