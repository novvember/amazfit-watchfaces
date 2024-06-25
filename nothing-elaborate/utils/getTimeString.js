/**
 * Gets and format time in 00:00 format
 * @param {*} timeSensor - hmSensor.id.TIME
 * @returns {String}
 */
export function getTimeString(timeSensor, is12HourFormat = false) {
  let { hour, minute } = timeSensor;

  if (!is12HourFormat) {
    const hoursText = hour.toString().padStart(2, '0');
    const minsText = minute.toString().padStart(2, '0');
    return `${hoursText}:${minsText}`;
  }

  const isPm = hour > 11;
  hour = hour % 12 || 12;

  const hoursText = hour.toString().padStart(2, '0');
  const minsText = minute.toString().padStart(2, '0');
  const postfix = isPm ? 'PM' : 'AM';
  return `${hoursText}:${minsText} ${postfix}`;
}
