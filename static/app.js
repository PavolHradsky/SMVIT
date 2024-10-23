let temperature = document.querySelector("#temperature");

function updateTemperature(delay) {
    setInterval(async () => {
        const response = await fetch('/temperature');
        const data = await response.json();
        temperature.innerHTML = data.temperature;
    }, delay);
}

updateTemperature(1000);