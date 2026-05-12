/**
 * Gets readable hour number value
 * @param {number} hour value [0-23]
 * @param {boolean} is12HourFormat
 * @returns {number}
 */
export function getHourValue(hour, is12HourFormat) {
  return is12HourFormat ? hour % 12 || 12 : hour;
}

/**
 * Gets readable hour value
 * @param {number} hour value [0-23]
 * @param {boolean} is12HourFormat
 * @returns {string}
 */
export function getHourText(hour, is12HourFormat) {
  const length = is12HourFormat ? 1 : 2;
  return getHourValue(hour, is12HourFormat)
    .toString()
    .padStart(length, '0');
}

/**
 * Gets readable hour value (without any leading zero)
 * @param {number} hour value [0-23]
 * @param {boolean} is12HourFormat
 * @returns {string}
 */
export function getHourNoLeadingZeroText(hour, is12HourFormat) {
  return getHourValue(hour, is12HourFormat).toString();
}

/**
 * Gets readable hour value
 * @param {number} minute value [0-59]
 * @returns {string}
 */
export function getMinuteText(minute) {
  return minute.toString().padStart(2, '0');
}

/**
 * Gets time postfix ('am' / 'pm' / '')
 * @param {number} hour value [0-23]
 * @param {boolean} is12HourFormat
 * @returns {string}
 */
export function getPostfixText(hour, is12HourFormat) {
  if (!is12HourFormat) {
    return '';
  }

  if (hour >= 12) {
    return 'pm';
  }

  return 'am';
}

/**
 * Gets readable hour:minute value
 * @param {number} hour value [0-23]
 * @param {number} minute value [0-59]
 * @param {boolean} is12HourFormat
 * @returns {string}
 */
export function getTimeText(hour, minute, is12HourFormat) {
  const hourText = getHourText(hour, is12HourFormat);
  const minuteText = getMinuteText(minute);
  return `${hourText}:${minuteText}`;
}
