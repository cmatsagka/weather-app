const iconClassMap = {
	snow: 'wi-snow',
	rain: 'wi-rain',
	fog: 'wi-fog',
	'thunder-showers-day': 'wi-day-thunderstorm',
	'thunder-showers-night': 'wi-night-alt-thunderstorm',
	'thunder-rain': 'wi-thunderstorm',
	wind: 'wi-strong-wind',
	cloudy: 'wi-cloudy',
	'partly-cloudy-day': 'wi-day-cloudy',
	'partly-cloudy-night': 'wi-night-partly-cloudy',
	'clear-day': 'wi-day-sunny',
	'clear-night': 'wi-night-clear',
};

function convertTemp(temp, unit) {
	return unit === 'C' ? temp : (temp * 9) / 5 + 32;
}

export function updateWeatherUI(data, city, unit = 'C') {
	const weatherContainer = document.querySelector('#current-section');
	const metricsContainer = document.querySelector('#metrics-section');
	const forecastContainer = document.querySelector('#forecast-section');

	if (!weatherContainer) return;
	if (!metricsContainer) return;
	if (!forecastContainer) return;

	weatherContainer.classList.remove('animate-fade');
	void weatherContainer.offsetWidth;

	const tempElement = document.querySelector('#temp');
	const conditionElement = document.querySelector('#condition');
	const iconElement = document.querySelector('#weather-icon');
	const cityName = document.querySelector('#city-name');
	const humidityElement = document.querySelector('#humidity');
	const windSpeedElement = document.querySelector('#wind-speed');
	const uvIndexElement = document.querySelector('#uv-index');
	const forecastElement = document.querySelector('#forecast');

	const formattedCity =
		city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

	if (iconElement) {
		iconElement.className = 'wi';
		const specificIconClass = iconClassMap[data.icon] || 'wi-na';
		iconElement.classList.add(specificIconClass);
	}

	if (cityName) cityName.textContent = formattedCity;
	if (tempElement) {
		const tempValue = convertTemp(data.temp, unit);
		tempElement.textContent = `${Math.round(tempValue)}°${unit}`;
	}
	if (conditionElement) conditionElement.textContent = data.condition;

	if (humidityElement)
		humidityElement.textContent = `${Math.round(data.humidity)} %`;
	if (windSpeedElement)
		windSpeedElement.textContent = `${Math.round(data.windSpeed)} km/h`;
	if (uvIndexElement) uvIndexElement.textContent = data.uvIndex;

	if (forecastElement) {
		forecastElement.textContent = '';

		data.forecast.forEach((day) => {
			day.datetime = new Date(day.datetime);
		});
	}

	let weatherMood = data.icon;

	if (data.icon.includes('night')) {
		weatherMood = data.icon;
	} else if (data.icon.includes('thunder') || data.icon.includes('storm')) {
		weatherMood = 'storm';
	} else if (data.icon.includes('rain') || data.icon.includes('showers')) {
		weatherMood = 'rain';
	} else if (data.icon.includes('cloudy')) {
		weatherMood = 'cloudy';
	} else if (data.icon.includes('clear')) {
		weatherMood = 'clear';
	} else if (data.icon.includes('snow')) {
		weatherMood = 'snow';
	} else if (data.icon.includes('fog') || data.icon.includes('mist')) {
		weatherMood = 'fog';
	}

	document.body.setAttribute('data-weather', weatherMood);
	weatherContainer.classList.add('animate-fade');
}
