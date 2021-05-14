let timezone;
const optionsDate = { weekday: 'short', month: 'long', day: 'numeric'};
const optionsNextDays = {weekday: 'long'};
const optionsTime = {hour:"2-digit", minute:"2-digit", second:"2-digit", timeZone: timezone};
let date = new Date();

function init(){
    let city = "Минск";
    if (localStorage.getItem('city') !== null){
        city = localStorage.getItem("city");
    }

    fetch(DOMEN_CUR +'?city=' + city +'&lang=' + LANG + '&key=' + KEY)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            data = data["data"][0];
            document.getElementById("temperature").innerText = Math.round(data["temp"]);
            let regionNames = new Intl.DisplayNames([LANG], {type: 'region'});
            document.getElementById("city").innerText = city + ", " + regionNames.of(data["country_code"]);
            document.getElementById("weatherDescr").innerText = data["weather"]["description"];
            document.getElementById("wind").innerText = 'ветер: ' + Math.round(data["wind_spd"]) + ' м/с';
            document.getElementById("humidity").innerText ='влажность: ' + Math.round(data["rh"]) + '%';
            document.getElementById("weatherFill").innerText ='ощущается как: ' + data["app_temp"] +'°';
            document.getElementById("imgWeather").src = 'https://www.weatherbit.io/static/img/icons/' + data["weather"]["icon"] + '.png';
            timezone =data["timezone"];
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
                    "<h4>" + D.toLocaleString('ru', optionsNextDays) + "</h4>\n" +
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
    date = new Date().toLocaleString("ru", optionsDate);
    console.log(' date: '+ date);
    document.getElementById("today").innerText = date.toLocaleString('ru', optionsDate);
}

setInterval(function() {
   date =new Date().toLocaleString('ru', {hour:"2-digit", minute:"2-digit", second:"2-digit", timeZone: timezone});
   document.getElementById("time").innerText = date.toLocaleString('ru', optionsTime);
}, 1000);

document.getElementById('searchForm').onsubmit = function(evt) {
    evt.preventDefault();  // отмена автоматической отправки формы
};