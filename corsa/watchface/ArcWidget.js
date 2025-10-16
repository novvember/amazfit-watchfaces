import { COLORS, FONTS } from './constants';

const SIZE = px(140);

const ICON_SRC = {
  heart: 'arc_widget/icon_heart.png',
  steps: 'arc_widget/icon_steps.png',
};

export class ArcWidget {
  constructor({ dataType, iconType, hasDangerZoneEnd, textSize = px(36) }) {
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
      src: hasDangerZoneEnd
        ? 'arc_widget/background_danger_end.png'
        : 'arc_widget/background.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._group.createWidget(hmUI.widget.IMG, {
      x: px(56),
      y: px(101),
      src: ICON_SRC[iconType],
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._group.createWidget(hmUI.widget.TEXT_FONT, {
      x: px(15),
      y: px(49),
      w: px(110),
      h: px(42),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_size: px(36),
      color: COLORS.primary,
      font: FONTS.primary,
      type: dataType,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._group.createWidget(hmUI.widget.ARC_PROGRESS, {
      center_x: SIZE / 2,
      center_y: SIZE / 2,
      radius: px(50),
      start_angle: -147,
      end_angle: 147,
      color: COLORS.primary,
      line_width: px(6),
      type: dataType,
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
