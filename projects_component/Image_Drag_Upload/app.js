const dropZone = document.querySelector('.drop-zone');
const inputElement = document.querySelector('#upload_image');

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drop-zone--over');
});

['dragend', 'dragleave'].forEach((type) => {
  dropZone.addEventListener(type, (e) => {
    e.preventDefault();
    dropZone.classList.remove('drop-zone--over');
  });
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  if (e.dataTransfer.files.length) {
    inputElement.files = e.dataTransfer.files;
    updateThumbnail(dropZone, e.dataTransfer.files[0]);
  }
  dropZone.classList.remove('drop-zone--over');
});

inputElement.addEventListener('change', (e) => {
  console.log(e.target.files);
  updateThumbnail(dropZone, e.target.files[0]);
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZone
 * @param {File} file
 */
function updateThumbnail(dropZone, file) {
  let thumbnailElement = dropZone.querySelector('.drop-zone__thumbnail');

  dropZone.querySelector('.drop-zone__prompt').classList.add('hidden');
  thumbnailElement.classList.remove('hidden');

  // 이미지 이름 설정
  thumbnailElement.dataset.label = file.name;

  const thumbnailUrl = URL.createObjectURL(file);
  thumbnailElement.style.backgroundImage = `url('${thumbnailUrl}')`;
}
