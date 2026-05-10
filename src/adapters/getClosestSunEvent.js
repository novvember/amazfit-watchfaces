import {
  getHourText,
  getMinuteText,
  getPostfixText,
  getTimeText,
} from '../utils/time';
import { getIs12HourFormat } from './getIs12HourFormat';

/**
 * Gets closest sunrise or sunset time
 * @param {HmSensorInstance} weatherSensor
 * @param {HmSensorInstance} timeSensor
 */
export function getClosestSunEvent(weatherSensor, timeSensor) {
  const { hour = 0, minute = 0 } = timeSensor;
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
  const { hour: sunHour, minute: sunMinute } = isDay ? sunset : sunrise;

  return {
    type,

    hourValue: sunHour,
    minuteValue: sunMinute,

    hourText: getHourText(sunHour, is12HourFormat),
    minuteText: getMinuteText(sunMinute),
    postfixText: getPostfixText(sunHour, is12HourFormat),
    timeText: getTimeText(sunHour, sunMinute, is12HourFormat),
  };
}
