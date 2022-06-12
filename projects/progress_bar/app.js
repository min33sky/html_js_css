const progressBar = document.querySelector('#progress-bar');
const section = document.querySelector('section');

const animateProgressBar = () => {
  /**
   * ? Element.getBoundingClientRect()
   * 엘리먼트의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 객체 반환
   */
  let scrollDistance = -section.getBoundingClientRect().top;
  let progressWidth =
    (scrollDistance /
      (section.getBoundingClientRect().height - document.documentElement.clientHeight)) *
    100;
  console.log(section.getBoundingClientRect());
  let value = Math.floor(progressWidth);
  progressBar.style.width = value + '%';

  if (value < 0) {
    progressBar.style.width = '0%';
  }
};

window.addEventListener('scroll', animateProgressBar);
