import { getDay } from '../../../../adapters/getDay';
import { COLORS } from '../index.const';
import {
  WIDGET_BACKGROUND_CIRCLE_PROPS,
  WIDGET_TEXT_L_PROPS,
  WIDGET_TEXT_S_PROPS,
} from '../index.r.layout';
import { getWeekDay } from '../../../../adapters/getWeekDay';
import { gettext } from 'i18n';

/**
 * @typedef {Object} DateSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {HmSensorInstance} timeSensor
 */

export class DateSlotWidget {
  /**
   * @param {DateSlotWidgetParams} params
   */
  constructor({ x, y, w, h, timeSensor }) {
    this._timeSensor = timeSensor;

    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    this._dateTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y: y + 0.15 * h,
      w,
      h,
    });

    this._weekdayTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y - 0.2 * h,
      w,
      h,
      color: COLORS.accent,
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const day = getDay(this._timeSensor);
    const weekdayKey = getWeekDay(this._timeSensor);

    this._dateTextWidget.setProperty(hmUI.prop.TEXT, day.toString());
    this._weekdayTextWidget.setProperty(hmUI.prop.TEXT, gettext(weekdayKey));
  }

  _bindHandlers() {
    const timeSensor = this._timeSensor;
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
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
