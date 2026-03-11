/**
 * Gets sunrise/sunset times for current day
 * @param {Object} weatherSensor
 * @returns {[Number, Number]} sunrise ans sunset times in mimutes
 */
function getSunriseSunsetTimes(weatherSensor) {
  const { tideData } = weatherSensor.getForecastWeather();

  if (!tideData.count) {
    return [0, 0];
  }

  const { sunrise, sunset } = tideData.data[0] || {};

  if (!sunrise || !sunset) {
    return [0, 0];
  }

  const sunriseMinutes = sunrise.hour * 60 + sunrise.minute;
  const sunsetMinutes = sunset.hour * 60 + sunset.minute;

  return [sunriseMinutes, sunsetMinutes];
}

/**
 * Calculates difference between two timestamps in minutes
 * @param {Number} minute0 - first minute value
 * @param {Number} minute1 - last minute value
 * @returns {Number} - difference minute1 - minute0
 */
function calculateTimeDiff(minute0, minute1) {
  if (minute1 < minute0) {
    return 24 * 60 - minute0 + minute1;
  }

  return minute1 - minute0;
}

/**
 * Calculates current day daytime duration in minutes
 * @param {Object} weatherSensor
 * @returns {Number}
 */
export function getSunDayDuration(weatherSensor) {
  const [sunriseMinutes, sunsetMinutes] = getSunriseSunsetTimes(weatherSensor);
  return calculateTimeDiff(sunriseMinutes, sunsetMinutes);
}

/**
 * Calculates current sun position as ratio where 0 is astronomic midnight and 0.5 is astronomic noon
 * @param {Object} weatherSensor
 * @param {Object} timeSensor
 * @returns {Number}
 */
export function getSunPosition(weatherSensor, timeSensor) {
  const [sunriseMinutes, _sunsetMinutes] = getSunriseSunsetTimes(weatherSensor);
  const dayDuration = getSunDayDuration(weatherSensor);

  const noon = (sunriseMinutes + dayDuration / 2) % (24 * 60);
  const midnight = (noon + 12 * 60) % (24 * 60);

  const { hour, minute } = timeSensor;
  const now = 60 * hour + minute;

  return calculateTimeDiff(midnight, now) / (24 * 60);
}
