const fileInput = document.querySelector('#file-input');
const dropZone = document.querySelector('.drop-zone');
const imageContainer = document.querySelector('#images');
const numOfFiles = document.querySelector('#num-of-files');

const uploadImages = []; // 업로드할 이미지들의 정보 저장

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag');
});

['dragleave', 'dragend'].forEach((type) => {
  dropZone.addEventListener(type, (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag');
  });
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag');
  handleImages(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
  handleImages(e.target.files);
});

/**
 * 업로드 할 이미지 처리하기
 * @param {File} files
 */
function handleImages(files) {
  //* 파일 개수 표시하기
  numOfFiles.textContent = `${files.length} Files Selected`;

  //* 이미지 썸네일 생성하기
  for (const file of files) {
    uploadImages.push(file);
    const figure = document.createElement('figure');
    const figureCaption = document.createElement('figcaption');
    const image = document.createElement('img');
    const imageUrl = URL.createObjectURL(file);

    image.src = imageUrl;
    figureCaption.textContent = file.name;

    // DOM 장착하기
    figure.appendChild(image);
    figure.appendChild(figureCaption);
    imageContainer.appendChild(figure);

    // 이벤트 장착하기
    figure.addEventListener('click', (e) => {
      removeImage(file, imageUrl);
    });
  }
}

/**
 * 업로드할 이미지 삭제하기
 * @param {File} file 파일 객체
 * @param {string} url 이미지 주소
 */
function removeImage(file, url) {
  const targetIndex = uploadImages.findIndex(
    (image) => image.name === file.name
  );

  URL.revokeObjectURL(url);
  uploadImages.splice(targetIndex, 1);
  imageContainer.removeChild(imageContainer.childNodes[targetIndex]);
}
