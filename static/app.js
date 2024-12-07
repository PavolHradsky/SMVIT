let temperature = document.querySelector("#temperature");
let history = document.querySelector("#history");
let threshold = document.querySelector('#threshold');
let notification = document.querySelector('#notification');

let lastTemp = -1;
let thresholdValue = -1;

function updateTemperature(delay) {
    setInterval(async () => {
        const response = await fetch('/temperature');
        const data = await response.json();
        const currentTemp = parseInt(data.temperatures[0]);
        temperature.innerHTML = currentTemp;
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
    notification.classList.remove('hidden');
}

function hideNotification() {
    notification.classList.add('hidden');
}

threshold.addEventListener('change', () => {
    thresholdValue = parseInt(threshold.value);
})