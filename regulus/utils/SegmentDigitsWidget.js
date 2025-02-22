export class SegmentDigitsWidget {
  constructor({ x, y }) {
    const CHAR_SPACE = px(1);
    const COLON_SPACE = px(8);
    const WIDTH = px(27);

    const xArray = [
      x,
      x + WIDTH + CHAR_SPACE,
      x + WIDTH + CHAR_SPACE + WIDTH + COLON_SPACE,
      x + WIDTH + CHAR_SPACE + WIDTH + COLON_SPACE + WIDTH + CHAR_SPACE,
    ];

    this._colonWidget = this._createColonWidget(
      xArray[2] - COLON_SPACE / 2 - WIDTH / 2,
      y,
    );
    this._digitsWidgets = xArray.map((x) => this._createDigitWidget(x, y));
  }

  _getDigitSrc(value) {
    const isValid = '-0123456789'.includes(value);
    const name = isValid ? value : 'empty';
    return `digits_xsmall/${name}.png`;
  }

  _getColonSrc(type) {
    return `colon_xsmall/colon_${type}.png`;
  }

  _createDigitWidget(x, y) {
    return hmUI.createWidget(hmUI.widget.IMG, {
      x,
      y,
      src: this._getDigitSrc(),
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }

  _createColonWidget(x, y) {
    return hmUI.createWidget(hmUI.widget.IMG, {
      x,
      y,
      src: this._getColonSrc('empty'),
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }

  _clear() {
    this._digitsWidgets.forEach((widget) =>
      widget.setProperty(hmUI.prop.SRC, this._getDigitSrc()),
    );
    this._colonWidget.setProperty(hmUI.prop.SRC, this._getColonSrc('empty'));
  }

  setValue(value, type = 'empty') {
    if (value === undefined) {
      this._clear();
      return;
    }

    this._colonWidget.setProperty(hmUI.prop.SRC, this._getColonSrc(type));
    const chars = value.toString().slice(0, 4).padStart(4, ' ').split('');

    chars.forEach((char, i) =>
      this._digitsWidgets[i].setProperty(
        hmUI.prop.SRC,
        this._getDigitSrc(char),
      ),
    );
  }
}
