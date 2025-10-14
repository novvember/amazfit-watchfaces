import { COLORS, FONTS } from './constants';

export class Seconds {
  constructor() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      second_centerX: px(240),
      second_centerY: px(240),
      second_posX: px(240),
      second_posY: px(240),
      second_path: 'seconds/pointer.png',

      fresh_frequency: 10,

      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      src: 'seconds/value.png',
      x: px(480 - 66),
      y: px((480 - 100) / 2),
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      x: px(423),
      y: px(220),
      w: px(52),
      h: px(38),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_size: px(28),
      color: COLORS.accent,
      type: hmUI.data_type.SECOND,
      padding: true,
      font: FONTS.primary,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }
}
