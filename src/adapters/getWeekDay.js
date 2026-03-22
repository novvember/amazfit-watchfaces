const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/**
 * Gets current day of week
 * @param {HmSensorInstance} timeSensor 
 * @returns {String}
 */
export function getWeekDay(timeSensor) {
  const { week = 1 } = timeSensor;
  return WEEKDAYS[week - 1];
}
