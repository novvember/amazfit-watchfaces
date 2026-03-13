import { TEXT_CHAR_HEIGHT, TEXT_CHAR_WIDTH, TEXT_CHARS } from './chars';
import { calculateAnglularLength, radiansToDegrees } from './utils';

/**
 * Circle text, where every char is hmUI.widget.IMG widget
 * - center of text rotation is the center of the screen of w480 size
 * @param {Object} params
 */
export class CircleTextWidget {
  constructor({ maxLength, text, angleStart, radius, gap, isTextReversed }) {
    this._charImages = TEXT_CHARS;
    this._imageWidth = TEXT_CHAR_WIDTH;
    this._imageHeight = TEXT_CHAR_HEIGHT;

    this._screenSize = px(480);

    this._maxLength = maxLength;

    this._chars = text
      .toLowerCase()
      .slice(0, maxLength)
      .padEnd(maxLength, ' ')
      .split('');

    this._widgets = this._createWidgets({
      angleStart,
      radius,
      gap,
      isTextReversed,
    });
  }

  _createWidgets({ angleStart, radius, gap, isTextReversed }) {
    if (isTextReversed) {
      angleStart = -1 * (180 - angleStart);
    }

    const imageAngle = calculateAnglularLength(radius, this._imageWidth);

    let gapAngle = calculateAnglularLength(radius, gap);

    if (gap < 0) {
      gapAngle *= -1;
    }

    return this._chars.map((char, i) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        src: this._charImages[char] || this._charImages[' '],
        w: this._screenSize,
        h: this._screenSize,
        x: 0,
        y: 0,
        pos_x: this._screenSize / 2 - this._imageWidth / 2,
        pos_y: isTextReversed
          ? this._screenSize / 2 + radius
          : this._screenSize / 2 - radius - this._imageHeight,
        center_x: this._screenSize / 2,
        center_y: this._screenSize / 2,
        angle: isTextReversed
          ? angleStart - i * imageAngle - i * gapAngle
          : angleStart + i * imageAngle + i * gapAngle,
        show_level: hmUI.show_level.ONLY_NORMAL,
      }),
    );
  }

  updateText(text) {
    const newTextChars = text
      .toLowerCase()
      .slice(0, this._maxLength)
      .padEnd(this._maxLength, ' ')
      .split('');

    for (let i = 0; i < this._chars.length; i++) {
      if (this._chars[i] === newTextChars[i]) continue;

      this._widgets[i].setProperty(
        hmUI.prop.SRC,
        this._charImages[newTextChars[i]] || this._charImages[' '],
      );

      this._chars[i] = newTextChars[i];
    }
  }
}
