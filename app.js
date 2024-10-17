const API_KEY = 'badc7a2ba68b7b9552793edaf21a3cb4';

let barChart, doughnutChart, lineChart;
let forecastData;

// Event listener for "Get Weather" button
document.getElementById('get-weather-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (!city) return alert('Please enter a city name');
    
    try {
        const currentWeather = await getWeather(city);
        forecastData = await getForecast(city);  // Store forecast data globally
        displayWeatherData(currentWeather);
        displayForecastCharts(forecastData);
        displayForecastTable(forecastData);
    } catch (error) {
        alert('Error fetching data');
        console.error(error);
    }
});

// Function to fetch current weather data using OpenWeather API
async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error('City not found');
    return response.json();
}

// Function to fetch 5-day weather forecast using OpenWeather API
async function getForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error('City not found');
    return response.json();
}

// Function to display current weather data on the webpage
function displayWeatherData(weatherData) {
    const weatherWidget = document.getElementById('weather-widget');
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    weatherWidget.innerHTML = `
        <img src="${weatherIconUrl}" alt="Weather icon" class="weather-icon">
        <div>
            <h2>${weatherData.name}</h2>
            <p>Temperature: ${weatherData.main.temp}°C</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
            <p>Condition: ${weatherData.weather[0].description}</p>
        </div>
    `;
}

// Function to display charts using Chart.js
function displayForecastCharts(forecastData) {
    const labels = forecastData.list.map(item => new Date(item.dt_txt).toLocaleDateString());
    const temperatures = forecastData.list.map(item => item.main.temp);
    
    if (barChart) barChart.destroy();
    if (doughnutChart) doughnutChart.destroy();
    if (lineChart) lineChart.destroy();

    // Vertical Bar Chart
    barChart = new Chart(document.getElementById('bar-chart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                delay: 500
            }
        }
    });

    // Doughnut Chart for weather conditions
    const conditions = forecastData.list.map(item => item.weather[0].main);
    const conditionsCount = {};
    conditions.forEach(condition => conditionsCount[condition] = (conditionsCount[condition] || 0) + 1);
    
    doughnutChart = new Chart(document.getElementById('doughnut-chart'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(conditionsCount),
            datasets: [{
                label: 'Weather Conditions',
                data: Object.values(conditionsCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                delay: 500
            }
        }
    });

    // Line Chart for temperature changes
    lineChart = new Chart(document.getElementById('line-chart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(255, 99, 132, 0.8)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutBounce'
            }
        }
    });

    // Show only bar chart initially
    document.getElementById('bar-chart').style.display = 'block';
}

// FILTER FUNCTIONALITY BELOW

// Show temperatures in ascending order
document.getElementById('ascending-temp-btn').addEventListener('click', () => {
    if (!forecastData) return alert('Please get weather data first');
    const sortedTemps = forecastData.list.slice().sort((a, b) => a.main.temp - b.main.temp);
    displayFilteredResults(sortedTemps);
});

// Show temperatures in descending order
document.getElementById('descending-temp-btn').addEventListener('click', () => {
    if (!forecastData) return alert('Please get weather data first');
    const sortedTemps = forecastData.list.slice().sort((a, b) => b.main.temp - a.main.temp);
    displayFilteredResults(sortedTemps);
});

// Filter out days without rain
document.getElementById('filter-rain-btn').addEventListener('click', () => {
    if (!forecastData) return alert('Please get weather data first');
    const rainyDays = forecastData.list.filter(item => item.weather[0].description.toLowerCase().includes('rain'));
    displayFilteredResults(rainyDays);
});

// Show the day with the highest temperature
document.getElementById('highest-temp-btn').addEventListener('click', () => {
    if (!forecastData) return alert('Please get weather data first');
    const highestTempDay = forecastData.list.reduce((max, item) => item.main.temp > max.main.temp ? item : max, forecastData.list[0]);
    displayFilteredResults([highestTempDay]);
});

// Function to display filtered results in the new section
function displayFilteredResults(data) {
    const resultsTable = document.getElementById('filtered-results-table');
    let tableHTML = `<table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Temperature (°C)</th>
                                <th>Condition</th>
                            </tr>
                        </thead>
                        <tbody>`;
    data.forEach(item => {
        tableHTML += `<tr>
                        <td>${new Date(item.dt_txt).toLocaleDateString()}</td>
                        <td>${item.main.temp}°C</td>
                        <td>${item.weather[0].description}</td>
                    </tr>`;
    });
    tableHTML += `</tbody></table>`;
    resultsTable.innerHTML = tableHTML;
}
