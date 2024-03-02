function onGeoOk(position) {  
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=kr&appid=${WEATHER_APIKEY}&units=metric`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const todayWeather = document.querySelector(".today-weather");
      const city_name = data.name;
      const weather_main = data.weather[0].description;
      const city_main_temp = Math.ceil(data.main.temp);
      todayWeather.innerText = `${city_name} / ${city_main_temp}℃ / ${weather_main}`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}