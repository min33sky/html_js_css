/**
 * create a placeholder canvas with the given width and height
 * @param {number} width
 * @param {number} height
 * @returns {HTMLCanvasElement}
 */
function createPlaceholderCanvas(width, height) {
  const element = document.createElement('canvas');
  const context = element.getContext('2d');

  element.width = width;
  element.height = height;

  // Fill in the background
  context.fillStyle = '#ddd';
  context.fillRect(0, 0, element.width, element.height);

  // Place the text
  context.font = 'bold 30px sans-serif';
  context.fillStyle = '#333';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(`${width} x ${height}`, width / 2, height / 2);

  return element;
}

document.body.appendChild(createPlaceholderCanvas(300, 200));

console.log('Loaded...');
