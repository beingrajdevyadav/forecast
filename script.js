
console.log("Jai Shree Shyam Baba ❤🙏");

// =========================================
let currentChart;
// =========================================


// ---------------------------------------- 
//            Get Weather Function
// ---------------------------------------- 

async function getWeather() {
  const cityName = document.getElementById("cityName").value;

  const API_KEY = "6f1ad9775d3cdc8ad9ea341dbf97abe7";
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

    const weatherInfo = `
            <h2>Weather in ${data.name}</h2>
            <h3>Temperature: ${data.main.temp}°C</h3>
            <h3>Humidity: ${data.main.humidity}%</h3>
            <h3>Weather: ${data.weather[0].main}</h3>
        `;

    document.getElementById("weatherInfo").innerHTML = weatherInfo;
    console.log(data);
  } catch (error) {
    console.error(error);
  }

}


// ---------------------------------------- 
//            Create Chart Function
// ---------------------------------------- 

function createChart(type) {
  const ctx = document.getElementById('tempChart');

  if(type == "line" || type == "bar"){

 currentChart = new Chart(ctx, {
    type: type,
    data: {
      labels: ['Feel Like', 'Min Temp', 'Temp', 'Max Temp'],
      datasets: [{
        label: '# of Temperature',
        data: [23, 19, 20, 25],
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

}else{
  currentChart = new Chart(ctx, {
    type: type,
    data: {
      labels: ['Feel Like', 'Min Temp', 'Temp', 'Max Temp'],
      datasets: [{
        label: '# of Temperature',
        data: [23, 19, 20, 25],
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

createChart("bar");


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

