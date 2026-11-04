export function getHumidityCategory(humidity) {
	if (humidity < 30) return 'Dry';
	if (humidity <= 60) return 'Comfortable';
	return 'Humid';
}

export function getWindCategory(speedKmH) {
	if (speedKmH < 5) return 'Calm';
	if (speedKmH <= 20) return 'Light Breeze';
	if (speedKmH <= 40) return 'Moderate Wind';
	return 'Strong Wind';
}

export function getUVCategory(uv) {
	if (uv <= 2) return 'Low';
	if (uv <= 5) return 'Moderate';
	if (uv <= 7) return 'High';
	if (uv <= 10) return 'Very High';
	return 'Extreme';
}
