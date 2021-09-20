var cityName = document.getElementById("city");
var fiveDay = document.getElementById("dailyForecast");
var responseText = document.getElementById("responseText");

function displayWeather(data) {
  console.log(data);
  for (var i = 0; i < 5; i++) {
    var modifier = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var initDate = new Date(data[i].dt * 1000);
    var newDate = initDate.toLocaleDateString("en-US", modifier);
    iconCode = data[i].weather[0].icon;

    fiveDay = data[i].weather[0].main;
    

    var weatherContainer = document.createElement("p");
    document.getElementById("fiveDay").appendChild(weatherContainer);
    weatherContainer.setAttribute("class", "weatherCard");

    var wCard = document.createElement("div");
    wCard.textContent = newDate;
    weatherContainer.appendChild(wCard);
    wCard.setAttribute("class", "date");

    var weatherIcon = document.createElement("img");
    weatherIcon.src = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    wCard.appendChild(weatherIcon);
    weatherIcon.setAttribute("class", "wImage");

    var conditions = document.createElement("div");
    conditions.textContent = fiveDay;
    wCard.appendChild(conditions);
    conditions.setAttribute("class", "wConditions");

    // console.log(newDate, weatherIcon, fiveDay, morningTemp, eveTemp);
  }
}

function getWeather() {
  var apiRequest =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName.value +
    "&appid=15a2f6e975005b96c0df56340849949d&units=imperial";
  console.log(apiRequest);
  fetch(apiRequest)
    .then(function (res) {
      return res.json();
    })

    .then(function (response) {
      console.log(response);
      console.log(response.name);
      gps(response.coord.lat, response.coord.lon);

      var currentCity = document.createElement("div");
      currentCity.setAttribute("class", "cityCard");
      document.getElementById("currentCity").appendChild(currentCity);

      
      var modifier = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      var initDate = new Date(response.dt * 1000);
      var date = initDate.toLocaleDateString("en-US", modifier);

      city = response.name;
      temp = response.main.temp;
      wind = response.wind.speed;
      humid = response.main.humidity;

      console.log(city, temp, wind, humid);

       var cityDate = document.createElement("li");
       cityDate.innerText =
         " Welcome to " + city + " weather. Today is; " + date;
       currentCity.appendChild(cityDate);

      var ul = document.createElement("ul");
      ul.setAttribute("style", "padding:5; margin:5;");
      ul.setAttribute("id", "currentList");
      currentCity.appendChild(ul);

      currentIcon = response.weather[0].icon;
      var todayIcon = document.createElement("img");
      todayIcon.src =
        "http://openweathermap.org/img/wn/" + currentIcon + ".png";
      ul.appendChild(todayIcon);
      todayIcon.setAttribute("class", "currentImage");


     

      var currTemp = document.createElement("li");
      currTemp.innerText = "Temperature: " + temp;
      ul.appendChild(currTemp);

      var breeze = document.createElement("li");
      breeze.innerText = "Wind: " + wind;
      ul.appendChild(breeze);

      var humidity = document.createElement("li");
      humidity.innerText = "Humidity: " + humid;
      ul.appendChild(humidity);

      console.log(cityDate, currTemp, breeze, humidity);
      //    li.setAttribute('style', 'display:block;');
      //    ul.appendChild(li);
      //    currentCity.appendChild(ul);
    });
}
function gps(lat, long) {
  var apiRequest =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&exclude=minutely,hourly,alerts&appid=15a2f6e975005b96c0df56340849949d&units=imperial";
  fetch(apiRequest)
    .then(function (res) {
      return res.json();
    })
    .then(function (response) {
      console.log(response);
      displayWeather(response.daily);
    });
}
document.getElementById("submitCity").addEventListener("click", getWeather);
