import './styles.css';
import { getWeather } from './weatherAPI.js';
import { updateWeatherUI } from './domController.js';

async function handleSearch(city) {
	const data = await getWeather(city);
	if (data) {
		updateWeatherUI(data);
	}
}

const form = document.querySelector('#searchForm');
const input = document.querySelector('#cityInput');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const cityName = input.value;
	handleSearch(cityName);
});
