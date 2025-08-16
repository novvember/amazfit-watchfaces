import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class DateWidget {
  constructor(rowIndex, color) {
    const digitsArray = getDigitsArray(color);

    const dayProps = {
      day_startX: CHAR_POSITIONS.columnsX[0],
      day_startY: CHAR_POSITIONS.rowsY[rowIndex],
      day_align: hmUI.align.RIGHT,
      day_zero: 0,
      day_en_array: digitsArray,
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    const deviderProps = {
      x: CHAR_POSITIONS.columnsX[2],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      src: getCharSrc('/', color),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    const monthProps = {
      month_startX: CHAR_POSITIONS.columnsX[3],
      month_startY: CHAR_POSITIONS.rowsY[rowIndex],
      month_align: hmUI.align.LEFT,
      month_zero: 1,
      month_en_array: digitsArray,
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    hmUI.createWidget(hmUI.widget.IMG_DATE, dayProps);
    hmUI.createWidget(hmUI.widget.IMG, deviderProps);
    hmUI.createWidget(hmUI.widget.IMG_DATE, monthProps);
  }
}
