/**
 * Calculates x/y-coordinates for all elements in a grid
 * @param {[Number, Number]} matrixSizes - x- and y-direction grid sizes
 * @param {[Number, Number]} cellSizes -  width and height of every cell
 * @param {[Number, Number]} startCoords - x- and y- coordinates of the first element of the grid
 * @returns {[Number, Number][]}
 */
export function getMatrixCoords(matrixSizes, cellSizes, startCoords) {
  const [matrixSizeX, matrixSizeY] = matrixSizes;
  const [cellSizeX, cellSizeY] = cellSizes;
  const [startCoordX, startCoordY] = startCoords;

  const xCoords = new Array(matrixSizeX)
    .fill(null)
    .map((_, i) => startCoordX + i * cellSizeX);

  const yCoords = new Array(matrixSizeY)
    .fill(null)
    .map((_, i) => startCoordY + i * cellSizeY);

  return new Array(matrixSizeX * matrixSizeY).fill(null).map((_, i) => {
    const column = Math.floor(i / matrixSizeY);
    const row = i % matrixSizeY;
    return [xCoords[column], yCoords[row]];
  });
}
