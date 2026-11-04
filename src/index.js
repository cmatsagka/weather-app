import './styles.css';
import 'weather-icons/css/weather-icons.css';
import { getWeather, getWeatherByCoords } from './weatherAPI.js';
import { updateWeatherUI } from './domController.js';

let currentWeatherData = null;
let currentUnit = 'C';
let currentCity = null;

const searchBtn = document.querySelector('#search-btn');
const form = document.querySelector('#search-form');
const input = document.querySelector('#city-input');
const toggleBtn = document.querySelector('#unit-toggle');
const currentSection = document.querySelector('#current-section');

document.addEventListener('DOMContentLoaded', () => {
	initApp();
});

async function initApp() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;
				const data = await getWeatherByCoords(latitude, longitude);
				if (data) {
					currentWeatherData = data;
					currentCity = data.cityName;
					updateWeatherUI(data, currentCity, currentUnit);

					if (data.cityName !== 'Current Location') {
						const cleanCity = data.cityName.split(',')[0].trim();
						localStorage.setItem('aura_last_city', cleanCity);
					}
				}
			},
			async (error) => {
				console.warn(
					'Geolocation permission denied or unavailable. Falling back to default city.'
				);
				await loadFallbackCity();
			},
			{
				timeout: 10000,
				maximumAge: 0,
			}
		);
	} else {
		await loadFallbackCity();
	}
}

async function loadFallbackCity() {
	const savedCity = localStorage.getItem('aura_last_city');
	const targetCity = savedCity || 'Athens';

	const data = await getWeather(targetCity);
	if (data) {
		currentWeatherData = data;
		currentCity = targetCity;
		updateWeatherUI(data, currentCity, currentUnit);
	}
}

async function handleSearch(city) {
	if (!currentSection) return;

	const body = document.body;

	currentSection.classList.add('loading-blur');
	body.classList.add('is-fetching');

	const data = await getWeather(city);
	if (data) {
		currentWeatherData = data;
		currentCity = city;
		localStorage.setItem('aura_last_city', city);
		updateWeatherUI(currentWeatherData, currentCity, currentUnit);
	}

	currentSection.classList.remove('loading-blur');
	body.classList.remove('is-fetching');

	if (searchBtn) {
		searchBtn.classList.remove('is-loading');
		searchBtn.disabled = false;
	}
}

if (form && input) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const cityName = input.value.trim();
		if (!cityName) return;

		if (searchBtn) {
			searchBtn.classList.add('is-loading');
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
