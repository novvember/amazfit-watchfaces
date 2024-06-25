/**
 * Transforms day time value to angle of time pointer
 * @param {Number} minutes - time hh:mm in minutes format
 * @returns {Number}
 */
export function getAngleFromTime(minutes) {
  const ROUND_MINUTES = 12 * 60;
  minutes = minutes % ROUND_MINUTES;
  return (minutes * 360) / ROUND_MINUTES;
}
