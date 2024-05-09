function getFirstCellPosition(
  centerX,
  centerY,
  columnsCount,
  rowsCount,
  cellWidth,
  cellHeight,
) {
  return {
    x: centerX - Math.floor(columnsCount / 2) * cellWidth,
    y: centerY - Math.floor(rowsCount / 2) * cellHeight,
  };
}

function getCellPosition(
  row,
  column,
  firstCellPosition,
  cellWidth,
  cellHeight,
) {
  return {
    x: firstCellPosition.x + column * cellWidth,
    y: firstCellPosition.y + row * cellHeight,
  };
}

export function makeEmptyGrid(
  centerX,
  centerY,
  columnsCount,
  rowsCount,
  cellWidth,
  cellHeight,
) {
  const firstCellPosition = getFirstCellPosition(
    centerX,
    centerY,
    columnsCount,
    rowsCount,
    cellWidth,
    cellHeight,
  );

  return new Array(rowsCount).fill(null).map((_, row) =>
    new Array(columnsCount).fill(null).map((_, column) => ({
      centerPosition: getCellPosition(
        row,
        column,
        firstCellPosition,
        cellWidth,
        cellHeight,
      ),
      backgroundImageWidget: hmUI.createWidget(hmUI.widget.IMG, null),
      dateWidget: hmUI.createWidget(hmUI.widget.IMG, null),
      status: '',
      dateText: '',
    })),
  );
}
