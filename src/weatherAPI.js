//Note: In a production app, the API key would be handled via a backend
//proxy or environment variables to prevent exposure.
const apiKey = 'ATRZQUHP9DD8V55RUJYACGRT5';

async function fetchWeather(url) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const fetchedData = await response.json();

		const rawAddress = fetchedData.resolvedAddress || '';
		const isCoords = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(
			rawAddress.trim()
		);
		const cityName = isCoords ? 'Current Location' : rawAddress;

		const temp = fetchedData.currentConditions.temp;
		const condition = fetchedData.currentConditions.conditions;
		const icon = fetchedData.currentConditions.icon;
		const humidity = fetchedData.currentConditions.humidity;
		const windSpeed = fetchedData.currentConditions.windspeed;
		const uvIndex = fetchedData.currentConditions.uvindex;

		const forecast = fetchedData.days ? fetchedData.days.slice(0, 7) : [];

		return {
			cityName,
			temp,
			condition,
			icon,
			humidity,
			windSpeed,
			uvIndex,
			forecast,
		};
	} catch (error) {
		console.log('The fetch failed: ', error.message);
		return null;
	}
}

export async function getWeather(city) {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${apiKey}&contentType=json`;
	return await fetchWeather(url);
}

export async function getWeatherByCoords(lat, lon) {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}&contentType=json`;

	return await fetchWeather(url);
}
