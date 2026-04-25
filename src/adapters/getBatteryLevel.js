/**
 * Gets current battery level
 * @param {HmSensorInstance} batterySensor
 * @returns {number}
 */
export function getBatteryLevel(batterySensor) {
  const { current = 0 } = batterySensor;
  return current;
}
