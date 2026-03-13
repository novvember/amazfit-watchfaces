const WIDTH = px(90);
const SCREEN_PADDING_RIGHT = px(2);

const LINE_HEIGHT = px(36);
const FONT_SIZE = px(36);
const COLOR = 0xcccccc;
const FONT = 'fonts/Geologica-Light.ttf';

export class InfoWidget {
  constructor() {
    this._textLines = new Array(2).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(480) - SCREEN_PADDING_RIGHT - WIDTH,
        y: px(480 / 2) - (1 - i) * LINE_HEIGHT,
        w: WIDTH,
        h: LINE_HEIGHT,
        color: COLOR,
        text_size: FONT_SIZE,
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        font: FONT,
        text: ' ',
        show_level: hmUI.show_level.ONLY_NORMAL,
      }),
    );
  }

  set(text1, text2) {
    this._textLines[0].setProperty(hmUI.prop.TEXT, text1);
    this._textLines[1].setProperty(hmUI.prop.TEXT, text2);
  }
}
