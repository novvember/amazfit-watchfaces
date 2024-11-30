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
