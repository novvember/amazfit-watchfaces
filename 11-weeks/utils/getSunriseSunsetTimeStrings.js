/**
 * Gets today sunrise/sunset time and formats it
 * @param {Object} weatherSensor
 * @param {Boolean} is12HourFormat
 * @returns {[String, String]} [sunriseTime, sunsetTime]
 */
export function getSunriseSunsetTimeStrings(weatherSensor, is12HourFormat) {
  const { tideData } = weatherSensor.getForecastWeather();

  if (!tideData.count) {
    return ['', ''];
  }

  const { sunrise, sunset } = tideData.data[0] || {};

  if (!sunrise || !sunset) {
    return ['', ''];
  }

  const formatTime = (hour, minute, is12HourFormat) => {
    const hourText = (is12HourFormat ? hour % 12 || 12 : hour).toString();
    const minuteText = minute.toString().padStart(2, '0');
    return `${hourText}:${minuteText}`;
  }

  return [
    formatTime(sunrise.hour, sunrise.minute, is12HourFormat),
    formatTime(sunset.hour, sunset.minute, is12HourFormat),
  ];
}
