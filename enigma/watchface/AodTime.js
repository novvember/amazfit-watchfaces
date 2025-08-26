export class AodTime {
  constructor() {
    console.log('aod time building...');

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

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const update = () => {
      const { hour, minute } = timeSensor;
      const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
      const hourText = hourValue.toString().padStart(2, '0');
      const minuteText = minute.toString().padStart(2, '0');
      const text = hourText + minuteText;

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
