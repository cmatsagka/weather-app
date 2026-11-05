import {
	getHumidityCategory,
	getWindCategory,
	getUVCategory,
} from './utils.js';

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

export function renderGlobalShowcase(cityDataArray = [], unit = 'C') {
	const container = document.getElementById('global-showcase-container');
	const templateShowcase = document.getElementById('global-card-template');

	if (!container || !templateShowcase) return;

	container.querySelectorAll('.global-card').forEach((card) => card.remove());

	cityDataArray.forEach((data) => {
		const clone = templateShowcase.content.cloneNode(true);
		const cardButton = clone.querySelector('.global-card');
		const citySpan = clone.querySelector('.global-city');
		const conditionSpan = clone.querySelector('.global-condition');

		const city = data.cityName || data.city;
		const condition = data.condition || 'CLear';

		cardButton.setAttribute('data-city', city);
		citySpan.textContent = city;

		const tempVal =
			data.temp !== undefined
				? Math.round(convertTemp(data.temp, unit))
				: null;
		const tempStr = tempVal !== null ? `${tempVal}°${unit} • ` : '';
		conditionSpan.textContent = `${tempStr}${condition}`;

		container.appendChild(clone);
	});
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
	const humidityDesc = document.querySelector('#humidity-desc');

	const windSpeedElement = document.querySelector('#wind-speed');
	const windDesc = document.querySelector('#wind-desc');

	const uvIndexElement = document.querySelector('#uv-index');
	const uvDesc = document.querySelector('#uv-desc');

	const template = document.querySelector('#forecast-card-template');
	const rawCity = city || data.cityName || 'Unknown Location';
	const formattedCity =
		rawCity.charAt(0).toUpperCase() + rawCity.slice(1).toLowerCase();

	if (iconElement) {
		iconElement.className = 'wi';
		const specificIconClass = iconClassMap[data.icon] || 'wi-na';
		iconElement.classList.add(specificIconClass);
	}

	if (cityName) cityName.textContent = formattedCity;
	if (tempElement) {
		const tempValue = convertTemp(data.temp, unit);
		tempElement.textContent = `${Math.round(tempValue)} °${unit}`;
	}
	if (conditionElement) conditionElement.textContent = data.condition;

	if (humidityElement) {
		humidityElement.textContent = `${Math.round(data.humidity)} %`;
		if (humidityDesc) {
			humidityDesc.textContent = getHumidityCategory(data.humidity);
		}
	}

	if (windSpeedElement) {
		windSpeedElement.textContent = `${Math.round(data.windSpeed)} km/h`;
		if (windDesc) {
			windDesc.textContent = getWindCategory(data.windSpeed);
		}
	}

	if (uvIndexElement) {
		uvIndexElement.textContent = data.uvIndex;
		if (uvDesc) {
			uvDesc.textContent = getUVCategory(data.uvIndex);
		}
	}

	if (forecastContainer && template) {
		forecastContainer.textContent = '';

		data.forecast.slice(0, 7).forEach((day, index) => {
			const clone = template.content.cloneNode(true);
			const dateObj = new Date(day.datetime);

			const dayName =
				index === 0
					? 'Today'
					: dateObj.toLocaleDateString('en-US', {
							weekday: 'short',
						});

			clone.querySelector('.forecast-day').textContent = dayName;

			const iconEl = clone.querySelector('.forecast-icon');
			iconEl.className = 'forecast-icon wi';
			iconEl.classList.add(iconClassMap[day.icon] || 'wi-na');

			const maxTemp = Math.round(convertTemp(day.tempmax, unit));
			const minTemp = Math.round(convertTemp(day.tempmin, unit));

			clone.querySelector('.temp-min').textContent =
				`${minTemp}\u00A0°${unit}`;
			clone.querySelector('.temp-max').textContent =
				`${maxTemp}\u00A0°${unit}`;

			forecastContainer.appendChild(clone);
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
