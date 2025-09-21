import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class DateWidget {
  constructor(rowIndex, color, dateFormat = 'dd/mm') {
    const isDayFirst = dateFormat === 'dd/mm';

    const digitsArray = getDigitsArray(color);

    const dayProps = {
      day_startX: CHAR_POSITIONS.columnsX[isDayFirst ? 0 : 3],
      day_startY: CHAR_POSITIONS.rowsY[rowIndex],
      day_align: hmUI.align.RIGHT,
      day_zero: isDayFirst ? 0 : 1,
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
      month_startX: CHAR_POSITIONS.columnsX[isDayFirst ? 3 : 0],
      month_startY: CHAR_POSITIONS.rowsY[rowIndex],
      month_align: hmUI.align.RIGHT,
      month_zero: isDayFirst ? 1 : 0,
      month_en_array: digitsArray,
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    hmUI.createWidget(hmUI.widget.IMG_DATE, dayProps);
    hmUI.createWidget(hmUI.widget.IMG, deviderProps);
    hmUI.createWidget(hmUI.widget.IMG_DATE, monthProps);
  }
}
