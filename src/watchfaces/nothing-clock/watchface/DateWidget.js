import { getWeekDay } from '../../../adapters/getWeekDay';
import { gettext } from 'i18n';
import { COLOR_ACCENT } from './index.const';
import {
  WEEKDAY_TEXT_PROPS,
  DATE_RECT_PROPS,
  DATE_TEXT_PROPS,
} from './DateWidget.layout';

export class DateWidget {
  /**
   * @param {{ timeSensor: HmSensorInstance, colorAccent: keyof typeof COLOR_ACCENT }} params
   */
  constructor({ timeSensor, colorAccent }) {
    this._timeSensor = timeSensor;

    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      ...DATE_RECT_PROPS,
      color: COLOR_ACCENT[colorAccent],
    });
    hmUI.createWidget(hmUI.widget.TEXT_FONT, DATE_TEXT_PROPS);

    this._weekdayTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      WEEKDAY_TEXT_PROPS,
    );

    this._update = this._update.bind(this);

    this._bindHandlers();
  }

  _update() {
    const weekdayKey = getWeekDay(this._timeSensor);
    const weekDay = gettext(weekdayKey);
    this._weekdayTextWidget.setProperty(hmUI.prop.TEXT, weekDay);
  }

  _bindHandlers() {
    const update = this._update;
    const timeSensor = this._timeSensor;

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
