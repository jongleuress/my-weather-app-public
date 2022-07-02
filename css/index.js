// let weather = {
//   "paris": {
//     temp: 19.7,
//     humidity: 80
//   },
//   "tokyo": {
//     temp: 17.3,
//     humidity: 50
//   },
//   "lisbon": {
//     temp: 30.2,
//     humidity: 20
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100
//   },
//   "moscow": {
//     temp: -5,
//     humidity: 20
//   }
// };

let form = document.querySelector("#city-form");
let cityName = document.querySelector("#current-city");

form.addEventListener("submit", function cityNameCur(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  let city = searchInput.value;
  city = city.trim();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let cityCap = capitalizeFirstLetter(city);
  city = cityCap;

  cityName.innerHTML = city;

  let cityId = cityName.innerHTML;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=89652554a85d8feaedbd9037754e146b&units=metric`;

  function displayTemp(response) {
    let tempRightNow = Math.round(response.data.main.temp);
    currentTemp.innerHTML = tempRightNow;
    currentUnit.innerHTML = "°C";
  }

  axios.get(apiURL).then(displayTemp);
});

// if (weather.hasOwnProperty(city)){
//   let cityCap = capitalizeFirstLetter(city);
//   alert(`It is currently ${Math.round(weather[city].temp)} in ${cityCap} with a humidity of $// {weather[city].humidity}`);
// } else {
//   alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city.toLowerCase()}`);
// }

// let currentCity = document.querySelector("#current-city");

let thisDate = new Date();

function formatDate() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = weekDays[thisDate.getDay()];
  let hour = thisDate.getHours();
  let minute = thisDate.getMinutes();

  let actualDate = `${day} ${hour}:${minute}`;
  return actualDate;
}

let todayIs = document.querySelector("#today");

todayIs.innerHTML = formatDate(thisDate);

let covertButton = document.querySelector("#buttonTemp");
let currentTemp = document.querySelector("#temp-digits");
let currentUnit = document.querySelector("#temp-unit");

// let apiKey = "89652554a85d8feaedbd9037754e146b";

covertButton.addEventListener("click", function changeUnit() {
  let tempNumber = currentTemp.textContent;
  let temp = Number(tempNumber);

  function cToF(celsius) {
    let cTemp = celsius;
    let cToFahr = (cTemp * 9) / 5 + 32;
    return cToFahr;
  }

  function fToC(fahrenheit) {
    let fTemp = fahrenheit;
    let fToCel = ((fTemp - 32) * 5) / 9;
    return fToCel;
  }

  if (currentUnit.textContent.includes("°C")) {
    let finalTemp = Math.round(cToF(temp));
    currentTemp.innerHTML = finalTemp.toString();
    currentUnit.innerHTML = "F";
  } else {
    let finalTemp = Math.round(fToC(temp));
    currentTemp.innerHTML = finalTemp.toString();
    currentUnit.innerHTML = "°C";
  }
});

function showTempAndCity(response) {
  let tempRightNow = Math.round(response.data.main.temp);
  currentTemp.innerHTML = tempRightNow;
  let cityGeo = response.data.name; 
  let cityGeoName = document.querySelector("#current-city");
  cityGeoName.innerHTML = cityGeo;
}

function fetchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=89652554a85d8feaedbd9037754e146b&units=metric`;
  axios.get(apiUrlGeo).then(showTempAndCity);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(fetchPosition);
}

let geoBtn = document.querySelector("#geoloc");

geoBtn.addEventListener("click", getLocation);




 
