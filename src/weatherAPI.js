//Note: In a production app, the API key would be handled via a backend
//proxy or environment variables to prevent exposure.
const apiKey = 'ATRZQUHP9DD8V55RUJYACGRT5';

export async function getWeather(city) {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const fetchedData = await response.json();
		const current = fetchedData.currentConditions;

		const temp = fetchedData.currentConditions.temp;
		const condition = fetchedData.currentConditions.conditions;
		const icon = fetchedData.currentConditions.icon;
		const humidity = fetchedData.currentConditions.humidity;
		const windSpeed = fetchedData.currentConditions.windspeed;
		const uvIndex = fetchedData.currentConditions.uvindex;

		const forecast = fetchedData.days ? fetchedData.days.slice(0, 7) : [];

		return {
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
