const CHAR_WIDTH = px(160);
const CHAR_HEIGHT = px(168);

const X_DIFFS = {
  '00': 8,
  '01': 12,
  '02': 14,
  '03': 6,
  '04': 6,
  '05': 6,
  '06': 4,
  '07': 20,
  '08': 8,
  '09': 4,
  10: 20,
  11: 22,
  12: 24,
  13: 16,
  14: 18,
  15: 14,
  16: 14,
  17: 20,
  18: 18,
  19: 14,
  20: 16,
  21: 24,
  22: 20,
  23: 14,
  24: 16,
  25: 14,
  26: 12,
  27: 20,
  28: 18,
  29: 14,
  30: 6,
  31: 6,
  32: 10,
  33: 2,
  34: 2,
  35: 4,
  36: 2,
  37: 16,
  38: 4,
  39: 4,
  40: 6,
  41: 8,
  42: 10,
  43: 4,
  44: 4,
  45: 4,
  46: 2,
  47: 18,
  48: 6,
  49: 4,
  50: 4,
  51: 6,
  52: 10,
  53: 2,
  54: 2,
  55: 2,
  56: 2,
  57: 8,
  58: 4,
  59: 2,
};

export class Digits {
  constructor(position) {
    this._position = position;

    this._digits = new Array(2).fill(null).map((_, i) => {
      return hmUI.createWidget(
        hmUI.widget.IMG,
        this._getImageProps(0, position, i, 0),
      );
    });
  }

  _getImageProps(digit, position, index, xDiff) {
    return {
      y: position === 'top' ? px(480 / 2) - CHAR_HEIGHT : px(480 / 2),
      x: px(480 / 2) - (1 - index) * CHAR_WIDTH + xDiff,
      w: CHAR_WIDTH,
      h: CHAR_HEIGHT,
      src: `digits/${digit}.png`,
      show_level: hmUI.show_level.ONLY_NORMAL,
    };
  }

  set(text) {
    const xDiff = X_DIFFS[text] || 0;
    const xDiffs = [xDiff, -1 * xDiff];

    this._digits.forEach((digit, i) => {
      digit.setProperty(
        hmUI.prop.MORE,
        this._getImageProps(text[i] || 0, this._position, i, px(xDiffs[i])),
      );
    });
  }
}
