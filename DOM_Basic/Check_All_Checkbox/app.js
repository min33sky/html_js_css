const checkboxElements = document.querySelectorAll('input[type="checkbox"]');
const formElement = document.querySelector('form');

/**
 * 체크박스 클릭 이벤트 핸들러
 * @param {*} e 이벤트 객체
 */
function handleCheck(e) {
  const current = e.target;
  if (current.id === 'all') return allCheck(current.checked ? true : false);

  //? 'Select All' 제외한 모든 체크박스들을 가져온다.
  const childs = [...checkboxElements].slice(1);
  //? 자식 체크박스를 클릭 시 모든 자식 체크박스가 클릭되었는지 확인해야 한다.
  const isAllChecked = childs.every((item) => item.checked);
  //? 모두 체크되었을 때 Select All 체크박스에 체크하기
  checkboxElements[0].checked = isAllChecked ? true : false;
}

/**
 *## 전체 선택 체크박스 핸들러
 * @param {boolean} isAllChecked
 */
function allCheck(isAllChecked) {
  checkboxElements.forEach((checkbox) => {
    checkbox.checked = isAllChecked ? true : false;
  });
}

/**
 *## Form Sumbit Handler
 * @param {*} e
 */
function submitHandler(e) {
  e.preventDefault();
  const result = [];
  [...checkboxElements].slice(1).forEach((checkbox) => {
    if (checkbox.checked) {
      result.push(checkbox.value);
    }
  });
  console.log('체크 된 옵션: ', result);
}

checkboxElements.forEach((checkbox) => {
  checkbox.addEventListener('click', handleCheck);
});

formElement.addEventListener('submit', submitHandler);
