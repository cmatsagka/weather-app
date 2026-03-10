export function updateWeatherUI(data, city) {
	const tempElement = document.querySelector('#temp');
	const conditionElement = document.querySelector('#condition');
	const iconElement = document.querySelector('#icon');
	const cityName = document.querySelector('#cityName');

	cityName.textContent = city;
	tempElement.textContent = `${data.temp}`;
	conditionElement.textContent = `${data.condition}`;
	iconElement.textContent = `${data.icon}`;
}
