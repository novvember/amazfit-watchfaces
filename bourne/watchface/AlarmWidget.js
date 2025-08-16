import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class AlarmWidget {
  constructor(rowIndex, color) {
    '--:--'.split('').forEach((char, i) => {
      const props = {
        x: CHAR_POSITIONS.columnsX[i],
        y: CHAR_POSITIONS.rowsY[rowIndex],
        src: getCharSrc(char, color),
        show_level: hmUI.show_level.ONLY_NORMAL,
      };

      hmUI.createWidget(hmUI.widget.IMG, props);
    });

    const props = {
      x: CHAR_POSITIONS.columnsX[0],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      font_array: getDigitsArray(color),
      padding: true,
      dot_image: getCharSrc(':', color),
      invalid_image: getCharSrc('-', color),
      align_h: hmUI.align.LEFT,
      type: hmUI.data_type.ALARM_CLOCK,
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    hmUI.createWidget(hmUI.widget.TEXT_IMG, props);
  }
}
