/**
 * Format time in HH:MM format
 * @param {Number} hour value
 * @param {Number} minute value
 * @param {Boolean} should be formated as 12-hour string
 * @param {Boolean} should has leading zero in hour value
 * @returns {String} HH:MM
 */
export function formatTime(hour, minute, is12HourFormat, hasLeadingZero) {
  let hourText = (is12HourFormat ? hour % 12 || 12 : hour).toString();

  if (hasLeadingZero) {
    hourText = hourText.padStart(2, '0');
  }

  const minuteText = minute.toString().padStart(2, '0');
  return `${hourText}:${minuteText}`;
}
