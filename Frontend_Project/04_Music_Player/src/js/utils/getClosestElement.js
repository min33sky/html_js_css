/**
 * 주어진 selector를 만족하는 가장 가까운 요소를 찾는 함수
 * @description Get the closest element that matches the selector
 * @param {*} element
 * @param {string} selector class or tagName
 */
export default function getClosestElement(element, selector) {
  let evaluate = false;

  if (/^\./.test(selector)) {
    //? selector가 class인 경우 element가 해당 class를 포함하는지 확인
    evaluate = element.classList.contains(selector);
  } else {
    //? tagName은 대문자이다.
    evaluate = element.tagName === selector.toUpperCase();
  }

  if (evaluate) {
    return element;
  }

  return getClosestElement(element.parentElement, selector);
}
