var cityName = document.getElementById("city");
var fiveDay = document.getElementById("dailyForecast");
var responseText = document.getElementById("responseText");
 var historyCity =document.getElementById("pastCity");
var cityTrack = JSON.parse(window.localStorage.getItem("pastCity"))||[]
 
 

function displayWeather(data) {
  document.getElementById("fiveDay").innerHTML = "";
  uv = data[0].uvi;
   var uvindex = document.createElement("ul");
   if (uv<3){
     uvindex.setAttribute("class", "uvblue");
     console.log("under3");
    }
    else if (uv>7){
      uvindex.setAttribute("class", "uvred");
     console.log ("high");}
     else {
       uvindex.setAttribute('class', "uvyellow");
     console.log("medium");}
   
   uvindex.textContent = "UV index: " + uv;
   currentCity.appendChild(uvindex);
   uvindex.setAttribute("id", "uv");

  console.log(data);
  for (var i = 1; i < 6; i++) {
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
    temp = data[i].temp.day;
    windspeed = data[i].wind_speed;
    gusts = data[i].wind_gust;
    humidity = data[i].humidity;
    
    

    var weatherContainer = document.createElement("p");
    document.getElementById("fiveDay").appendChild(weatherContainer);
    weatherContainer.setAttribute("class", "weatherCard");

    var wCard = document.createElement("div");
    wCard.textContent = newDate;
    weatherContainer.appendChild(wCard);
    wCard.setAttribute("class", "date");

    
    var conditions = document.createElement("div");
    conditions.textContent = fiveDay;
    wCard.appendChild(conditions);
    conditions.setAttribute("class", "wConditions");

    var weatherIcon = document.createElement("img");
    weatherIcon.src = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    conditions.appendChild(weatherIcon);
    weatherIcon.setAttribute("class", "wImage");

    
    var temperature = document.createElement("div");
    temperature.textContent = "Temperature: " +temp;
    wCard.appendChild(temperature);

    var windSpeed = document.createElement("div");
    windSpeed.textContent = windspeed + " (with gusts as high as "+ gusts +")."
    wCard.appendChild(windSpeed);
    
    var humid = document.createElement("div");
    humid.textContent = "Humidity: " + humidity+"%";
    wCard.appendChild(humid);

   
  

  }
}

function getWeather(city) {
  
  var apiRequest =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
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
      document.getElementById("currentCity").innerHTML = "";
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
         " Welcome to " + city + " weather. Today is: " + date;
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
document.getElementById("submitCity").addEventListener("click", function(){
  getWeather(cityName.value)
});
document.getElementById('submitCity').addEventListener('click', storeCity);

function storeCity() {
  var city = cityName.value.trim();
  console.log(city)
  cityTrack.push(city);
  window.localStorage.setItem("pastCity", JSON.stringify(cityTrack));
  
historyList();
}
function historyList(){
  historyCity.innerHTML="";
  for (let i = 0; i < cityTrack.length; i++) {
   var li = document.createElement("li");
   var btn = document.createElement("button");
   btn.setAttribute("class", "historyButton");
   btn.textContent=cityTrack[i];
   btn.onclick=historySearch;
   li.append(btn);
   historyCity.append(li);
    
  }
} function historySearch(){
  console.log(this)
  console.log(this.textContent)
  getWeather(this.textContent)
}
historyList();