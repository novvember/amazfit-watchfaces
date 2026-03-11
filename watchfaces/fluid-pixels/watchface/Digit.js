import {
  DIGITS,
  DOTS_COUNT,
  GRID_SIZE_X,
  GRID_SIZE_Y,
  GRID_CELL_SIZE,
} from './Digit.const';
import { Dot } from './Dot';

export class Digit {
  constructor({ x, y }) {
    this._x0 = x;
    this._y0 = y;

    this.width = GRID_SIZE_X * GRID_CELL_SIZE;
    this.height = GRID_SIZE_Y * GRID_CELL_SIZE;

    this._prevValue = undefined;

    this._dots = new Array(DOTS_COUNT).fill(null).map(() => new Dot());
  }

  _getDotPosition(indexX, indexY, width, height) {
    return {
      x: this._x0 + (GRID_CELL_SIZE - width) / 2 + indexX * GRID_CELL_SIZE,
      y: this._y0 + (GRID_CELL_SIZE - height) / 2 + indexY * GRID_CELL_SIZE,
    };
  }

  _getRandomNumber(min, max) {
    return min + Math.random() * (max - min);
  }

  _getRandomIndexes() {
    return [
      Math.round(this._getRandomNumber(0, GRID_SIZE_X - 1) * 10) / 10,
      Math.round(this._getRandomNumber(0, GRID_SIZE_Y - 1) * 10) / 10,
    ];
  }

  _getDigitPositions(digit) {
    return DIGITS[digit] || DIGITS[0];
  }

  set(value, hasAnimation, hasRandomAnimationStart) {
    if (this._prevValue === value && !hasRandomAnimationStart) {
      return;
    }

    this._prevValue = value;

    const digitPositions = this._getDigitPositions(value);

    this._dots.forEach((dot, i) => {
      const [indexX, indexY] = digitPositions[i];
      const newPosition = this._getDotPosition(
        indexX,
        indexY,
        dot.width,
        dot.height,
      );
      const fromPosition = hasRandomAnimationStart
        ? this._getDotPosition(
            ...this._getRandomIndexes(),
            dot.width,
            dot.height,
          )
        : undefined;

      dot.move(newPosition, fromPosition, hasAnimation);
    });
  }
}
