export function updateWeatherUI(data, city, unit = 'C') {
	const weatherContainer = document.querySelector('#weatherData');
	weatherContainer.classList.remove('animate-fade');
	void weatherContainer.offsetWidth;

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

	cityName.textContent = city;
	const tempValue = convertTemp(data.temp, unit);
	tempElement.textContent = `${Math.round(tempValue)}°${unit}`;
	conditionElement.textContent = `${data.condition}`;

	weatherContainer.classList.add('animate-fade');

	const body = document.querySelector('body');
	let weatherMood = data.icon;
	if (data.icon.includes('cloudy')) weatherMood = 'cloudy';
	else if (data.icon.includes('rain') || data.icon.includes('shower'))
		weatherMood = 'rain';
	else if (data.icon.includes('clear')) weatherMood = 'clear';
	else if (data.icon.includes('snow')) weatherMood = 'snow';
	else if (data.icon.includes('fog') || data.icon.includes('mist'))
		weatherMood = 'fog';

	document.body.setAttribute('data-weather', weatherMood);
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
