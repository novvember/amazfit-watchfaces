import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class TimeWidget {
  constructor(rowIndex, color) {
    this.buildNormal(rowIndex, color);
    this.buildAod(rowIndex, color);
    this.buildEdit(rowIndex, color);
  }

  buildNormal(rowIndex, color) {
    const colonProps = {
      second_zero: 1,
      second_startX: CHAR_POSITIONS.columnsX[rowIndex],
      second_startY: CHAR_POSITIONS.rowsY[1],
      second_array: new Array(10)
        .fill(null)
        .map((_, i) =>
          i % 2 === 0 ? getCharSrc(':', color) : getCharSrc(':', 'grey'),
        ),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    const hourProps = {
      hour_zero: 0,
      hour_startX: CHAR_POSITIONS.columnsX[0],
      hour_startY: CHAR_POSITIONS.rowsY[rowIndex],
      hour_array: getDigitsArray(color),
      hour_align: hmUI.align.RIGHT,
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    const minuteProps = {
      minute_zero: 1,
      minute_startX: CHAR_POSITIONS.columnsX[3],
      minute_startY: CHAR_POSITIONS.rowsY[rowIndex],
      minute_array: getDigitsArray(color),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    hmUI.createWidget(hmUI.widget.IMG_TIME, colonProps);

    hmUI.createWidget(hmUI.widget.IMG_TIME, hourProps);
    hmUI.createWidget(hmUI.widget.IMG_TIME, minuteProps);
  }

  buildAod(rowIndex, _color) {
    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      hour_zero: 0,
      hour_startX: CHAR_POSITIONS.columnsX[0],
      hour_startY: CHAR_POSITIONS.rowsY[rowIndex],
      hour_array: getDigitsArray('grey'),
      hour_align: hmUI.align.RIGHT,

      hour_unit_sc: getCharSrc(':', 'grey'),
      hour_unit_tc: getCharSrc(':', 'grey'),
      hour_unit_en: getCharSrc(':', 'grey'),

      minute_zero: 1,
      minute_startX: CHAR_POSITIONS.columnsX[3],
      minute_startY: CHAR_POSITIONS.rowsY[rowIndex],
      minute_array: getDigitsArray('grey'),

      show_level: hmUI.show_level.ONAL_AOD,
    });
  }

  buildEdit(rowIndex, color) {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: CHAR_POSITIONS.columnsX[0],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      text: '10-30',
      font_array: getDigitsArray(color),
      negative_image: getCharSrc(':', color),

      show_level: hmUI.show_level.ONLY_EDIT,
    });
  }
}
