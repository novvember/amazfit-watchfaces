/**
 * Returns current time state: is day or night and current percent ratio in this day time
 * @param {*} timeSensor - hmSensor.id.TIME
 * @param {*} timeSensor - hmSensor.id.WEATHER
 * @returns {Object}
 */
export function getCurrentTimePosition(timeSensor, weatherSensor) {
  const { hour, minute } = timeSensor;
  const forecastWeather = weatherSensor.getForecastWeather();
  const tideData = forecastWeather.tideData;

  const nowMins = hour * 60 + minute;
  let sunriseMins = 8 * 60;
  let sunsetMins = 20 * 60;

  if (tideData.count > 0) {
    const { sunrise, sunset } = tideData.data[0];
    sunriseMins = sunrise.hour * 60 + sunrise.minute;
    sunsetMins = sunset.hour * 60 + sunset.minute;
  }

  const isDay = nowMins >= sunriseMins && nowMins <= sunsetMins;

  let dayLength = 1;
  let nightLength = 1;

  if (sunsetMins > sunriseMins) {
    dayLength = sunsetMins - sunriseMins + 1;
    nightLength = 24 * 60 - dayLength;
  } else {
    nightLength = sunriseMins - sunsetMins + 1;
    dayLength = 24 * 60 - nightLength;
  }

  let ratio = 0.5;

  if (isDay && nowMins >= sunriseMins) {
    ratio = (nowMins - sunriseMins) / dayLength;
  } else if (isDay && nowMins < sunriseMins) {
    ratio = (nowMins + 24 * 60 - sunriseMins) / dayLength;
  } else if (!isDay && nowMins >= sunsetMins) {
    ratio = (nowMins - sunsetMins) / nightLength;
  } else {
    ratio = (nowMins + 24 * 60 - sunsetMins) / nightLength;
  }

  return {
    isDay,
    ratio,
  };
}
