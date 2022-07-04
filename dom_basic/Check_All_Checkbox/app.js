const checkboxElements = document.querySelectorAll('input[type="checkbox"]');

checkboxElements.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => handleCheck(e));
});

function handleCheck(e) {
  const current = e.target;
  const childs = [...checkboxElements].slice(1);

  if (current.id === 'all') {
    if (current.checked === true) {
      allCheck(true);
    } else {
      allCheck(false);
    }
  } else {
    const isAllChecked = childs.every((item) => item.checked);

    //? 모두 체크되었을 때 Select All 체크박스에 체크하기
    if (isAllChecked) {
      checkboxElements[0].checked = true;
    } else {
      checkboxElements[0].checked = false;
    }
  }
}

/**
 * 전체 선택 체크박스 핸들러
 * @param {boolean} isAllChecked
 */
function allCheck(isAllChecked) {
  if (isAllChecked) {
    checkboxElements.forEach((checkbox) => {
      checkbox.checked = true;
    });
  } else {
    checkboxElements.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
}
