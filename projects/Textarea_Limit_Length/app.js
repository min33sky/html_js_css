const textarea = document.querySelector('textarea');
const result = document.querySelector('.char-length');
const button = document.querySelector('button');
const LIMIT = 60;

textarea.addEventListener('input', () => {
  const textLength = textarea.value.length;
  result.textContent = `${textLength} / ${LIMIT}`;

  if (textLength > LIMIT) {
    textarea.classList.add('warn');
    result.classList.add('warn');
    button.disabled = true;
  } else {
    textarea.classList.remove('warn');
    result.classList.remove('warn');
    button.disabled = false;
  }
});
