import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class BatteryWidget {
  constructor(rowIndex, color) {
    const props = {
      x: CHAR_POSITIONS.columnsX[1],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      type: hmUI.data_type.BATTERY,
      font_array: getDigitsArray(color),
      align_h: hmUI.align.RIGHT,
      unit_en: getCharSrc('%', color),
      invalid_image: getCharSrc('-', color),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    hmUI.createWidget(hmUI.widget.TEXT_IMG, props);
  }
}
