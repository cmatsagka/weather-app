export function updateWeatherUI(data) {
	const tempElement = document.querySelector('#temp');
	const conditionElement = document.querySelector('#condition');
	const iconElement = document.querySelector('#icon');

	tempElement.textContent = `${data.temp}`;
	conditionElement.textContent = `${data.condition}`;
	iconElement.textContent = `${data.icon}`;
}
