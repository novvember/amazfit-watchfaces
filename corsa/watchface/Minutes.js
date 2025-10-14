export class Minutes {
  constructor() {
    hmUI.createWidget(hmUI.widget.IMG, {
      src: 'minutes/gauge.png',
      x: 0,
      y: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      minute_centerX: px(240),
      minute_centerY: px(240),
      minute_posX: px(50 / 2),
      minute_posY: px(180),
      minute_path: 'minutes/pointer.png',

      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      src: 'minutes/top.png',
      x: px((480 - 50) / 2),
      y: px((480 - 50) / 2),
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }
}
