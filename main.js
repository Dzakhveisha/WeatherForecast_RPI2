const KEY = "ef3b7c6e568f49679dcde63e5581b9e9";
const LANG = "ru";
const DOMEN_CUR = "https://api.weatherbit.io/v2.0/current";
const DOMEN_FORECAST ="https://api.weatherbit.io/v2.0/forecast/daily";

async function getWeatherByCity() {
    let city = document.getElementById("cityInput").value;
    fetch(DOMEN_CUR +'?city=' + city +'&lang=' + LANG + '&key=' + KEY)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            data = data["data"][0];
            console.log(data);
            document.getElementById("temperature").innerText = Math.round(data["temp"]);
            document.getElementById("city").innerText = data["city_name"] + ", " + data["country_code"];
            document.getElementById("weatherDescr").innerText = data["weather"]["description"];
            document.getElementById("wind").innerText = 'ветер: ' + Math.round(data["wind_spd"]) + ' м/с';
            document.getElementById("humidity").innerText ='влажность: ' + Math.round(data["rh"]) + '%';
            document.getElementById("weatherFill").innerText ='ощущается как: ' + data["app_temp"] +'°';
            document.getElementById("imgWeather").src = 'https://www.weatherbit.io/static/img/icons/' + data["weather"]["icon"] + '.png';
            timezone =data["timezone"];
            localStorage.setItem("city", city);
        })
        .catch(function(err) {
            console.log( err);
            alert('Проверьте корректность введённых данных!');
        });
    fetch(DOMEN_FORECAST +'?city=' + city +'&lang=' + LANG + '&key=' + KEY)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            for (let i = 1; i < 4; i++){
                let D = new Date();
                D.setDate(D.getDate() + i);
                let dayDiv = document.getElementById("day" + i.toString());
                dayDiv.innerHTML =
                    "<h4>"+ D.toLocaleString('ru', optionsNextDays) +"</h4>\n" +
                    "<div class=\"forecastTemperature\">\n" +
                    "<h3>" +  data["data"][i-1]["temp"]+ "° </h3>\n" +
                    "<img src=" + "\"https://www.weatherbit.io/static/img/icons/"
                                            + data["data"][i-1]["weather"]["icon"]+ ".png\">\n" +
                    "</div>"
            }
        })
        .catch(function(err) {
            console.log( err);
        });
    document.getElementById("cityInput").value = "";
}

