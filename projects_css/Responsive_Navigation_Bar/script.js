const hamburgerMenuIcon = document.querySelector('#ham-menu');
const navBar = document.querySelector('#nav-bar');
const navLinks = navBar.querySelectorAll('li');

hamburgerMenuIcon.addEventListener('click', () => {
  navBar.classList.toggle('active');
  hamburgerMenuIcon.classList.toggle('fa-times');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navBar.classList.remove('active');
    hamburgerMenuIcon.classList.toggle('fa-times');
  });
});
