const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

/**
 * Gets current month name.
 * @param {import('@zos/sensor').Time} timeSensor
 * @returns {string}
 */
export function getMonth(timeSensor) {
  return MONTHS[timeSensor.getMonth() - 1];
}
