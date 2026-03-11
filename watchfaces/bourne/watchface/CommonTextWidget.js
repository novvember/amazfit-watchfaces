import { CHAR_POSITIONS } from '../utils/constants';
import { getCharSrc } from '../utils/getCharSrc';

export class CommonTextWidget {
  constructor(rowIndex, color) {
    this._color = color;
    this._chars = new Array(5).fill(null).map(() => ' ');

    this._imageWidgets = new Array(5).fill(null).map((_, i) => {
      const props = {
        x: CHAR_POSITIONS.columnsX[i],
        y: CHAR_POSITIONS.rowsY[rowIndex],
        src: getCharSrc(this._chars[i], this._color),
        show_level: hmUI.show_level.ONLY_NORMAL,
      };

      return hmUI.createWidget(hmUI.widget.IMG, props);
    });
  }

  update(text) {
    text
      .padEnd(5, ' ')
      .slice(0, 5)
      .split('')
      .forEach((char, i) => {
        if (this._chars[i] === char) {
          return;
        }

        this._chars[i] = char;
        this._imageWidgets[i].setProperty(
          hmUI.prop.SRC,
          getCharSrc(char, this._color),
        );
      });
  }
}
