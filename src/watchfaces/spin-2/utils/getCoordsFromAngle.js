/**
 * Transforms radial coordinates (angle in minutes and seconds)
 * to regular X-Y coordinates for circle R = 1
 * @param {Number} minutes 
 * @param {Number} seconds 
 * @returns {Object}
 */
export function getCoordsFromAngle(minutes, seconds) {
  const angle = ((minutes + seconds / 60) * Math.PI) / 30;

  return {
    x: Math.sin(angle),
    y: -1 * Math.cos(angle),
  };
}
