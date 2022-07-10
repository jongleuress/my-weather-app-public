
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
    let weatherTodayGen = document.querySelector("#descr-gen");
    weatherTodayGen.innerHTML = response.data.weather[0].main;
    let weatherTodayWind = document.querySelector("#wind");
    let windSpeed = response.data.wind.speed.toString();
    weatherTodayWind.innerHTML = `Wind speed: ${windSpeed} k/h`;
    let weatherTodayDetails = document.querySelector("#descr-det");
    weatherTodayDetails.innerHTML = response.data.weather[0].description;
    let humidity = document.querySelector("#hum");
    let humValue = response.data.main.humidity;
    humidity.innerHTML = `Humidity: ${humValue}%`;
    let iconThisDay = document.querySelector("#main-icon");
    let icon = response.data.weather[0].icon;
    iconThisDay.src = "media/" + icon +".png";
    let todayIsLocale = document.querySelector("#today");
    let timezone = response.data.timezone;
    let timeOffset = new Date().getTimezoneOffset();
    timeOffset = timeOffset * 60000;
    let timezoneMs;

    if (timeOffset < 0) {
    timezoneMs = (timezone * 1000) + timeOffset;
    } else {
    timezoneMs = (timezone * 1000) - timeOffset;
    }
    
    let dateLocal = new Date((new Date().getTime()) + timezoneMs);
    let hoursLocal = dateLocal.getHours();
    let minutesLocal = dateLocal.getMinutes();
     if (minutesLocal < 10) {
       minutesLocal = `0${minutesLocal}`
     }
     if (hoursLocal < 10) {
       hoursLocal = `0${hoursLocal}`
     }
    let dateLocalFull = `${hoursLocal}:${minutesLocal}`
    todayIsLocale.innerHTML = dateLocalFull;

    if (dateLocal.getHours() <= 8 || dateLocal.getHours() >= 21) {
      document.querySelector(".container-md").style.background = "#004962";
      document.querySelector(".container-md").style.color = "#ecd287";
      document.querySelector("#logo").style.color = "#fff9e9";
      document.querySelector("#bar-icon").style.color = "#fff9e9";
    } else {
      document.querySelector(".container-md").style.background = "linear-gradient(0deg, rgba(21,144,145,1) 0%, rgba(55,170,191,1) 100%)";
      document.querySelector(".container-md").style.color = "#112B3C";
      document.querySelector("#logo").style.color = "#000000";
      document.querySelector("#bar-icon").style.color = "#000000";
    }
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

// thisDate = thisDate.toLocaleTimeString('uk-UA');

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
//  if (minute < 10) {
//    minute = `0${minute}`
//  }
//  if (hour < 10) {
//    hour = `0${hour}`
//  }

  let actualDate = `${day} ${hour}:${minute}`;
  return actualDate;
 }

 let todayIs = document.querySelector("#today");

 todayIs.innerHTML = formatDate(thisDate);

// function changeskin() {
//   if (thisDate.getHours() <= 8 || thisDate.getHours() >= 21) {
//     document.querySelector(".container-md").style.background = "#004962";
//     document.querySelector(".container-md").style.color = "#ecd287";
//     document.querySelector("#logo").style.color = "#fff9e9";
//     document.querySelector("#bar-icon").style.color = "#fff9e9";
//   } 
// }

// changeskin();

let covertButton = document.querySelector("#buttonTemp");
let covertButtonFahr = document.querySelector("#buttonTemp-frh");
let currentTemp = document.querySelector("#temp-digits");
let currentUnit = document.querySelector("#temp-unit");

// let apiKey = "89652554a85d8feaedbd9037754e146b";

covertButtonFahr.addEventListener("click", function changeUnit() {

  if (currentUnit.textContent.includes("°C")) {
    let tempNumber = currentTemp.textContent;
    let temp = Number(tempNumber);
    let cToFahr = (temp * 9) / 5 + 32;
    cToFahr = Math.round(cToFahr);
    currentTemp.innerHTML = cToFahr.toString();
    currentUnit.innerHTML = "F";
  }
})

covertButton.addEventListener("click", function changeUnit() {

  if (currentUnit.textContent.includes("F")) {
    let tempNumber = currentTemp.textContent;
    let temp = Number(tempNumber);
    let fToCel = ((temp - 32) * 5) / 9;
    fToCel = Math.round(fToCel);
    currentTemp.innerHTML = fToCel.toString();
    currentUnit.innerHTML = "°C";
  }
})

//   function cToF(celsius) {
//     let cTemp = celsius;
//     let cToFahr = (cTemp * 9) / 5 + 32;
//     return cToFahr;
//   }

//   function fToC(fahrenheit) {
//     let fTemp = fahrenheit;
//     let fToCel = ((fTemp - 32) * 5) / 9;
//     return fToCel;
//   }

//   if (currentUnit.textContent.includes("°C")) {
//     let finalTemp = Math.round(cToF(temp));
//     currentTemp.innerHTML = finalTemp.toString();
//     currentUnit.innerHTML = "F";
//   } else {
//     let finalTemp = Math.round(fToC(temp));
//     currentTemp.innerHTML = finalTemp.toString();
//     currentUnit.innerHTML = "°C";
//   }
// });

function showTempAndCity(response) {
  let tempRightNow = Math.round(response.data.main.temp);
  currentTemp.innerHTML = tempRightNow;
  let cityGeo = response.data.name; 
  let cityGeoName = document.querySelector("#current-city");
  cityGeoName.innerHTML = cityGeo;
  let weatherTodayGen = document.querySelector("#descr-gen");
  weatherTodayGen.innerHTML = response.data.weather[0].main;
  let weatherTodayWind = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed.toString();
  weatherTodayWind.innerHTML = `Wind speed: ${windSpeed} k/h`;
  let weatherTodayDetails = document.querySelector("#descr-det");
  weatherTodayDetails.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#hum");
  let humValue = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humValue}%`;
  let iconThisDay = document.querySelector("#main-icon");
  let icon = response.data.weather[0].icon;
  iconThisDay.src = "media/" + icon +".png";;

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
     
     if (minute < 10) {
      minute = `0${minute}`
     }
     if (hour < 10) {
      hour = `0${hour}`
     }

     let actualDate = `${day} ${hour}:${minute}`;
      return actualDate;
    
  }

   let todayIs = document.querySelector("#today");

   todayIs.innerHTML = formatDate(thisDate);

   if (thisDate.getHours() <= 8 || thisDate.getHours() >= 21) {
     document.querySelector(".container-md").style.background = "#004962";
     document.querySelector(".container-md").style.color = "#ecd287";
     document.querySelector("#logo").style.color = "#fff9e9";
     document.querySelector("#bar-icon").style.color = "#fff9e9";
   } else {
     document.querySelector(".container-md").style.background = "linear-gradient(0deg, rgba(21,144,145,1) 0%, rgba(55,170,191,1) 100%)";
     document.querySelector(".container-md").style.color = "#112B3C";
     document.querySelector("#logo").style.color = "#000000";
     document.querySelector("#bar-icon").style.color = "#000000";
   }

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


 
