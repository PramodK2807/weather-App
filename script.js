const api = {
    key: "6035519ecaf25e5a1bb42df89e9fbf76",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");



// const currentLocation = document.querySelector(".current-location");

// currentLocation.addEventListener("click", getData = () =>{
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(showPosition);
//         } else {
//           error.innerText = "Geolocation is not supported by this browser.";
//         }
// })  


// function showPosition(response) {
//     // cityEl.innerText = "Updating"
//     // console.log(data);
//     let lat = response.coords.latitude;
//     let lon = response.coords.longitude;
//     // x.innerText = `latitude: ${lat}, longitude: ${lon}`;
//     const url = `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`;

//     fetch(url, {method : 'GET'})
//     .then(response => {
//         return response.json();
//     }).then(displayData);
//     // displayData();

// }

btn.addEventListener("click", getInput);

function getInput(event) {
    // const key = document.querySelector(".key").value;
    if(event.type == "click"){
        getData(search.value);
        console.log(search.value);
    }
}

function getData(){
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response => {
        return response.json();
    }).then(displayData);

}

function displayData(response) {
    console.log(response);
    if(response.cod === "404"){
        const error = document.querySelector(".error");
        error.textContent = "Please Enter Valid City";
        search.value = "";
    }
    else{
        const city = document.querySelector(".city");
        const weather = document.querySelector(".weather");
        const temp = document.querySelector(".temp");

        const tempRange = document.querySelector(".temp-range");
        city.innerText = `${response.name}, ${response.sys.country}`;
        weather.innerText = `Weather : ${response.weather[0].description}`;
        temp.innerText = ` Temp : ${response.main.temp} °C`;
        tempRange.innerText = ` Temp Range : ${Math.floor(response.main.feels_like)} °C / ${Math.floor(response.main.temp_max)} °C`;
       
        const date = new Date();
        const dateEl = document.querySelector(".date").innerText = date.toDateString();
        search.value = "";
        // console.log(date.toDateString());

        const weatherIcon = document.querySelector(".weather-icon");
        const iconUrl = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconUrl + response.weather[0].icon + ".png";
        
    }
}
