const CELL_STEP = 14;
const START = 9;

/**
 * Rounds X/Y coordinate to closest cell boundary
 * @param {Number} coord
 * @returns {[Number, Number]}
 */
export function roundToClosestCell(coord) {
  const index = Math.round((coord - START) / CELL_STEP);
  const boundary = START + index * CELL_STEP;
  return [boundary, index];
}
