/**
 * Converts radian angle value to degrees
 * @param {number} rad - radian value
 * @returns {number} - degrees value
 */
export function radiansToDegrees(rad) {
  return (rad * 180) / Math.PI;
}

/**
 * Converts degrees angle value to radian
 * @param {number} deg - degrees value
 * @returns {number} - radian value
 */
export function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}
