const imageSlide = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

const slideLength = imageSlide.length;

prevBtn.addEventListener('click', () => {
    const activeIndex = [...imageSlide].findIndex(v => v.className === 'active');
    imageSlide[activeIndex].classList.remove('active');
    if (activeIndex === 0) {
        imageSlide[slideLength - 1].classList.add('active');
    } else {
        imageSlide[activeIndex - 1].classList.add('active');
    }
});

nextBtn.addEventListener('click', e => {
    const activeIndex = [...imageSlide].findIndex(v => v.className === 'active');
    imageSlide[activeIndex].classList.remove('active');
    if (activeIndex + 1 >= slideLength) {
        imageSlide[0].classList.add('active');
    } else {
        imageSlide[activeIndex + 1].classList.add('active');
    }
});
