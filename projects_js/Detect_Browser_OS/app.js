const browserDetailElement = document.querySelector('#browser-details');
const osDetailElement = document.querySelector('#os-details');

const browserList = [
  { name: 'Firefox', value: 'Firefox' },
  { name: 'Opera', value: 'OPR' },
  { name: 'Edge', value: 'Edg' },
  { name: 'Chrome', value: 'Chrome' },
  { name: 'Safari', value: 'Safari' },
];
const os = [
  { name: 'Android', value: 'Android' },
  { name: 'iPhone', value: 'iPhone' },
  { name: 'iPad', value: 'Mac' },
  { name: 'Macintosh', value: 'Mac' },
  { name: 'Linux', value: 'Linux' },
  { name: 'Windows', value: 'Win' },
];

function browserChecker() {
  const userDetails = navigator.userAgent;
  console.log(userDetails);
  for (let i in browserList) {
    //check if the string contains any value from the array
    if (userDetails.includes(browserList[i].value)) {
      //extract browser name and version from the string
      browserDetailElement.innerHTML = browserList[i].name || 'Unknown Browser';
      break;
    }
  }
  for (let i in os) {
    //check if string contains any value from the object
    if (userDetails.includes(os[i].value)) {
      //displau name of OS from the object
      osDetailElement.innerHTML = os[i].name;
      break;
    }
  }
}

window.onload = browserChecker;
