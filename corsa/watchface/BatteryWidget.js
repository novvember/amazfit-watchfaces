import { COLORS, FONTS } from './constants';

const SIZE = px(140);

export class BatteryWidget {
  constructor() {
    this.width = SIZE;
    this.height = SIZE;

    this._group = hmUI.createWidget(hmUI.widget.GROUP, {
      x: px(0),
      y: px(0),
      w: SIZE,
      h: SIZE,
    });

    this._group.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'battery/background.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._group.createWidget(hmUI.widget.TEXT_FONT, {
      x: px(15),
      y: px(48),
      w: px(110),
      h: px(42),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_size: px(32),
      color: COLORS.primary,
      font: FONTS.primary,
      type: hmUI.data_type.BATTERY,
      unit_type: 1,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }

  move(x, y) {
    this._group.setProperty(hmUI.prop.MORE, {
      x,
      y,
    });
  }
}
