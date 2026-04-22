import { getIs12HourFormat } from './getIs12HourFormat';

/**
 * Gets readable hour value
 * @param {number} hour value [0-23]
 * @param {boolean} is12HourFormat
 * @returns {string}
 */
function getHour(hour, is12HourFormat) {
  const length = is12HourFormat ? 1 : 2;
  const value = is12HourFormat ? hour % 12 || 12 : hour;
  return value.toString().padStart(length, '0');
}

/**
 * Gets readable hour value
 * @param {number} minute value [0-59]
 * @returns {string}
 */
function getMinute(minute) {
  return minute.toString().padStart(2, '0');
}

/**
 * Gets time postfix ('am' / 'pm' / '')
 * @param {number} hour value [0-23]
 * @param {boolean} is12HourFormat
 * @returns {string}
 */
function getPostfix(hour, is12HourFormat) {
  if (!is12HourFormat) {
    return '';
  }

  if (hour >= 12) {
    return 'pm';
  }

  return 'am';
}

/**
 * Gets current time string values
 * @param {HmSensorInstance} timeSensor
 */
export function getTimeTexts(timeSensor) {
  const { hour = 0, minute = 0 } = timeSensor;
  const is12HourFormat = getIs12HourFormat();

  return {
    hourText: getHour(hour, is12HourFormat),
    minuteText: getMinute(minute),
    postfixText: getPostfix(hour, is12HourFormat),
  };
}
