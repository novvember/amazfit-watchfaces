/**
 * Converts radian angle value to degrees
 * @param {number} rad - radian value
 * @returns {number} - degrees value
 */
export function radiansToDegrees(rad) {
  return (rad * 180) / Math.PI;
}

/**
 * Calculates angular length of element
 * @param {Number} r - radius of circle, where element is
 * @param {Number} length - size of elenet
 * @returns {Number} - angle in degrees
 */
export function calculateAnglularLength(r, length) {
  return radiansToDegrees(Math.acos((2 * r ** 2 - length ** 2) / (2 * r ** 2)));
}
