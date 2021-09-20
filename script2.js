var cityName = document.getElementById("city");

var eventEl = document.getElementById("events-container");
var eightDay = document.getElementById("dailyForecast");

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
      
    // var date = data[i].dt;
    // var newDate = new Date(date * 1000);
    iconCode = data[i].weather[0].icon;
    currentIcon = data[0].weather[0].icon;
    eightDay = data[i].weather[0].main;
    morningTemp = Math.round(data[i].temp.morn);
    eveTemp = Math.round(data[i].temp.eve);




    // var cityNow = document.createElement('p');
    // document.getElementById("currentCity").appendChild(cityNow);
    // cityNow.setAttribute("class", "cityNow");
    // currentDate = new Date(date * 1000);
    // cityNow.textContent = cityName + currentDate;
    

    // currentDate = new Date(date * 1000);

    var weatherContainer = document.createElement("p");
    document.getElementById("fiveDay").appendChild(weatherContainer);
    weatherContainer.setAttribute("class", "weatherCard");

    var wCard = document.createElement("div");
    wCard.textContent = newDate;
    weatherContainer.appendChild(wCard);
    wCard.setAttribute("class", "date");

    var weatherIcon = document.createElement("img");
    var todayIcon = document.createElement("img")
    currentIcon === data[0].weather[0].icon;
    weatherIcon.src = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    todayIcon.src = "http://openweathermap.org/img/wn/" + currentIcon + ".png";
    wCard.appendChild(weatherIcon);
    currentCity.appendChild(todayIcon);
    weatherIcon.setAttribute("class", "wImage");
    todayIcon.setAttribute('class', 'currentImage');

    var conditions = document.createElement("div");
    conditions.textContent = eightDay;
    wCard.appendChild(conditions);
    conditions.setAttribute("class", "wConditions");

    // var amTemp = document.createElement("div");
    // amTemp.textContent = "Morning Temperature: " + morningTemp;
    // conditions.appendChild(amTemp);
    // amTemp.setAttribute("class", "earlyTemp");

    // var pmTemp = document.createElement("div");
    // pmTemp.textContent = "Evening Temperature: " + eveTemp;
    // amTemp.appendChild(pmTemp);
    // pmTemp.setAttribute("class", "eveTemp");

    console.log(newDate, weatherIcon, eightDay, morningTemp, eveTemp);
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

      var currentCity = document.createElement('div')
      currentCity.setAttribute("class", "cityCard");
       document.getElementById("currentCity").appendChild(currentCity);

       var modifier = {
         weekday: "long",
         year: "numeric",
         month: "long",
         day: "numeric",
       };
        var initDate = new Date(response.dt * 1000);
       var date =  initDate.toLocaleDateString('en-US', modifier);
      

       city = response.name;
       temp = response.main.temp;
       wind = response.wind.speed;
       humid = response.main.humidity;

       console.log(city, temp, wind, humid)

      var ul = document.createElement("ul");
        ul.setAttribute("style", "padding:5; margin:5;");
        ul.setAttribute("id", "currentList");
       currentCity.appendChild(ul);
       
       
       
      
       var cityDate = document.createElement('li');
           cityDate.innerText = " Welcome to "  + city +" weather. Today is; " +date;
           ul.appendChild(cityDate);


        var currTemp = document.createElement('li');
        currTemp.innerText = "Temperature: "+ temp;
        ul.appendChild(currTemp);

        var breeze = document.createElement('li');
        breeze.innerText = "Wind: "+ wind
        ul.appendChild(breeze);
    
        var humidity = document.createElement('li');
        humidity.innerText = "Humidity: " + humid;
        ul.appendChild(humidity);

        

         
       
    
       console.log(cityDate, currTemp, breeze, humidity)
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
