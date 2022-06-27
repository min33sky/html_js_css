const ourElem = document.querySelector('#our-elem');
const message = document.querySelector('#message');

document.addEventListener('click', (e) => {
  console.log(e.target);
  if (ourElem.contains(e.target)) {
    message.innerHTML = `Click Is <span>Inside</span> The Element`;
    return;
  }
  message.innerHTML = `Click is <span>Outside</span> The Element`;
});
