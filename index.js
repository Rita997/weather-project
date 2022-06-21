let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let h6 = document.querySelector("h6");
h6.innerHTML = `${date}, ${day}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${searchInput.value}`;
  console.log(searchInput.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function weatherConditionInfo(response) {
  console.log(response);
  let city = document.querySelector("h5");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}
function cities(city) {
  let apiKey = "449d98831278c89f8af4fbd4fabe2bcb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherConditionInfo);
}
function searchCities(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let city = cityInput.value;
  cities(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCities);

function searchLocation(position) {
  let apiKey = "449d98831278c89f8af4fbd4fabe2bcb";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios(apiUrl).then(weatherConditionInfo);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);

cities("london");
