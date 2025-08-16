import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class SecondsWidget {
  constructor(rowIndex, color) {
    const secondProps = {
      second_zero: 1,
      second_startX: CHAR_POSITIONS.columnsX[3],
      second_startY: CHAR_POSITIONS.rowsY[rowIndex],
      second_array: getDigitsArray(color),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    const colonStaticProps = {
      x: CHAR_POSITIONS.columnsX[2],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      src: getCharSrc(':', color),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    hmUI.createWidget(hmUI.widget.IMG, colonStaticProps);
    hmUI.createWidget(hmUI.widget.IMG_TIME, secondProps);
  }
}
