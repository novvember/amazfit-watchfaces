/**
 * Gets and format time in 00:00 format
 * @param {Number} hour
 * @param {Number} minute
 * @returns {String}
 */
export function getTimeString(hour, minute, is12HourFormat = false) {
  if (!is12HourFormat) {
    const hoursText = hour.toString();
    const minsText = minute.toString().padStart(2, '0');
    return `${hoursText}:${minsText}`;
  }

  const isPm = hour > 11;
  hour = hour % 12 || 12;

  const hoursText = hour.toString();
  const minsText = minute.toString().padStart(2, '0');
  const postfix = isPm ? 'pm' : 'am';
  return `${postfix} ${hoursText}:${minsText}`;
}
