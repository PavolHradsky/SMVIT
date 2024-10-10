let temperature = document.querySelector("#temperature");

function Main(delay) {
    setInterval(async () => {
        const response = await fetch('/temperature');
        const data = await response.json();
        temperature.innerHTML = data.temperature;
    }, delay);
}

Main(1000);