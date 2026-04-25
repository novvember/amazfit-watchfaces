/**
 * Clamps the value between miniimum and maximum values
 * @param {Number} min - minimum possible value
 * @param {Number} value - actual value
 * @param {Number} max -maximum possible value
 * @returns {Number}
 */
export function clamp(min, value, max) {
  return Math.min(Math.max(min, value), max);
}
