/**
 * Checks is it night time
 * @param {Object} timeSensor
 * @returns {Boolean}
 */
export function isNight({ hour }) {
  if (hour >= 22 || hour <= 6) {
    return true;
  }

  return false;
}
