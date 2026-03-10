import './styles.css';
import { getWeather } from './weatherAPI.js';
import { updateWeatherUI } from './domController.js';

let currentWeatherData = null;
let currentUnit = 'C';

async function handleSearch(city) {
	const data = await getWeather(city);
	if (data) {
		currentWeatherData = data;
		updateWeatherUI(currentWeatherData, city, currentUnit);
	}
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
	if (currentWeatherData) {
		updateWeatherUI(currentWeatherData, input.value, currentUnit);
	}
});
