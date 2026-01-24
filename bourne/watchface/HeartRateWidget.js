import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class HeartRateWidget {
  constructor(rowIndex, color) {
    const props = {
      x: CHAR_POSITIONS.columnsX[1],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      type: hmUI.data_type.HEART,
      font_array: getDigitsArray(color),
      align_h: hmUI.align.RIGHT,
      invalid_image: getCharSrc('-', color),
      unit_en: getCharSrc('♥', color),
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    };

    hmUI.createWidget(hmUI.widget.TEXT_IMG, props);
  }
}
