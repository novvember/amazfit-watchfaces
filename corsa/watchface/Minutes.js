export class Minutes {
  constructor() {
    hmUI.createWidget(hmUI.widget.IMG, {
      src: 'minutes/gauge.png',
      x: 0,
      y: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      src: 'minutes/gauge_aod.png',
      x: 0,
      y: 0,
      show_level: hmUI.show_level.ONAL_AOD,
    });

    const pointerProps = {
      minute_centerX: px(240),
      minute_centerY: px(240),
      minute_posX: px(50 / 2),
      minute_posY: px(180),
      minute_path: 'minutes/pointer.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    }

    hmUI.createWidget(hmUI.widget.TIME_POINTER, pointerProps);

    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      ...pointerProps,
      minute_path: 'minutes/pointer_aod.png',
      show_level: hmUI.show_level.ONAL_AOD,
    });

    const centerImageProps = {
      src: 'minutes/top.png',
      x: px((480 - 50) / 2),
      y: px((480 - 50) / 2),
      show_level: hmUI.show_level.ONLY_NORMAL,
    }

    hmUI.createWidget(hmUI.widget.IMG, centerImageProps);

    hmUI.createWidget(hmUI.widget.IMG, {
      ...centerImageProps,
      src: 'minutes/top_aod.png',
      show_level: hmUI.show_level.ONAL_AOD,
    });
  }
}
