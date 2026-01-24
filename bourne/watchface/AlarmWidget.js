import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';
import { CommonTextWidget } from './CommonTextWidget';

export class AlarmWidget {
  constructor(rowIndex, color) {
    const defaultTextWidget = new CommonTextWidget(rowIndex, color);
    defaultTextWidget.update('--:--');

    const props = {
      x: CHAR_POSITIONS.columnsX[0],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      font_array: getDigitsArray(color),
      padding: true,
      dot_image: getCharSrc(':', color),
      invalid_image: getCharSrc('-', color),
      align_h: hmUI.align.LEFT,
      type: hmUI.data_type.ALARM_CLOCK,
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    };

    hmUI.createWidget(hmUI.widget.TEXT_IMG, props);
  }
}
