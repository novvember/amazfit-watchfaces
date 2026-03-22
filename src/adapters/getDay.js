/**
 * Gets current day
 * @param {HmSensorInstance} timeSensor 
 * @returns {number}
 */
export function getDay(timeSensor) {
  const { day = 0 } = timeSensor;
  return day;
}
