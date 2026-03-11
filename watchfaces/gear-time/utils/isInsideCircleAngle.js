/**
 * Checks if an angle is inside circle sector (defined with angle and angle size)
 * @param {Number} angle - angle [0, 360] to check
 * @param {Number} targetAngle - angle [0, 360] to define sector position
 * @param {Number} targetAngleSize - angle [0, 360] to define sector size
 * @returns {Boolean}
 */
export function isInsideCircleAngle(angle, targetAngle, targetAngleSize = 0) {
  const targetAngleMin = (targetAngle - targetAngleSize / 2 + 360) % 360;
  const targetAngleMax = (targetAngle + targetAngleSize / 2 + 360) % 360;

  angle = (angle + 360) % 360;

  if (targetAngleMin > targetAngleMax) {
    return angle >= targetAngleMin || angle <= targetAngleMax;
  }

  return angle >= targetAngleMin && angle <= targetAngleMax;
}
