let temperature = document.querySelector("#temperature");
let history = document.querySelector("#history");

function updateTemperature(delay) {
    setInterval(async () => {
        const response = await fetch('/temperature');
        const data = await response.json();
        temperature.innerHTML = data.temperature[0];
        history.innerHTML = `<li>${data.temperature.join('</li><li>')}</li>`;
    }, delay);
}

updateTemperature(1000);