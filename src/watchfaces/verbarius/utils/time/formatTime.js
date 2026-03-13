/**
 * @param {Number} hour value in 24-hour format
 * @returns {Number} hour value in 12-hour format
 */
export function getHour12Format(hour) {
  let num = hour % 12;

  if (num === 0) {
    num = 12;
  }

  return num;
}

/**
 * @param {Number} hour value in 24-hour format
 * @returns {Number} next hour value in 12-hour format
 */
export function getNextHour12Format(hour) {
  return (hour % 12) + 1;
}
