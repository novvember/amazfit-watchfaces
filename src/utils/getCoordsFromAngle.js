import { degreesToRadians } from './degrees.js';

/**
 * @typedef {Object} GetCoordsFromAngleParams
 * @property {number} degrees
 * @property {number} radius
 * @property {number} widgetHeight
 * @property {number} widgetWidth
 * @property {number} rotationCenterX
 * @property {number} rotationCenterY
 */

/**
 * @typedef {Object} Coords
 * @property {number} x
 * @property {number} y
 */

/**
 * Transforms radial coordinates (angle in degrees)
 * to regular X-Y coordinates for circle R = 1
 * @param {Number} degrees
 * @returns {Coords}
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
 * @param {GetCoordsFromAngleParams} Params
 * @returns {Coords}
 */
export function getCoordsFromAngle({
  degrees,
  radius,
  widgetHeight,
  widgetWidth,
  rotationCenterX,
  rotationCenterY,
}) {
  const { x, y } = getCoordsFromAngleR1(degrees);
  const centerX = radius * x + rotationCenterX;
  const centerY = radius * y + rotationCenterY;
  const widgetX = centerX - widgetWidth / 2;
  const widgetY = centerY - widgetHeight / 2;

  return {
    x: widgetX,
    y: widgetY,
  };
}
