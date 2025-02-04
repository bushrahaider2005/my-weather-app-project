function weatherCityTemperature(response){
    let weatherCity = document.querySelector("h1");
    weatherCity.innerHTML = response.data.city;
    let weatherTemperature = document.querySelector("h2");
    let temperature = Math.round(response.data.temperature.current);
    weatherTemperature.innerHTML = temperature;
}

function search(event){
    event.preventDefault();
    let searchEngine = document.querySelector("#weather-search-engine");
    let city = searchEngine.value;

    let apiKey = "a4oe8fb84b2d8f83f294f146t0af1032";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(weatherCityTemperature);
}
 function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  let searchForm = document.querySelector("#weather-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#weather-time");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
  