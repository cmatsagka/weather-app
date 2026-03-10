export function updateWeatherUI(data, city, unit = 'C') {
	const tempElement = document.querySelector('#temp');
	const conditionElement = document.querySelector('#condition');
	const iconElement = document.querySelector('#icon');
	const cityName = document.querySelector('#cityName');
	city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

	cityName.textContent = '';
	tempElement.textContent = '';
	conditionElement.textContent = '';
	iconElement.textContent = '';

	cityName.textContent = city;
	const tempValue = convertTemp(data.temp, unit);
	tempElement.textContent = `${Math.round(tempValue)}°${unit}`;
	conditionElement.textContent = `${data.condition}`;
	iconElement.textContent = `${data.icon}`;
}

function convertTemp(temp, unit) {
	return unit === 'C' ? temp : (temp * 9) / 5 + 32;
}
