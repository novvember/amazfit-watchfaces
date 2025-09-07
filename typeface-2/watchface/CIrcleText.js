/** Gets magic number to increase text area size so that arc text would render well */
const ARC_TEXT_DIFF =  0;

export class CircleText {
  constructor({ angleStart, angleEnd, isReversed }) {
    this._widget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: (px(480) - (px(480) + ARC_TEXT_DIFF)) / 2,
      y: (px(480) - (px(480) + ARC_TEXT_DIFF)) / 2,
      w: px(480) + ARC_TEXT_DIFF,
      h: px(480) + ARC_TEXT_DIFF,
      text_size: px(32),
      color: 0xffffff,
      text: '--',
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.TOP,
      char_space: 0,
      line_space: 0,
      mode: isReversed ? 1 : 0,
      start_angle: angleStart,
      end_angle: angleEnd,
      font: 'fonts/Geologica-Thin.ttf',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }

  set(text) {
    this._widget.setProperty(hmUI.prop.TEXT, text);
  }
}
