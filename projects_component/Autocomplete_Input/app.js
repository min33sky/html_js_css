let names = [
  'Ayla',
  'Jake',
  'Sean',
  'Henry',
  'Brad',
  'Stephen',
  'Taylor',
  'Timmy',
  'Cathy',
  'John',
  'Amanda',
  'Amara',
  'Sam',
  'Sandy',
  'Danny',
  'Ellen',
  'Camille',
  'Chloe',
  'Emily',
  'Nadia',
  'Mitchell',
  'Harvey',
  'Lucy',
  'Amy',
  'Glen',
  'Peter',
];

// 오름차순으로 이름을 정렬
let sortedNames = names.sort();

let inputElement = document.querySelector('#input');
let cursor = -1; // 키패드로 가리킬 커서 위치

inputElement.addEventListener('keyup', (e) => {
  //? 뱡향키가 아닐 경우엔 목록 재구성. 방향키일 땐 커서를 이동시킴
  if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    //? 기존 제안 목록을 제거 후 새로운 제안을 출력한다..
    removeElements();
    cursor = -1;

    for (const name of sortedNames) {
      /**
       *? 소문자로 변환 후 일치 여부를 판단
       */
      if (
        inputElement.value !== '' &&
        name.toLowerCase().startsWith(inputElement.value.toLowerCase())
      ) {
        const listItem = document.createElement('li');

        listItem.classList.add('list-items');
        listItem.setAttribute('onclick', `displayNames('${name}')`);

        //? 일치 부분을 볼드처리
        let word =
          '<b>' + name.substring(0, inputElement.value.length) + '</b>';
        word += name.substring(inputElement.value.length);

        listItem.innerHTML = word;
        document.querySelector('.list').appendChild(listItem);
      }
    }
  } else {
    let items = document.querySelectorAll('.list-items');
    let prev = cursor;

    //* 커서 이동
    if (e.key === 'ArrowDown') {
      cursor += 1;
    } else if (e.key === 'ArrowUp') {
      cursor -= 1;
    }

    //* 커서 범위 체크
    if (cursor === items.length) {
      cursor = 0;
    } else if (cursor === -1) {
      cursor = items.length - 1;
    }

    /**
     *? 현재 가리키는 요소에 스타일 추가
     *? 인풋창에 출력
     */
    if (items.length > 0) {
      if (prev >= 0) items[prev].classList.remove('current');
      items[cursor].classList.add('current');
      inputElement.value = items[cursor].textContent;
    }
  }
});

/**
 * 인풋창에 선택한 제안 표시하기
 * @param {*} value
 */
function displayNames(value) {
  inputElement.value = value;
  removeElements();
}

/**
 * 모든 제안 목록 제거
 */
function removeElements() {
  let items = document.querySelectorAll('.list-items');
  items.forEach((item) => item.remove());
}
