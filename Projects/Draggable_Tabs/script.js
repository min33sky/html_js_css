const tabsBox = document.querySelector('.tabs-box');
const allTabs = document.querySelectorAll('.tab');
const arrowIcons = document.querySelectorAll('.icon i');

let isDragging = false;

function handleIcons() {
  let scrollVal = Math.round(tabsBox.scrollLeft); //? 약간의 오차가 있어서 반올림
  let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;

  arrowIcons[0].parentElement.style.display = scrollVal > 0 ? 'flex' : 'none';
  arrowIcons[1].parentElement.style.display =
    scrollVal < maxScrollableWidth ? 'flex' : 'none';
}

arrowIcons.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    console.log(e.target.id);
    tabsBox.scrollLeft += e.target.id === 'left' ? -350 : 350;
    setTimeout(handleIcons, 50);
  });
});

allTabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    tabsBox.querySelector('.active').classList.remove('active');
    tab.classList.add('active');
  });
});

/**
 *
 * @param {MouseEvent} e
 */
function dragging(e) {
  if (!isDragging) return;
  tabsBox.classList.add('dragging');
  tabsBox.scrollLeft -= e.movementX;
  handleIcons();
}

/**
 *
 * @param {MouseEvent} e
 */
function dragStop(e) {
  isDragging = false;
  tabsBox.classList.remove('dragging');
}

tabsBox.addEventListener('mousedown', () => (isDragging = true));
tabsBox.addEventListener('mousemove', dragging);
tabsBox.addEventListener('mouseup', dragStop);
tabsBox.addEventListener('mouseleave', dragStop);
