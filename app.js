const valueSearch = document.getElementById("valueSearch");
const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const description = document.querySelector(".description");
const clouds = document.getElementById("clouds");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const form = document.querySelector("form");
const resultSection = document.getElementById("resultSection");

const apiKey = "6be817bfad365834066b74862060bc03";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = valueSearch.value.trim();
  if (query !== "") {
    searchWeather(query);
  }
});

function searchWeather(query) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    query
  )}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const countryCode = data.sys.country;
        const weatherIcon = data.weather[0].icon;

        city.querySelector(
          "figcaption"
        ).innerText = `${data.name}, ${countryCode}`;
        city.querySelector(
          "img"
        ).src = `https://flagsapi.com/${countryCode}/shiny/32.png`;

        temperature.querySelector(
          "img"
        ).src = `http://openweathermap.org/img/wn/${weatherIcon}@4x.png`;
        temperature.querySelector("figcaption span").innerText = Math.round(
          data.main.temp
        );

        description.innerText = data.weather[0].description;
        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;

        resultSection.style.display = "block";
      } else {
        alert("Location not found. Try a valid city or country name.");
        resultSection.style.display = "none";
      }
      valueSearch.value = "";
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      alert("Error fetching weather data.");
      resultSection.style.display = "none";
    });
}
