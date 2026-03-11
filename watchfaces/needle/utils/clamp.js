/**
 * Clamps the value between miniimum and maximum values
 * @param {Number} minimum possible value
 * @param {Number} actual value 
 * @param {Number} maximum possible value
 * @returns {Number}
 */
export function clamp(min, value, max) {
  return Math.min(Math.max(min, value), max);
}
