import './styles.css';
import { getWeather } from './weatherAPI.js';

async function handleSearch(city) {
	const data = await getWeather(city);
	if (data) {
		updateWeatherUI(data);
	}
}
