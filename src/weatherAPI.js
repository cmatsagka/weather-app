const apiKey = 'ATRZQUHP9DD8V55RUJYACGRT5';

export async function getWeather(city) {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const fetchedData = await response.json();
		console.log('Success: ', fetchedData.currentConditions);
		const temp = fetchedData.currentConditions.temp;
		const condition = fetchedData.currentConditions.conditions;
		const icon = fetchedData.currentConditions.icon;

		return { temp, condition, icon };
	} catch (error) {
		console.log('The fetch failed: ', error.message);
		return null;
	}
}
