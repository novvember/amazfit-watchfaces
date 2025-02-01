/**
 * Formats number value to a string with spaces
 * @param {Number} number
 * @param {String} group devider
 * @returns {String}
 */
export function formatNumber(number, devider = ' ') {
  const string = number.toString();

  if (string.length < 5) {
    return string;
  }

  return string.replace(/\B(?=(\d{3})+(?!\d))/g, devider);
}
