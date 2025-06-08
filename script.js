
const key= "27044e7da3cef590a2b8ac00e1783085"

document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector(".searchInput");

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            getWeather(); // Enter'a basınca getWeather fonksiyonu çağrılır
        }
    });
});

async function getWeather(){

    const locationDiv = document.getElementById("location");
    const imgDiv = document.getElementById("img");
    const temperatureDiv = document.getElementById("temp");
    var cityName = document.querySelector(".searchInput").value;
    if (!cityName){
        alert("Şehir Geçersiz.") 
        return;
    }

    // GET CITY INFO
    var cityinfoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${key}`;
    try {
        var responsecity = await fetch(cityinfoUrl);
        if (!responsecity.ok) throw new Error("Şehir bulunamadi.");
    
        var cityData = await responsecity.json();
        var city = cityData[0].name
        var lat= cityData[0].lat
        var lon = cityData[0].lon 
        
      } catch (error) {
        alert("Error")
        return;
      }

      // GET WEATHER BY CITY INFO
      var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      console.log(weatherUrl)
      try {
        var responseWeather = await fetch(weatherUrl);
        if (!responseWeather.ok) throw new Error("Veri bulunamadi.");
    
        var weatherInfo = await responseWeather.json();
        
        var desc  = weatherInfo["weather"][0]["description"]
        var sunrise = weatherInfo["sys"]["sunrise"]
        var sunset = weatherInfo["sys"]["sunset"]
        var now = weatherInfo["dt"]

        var temperature = (weatherInfo.main.temp - 273.15).toFixed(2)
        var isDay = now > sunrise && now < sunset;

        if (isDay) {
            imgDiv.innerHTML= `<img src="images//day//${desc}.png"></img>`
        } else {
            imgDiv.innerHTML= `<img src="images//night//${desc}.png"></img>`
        }
        temperatureDiv.innerHTML = `<p><strong>${temperature}°C</strong></p>`;
        locationDiv.innerHTML= `${city}`

      } catch (error) {
        alert("Error")
        return;
      }


}

