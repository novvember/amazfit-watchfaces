import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class CaloriesWidget {
  constructor(rowIndex, color) {
    const props = {
      x: CHAR_POSITIONS.columnsX[0],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      type: hmUI.data_type.CAL,
      font_array: getDigitsArray(color),
      align_h: hmUI.align.RIGHT,
      invalid_image: getCharSrc('-', color),
      unit_en: getCharSrc('k', color),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    hmUI.createWidget(hmUI.widget.TEXT_IMG, props);
  }
}
