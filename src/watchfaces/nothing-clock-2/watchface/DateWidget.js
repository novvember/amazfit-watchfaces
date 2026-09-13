import { gettext } from 'i18n';
import { getWeekDay } from '../../../adapters/getWeekDay';
import { getMonth } from '../../../adapters/getMonth';
import {
  DATE_GROUP_PROPS,
  DATE_WEEKDAY_TEXT_PROPS,
  DATE_DAY_RECT_PROPS,
  DATE_DAY_TEXT_PROPS,
  DATE_MONTH_RECT_PROPS,
  DATE_MONTH_TEXT_PROPS,
} from './DateWidget.layout';

export class DateWidget {
  /**
   * @param {{ timeSensor: HmSensorInstance }} params
   */
  constructor({ timeSensor }) {
    this._timeSensor = timeSensor;

    const group = hmUI.createWidget(hmUI.widget.GROUP, DATE_GROUP_PROPS);

    this._weekdayTextWidget = group.createWidget(
      hmUI.widget.TEXT,
      DATE_WEEKDAY_TEXT_PROPS,
    );

    group.createWidget(hmUI.widget.FILL_RECT, DATE_DAY_RECT_PROPS);
    group.createWidget(hmUI.widget.TEXT_FONT, DATE_DAY_TEXT_PROPS);

    group.createWidget(hmUI.widget.STROKE_RECT, DATE_MONTH_RECT_PROPS);

    this._monthTextWidget = group.createWidget(
      hmUI.widget.TEXT,
      DATE_MONTH_TEXT_PROPS,
    );

    this._update = this._update.bind(this);

    this._bindHandlers();
  }

  /** @returns {void} */
  _update() {
    this._weekdayTextWidget.setProperty(
      hmUI.prop.TEXT,
      gettext(getWeekDay(this._timeSensor)),
    );
    this._monthTextWidget.setProperty(
      hmUI.prop.TEXT,
      gettext(getMonth(this._timeSensor)),
    );
  }

  /** @returns {void} */
  _bindHandlers() {
    const update = this._update;
    const timeSensor = this._timeSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE) {
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
