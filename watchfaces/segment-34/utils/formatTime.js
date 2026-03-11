/**
 * Format time in HH:MM format
 * @param {Number} hour value
 * @param {Number} minute value
 * @param {Boolean} should be formated as 12-hour string
 * @param {Boolean} should format hour value with leading zero, like `09`
 * @param {Boolean} should have AM/PM at the end
 * @returns {String} HH:MM
 */
export function formatTime(
  hour,
  minute,
  is12HourFormat,
  hasLeadingZeroInHours,
  hasAmPm,
) {
  const hourMinLength = hasLeadingZeroInHours ? 2 : 1;
  const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
  const hourText = hourValue.toString().padStart(hourMinLength, '0');
  const minuteText = minute.toString().padStart(2, '0');
  const hasPostfix = is12HourFormat && hasAmPm;
  const postfix = hour >= 12 ? ' pm' : ' am';
  return `${hourText}:${minuteText}${hasPostfix ? postfix : ''}`;
}
