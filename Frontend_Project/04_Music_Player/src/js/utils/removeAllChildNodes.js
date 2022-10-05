/**
 * 부모 노드의 자식 노드를 모두 제거하는 함수
 * @param {*} parentElement 부모 노드
 */
export default function removeAllChildNodes(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}
