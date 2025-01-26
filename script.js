
console.log("Jai Shree Shyam Baba ❤🙏");



async function getWeather(){
    const cityName = document.getElementById("cityName").value;

    const API_KEY = "6f1ad9775d3cdc8ad9ea341dbf97abe7";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data.cod);
    } catch (error) {
        console.error(error);
    }

}