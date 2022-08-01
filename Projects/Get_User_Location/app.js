const locationButton = document.querySelector('#get-location');
const locationElement = document.querySelector('#location-details');

/**
 * 위치 정보를 얻는데 성공했을 때 호출되는 콜백
 */
async function showLocation(position) {
  //We user the **Nominatim API** for getting actual addres from latitude and longitude
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );
  //store response object
  let data = await response.json();
  locationElement.textContent = `${data.address.city}, ${data.address.country}`;
}

/**
 * 에러 콜백
 */
function checkError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationElement.textContent = 'Please allow access to location';
      break;
    case error.POSITION_UNAVAILABLE:
      locationElement.textContent = 'Location Information unavailable';
      break;
    case error.TIMEOUT:
      locationElement.textContent =
        'The request to get user location timed out';
      break;
  }
}

locationButton.addEventListener('click', () => {
  /**
   *? Geolocation APU is used to get geographical position of a user
   *? and is available inside the navigator object
   */
  if (navigator.geolocation) {
    //returns position(latitude and longitude) or error
    return navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    //For old browser i.e IE
    locationElement.textContent = 'The browser does not support geolocation';
  }
});
