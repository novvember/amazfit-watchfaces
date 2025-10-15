import { getAngleFromHours } from '../utils/getAngleFromTime';
import { getWidgetCoordsFromAngle } from '../utils/getWidgetCoordsFromAngle';
import { COLORS, FONTS } from './constants';

const SIZE = px(140);

export class HourWidget {
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
      src: 'hours/background.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    this._group.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'hours/background_aod.png',
      show_level: hmUI.show_level.ONAL_AOD,
    });

    const pointerProps = {
      x: 0,
      y: 0,
      w: SIZE,
      h: SIZE,
      pos_x: (SIZE - px(30)) / 2,
      pos_y: 0,
      center_x: SIZE / 2,
      center_y: SIZE / 2,
      angle: 0,
      src: 'hours/pointer.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    this._pointer = this._group.createWidget(hmUI.widget.IMG, pointerProps);

    this._pointerAod = this._group.createWidget(hmUI.widget.IMG, {
      ...pointerProps,
      src: 'hours/pointer_aod.png',
      show_level: hmUI.show_level.ONAL_AOD,
    });

    this._textPropsBase = {
      x: 0,
      y: 0,
      w: px(50),
      h: px(50),
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_size: px(36),
      color: COLORS.primary,
      font: FONTS.primary,
      text: '-',
      show_level: hmUI.show_level.ONLY_NORMAL,
    };

    this._textAodPropsBase = {
      ...this._textPropsBase,
      color: COLORS.aod,
      show_level: hmUI.show_level.ONAL_AOD,
    };

    this._text = this._group.createWidget(
      hmUI.widget.TEXT,
      this._textPropsBase,
    );

    this._textAod = this._group.createWidget(
      hmUI.widget.TEXT,
      this._textAodPropsBase,
    );
  }

  updateValue(hour, minute) {
    const angle = getAngleFromHours(hour, minute);

    this._pointer.setProperty(hmUI.prop.ANGLE, angle);
    this._pointerAod.setProperty(hmUI.prop.ANGLE, angle);

    const [textX, textY] = getWidgetCoordsFromAngle({
      angle: (angle + 180) % 360,
      radius: px(32),
      rotationCenterX: SIZE / 2,
      rotationCenterY: SIZE / 2,
      widgetWidth: px(50),
      widgetHeight: px(50),
    });

    const newTextProps = {
      x: textX,
      y: textY,
      text: (hour % 12 || 12).toString(),
    };

    this._text.setProperty(hmUI.prop.MORE, {
      ...this._textPropsBase,
      ...newTextProps,
    });

    this._textAod.setProperty(hmUI.prop.MORE, {
      ...this._textAodPropsBase,
      ...newTextProps,
    });
  }

  move(x, y) {
    this._group.setProperty(hmUI.prop.MORE, {
      x,
      y,
    });
  }
}
