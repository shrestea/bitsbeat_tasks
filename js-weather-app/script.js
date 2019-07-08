const appKey = "48d33ecac4f045baaaa80bc10b7783eb";

let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("search");
let cityName = document.getElementById("cityname");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let lat, long;

searchButton.addEventListener("click", weatherDetails);
searchInput.addEventListener("keyup", enterPress);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  long= position.coords.longitude;

  weatherCoordinates(lat, long);
  console.log(lat,long);
}

function enterPress(event) {
  if (event.key === "Enter") {
    weatherDetails();
  }
}

function weatherCoordinates(lat, long){
  let searchLink = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" +lat +"&lon="+long + "&appid="+appKey;
  httpRequestAsync(searchLink, response);
}

function weatherDetails() {
  if (searchInput.value === "") {
  
  }else {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
   httpRequestAsync(searchLink, response);
  }
 }

function response(response) {
  let jsonObject = JSON.parse(response);
  cityName.innerHTML = jsonObject.name;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
  humidity.innerHTML = jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback)
{
  
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => { 
      if (httpRequest.readyState == 4 && httpRequest.status == 200)
          callback(httpRequest.responseText);
  }
  httpRequest.open("GET", url, true); // true for asynchronous 
  httpRequest.send();
}