const slider = document.querySelector('#slider'); //? input[type="range"]
const comparisonElement = document.querySelector('#comp-img');

function slide() {
  let slideValue = slider.value;
  //? 슬라이더의 현재 값만큼 보여줄 범위를 설정한다. (좌상, 우상, 우하, 좌하)
  comparisonElement.style.clipPath = `polygon(0 0, ${slideValue}% 0, ${slideValue}% 100%, 0 100%)`;
}

slider.addEventListener('input', slide);
