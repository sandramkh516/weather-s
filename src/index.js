function currentDate() {
  let date = new Date();
  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "friday",
    "saturday",
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    let hours = `0 ${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    let minutes = `0 ${minutes}`;
  }
  return `${day} ${hours} : ${minutes}`;
}
let clock = document.querySelector("#hour");
clock.innerHTML = currentDate();

function currentMonth() {
  let date = new Date();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octobor",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let day = date.getDate();
  return `${year} ${day} ${month}`;
}
let period = document.querySelector("#month");
period.innerHTML = currentMonth();

function search(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let submitInput = document.querySelector("#text-input");
  let city = submitInput.value;
  h1.innerHTML = city;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let searchInput = document.querySelector("#search-engine");
searchInput.addEventListener("submit", search);

function showWeather(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = temp;
  let hum = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = hum;
  let wind = response.data.wind.speed;
  let windSpeeed = document.querySelector("#wind");
  windSpeeed.innerHTML = wind;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentPosition);
}

navigator.geolocation.getCurrentPosition(showPosition);

function currentPosition(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = temp;
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("submit", showPosition);
