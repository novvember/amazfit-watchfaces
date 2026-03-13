import { getCharSrc } from './getCharSrc';

/**
 * @param {String} color - color scheme for cahracters
 * @returns Array of digits 0-9 that can be used for Zepp widgets
 */
export function getDigitsArray(color) {
  return new Array(10).fill(null).map((_, i) => getCharSrc(i, color));
}
