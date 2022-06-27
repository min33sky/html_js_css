const result = document.querySelector('.result');
const radios = document.querySelectorAll('[type="radio"]');

[...radios].forEach((item) => {
  item.addEventListener('change', (e) => {
    if (e.target.checked) {
      const player = e.target.dataset.player;
      result.textContent = player;
    }
  });
});
