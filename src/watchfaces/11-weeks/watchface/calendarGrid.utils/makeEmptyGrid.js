/**
 * Builds empty data grid to represent date matrix for the watchface
 * @param {Number} centerX
 * @param {Number} centerY
 * @param {Number} columnsCount
 * @param {Number} rowsCount
 * @param {Number} cellWidth
 * @param {Number} cellHeight
 * @returns 2D array wath data for each cell
 */
export function makeEmptyGrid(
  centerX,
  centerY,
  columnsCount,
  rowsCount,
  cellWidth,
  cellHeight,
) {
  return new Array(rowsCount).fill(null).map((_, row) =>
    new Array(columnsCount).fill(null).map((_, column) => ({
      imageWidget: hmUI.createWidget(hmUI.widget.IMG, {}),
      status: '',
      dateText: '',
      x: centerX - (cellWidth * columnsCount) / 2 + cellWidth * column,
      y: centerY - (cellHeight * rowsCount) / 2 + cellHeight * row,
    })),
  );
}
