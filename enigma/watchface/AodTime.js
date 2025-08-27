export class AodTime {
  constructor(timeSensor, is12HourFormat, getTimeString) {
    this._CHAR_WIDTH = px(92);
    this._CHAR_HEIGHT = px(106);
    this._CHAR_COUNT = 4;

    this._textWidgets = new Array(this._CHAR_COUNT).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: px(480 / 2 - (this._CHAR_COUNT / 2 - i) * this._CHAR_WIDTH),
        y: px(480 / 2 - this._CHAR_HEIGHT / 2),
        w: this._CHAR_WIDTH,
        h: this._CHAR_HEIGHT,
        color: 0xb1b1b1,
        text_size: px(80),
        font: 'fonts/MartianMono-Thin.ttf',
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text: '0',
        show_level: hmUI.show_level.ONAL_AOD,
      }),
    );

    const update = () => {
      const text = getTimeString(timeSensor, is12HourFormat);

      this._textWidgets.forEach((textWidget, i) => {
        textWidget.setProperty(hmUI.prop.TEXT, text[i] || ' ');
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  }
}
