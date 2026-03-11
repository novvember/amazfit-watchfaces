import { degreesToRadians } from './degrees';

/**
 * Transforms radial coordinates (angle in degrees)
 * to regular X-Y coordinates for circle R = 1
 * @param {Number} angle
 * @returns {Object}
 */
export function getCoordsFromAngle(degrees) {
  const angle = degreesToRadians(degrees);

  return {
    x: Math.sin(angle),
    y: -1 * Math.cos(angle),
  };
}
