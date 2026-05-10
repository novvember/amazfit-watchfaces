import { getHourText, getMinuteText, getPostfixText } from '../utils/time';
import { getIs12HourFormat } from './getIs12HourFormat';

/**
 * Gets current time string values
 * @param {HmSensorInstance} timeSensor
 */
export function getTimeTexts(timeSensor) {
  const { hour = 0, minute = 0 } = timeSensor;
  const is12HourFormat = getIs12HourFormat();

  return {
    hourText: getHourText(hour, is12HourFormat),
    minuteText: getMinuteText(minute),
    postfixText: getPostfixText(hour, is12HourFormat),
  };
}
