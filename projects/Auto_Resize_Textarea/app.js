const myText = document.querySelector('#my-text');

//? Textarea의 높이를 스크롤 영역의 높이와 동일하게 설정
myText.style.cssText = `height: ${myText.scrollHeight}px; overflow-y: hidden`;

//? input 이벤트가 발생할 때마다 Textarea 높이를 재설정한다.
myText.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = `${this.scrollHeight}px`;
});
