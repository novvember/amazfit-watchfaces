import { getWorldClockTime } from '../../../../adapters/getWorldClockTime';
import { COLORS } from '../index.const';
import {
  WIDGET_BACKGROUND_CIRCLE_PROPS,
  WIDGET_TEXT_S_PROPS,
} from '../index.r.layout';

/**
 * @typedef {Object} WorldClockSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {HmSensorInstance} timeSensor
 * @property {HmSensorInstance} worldClockSensor
 */

export class WorldClockSlotWidget {
  /**
   * @param {WorldClockSlotWidgetParams} params
   */
  constructor({ x, y, w, h, timeSensor, worldClockSensor }) {
    this._timeSensor = timeSensor;
    this._worldClockSensor = worldClockSensor;

    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    this._timeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y - 0.12 * h,
      w,
      h,
      color: COLORS.primary,
    });

    this._cityTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.12 * h,
      w,
      h,
      color: COLORS.accent,
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const worldTime = getWorldClockTime(this._worldClockSensor);

    if (!worldTime) {
      this._timeTextWidget.setProperty(hmUI.prop.TEXT, '--:--');
      this._cityTextWidget.setProperty(hmUI.prop.TEXT, '');
      return;
    }

    const { city, timeText } = worldTime;
    const cityText = city.toUpperCase().slice(0, 3);

    this._timeTextWidget.setProperty(hmUI.prop.TEXT, timeText);
    this._cityTextWidget.setProperty(hmUI.prop.TEXT, cityText);
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
