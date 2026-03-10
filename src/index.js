import './styles.css';
import 'weather-icons/css/weather-icons.css';
import { getWeather } from './weatherAPI.js';
import { updateWeatherUI } from './domController.js';

let currentWeatherData = null;
let currentUnit = 'C';
let currentCity = null;

async function handleSearch(city) {
	const content = document.querySelector('#content');
	const body = document.body;

	content.classList.add('loading-blur');
	body.classList.add('is-fetching');

	const data = await getWeather(city);
	if (data) {
		currentWeatherData = data;
		currentCity = city;
		updateWeatherUI(currentWeatherData, city, currentUnit);
	}

	content.classList.remove('loading-blur');
	body.classList.remove('is-fetching');

	searchBtn.textContent = 'Search';
	searchBtn.disabled = false;
}

const searchBtn = document.querySelector('#search-btn');
const form = document.querySelector('#searchForm');
const input = document.querySelector('#cityInput');
const toggleBtn = document.querySelector('#unitToggle');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const cityName = input.value;
	searchBtn.textContent = 'Searching...';
	searchBtn.disabled = true;

	handleSearch(cityName);
});

toggleBtn.addEventListener('click', () => {
	currentUnit = currentUnit === 'C' ? 'F' : 'C';
	toggleBtn.textContent = currentUnit === 'C' ? 'Display °F' : 'Display °C';
	const cityName = input.value;
	if (currentWeatherData) {
		updateWeatherUI(currentWeatherData, currentCity, currentUnit);
	}
});
