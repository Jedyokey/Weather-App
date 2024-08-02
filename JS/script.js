const apiKey = "f10755001cbcc40cf0e9cff16628c263";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon ");

async function checkWeather(city) {
    try {
      const response = await fetch(apiUrl + city + '&appid=' + apiKey);

      if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
      } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/hr";

        if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "images/clouds24.png";
        } else if (data.weather[0].main == "Clear") {
          weatherIcon.src = "images/sunny2.png";
        } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "images/rain-2.5.png";
        } else if (data.weather[0].main == "Drizzle") {
          weatherIcon.src = "images/drizzle2.png";
        } else if (data.weather[0].main == "Mist") {
          weatherIcon.src = "images/snow2.png";
        }

        document.querySelector(".weather").style.display = "block";   
        document.querySelector(".error").style.display = "none"; 
      }

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });