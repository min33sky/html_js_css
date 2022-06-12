const testimonials = document.querySelector('.testimonials');
const scroller = testimonials.querySelector('.scroller');
const nextBtn = testimonials.querySelector('.btn.next');
const prevBtn = testimonials.querySelector('.btn.prev');
const itemWidth = testimonials.querySelector('.item').clientWidth;

nextBtn.addEventListener('click', scrollToNextItem);
prevBtn.addEventListener('click', scrollToPrevItem);

function scrollToNextItem() {
  //
  if (scroller.scrollLeft < scroller.scrollWidth - itemWidth) {
    scroller.scrollBy({ left: itemWidth, top: 0, behavior: 'smooth' });
  } else {
    scroller.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }
}

function scrollToPrevItem() {
  if (scroller.scrollLeft !== 0) {
    scroller.scrollBy({ left: -itemWidth, top: 0, behavior: 'smooth' });
  } else {
    scroller.scrollTo({ left: scroller.scrollWidth, top: 0, behavior: 'smooth' });
  }
}

console.log('script loaded...');
