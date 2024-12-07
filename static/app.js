let temperature = document.querySelector("#temperature");
let history = document.querySelector("#history");
let threshold = document.querySelector('#threshold');
let notification = document.querySelector('#notification');
let duration = document.querySelector('#duration');

let lastTemp = -1;
let thresholdValue = -1;
let startTime = -1;

function updateTemperature(delay) {
    setInterval(async () => {
        const response = await fetch('/temperature');
        const data = await response.json();
        const currentTemp = parseInt(data.temperatures[0].temperature);
        temperature.innerHTML = currentTemp;
        data.temperatures = data.temperatures.map(e => {
            return `${e.timestamp} -> ${e.temperature}`;
        });
        history.innerHTML = `<li>${data.temperatures.join('</li><li>')}</li>`;

        if(currentTemp < thresholdValue && currentTemp < lastTemp) {
            showNotification();
        }
        lastTemp = currentTemp;

    }, delay);
}

updateTemperature(1000);

document.querySelector('#hide').addEventListener('click', hideNotification)

function showNotification() {
    if(notification.classList.contains('hidden')) {
        notification.classList.remove('hidden');
        duration.innerHTML = Math.round((Date.now() - startTime) / 1000);
    }
}

function hideNotification() {
    notification.classList.add('hidden');
}

threshold.addEventListener('change', () => {
    thresholdValue = parseInt(threshold.value);
    startTime = Date.now();
})