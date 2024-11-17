/**
 * Calculates closest sun time (will it be sunset or sunrise) and its time in minutes
 * @param {*} timeSensor - hmSensor.id.TIME
 * @param {*} timeSensor - hmSensor.id.WEATHER
 * @returns {Object}
 */
export function getClosestSunriseSunsetTime(timeSensor, weatherSensor) {
  const { hour, minute } = timeSensor;
  const forecastWeather = weatherSensor.getForecastWeather();
  const tideData = forecastWeather.tideData;

  if (!tideData.count) {
    return;
  }

  const nowMins = hour * 60 + minute;
  const { sunrise, sunset } = tideData.data[0] || {};
  const sunriseMins = sunrise.hour * 60 + sunrise.minute;
  const sunsetMins = sunset.hour * 60 + sunset.minute;

  const isDay = nowMins >= sunriseMins && nowMins <= sunsetMins;
  const type = isDay ? 'sunset' : 'sunrise';
  const obj = isDay ? sunset : sunrise;

  return {
    type,
    hour: obj.hour,
    minute: obj.minute,
  };
}
