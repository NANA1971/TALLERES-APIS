let inputBox = document.querySelector(".search-bar input");
let searchBtn = document.querySelector(".search-bar button");
let weatherIcon = document.querySelector(".weather-icon");
let weather = document.querySelector(".weather");
let errorMessage = document.querySelector(".error");

async function checkWeather(city) {


    try {
        let apiKey = "b822d67777e9401be428aac65abae328";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
        let response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error("Ciudad no encontrada");
        }

        let data = await response.json()

        console.log(data);

        updateWeatherUI(data);
    } catch (error) {
        console.error(error.message);
        weather.style.display = "none";
        errorMessage.style.display = "block";
    }
}


function updateWeatherUI(data) {
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed} km/h`;

    let weatherIcons = {
        Clear: "images/clear.png",
        Snow: "images/snow.png",
        Rain: "images/rain.png",
        Clouds: "images/cloud.png",
    };

    weather.src = weatherIcons[data.weather[0].main] || "images/rain.png";

    weather.style.display = "block";
    errorMessage.style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
});

window.onload = () => {
    checkWeather("Medellín");
}