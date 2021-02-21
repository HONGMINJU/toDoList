const API_KEY='b3b30f9017ea1a148be02ed09f9991e8';
const COORDS="coords";
const weatherContainer=document.querySelector(".js-weather");
const weather=weatherContainer.querySelector(".js-weather-info");

function getWeather(lat,lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    .then(function(res){
        return res.json();
    })
    .then(function (json){
        const temp=json.main.temp;
        const place =json.name;
        weather.innerText=`기온: ${temp}   지역: ${place}`;

        const weatherImg=document.createElement("img");
        weatherImg.src = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
        weatherContainer.appendChild(weatherImg);
    })
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function handleGeoSucces(position){
    console.log(position);
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    //do nothing
}
function askCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadGeo(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords===null){
        //ask
        askCoords();
    }
    else{
        const parseCoords=JSON.parse(loadedCoords);
        const lat=parseCoords.latitude;
        const lon=parseCoords.longitude;
        getWeather(lat,lon);
    }
}

function init(){
    loadGeo();
}

init();