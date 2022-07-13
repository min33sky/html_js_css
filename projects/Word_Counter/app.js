const inputTextarea = document.querySelector('#input-textarea');
const charcCount = document.querySelector('#charc-count');
const wordCount = document.querySelector('#word-count');

inputTextarea.addEventListener('input', () => {
  // 문자 수 표시하기
  charcCount.textContent = inputTextarea.value.length;
  // 단어 수 표시하기
  const text = inputTextarea.value.trim();
  //? 공백문자 기준으로 나눈 후 단어 개수를 파악 😀
  wordCount.textContent = text.split(/\s+/).filter((item) => !!item).length;
});
