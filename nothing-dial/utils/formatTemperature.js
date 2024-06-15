/**
 * Formats temperature value to a nice string with prefix and postfix
 * @param {Number} degrees
 * @returns {String} string in format '+25°C'
 */
export function formatTemperature(degrees) {
  const prefix = degrees > 0 ? '+' : '';
  const postfix = '°C';

  return `${prefix}${degrees}${postfix}`;
}
