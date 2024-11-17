import { degreesToRadians } from './degrees';

/**
 * Transforms radial coordinates (angle in degrees)
 * to regular X-Y coordinates for circle R = 1
 * @param {Number} minutes
 * @param {Number} seconds
 * @returns {Object}
 */
export function getCoordsFromAngle(degrees) {
  const radians = degreesToRadians(degrees);

  return {
    x: Math.sin(radians),
    y: -1 * Math.cos(radians),
  };
}
