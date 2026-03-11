const DIGITS = new Array(10).fill(null).map((_, i) => `digits/${i}.png`);
const DIGITS_AOD = new Array(10)
  .fill(null)
  .map((_, i) => `digits_aod/${i}.png`);

const DIGIT_WIDTH = px(144);
const DIGIT_HEIGHT = px(190);
const X_CENTER = px(480 / 2);

const COLUMN_GAP = px(4);
const ROW_GAP = px(6);

export class TimeWidget {
  constructor() {
    this._buildNormal();
    this._buildAod();
  }

  _buildNormal() {
    const hourProps = {
      hour_zero: 1,
      hour_startX: X_CENTER - DIGIT_WIDTH - COLUMN_GAP / 2,
      hour_startY: px(480 / 2) - DIGIT_HEIGHT - ROW_GAP / 2,
      hour_array: DIGITS,
      hour_space: COLUMN_GAP,
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    const minuteProps = {
      minute_zero: 1,
      minute_startX: X_CENTER - DIGIT_WIDTH - COLUMN_GAP / 2,
      minute_startY: px(480 / 2) + ROW_GAP / 2,
      minute_array: DIGITS,
      minute_space: COLUMN_GAP,
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    const colonProps = {
      x: X_CENTER - DIGIT_WIDTH - px(52),
      y: px(480 / 2),
      src: 'digits/colon.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    hmUI.createWidget(hmUI.widget.IMG_TIME, hourProps);
    hmUI.createWidget(hmUI.widget.IMG_TIME, minuteProps);
    hmUI.createWidget(hmUI.widget.IMG, colonProps);
  }

  _buildAod() {
    const hourProps = {
      hour_zero: 1,
      hour_startX: X_CENTER - DIGIT_WIDTH - COLUMN_GAP / 2,
      hour_startY: px(480 / 2) - DIGIT_HEIGHT - ROW_GAP / 2,
      hour_array: DIGITS_AOD,
      hour_space: COLUMN_GAP,
      show_level: hmUI.show_level.ONAL_AOD,
    };

    const minuteProps = {
      minute_zero: 1,
      minute_startX: X_CENTER - DIGIT_WIDTH - COLUMN_GAP / 2,
      minute_startY: px(480 / 2) + ROW_GAP / 2,
      minute_array: DIGITS_AOD,
      minute_space: COLUMN_GAP,
      show_level: hmUI.show_level.ONAL_AOD,
    };

    hmUI.createWidget(hmUI.widget.IMG_TIME, hourProps);
    hmUI.createWidget(hmUI.widget.IMG_TIME, minuteProps);
  }
}
