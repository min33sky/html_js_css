const init = (() => {
  const carouselUl = document.querySelector('.carousel-list');
  const imageInput = document.querySelector('#image-upload-input');
  const prevButton = document.querySelector('.prev-btn');
  const nextButton = document.querySelector('.next-btn');

  return () => {
    function changeTransform() {
      const items = document.querySelectorAll('.carousel-item');

      items.forEach((item, idx) => {
        let degree = 360 / items.length;

        if (items.length > 1) {
          if (idx === 0) {
            item.style.transform = `rotateY(0deg) translateZ(250px)`;
          } else {
            item.style.transform = `rotateY(${
              degree * idx
            }deg) translateZ(250px) rotateY(-${degree * idx}deg)`;
          }
        }

        if (items.length >= 5) {
          if (idx === 0) {
            item.style.transform = `rotateY(0deg) translateZ(250px)`;
          } else if (idx === 1) {
            item.style.transform = `rotateY(${72}deg) translateZ(250px) rotateY(-${72}deg)`;
          } else if (idx === 2) {
            item.style.transform = `rotateY(${144}deg) translateZ(250px) rotateY(-${144}deg) translateX(400px)`;
          } else if (idx === items.length - 2) {
            item.style.transform = `rotateY(${216}deg) translateZ(250px) rotateY(-${216}deg) translateX(-400px)`;
          } else if (idx === items.length - 1) {
            item.style.transform = `rotateY(${288}deg) translateZ(250px) rotateY(-${288}deg)`;
          } else {
            item.style.transform = `rotateY(${
              degree * idx
            }deg) translateZ(250px) rotateY(-${degree * idx}deg)`;
          }
        }
      });
    }

    function moveNext() {
      const items = document.querySelectorAll('.carousel-item');

      if (items.length > 1) {
        const currentItem = document.querySelector('.carousel-item.active');
        const nextItem = currentItem.nextElementSibling;
        carouselUl.appendChild(currentItem);
        currentItem.classList.remove('active');
        nextItem.classList.add('active');
      }

      changeTransform();
    }

    function movePrev() {
      const items = document.querySelectorAll('.carousel-item');

      if (items.length > 1) {
        const currentItem = document.querySelector('.carousel-item.active');
        const lastItme = carouselUl.lastElementChild;

        carouselUl.insertBefore(lastItme, items[0]);
        currentItem.classList.remove('active');
        lastItme.classList.add('active');
      }

      changeTransform();
    }

    function createTag(imageUrl) {
      const li = document.createElement('li');
      const img = document.createElement('img');

      li.classList.add('carousel-item');
      img.src = imageUrl;

      li.appendChild(img);

      // class 처리
      const items = document.querySelectorAll('.carousel-item');
      items.forEach((item) => {
        item.classList.remove('active');
      });
      li.classList.add('active');

      return li;
    }

    function uploadImage(e) {
      const itmes = document.querySelectorAll('.carousel-item');
      const file = e.target.files[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        carouselUl.insertBefore(createTag(imageUrl), itmes[0]);
      }

      changeTransform();
    }

    prevButton.addEventListener('click', movePrev);
    nextButton.addEventListener('click', moveNext);
    imageInput.addEventListener('change', uploadImage);
    window.onload = () => {
      changeTransform();
    };
  };
})();

init();
