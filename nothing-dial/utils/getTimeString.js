/**
 * Gets and format time in 00:00 format
 * @param {*} timeSensor - hmSensor.id.TIME
 * @returns {String}
 */
export function getTimeString(timeSensor) {
  const { hour, minute } = timeSensor;
  const hoursText = hour.toString().padStart(2, '0');
  const minsText = minute.toString().padStart(2, '0');
  return `${hoursText}:${minsText}`;
}
