const buttons = document.querySelectorAll('input[type="radio"]');
const result = document.querySelector('.result span');

function checkSelectedButton() {
  const value =
    document.querySelector('input[name="fruits"]:checked')?.value ||
    '__________';
  result.textContent = value;
}

buttons.forEach((button) => {
  button.addEventListener('click', checkSelectedButton);
});

checkSelectedButton();
