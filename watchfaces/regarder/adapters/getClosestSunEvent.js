import { formatTime } from '../utils/formatTime';
import { getIs12HourFormat } from './getIs12HourFormat';

export function getClosestSunEvent(weatherSensor, timeSensor) {
  const { hour, minute } = timeSensor;
  const forecastWeather = weatherSensor.getForecastWeather();
  const tideData = forecastWeather.tideData;

  if (!tideData.count) {
    return;
  }

  const is12HourFormat = getIs12HourFormat();

  const nowMins = hour * 60 + minute;
  const { sunrise, sunset } = tideData.data[0] || {};
  const sunriseMins = sunrise.hour * 60 + sunrise.minute;
  const sunsetMins = sunset.hour * 60 + sunset.minute;

  const isDay = nowMins >= sunriseMins && nowMins <= sunsetMins;
  const type = isDay ? 'sunset' : 'sunrise';
  const obj = isDay ? sunset : sunrise;

  return {
    type,
    time: formatTime(obj.hour, obj.minute, is12HourFormat),
  };
}
