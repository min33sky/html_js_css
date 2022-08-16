const draggableElem = document.getElementById('draggable-elem');
let initialX = 0;
let initialY = 0;
let moveElement = false;

//Events Object
const events = {
  mouse: {
    down: 'mousedown',
    move: 'mousemove',
    up: 'mouseup',
  },
  touch: {
    down: 'touchstart',
    move: 'touchmove',
    up: 'touchend',
  },
};

let deviceType = '';

//* Detect touch device
function isTouchDevice() {
  try {
    //We try to create TouchEvent (it would fail for desktops and throw error)
    document.createEvent('TouchEvent');
    deviceType = 'touch';
    return true;
  } catch (error) {
    deviceType = 'mouse';
    return false;
  }
}

isTouchDevice();

//* Start (mouse down / touch start)
draggableElem.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();
  // initial x and y points
  initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

  console.log(initialX, initialY);

  // Start movement
  moveElement = true;
});

draggableElem.addEventListener(events[deviceType].move, (e) => {
  //if movement == true then set top and left to new X and Y while removing any offset
  if (moveElement) {
    e.preventDefault();
    let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

    draggableElem.style.top =
      draggableElem.offsetTop - (initialY - newY) + 'px';
    draggableElem.style.left =
      draggableElem.offsetLeft - (initialX - newX) + 'px';
    initialX = newX;
    initialY = newY;
  }
});

//mouse up / touch end
draggableElem.addEventListener(
  events[deviceType].up,
  (stopMovement = (e) => {
    moveElement = false;
  })
);

draggableElem.addEventListener('mouseleave', stopMovement);
