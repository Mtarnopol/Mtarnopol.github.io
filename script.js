// Weather API endpoints (GRR = Grand Rapids, MI)
const url = "https://api.weather.gov/gridpoints/GRR/82,39/";
const forecast = "https://api.weather.gov/gridpoints/GRR/82,39/forecast";
const hourly = "https://api.weather.gov/gridpoints/GRR/82,39/forecast/hourly";

// the html container
const container = document.querySelector(".container");

// immediately call the main function
doTheWholeThing();

async function doTheWholeThing() {
  try {
    const data = await getData();
    console.log("Fetched data:", data);

    // Get the current (first) forecast period
    const currentWeather = data.properties?.periods?.[0];
    console.log("Current weather:", currentWeather);

    // Display it
    const result = processData(currentWeather);
    container.innerHTML = result;

    // Change CSS based on conditions
    applyWeatherTheme(currentWeather.shortForecast);

  } catch (err) {
    console.error("Error:", err);
    container.innerHTML = `<p>Failed to load weather data. Please try again later.</p>`;
  }
}

// fetch data
async function getData() {
  const response = await fetch(forecast, {
    headers: { "Accept": "application/geo+json" }
  });

  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }

  const json = await response.json();
  return json;
}

// create HTML for the current forecast
function processData(period) {
  if (!period) return "<p>No current weather data available.</p>";

  return `
    <div class="current-weather">
      <h2>Current Weather</h2>
      <p><strong>${period.name}</strong>: ${period.shortForecast}</p>
      <p>Temperature: ${period.temperature}°${period.temperatureUnit}</p>
      <p>Wind: ${period.windSpeed} ${period.windDirection}</p>
    </div>
  `;
}

// dynamically change background or CSS based on weather
function applyWeatherTheme(condition) {
  condition = condition.toLowerCase();
  const body = document.body;

  body.className = ""; // clear previous classes

  if (condition.includes("sunny") || condition.includes("clear")) {
    body.classList.add("sunny");
  } else if (condition.includes("rain") || condition.includes("showers")) {
    body.classList.add("rainy");
  } else if (condition.includes("cloud")) {
    body.classList.add("cloudy");
  } else if (condition.includes("snow")) {
    body.classList.add("snowy");
  } else if (condition.includes("fog") || condition.includes("mist")) {
    body.classList.add("foggy");
  } else {
    body.classList.add("default-weather");
  }
}


