import { GRID_CELL_SIZE, GRID_SIZE_Y } from './Digit.const';
import { DOT_PROPS } from './Dot.layout';

export class Colon {
  constructor({ x, y }) {
    this.width = GRID_CELL_SIZE;
    this.height = GRID_SIZE_Y * GRID_CELL_SIZE;

    new Array(2).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        ...DOT_PROPS,
        x: x + (GRID_CELL_SIZE - DOT_PROPS.w) / 2,
        y: y + (GRID_CELL_SIZE - DOT_PROPS.h) / 2 + [1, 4][i] * GRID_CELL_SIZE,
      }),
    );
  }
}
