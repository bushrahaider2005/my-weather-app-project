function searchWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-city");
    let descriptionElement = document.querySelector("#weather-description");
    let humidityElement = document.querySelector("#weather-humidity");
    let windElement = document.querySelector("#weather-wind-speed");
    let timeElement = document.querySelector("#weather-time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#weather-icon");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/hr`;
    timeElement.innerHTML = timeDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    getForecast(response.data.city);
    }

    function timeDate(date){
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let day = days[date.getDay()];
      
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
      
        return `${day} ${hours}:${minutes}`;
    }
    
    function searchCity(city){
        let apiKey = "a4oe8fb84b2d8f83f294f146t0af1032";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
        axios.get(apiUrl).then(searchWeather);
    }
    
    function searchSubmit(event){
        event.preventDefault();
        let searchInputElement = document.querySelector("#weather-search-form");
        searchCity(searchInputElement.value);
    }

    function formatDay(timestamp) {
      let date = new Date(timestamp * 1000);
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
      return days[date.getDay()];
    }

    function getForecast(city) {
      let apiKey = "a4oe8fb84b2d8f83f294f146t0af1032";
      let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
      axios(apiUrl).then(displayForecast);
    }

    function displayForecast(response){
      let forecastHtml = "";

      response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml =
          forecastHtml +
          `
      <div class="weather-forecast-data">
                <div class="weather-forecast-day">${formatDay(day.time)}</div>
                <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                <div class="weather-forecast-temperature">
                    <div class="weather-forecast-teperature-max"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
                    <div class="weather-forecast-temperature-min">>${Math.round( day.temperature.minimum)}°</div>
                </div>     
            </div>
            `;
        }
      });

      let forecastElement = document.querySelector("#forecast");
      forecastElement.innerHTML = forecastHtml;
    }

let searchFormElement = document.querySelector("#weather-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Kabul");
