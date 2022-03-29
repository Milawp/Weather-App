//Last Updated-Time
let now = new Date();
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
document.querySelector(
  "#currentDate"
).innerHTML = `${day}, ${month} ${date} @ ${hours}:${minutes}`;

function updateDate(timestamp) {
  let now = new Date();
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${date} @ ${hours}:${minutes}`;
}
//tempurature, city and search functions

function weatherDisplay(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  //document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  //document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#tempValue").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentDate").innerHTML = updateDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#mainWeatherIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#MainWeatherIcon")
    .setAttribute("alt", response.data.weather[0].description);
}

function showTemp(position) {
  let temp = Math.round(position.data.main.temp);
  let cityApi = position.data.name;
  console.log(temp);
  let apiKey = "a6d203f193cb23874b319e04444ceed0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityApi}&appid=${apiKey}&units=metric`;
  let tempValue = document.querySelector("#tempValue");
  tempValue.innerHTML = `${temp}`;
  axios.get(apiUrl).then(weatherDisplay);
}

function search(city) {
  let apiKey = "a6d203f193cb23874b319e04444ceed0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherDisplay);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  search(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "a6d203f193cb23874b319e04444ceed0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let getCurrent = document.querySelector("#location-button");
getCurrent.addEventListener("click", getLocation);

let form = document.querySelector("#search-button");
form.addEventListener("click", handleSubmit);

search("Madrid");
