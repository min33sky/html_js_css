console.log('hi:)');

const menuItems = document.querySelectorAll('nav.header__nav > ul > li');
const checkbox = document.querySelector('.header__menu-btn');

[...menuItems].forEach((item) => {
  item.addEventListener('click', (e) => {
    checkbox.checked = false;
  });
});
