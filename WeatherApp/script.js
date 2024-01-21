const url = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "862b86429e103c07dfd3dcc929a71b65";

const setQuery = (e) => {
  if (e.key === "Enter") {
    const cityName = weatherSearch.value.trim();

    if (cityName === "") {
      alert("please enter city name");
      return;
    }
    getResult(cityName);
  }
};

const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => {
        if (!weather.ok){
            if(weather.status === 404){
                alert("Invalid city name. Please enter a valid city name.");
            }else {
                throw new Error('Weather data not available')
            }
        }
      return weather.json();
    })
    .then(displayResult).catch(error => {
        console.error("Error fetching or processing weather data:", error);
    });
};
const displayResult = (result) => {
  let city = document.querySelector(".city");
  city.innerText = `${result.name},${result.sys.country}`;

  let degree = document.querySelector(".degree");
  degree.innerText = `${Math.round(result.main.temp)}°C`;

  let state = document.querySelector(".state");
  state.innerText = result.weather[0].description;

  let minMax = document.querySelector(".minMax");
  minMax.innerText = `${Math.round(result.main.temp_min)}°c / ${Math.round(
    result.main.temp_max
  )}°c`;
};

const weatherSearch = document.querySelector(".weatherSearch");
weatherSearch.addEventListener("keypress", setQuery);
