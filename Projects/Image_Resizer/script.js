const uploadBox = document.querySelector('.upload-box'),
  previewImg = uploadBox.querySelector('img'),
  fileInput = uploadBox.querySelector('input'),
  widthInput = document.querySelector('.width input'),
  heightInput = document.querySelector('.height input'),
  ratioInput = document.querySelector('.ratio input'),
  qualityInput = document.querySelector('.quality input'),
  downloadBtn = document.querySelector('.download-btn');

let ogImageRatio;

function loadImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener('load', () => {
    widthInput.value = previewImg.naturalWidth; // original image width
    heightInput.value = previewImg.naturalHeight; // original image height
    ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    document.querySelector('.wrapper').classList.add('active');
    console.log('ogImageRatio', ogImageRatio);
  });
}

widthInput.addEventListener('keyup', () => {
  // getting height according to the radio checkbox status
  const height = ratioInput.checked
    ? widthInput.value / ogImageRatio
    : heightInput.value;
  heightInput.value = Math.floor(height);
});

heightInput.addEventListener('keyup', () => {
  // getting width according to the radio checkbox status
  const width = ratioInput.checked
    ? heightInput.value * ogImageRatio
    : widthInput.value;
  widthInput.value = Math.floor(width);
});

function resizeAndDownload() {
  const canvas = document.createElement('canvas');
  const a = document.createElement('a');
  const ctx = canvas.getContext('2d');

  // if quality checkbox is checked, pass 0.5 to imgQuality else pass 1.0
  // 1.0 is 100% quality where 0.5 is 50% of total. you can pass from 0.1 - 1.0
  const imgQuality = qualityInput.checked ? 0.5 : 1.0;

  // setting canvas height & width according to the input values
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  // drawing user selected image onto the canvas
  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  // passing canvas data url as href value of <a> element
  a.href = canvas.toDataURL('image/jpeg', imgQuality);
  a.download = new Date().getTime();
  a.click();
}

fileInput.addEventListener('change', loadImage);
uploadBox.addEventListener('click', () => fileInput.click());
downloadBtn.addEventListener('click', resizeAndDownload);
