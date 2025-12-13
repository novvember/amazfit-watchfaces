/**
 * Transforms seconds time value to angle of second hand
 * @param {Number} seconds
 * @returns {Number}
 */
export function getAngleFromSeconds(seconds) {
  return seconds * 6;
}

/**
 * Transforms minutes ans seconds time value to angle of minute hand
 * @param {Number} minutes
 * @param {Number} seconds
 * @returns {Number}
 */
export function getAngleFromMinutes(minutes, seconds = 0) {
  return ((minutes + seconds / 60) * 360) / 60;
}

/**
 * Transforms hours time value to angle of hour hand
 * @param {Number} hours
 * @returns {Number}
 */
export function getAngleFromHours(hours, minutes = 0) {
  const hourValue = (hours + minutes / 60) % 12;
  return (hourValue * 360) / 12;
}
