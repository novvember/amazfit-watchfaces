import { getWeekDay } from '../../../adapters/getWeekDay';
import { getDay } from '../../../adapters/getDay';
import { DATE_DAY_TEXT_PROPS, DATE_WEEK_TEXT_PROPS } from './DateWidget.layout';
import { gettext } from 'i18n';

/**
 * @typedef {Object} DateWidgetParams
 * @property {HmSensorInstance} timeSensor
 */

export class DateWidget {
  /**
   * @param {DateWidgetParams} Params
   */
  constructor({ timeSensor }) {
    this._timeSensor = timeSensor;
    this._update = this._update.bind(this);

    this._weekText = hmUI.createWidget(hmUI.widget.TEXT, DATE_WEEK_TEXT_PROPS);
    this._dateText = hmUI.createWidget(hmUI.widget.TEXT, DATE_DAY_TEXT_PROPS);

    this._bindHandlers();
  }

  _update() {
    const day = getDay(this._timeSensor);
    const weekDayKey = getWeekDay(this._timeSensor);

    this._dateText.setProperty(hmUI.prop.TEXT, day.toString());
    this._weekText.setProperty(hmUI.prop.TEXT, gettext(weekDayKey));
  }

  _bindHandlers() {
    const timeSensor = this._timeSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(
            timeSensor.event.MINUTEEND,
            this._update,
          );
          this._update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(
          timeSensor.event.MINUTEEND,
          this._update,
        );
      },
    });
  }
}
