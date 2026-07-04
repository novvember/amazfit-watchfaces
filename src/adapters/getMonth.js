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
 * Gets current month name
 * @param {HmSensorInstance} timeSensor
 * @returns {String}
 */
export function getMonth(timeSensor) {
  const { month = 1 } = timeSensor;
  return MONTHS[month - 1];
}
