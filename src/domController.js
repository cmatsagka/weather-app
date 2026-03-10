export function updateWeatherUI(data, city, unit = 'C') {
	const tempElement = document.querySelector('#temp');
	const conditionElement = document.querySelector('#condition');
	const iconElement = document.querySelector('#weatherIcon');
	const cityName = document.querySelector('#cityName');
	city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

	iconElement.className = 'wi';
	const specificIconClass = iconClassMap[data.icon] || 'wi-na';
	iconElement.classList.add(specificIconClass);

	cityName.textContent = '';
	tempElement.textContent = '';
	conditionElement.textContent = '';
	iconElement.textContent = '';

	cityName.textContent = city;
	const tempValue = convertTemp(data.temp, unit);
	tempElement.textContent = `${Math.round(tempValue)}°${unit}`;
	conditionElement.textContent = `${data.condition}`;
}

function convertTemp(temp, unit) {
	return unit === 'C' ? temp : (temp * 9) / 5 + 32;
}

const iconClassMap = {
	snow: 'wi-snow',
	rain: 'wi-rain',
	fog: 'wi-fog',
	wind: 'wi-strong-wind',
	cloudy: 'wi-cloudy',
	'partly-cloudy-day': 'wi-day-cloudy',
	'partly-cloudy-night': 'wi-night-partly-cloudy',
	'clear-day': 'wi-day-sunny',
	'clear-night': 'wi-night-clear',
};
