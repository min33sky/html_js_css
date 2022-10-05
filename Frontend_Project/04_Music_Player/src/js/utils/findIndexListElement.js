/**
 * 리스트안에서 엘리먼트의 인덱스 번호를 찾는 함수
 * @param {*} element
 * @returns {number} 인덱스 번호
 */
export default function findIndexListElement(element) {
  //? element가 속한 listItem들을 모두 가져온다.
  //? parentElement는 li의 부모 속성 태그인 ul이나 ol등을 가리킨다.
  const listItmes = element.parentElement.querySelectorAll('li');
  const currentIndex = [...listItmes].findIndex((item) => item === element);
  return currentIndex;
}
