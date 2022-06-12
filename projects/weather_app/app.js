// * https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon/62369654#62369654

window.addEventListener('load', () => {
    let long;
    let lat;
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const temperatureIcon = document.querySelector('.location div');

    if (navigator.geolocation) {
        // 위치 정보 동의가 있으면 위치 정보를 가져온다.
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long, lat);

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b86fd8f7708187a762619d1377a88ec7`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const timezone = data.name;
                    const degree = data.main.temp;
                    const { description, icon } = data.weather[0];

                    locationTimezone.textContent = timezone;
                    temperatureDegree.textContent = degree;
                    temperatureDescription.textContent = description;
                    const img = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    temperatureIcon.innerHTML = `<img src="${img}" />`;
                });
        });
    }
});
