/**
 * Formats number with deviders, e. g. '17.576'
 * @param {Number} number
 * @param {String} devider
 * @returns {String}
 */
export function formatNumber(number, devider = '.') {
  const digits = number.toString().split('').reverse();

  if (digits.length < 5) {
    return number.toString();
  }

  const chars = [];

  for (let i = 0; i < digits.length; i++) {
    chars.push(digits[i]);

    if (i % 3 === 2) {
      chars.push(devider);
    }
  }

  return chars.reverse().join('');
}
