// API endpoint for the NWS forecast
const url = 'https://api.weather.gov/gridpoints/GRR/82,39/forecast';

// Select the HTML container to display results
const container = document.querySelector(".container");

// Run everything immediately
doTheWholeThing();

async function doTheWholeThing() {
	try {
		// Get weather data
		const data = await getData();
		console.log("Raw Data:", data);

		// Process forecast data into HTML
		const result = processData(data.properties.periods);

		// Show the forecast in the container
		container.innerHTML = result;

	} catch (error) {
		console.error("Error:", error);
		container.innerHTML = `<p class="error">Failed to load weather data. Please try again later.</p>`;
	}
}

// Fetch data from the API
async function getData() {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`An error occurred: ${response.status}`);
	}

	const json = await response.json();
	return json;
}

// Turn the data into HTML elements
function processData(periods) {
	const formattedData = periods.map(period => {
		return (`
			<div class="forecast-item">
				<h2>${period.name}</h2>
				<p><strong>Temperature:</strong> ${period.temperature}°${period.temperatureUnit}</p>
				<p><strong>Wind:</strong> ${period.windSpeed} ${period.windDirection}</p>
				<p><strong>Forecast:</strong> ${period.shortForecast}</p>
			</div>
		`);
	}).join("");

	return formattedData;
}
