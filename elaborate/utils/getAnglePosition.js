import { clamp } from './clamp';

/**
 * Calculates angle value from the value
 * depending on min/max possible values and min/max possible angles
 * @param {Object} param0
 * @returns {Number}
 */
export function getAnglePosition({
  value,
  minValue,
  maxValue,
  minAngle,
  maxAngle,
}) {
  const ratio = (value - minValue) / (maxValue - minValue);
  const ratioClamped = clamp(0, ratio, 1);

  if (maxAngle > minAngle) {
    return ratioClamped * (maxAngle - minAngle) + minAngle;
  }

  return minAngle - ratioClamped * (minAngle - maxAngle);
}
