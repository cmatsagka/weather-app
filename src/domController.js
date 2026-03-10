export function updateWeatherUI(data) {
	const tempElement = document.querySelector('#temp');
	const conditionElement = document.querySelector('#condition');

	tempElement.textContent = `${data.temp}`;
	conditionElement.textContent = `${data.condition}`;
}
