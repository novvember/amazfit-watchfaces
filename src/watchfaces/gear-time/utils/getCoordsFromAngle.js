import { degreesToRadians } from './degrees';

/**
 * Transforms radial coordinates (angle in degrees)
 * to regular X-Y coordinates for circle R = 1
 * @param {Number} minutes
 * @param {Number} seconds
 * @returns {Object}
 */
function getCoordsFromAngleR1(degrees) {
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
export function getCoordsFromAngle({
  degrees,
  radius,
  widgetHeight,
  widgetWidth,
  centerX,
  centerY,
}) {
  const { x, y } = getCoordsFromAngleR1(degrees);

  const widgetCenterX = radius * x + centerX;
  const widgetCenterY = radius * y + centerY;

  const widgetX = widgetCenterX - widgetWidth / 2;
  const widgetY = widgetCenterY - widgetHeight / 2;

  return {
    x: widgetX,
    y: widgetY,
  };
}
