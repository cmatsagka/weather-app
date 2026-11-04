import './styles.css';
import 'weather-icons/css/weather-icons.css';
import { getWeather } from './weatherAPI.js';
import { updateWeatherUI } from './domController.js';

let currentWeatherData = null;
let currentUnit = 'C';
let currentCity = null;

const searchBtn = document.querySelector('#search-btn');
const form = document.querySelector('#search-form');
const input = document.querySelector('#city-input');
const toggleBtn = document.querySelector('#unit-toggle');
const currentSection = document.querySelector('#current-section');

async function handleSearch(city) {
	if (!currentSection) return;

	const body = document.body;

	currentSection.classList.add('loading-blur');
	body.classList.add('is-fetching');

	const data = await getWeather(city);
	if (data) {
		currentWeatherData = data;
		currentCity = city;
		updateWeatherUI(currentWeatherData, city, currentUnit);
	}

	currentSection.classList.remove('loading-blur');
	body.classList.remove('is-fetching');

	if (searchBtn) {
		searchBtn.textContent = 'Search';
		searchBtn.disabled = false;
	}
}

if (form && input) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const cityName = input.value.trim();
		if (!cityName) return;

		if (searchBtn) {
			searchBtn.textContent = 'Searching...';
			searchBtn.disabled = true;
		}

		handleSearch(cityName);
	});
}

if (toggleBtn) {
	toggleBtn.addEventListener('click', () => {
		currentUnit = currentUnit === 'C' ? 'F' : 'C';
		toggleBtn.textContent =
			currentUnit === 'C' ? 'Display °F' : 'Display °C';
		if (currentWeatherData && currentCity) {
			updateWeatherUI(currentWeatherData, currentCity, currentUnit);
		}
	});
}
