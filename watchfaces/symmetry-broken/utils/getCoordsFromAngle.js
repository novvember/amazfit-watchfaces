import { degreesToRadians } from './degrees';

/**
 * Transforms radial coordinates (angle in degrees)
 * to regular X-Y coordinates for circle R = 1
 * @param {Number} minutes
 * @param {Number} seconds
 * @returns {Object}
 */
export function getCoordsFromAngleR1(degrees) {
  const radians = degreesToRadians(degrees);

  return {
    x: Math.sin(radians),
    y: -1 * Math.cos(radians),
  };
}

/**
 * Calculates x-y coordinates for widget on a circle around the screen center
 * @param {Number} degrees - angle
 * @param {Number} radius - radius of a circle
 * @param {Number} widgetHeight - height of positioned widget
 * @param {Number} widgetWidth - width of positioned widget
 * @param {Object} SCREEN - screen params
 * @returns {Object}
 */
export function getCoordsFromAngle(
  degrees,
  radius,
  widgetHeight,
  widgetWidth,
  SCREEN,
) {
  const { x, y } = getCoordsFromAngleR1(degrees);
  const centerX = radius * x + SCREEN.centerX;
  const centerY = radius * y + SCREEN.centerY;
  const widgetX = centerX - widgetWidth / 2;
  const widgetY = centerY - widgetHeight / 2;

  return {
    x: widgetX,
    y: widgetY,
  };
}
