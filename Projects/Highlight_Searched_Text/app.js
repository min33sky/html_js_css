const searchBtn = document.querySelector('#search-btn');
const textToSearchElement = document.querySelector('#text-to-search');

function search() {
  let textToSearch = textToSearchElement.value;
  let paragraph = document.querySelector('#paragraph');

  //? [.*+?^${}()|[\]\\] -> Escape 문자로 변경해서 정규표현식 치환 조건에서 제외시킴
  textToSearch = textToSearch.replace(/[.*+?$^{}()|[\]\\]/g, '\\$&');

  let pattern = new RegExp(`${textToSearch}`, 'gi');

  paragraph.innerHTML = paragraph.textContent.replace(
    pattern,
    (match) => `<mark>${match}</mark>`
  );
}

textToSearchElement.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    search();
  }
});
searchBtn.addEventListener('click', search);
