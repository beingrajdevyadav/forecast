
console.log("Jai Shree Shyam Baba ❤🙏");

// =========================================
let currentChart;
let chartTempData = [];
// =========================================


// ---------------------------------------- 
//            Get Weather Function
// ---------------------------------------- 

async function getWeather() {
  const cityName = document.getElementById("cityName").value;
  // let cityName = "Noida";

  const API_KEY = "64e2f747f1aca12bf9df7a71c52c69b6";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    // console.log(data.cod);

    if (data.cod == "404") {
      document.getElementById("cityName").value = "";
      document.getElementById("weatherInfo").innerHTML = `<h2>City Not Found</h2>`;
      return;
    }

    // console.log(data);
    // console.log(data.main);
    // console.log(currentChart);
    chartTempData = [];
    chartTempData.push(data.main.feels_like, data.main.temp_min - 6, data.main.temp, data.main.temp_max + 5);



    if (currentChart == undefined) {
      // to hide preloader
      document.querySelector("#preloader").style.display = "none";
      // to display weather details
      displayWeatherDetails(data);
      // to create chart
      createChart("bar");
    } else {
      // to hide preloader
      document.querySelector("#preloader").style.display = "none";
      // to display weather details
      displayWeatherDetails(data);
       // to create chart
      currentChart.destroy();
      createChart("bar");
     
    }



  } catch (error) {
    console.error(error);
  }

}


// ---------------------------------------- 
//            Create Chart Function
// ---------------------------------------- 

function createChart(type) {
  // to show chartWrapper <div></div>
  document.querySelector("#chartWrapper").style.display ="block";
  const ctx = document.getElementById('tempChart');

  if (type == "line" || type == "bar") {

    currentChart = new Chart(ctx, {
      type: type,
      data: {
        labels: ['Feel Like', 'Min Temp', 'Temp', 'Max Temp'],
        datasets: [{
          label: '# of Temperature',
          data: chartTempData.map(temp => temp),
          borderWidth: 1,
          color: "#fff",
          backgroundColor: "#932566",
          hoverBackgroundColor: "#b01e73",
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        maintainHeighAspectRatio: false,
      }
    });

  } else {
    currentChart = new Chart(ctx, {
      type: type,
      data: {
        labels: ['Feel Like', 'Min Temp', 'Temp', 'Max Temp'],
        datasets: [{
          label: '# of Temperature',
          data: chartTempData.map(temp => temp),
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        maintainHeighAspectRatio: false,
      }
    });
  }

}




// ---------------------------------------- 
//           Active Chart Function
// ---------------------------------------- 
const chartTypeBtns = document.querySelectorAll(".chart-type-btn");
chartTypeBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    chartTypeBtns.forEach(btn => btn.classList.remove("active-chart"));
    btn.classList.add("active-chart");

    let chartType = btn.getAttribute("chartType");
    // console.log(chartType);
    currentChart.destroy();
    createChart(chartType);
  })
});


// ---------------------------------------- 
//           Active Chart Function
// ---------------------------------------- 

function displayWeatherDetails(data) {

  const weatherInfoWrapper = document.querySelector("#weatherInfoWrapper");

  document.querySelector("#currentLocation").innerHTML = `Weather In ${data.name}`;

  let weatherInfo = `
 <div class="weather-info-item">
                    <h1>${data.weather[0].description}</h1>
                    <p> <i class="fa-brands fa-skyatlas"></i> Weather</p>
                </div>
                <div class="weather-info-item">
                    <h1>${(data.main.feels_like).toFixed(2)} &deg;C</h1>
                    <p> <i class="fa-solid fa-arrow-down-up-across-line"></i> Feels Like</p>
                </div>
                <div class="weather-info-item">
                    <h1>${(data.main.temp_min - 6).toFixed(2)} &deg;C</h1>
                    <p> <i class="fa-solid fa-arrow-trend-down"></i> Min Temperature</p>
                </div>
                <div class="weather-info-item">
                    <h1>${(data.main.temp).toFixed(2)} &deg;C</h1>
                    <p> <i class="fa-solid fa-temperature-high"></i> Temperature</p>
                </div>
                <div class="weather-info-item">
                    <h1>${(data.main.temp_max + 5).toFixed(2)} &deg;C</h1>
                    <p> <i class="fa-solid fa-arrow-trend-up"></i> Max Temperature</p>
                </div>
                <div class="weather-info-item">
                    <h1>${data.main.humidity} %</h1>
                    <p> <i class="fa-regular fa-snowflake"></i> Humidity</p>
                </div>
                <div class="weather-info-item">
                    <h1>${data.main.pressure} mb</h1>
                    <p> <i class="fa-solid fa-arrows-to-circle"></i> Pressure</p>
                </div>
                <div class="weather-info-item">
                    <h1>${data.main.sea_level} m</h1>
                    <p> <i class="fa-solid fa-water"></i> Sea Level</p>
                </div>
                <div class="weather-info-item">
                    <h1>${data.main.grnd_level} m</h1>
                    <p> <i class="fa-solid fa-earth-asia"></i> Ground Level</p>
                </div>
                <div class="weather-info-item">
                    <h1>${data.wind.deg} &deg;</h1>
                    <p> <i class="fa-regular fa-compass"></i> Wind Degree</p>
                </div>
                <div class="weather-info-item">
                    <h1>${data.wind.gust} kph</h1>
                    <p>  <i class="fa-solid fa-arrows-spin"></i> Wind Gust</p>
                </div>
                <div class="weather-info-item">
                    <h1>${data.wind.speed * 1000} mph</h1>
                    <p> <i class="fa-solid fa-wind"></i> Wind Speed</p>
                </div>
`;

  weatherInfoWrapper.innerHTML = weatherInfo;
};





getWeather();

