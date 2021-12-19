//Time
function realTime() {
  let currentTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = days[currentTime.getDay()];
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let date = currentTime.getDate();
  let month = months[currentTime.getMonth()];

  let time = document.querySelector("#currentDay");
  time.innerHTML = `${day} ${date} ${month} ${hour}:${minute}`;
  setInterval(realTime, 1000);
}

realTime();

//search engine

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  celsiusTempertature = response.data.main.temp;
}

function search(city) {
  let apiKey = "42e65d2695e97c180fe2400ea84ef87f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showFahrentheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTempertature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTempertature);
}

let celsiusTempertature = null;

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

let searchForm = document.querySelector("#weather-search");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("fahrenheit");
fahrenheitLink.addEventListener("click", showFahrentheitTemperature);

let celsiusLink = document.querySelector("celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);
