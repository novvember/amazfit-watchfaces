const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/**
 * Gets current day of week.
 * @param {import('@zos/sensor').Time} timeSensor
 * @returns {string}
 */
export function getWeekDay(timeSensor) {
  return WEEKDAYS[timeSensor.getDay() - 1];
}
