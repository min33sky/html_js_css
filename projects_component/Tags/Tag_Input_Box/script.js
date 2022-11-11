const ul = document.querySelector('ul');
const input = document.querySelector('input');
const tagNum = document.querySelector('.details span');
const removeBtn = document.querySelector('.details button');

let maxTags = 10;
let tags = [];

function countTags() {
  input.focus();
  tagNum.innerText = maxTags - tags.length;
}

function remove(element, tag) {
  let index = tags.indexOf(tag);
  tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  element.parentElement.remove();
  countTags();
}

function createTag() {
  ul.querySelectorAll('li').forEach((li) => li.remove());
  console.log('ul', ul);
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
      ul.insertAdjacentHTML('afterbegin', liTag);
    });
  countTags();
}

function addTag(e) {
  if (e.key === 'Enter') {
    if (tags.length >= maxTags) return;
    const tag = e.target.value.replace(/\s+/g, ''); //? remove extra spaces
    // 중복 제외 & 두 자리 이상 입력
    if (tag.length > 1 && !tags.includes(tag)) {
      tag.split(',').forEach((tag) => {
        tags.push(tag);
        createTag();
      });
    }
    e.target.value = '';
  }
}

input.addEventListener('keyup', addTag);

removeBtn.addEventListener('click', () => {
  tags.length = 0;
  ul.querySelectorAll('li').forEach((li) => li.remove());
  countTags();
});
