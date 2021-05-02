const weather = document.querySelector(".weather");
const weatherTemp = weather.querySelector(".temperature");
const weatherPlace = weather.querySelector(".place");
const weatherNow = weather.querySelector(".nowWeather");

const API_KEY = "aa7fa39ae5f67ec2fe730259d255a76d";
const COORDS = "coords";

// function getWeather(lat, lon) {
//   fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (json) {
//       const temperature = json.main.temp;
//       const place = json.name;
//       const country = json.sys.country;
//       const nowWeather = json.weather[0].main;
//       weatherPlace.innerText = `${place}, ${country}`;
//       weatherTemp.innerText = `${temperature}℃`;
//       weatherNow.innerText = nowWeather;
//     });
// }

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const weather_description = json.weather[0].description;
      const place = json.name;
      weatherPlace.innerText = `You are in ${place}!
                          ${temperature}℃ 
                          ${weather_description}!`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
