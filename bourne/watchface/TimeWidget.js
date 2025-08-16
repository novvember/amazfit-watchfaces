import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';
import { getDigitsArray } from '../utils/getDigitsArray';

export class TimeWidget {
  constructor(rowIndex, color) {
    const screenType = hmSetting.getScreenType();

    switch (screenType) {
      case hmSetting.screen_type.WATCHFACE:
        this.buildNormal(rowIndex, color);
        return;

      case hmSetting.screen_type.AOD:
        this.buildNormal(rowIndex, color);
        return;

      case hmSetting.screen_type.SETTINGS:
        this.buildEdit(rowIndex, color);
        return;

      default:
        console.log('Unknown screen type', screenType);
    }
  }

  buildNormal(rowIndex, color) {
    const colonStaticProps = {
      x: CHAR_POSITIONS.columnsX[2],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      src: getCharSrc(':', color),
      show_level: hmUI.show_level.ONAL_AOD,
    };

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
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    };

    const minuteProps = {
      minute_zero: 1,
      minute_startX: CHAR_POSITIONS.columnsX[3],
      minute_startY: CHAR_POSITIONS.rowsY[rowIndex],
      minute_array: getDigitsArray(color),
      show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
    };

    hmUI.createWidget(hmUI.widget.IMG, colonStaticProps);
    hmUI.createWidget(hmUI.widget.IMG_TIME, colonProps);

    hmUI.createWidget(hmUI.widget.IMG_TIME, hourProps);
    hmUI.createWidget(hmUI.widget.IMG_TIME, minuteProps);
  }

  buildEdit(rowIndex, color) {
    const colonStaticProps = {
      x: CHAR_POSITIONS.columnsX[2],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      src: getCharSrc(':', color),
      show_level: hmUI.show_level.ONLY_EDIT,
    };

    const hourFakeProps = {
      x: CHAR_POSITIONS.columnsX[0],
      y: CHAR_POSITIONS.rowsY[rowIndex],
      text: 10,
      font_array: getDigitsArray(color),
      show_level: hmUI.show_level.ONLY_EDIT,
    };

    const minuteFakeProps = {
      ...hourFakeProps,
      x: CHAR_POSITIONS.columnsX[3],
      text: 30,
    };

    hmUI.createWidget(hmUI.widget.IMG, colonStaticProps);
    hmUI.createWidget(hmUI.widget.TEXT_IMG, hourFakeProps);
    hmUI.createWidget(hmUI.widget.TEXT_IMG, minuteFakeProps);
  }
}
