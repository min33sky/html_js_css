const button_input = document.querySelectorAll('.input-button');

const display_input = document.querySelector('#input');
const equal_button = document.querySelector('#equal');
const clear_button = document.querySelector('#clear');
const erase_button = document.querySelector('#erase');

window.onload = () => {
  display_input.value = '';
};

button_input.forEach((button) => {
  button.addEventListener('click', () => {
    display_input.value += button.value;
  });
});

equal_button.addEventListener('click', () => {
  let input_value = display_input.value;
  try {
    let evaluate = eval(input_value);

    if (Number.isInteger(evaluate)) {
      display_input.value = evaluate;
    } else {
      display_input.value = evaluate.toFixed(2);
    }
  } catch (error) {
    alert('Invalid Input');
  }
});

clear_button.addEventListener('click', () => {
  display_input.value = '';
});

erase_button.addEventListener('click', () => {
  display_input.value = display_input.value.substr(
    0,
    display_input.value.length - 1
  );
});
