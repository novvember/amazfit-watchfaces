import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class TimeWidget {
  constructor(rowIndex, color) {
    this.buildNormalScreen(rowIndex, color);
    this.buildAodScreen(rowIndex, color);
  }

  buildNormalScreen(rowIndex, color) {
    const colonProps = {
      second_zero: 1,
      second_startX: CHAR_POSITIONS.columnsX[rowIndex],
      second_startY: CHAR_POSITIONS.rowsY[1],
      second_array: new Array(10)
        .fill(null)
        .map((_, i) =>
          i % 2 === 0 ? getCharSrc(':', color) : getCharSrc(' ', color),
        ),
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    const hourProps = {
      hour_zero: 1,
      hour_startX: CHAR_POSITIONS.columnsX[0],
      hour_startY: CHAR_POSITIONS.rowsY[rowIndex],
      hour_array: getDigitsArray(color),
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

  buildAodScreen(rowIndex, color) {
    const colonProps = {
      x: CHAR_POSITIONS.columnsX[2],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      src: getCharSrc(':', color),
      show_level: hmUI.show_level.ONAL_AOD,
    };

    const hourProps = {
      hour_zero: 1,
      hour_startX: CHAR_POSITIONS.columnsX[0],
      hour_startY: CHAR_POSITIONS.rowsY[rowIndex],
      hour_array: getDigitsArray(color),
      show_level: hmUI.show_level.ONAL_AOD,
    };

    const minuteProps = {
      minute_zero: 1,
      minute_startX: CHAR_POSITIONS.columnsX[3],
      minute_startY: CHAR_POSITIONS.rowsY[rowIndex],
      minute_array: getDigitsArray(color),
      show_level: hmUI.show_level.ONAL_AOD,
    };

    hmUI.createWidget(hmUI.widget.IMG, colonProps);
    hmUI.createWidget(hmUI.widget.IMG_TIME, hourProps);
    hmUI.createWidget(hmUI.widget.IMG_TIME, minuteProps);
  }
}
