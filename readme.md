Here's a README file for your original weather dashboard project:

---

# Weather Dashboard

This project is a **Weather Dashboard** that uses the OpenWeather API to display current weather and a 5-day weather forecast for a given city. It also provides visual charts for weather data and additional functionalities to filter the forecast based on various parameters.

## Features

- Fetches **current weather** data from the OpenWeather API.
- Displays **5-day weather forecast** with visualizations using Chart.js.
- Three types of charts:
  - **Bar Chart**: Displays temperature variations over the forecast period.
  - **Doughnut Chart**: Shows the distribution of weather conditions.
  - **Line Chart**: Represents temperature changes over time.
- Additional features include filtering forecast data:
  - **Show temperatures in ascending/descending order**.
  - **Filter days with rain**.
  - **Display the day with the highest temperature**.

## Files

### 1. `index.html`
This is the main HTML file for the weather dashboard. It includes:
- A **side menu** for navigation.
- A **top bar** with an input field to enter the city name and a button to fetch weather data.
- A **weather widget** to display the current weather.
- Sections to display **charts** and **filtered results**.

### 2. `styles.css`
This file contains the styles for the layout and appearance of the weather dashboard:
- Defines the layout for the **side menu**, **main content**, and **charts**.
- Handles the layout for different screen sizes using **media queries** for responsiveness.
- Adds styling for buttons, inputs, and chart containers.

### 3. `app.js`
This file contains the logic and functionality of the weather dashboard:
- Uses **OpenWeather API** to fetch current weather and 5-day forecast data.
- Displays the weather data in various formats (text and charts).
- Utilizes **Chart.js** to create interactive bar, doughnut, and line charts for visualizing weather data.
- Provides **filtering functionalities** to display specific weather information such as temperatures in ascending/descending order or days with rain.

## How It Works

1. **Getting Weather Data**:
   - Users enter a city name in the input field and click the "Get Weather" button.
   - The app fetches the current weather and 5-day forecast for the city from the OpenWeather API.

2. **Displaying Weather Data**:
   - The current weather data is displayed in a **weather widget**.
   - Charts are dynamically generated to represent temperature changes and weather conditions over the 5-day period.

3. **Filtering Data**:
   - Users can click on the filter buttons to sort the temperatures or filter the forecast for specific conditions like rain or the highest temperature.

## Dependencies

- **OpenWeather API**: Used to fetch weather data. An API key is required to access this service.
- **Chart.js**: A JavaScript library used to create charts for visualizing the forecast data.

## Setup Instructions

1. Clone or download this repository to your local machine.
2. Open the `app.js` file and replace the placeholder `API_KEY` with your OpenWeather API key:
   ```javascript
   const API_KEY = 'your_openweather_api_key';
   ```
3. Open the `index.html` file in your browser to use the weather dashboard.

## API Usage

- The application sends two main API requests to the OpenWeather API:
  1. **Current Weather**: Fetches the current weather data for a city.
     - Endpoint: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric`
  2. **5-Day Forecast**: Fetches a 5-day weather forecast with 3-hour intervals.
     - Endpoint: `https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric`

## Charts

Three types of charts are generated using **Chart.js**:
1. **Bar Chart**: Displays the temperature for each day of the forecast.
2. **Doughnut Chart**: Shows the distribution of weather conditions (rainy, cloudy, sunny, etc.).
3. **Line Chart**: Displays temperature changes over time.

## Filtering Options

- **Ascending/Descending Temperatures**: Sorts the temperatures in ascending or descending order.
- **Rainy Days**: Filters and displays only the days with rain.
- **Highest Temperature**: Displays the day with the highest temperature during the forecast period.

## Future Improvements

- Add more filtering options or chart types for better data representation.
- Implement loading animations or error handling for smoother user experience.

---

This README provides a comprehensive overview of the project and guides the user through setting up, using, and understanding the functionality of the weather dashboard. Let me know if you'd like to add more details or adjust any sections!