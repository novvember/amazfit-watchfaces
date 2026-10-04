import { TIME_HOUR_FORMAT_12 } from '@zos/sensor';
import {
  getHourNoLeadingZeroText,
  getHourText,
  getMinuteText,
  getPostfixText,
} from '../utils/time';

/**
 * Gets current time string values.
 * @param {import('@zos/sensor').Time} timeSensor
 * @returns {{ hourText: string, hourNoLeadingZeroText: string, minuteText: string, postfixText: string }}
 */
export function getTimeTexts(timeSensor) {
  const hour = timeSensor.getHours();
  const minute = timeSensor.getMinutes();
  const is12HourFormat = timeSensor.getHourFormat() === TIME_HOUR_FORMAT_12;

  return {
    hourText: getHourText(hour, is12HourFormat),
    hourNoLeadingZeroText: getHourNoLeadingZeroText(hour, is12HourFormat),
    minuteText: getMinuteText(minute),
    postfixText: getPostfixText(hour, is12HourFormat),
  };
}
