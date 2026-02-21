// API key - 0c2717588b517d2b8bfee50d3de6f968
// DOM ELEMENTS
const inputBox = document.getElementById('inputBox');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const dateNow = document.getElementById('dateNow');
const temparature = document.getElementById('temparature');
const weatherImg = document.getElementById('main-img');
const weatherType = document.getElementById('weather');
const windSpeed = document.getElementById('windSpeed');
const humidityPercentage = document.getElementById('humidityPercentage');
const footer = document.querySelector('.footer');
const generalFooter = document.querySelector('.general-footer');

// function for calling api and setting up the values
async function showWeather() {
  const city = inputBox.value.trim();

  // calling api to get latitude and longitude
  const geoApiRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=0c2717588b517d2b8bfee50d3de6f968`);
  const geoApiData = await geoApiRes.json();

  if(!geoApiData.length) {
    alert('City not found!');
    return;
  }
  else if (geoApiData) {
    generalFooter.style.display = 'none';
    footer.style.display = 'flex';
  }

  const {lat, lon} = geoApiData[0];

  // calling api to get weather data
  const weatherApiRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0c2717588b517d2b8bfee50d3de6f968&units=metric`);
  const weatherApiData = await weatherApiRes.json();
  console.log(weatherApiData)

  // setting the values at the DOM elements
  cityName.textContent = inputBox.value.toUpperCase();
  temparature.textContent = Math.round(weatherApiData.main.temp);
  weatherType.textContent = weatherApiData.weather[0].main;

  // set icon
  const weatherMain = weatherApiData.weather[0].main.toLowerCase();

  if (weatherMain.includes('clear')) {
    weatherImg.src = './src/images/sun-gradient-style.png';
  }
  else if (weatherMain.includes('clouds')) {
    weatherImg.src = './src/images/communication.png';
  }
  else if (weatherMain.includes('drizzle')) {
    weatherImg.src = './src/images/cloud_12805635.png'
  }
  else if (weatherMain.includes('rain')) {
    weatherImg.src = './src/images/rain_6182793.png';
  }
  else if (weatherMain.includes('thunderstorm')) {
    weatherImg.src = './src/images/thunder_12805621.png';
  }
  else if (weatherMain.includes('snow')) {
    weatherImg.src = './src/images/snowflake_12805727.png';
  }
  // converting wind speed from m/s to km/h
  let windInMs = Number(weatherApiData.wind.speed);
  let windInKmh = windInMs * 3.6;
  windSpeed.textContent = Math.round(windInKmh);

  humidityPercentage.textContent = weatherApiData.main.humidity;
}


// function date shows current date
function showDate() {
  const today = new Date();
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  dateNow.textContent = today.toLocaleDateString('en-GB', options);

}

searchBtn.addEventListener('click', () => {
  showWeather();
  showDate();
})