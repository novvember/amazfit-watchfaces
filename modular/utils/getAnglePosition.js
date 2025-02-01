import { clamp } from './clamp';

/**
 *
 * @param {*} param0
 * @returns
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
