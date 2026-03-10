import './styles.css';
import { getWeather } from './weatherAPI.js';
import { updateWeatherUI } from './domController.js';

async function handleSearch(city) {
	const data = await getWeather(city);
	if (data) {
		updateWeatherUI(data, city);
	}
	searchBtn.textContent = 'Search';
}

const searchBtn = document.querySelector('#search-btn');
const form = document.querySelector('#searchForm');
const input = document.querySelector('#cityInput');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const cityName = input.value;
	searchBtn.textContent = 'Searching...';

	handleSearch(cityName);
});
