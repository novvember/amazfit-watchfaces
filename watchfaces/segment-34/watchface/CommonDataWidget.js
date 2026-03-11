import {
  SECONDARY_DIGIT_EMPTY_PROPS,
  SECONDARY_DIGIT_WIDTH,
  SECONDARY_IMAGE_TEXT_PROPS,
  SECONDARY_TITLE_PROPS,
} from './CommonDataWidget.layout';

export class CommonDataWidget {
  constructor({
    digitsCount,
    x,
    y,
    titleText,
    titlePosition,
    dataType,
    dataText,
  }) {
    hmUI.createWidget(hmUI.widget.TEXT, {
      ...SECONDARY_TITLE_PROPS,
      x: titlePosition === 'top' ? x + px(2) : x - px(107),
      y: titlePosition === 'top' ? y - px(19) : y + px(1),
      text: titleText,
      align_h: titlePosition === 'top' ? hmUI.align.LEFT : hmUI.align.RIGHT,
    });

    new Array(digitsCount).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.IMG, {
        ...SECONDARY_DIGIT_EMPTY_PROPS,
        x: x + i * SECONDARY_DIGIT_WIDTH,
        y,
      }),
    );

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      ...SECONDARY_IMAGE_TEXT_PROPS,
      type: dataType,
      x,
      y,
      text: dataText,
    });
  }

  updateText(text) {
    this._textWidget.setProperty(hmUI.prop.TEXT, text);
  }
}
