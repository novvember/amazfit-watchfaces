import { getClosestSunEvent } from '../../../../adapters/getClosestSunEvent';
import { getSunDayDuration, getSunPosition } from '../../utils/getSunParams';
import { COLORS } from '../index.const';
import {
  WIDGET_ACTIVE_ARC_PROPS,
  WIDGET_BACKGROUND_ARC_PROPS,
  WIDGET_DOT_IMAGE_PROPS,
  WIDGET_TEXT_S_PROPS,
} from '../index.r.layout';
import { SUN_ICON_IMAGE_PROPS } from './SunSlotWidget.layout';

/**
 * @typedef {Object} SunSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {HmSensorInstance} timeSensor
 * @property {HmSensorInstance} weatherSensor
 */

const DOT_SIZE = px(14);
const DOT_OVERSIZE = px(2);

export class SunSlotWidget {
  /**
   * @param {SunSlotWidgetParams} params
   */
  constructor({ x, y, w, h, timeSensor, weatherSensor }) {
    this._timeSensor = timeSensor;
    this._weatherSensor = weatherSensor;

    const centerX = x + w / 2;
    const centerY = y + h / 2;

    this._dayArcProps = {
      ...WIDGET_ACTIVE_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: 0,
      end_angle: 0,
    };

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_BACKGROUND_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
    });

    this._dayArc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      this._dayArcProps,
    );

    const dotAreaSize = w + 2 * DOT_OVERSIZE;

    this._dotImageWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_DOT_IMAGE_PROPS,
      x: x - DOT_OVERSIZE,
      y: y - DOT_OVERSIZE,
      w: dotAreaSize,
      h: dotAreaSize,
      pos_x: dotAreaSize / 2 - DOT_SIZE / 2,
      pos_y: 0,
      center_x: dotAreaSize / 2,
      center_y: dotAreaSize / 2,
    });

    this._iconWidget = hmUI.createWidget(hmUI.widget.IMG, {
      ...SUN_ICON_IMAGE_PROPS,
      x,
      y: y - 0.15 * h,
    });

    this._sunTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.15 * h,
      w,
      h,
      color: COLORS.primary,
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _updateDayArc() {
    const sunDayDuration = getSunDayDuration(this._weatherSensor);
    const ratio = sunDayDuration / (24 * 60);
    const angle = (360 * ratio) / 2;
    this._dayArc.setProperty(hmUI.prop.MORE, {
      ...this._dayArcProps,
      start_angle: -1 * angle,
      end_angle: angle,
    });
  }

  _updateSunTime() {
    const event = getClosestSunEvent(this._weatherSensor, this._timeSensor);

    if (!event) {
      this._sunTextWidget.setProperty(hmUI.prop.TEXT, '--:--');
      return;
    }

    const { type, timeText } = event;

    this._sunTextWidget.setProperty(hmUI.prop.TEXT, timeText);
    this._iconWidget.setProperty(hmUI.prop.SRC, `sun/${type}.png`);
  }

  _updateDotPosition() {
    const angle =
      getSunPosition(this._weatherSensor, this._timeSensor) * 360 - 180;

    this._dotImageWidget.setProperty(hmUI.prop.ANGLE, angle);
  }

  _update() {
    this._updateDayArc();
    this._updateSunTime();
    this._updateDotPosition();
  }

  _bindHandlers() {
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  }
}
