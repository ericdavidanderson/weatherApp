var cityName = document.getElementById("city");
var apiRequest =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&appid=15a2f6e975005b96c0df56340849949d";

//eventListener so that when submit button is clicked, the apiRequest variable is sent with text
//from cityName placed as value of cityName

var responseText = document.getElementById("response-text");

function getWeather() {
  fetch(apiRequest)
    .then(function (res) {
      return res.json();
    })
    .then(function (response) {
      console.log(response.weather);
      if (response.status === 200) {
        responseText.textContent = response.status;
      } else {
        console.log("error");
      }
    });
}
document.getElementById("city").addEventListener("click", getWeather);
// getWeather();
