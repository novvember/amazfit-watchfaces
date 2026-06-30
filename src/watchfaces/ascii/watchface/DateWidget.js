import { renderAscii } from '../utils/renderAscii';
import { GLYPHS, EXTRA_SPACING } from '../fonts/Small';
import { DATE_TEXT_PROPS, WEEKDAY_TEXT_PROPS } from './DateWidget.layout';
import { getDay } from '../../../adapters/getDay';
import { getWeekDay } from '../../../adapters/getWeekDay';
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
    this._prevText = '';

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);
    this._weekdayTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      WEEKDAY_TEXT_PROPS,
    );

    this._bindHandlers();
  }

  _update() {
    const day = getDay(this._timeSensor);
    const text = day.toString().padStart(2, '0');

    if (this._prevText === text) {
      return;
    }

    this._prevText = text;

    const art = renderAscii(text, GLYPHS, {
      extraSpacing: EXTRA_SPACING,
    });

    this._textWidget.setProperty(hmUI.prop.TEXT, art);

    const weekdayKey = getWeekDay(this._timeSensor);
    const weekdayText = gettext(weekdayKey).toUpperCase();
    this._weekdayTextWidget.setProperty(hmUI.prop.TEXT, weekdayText);
  }

  _bindHandlers() {
    const update = this._update.bind(this);
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
