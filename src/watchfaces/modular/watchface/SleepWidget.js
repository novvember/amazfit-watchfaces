import { getSleepTime } from '../../../adapters/getSleepTime';
import { SLEEP_TEXT_PROPS } from './SleepWidget.layout';
import { gettext } from 'i18n';

/**
 * @typedef {Object} SleepWidgetParams
 * @property {HmSensorInstance} sleepSensor
 */

export class SleepWidget {
  /**
   * @param {SleepWidgetParams} params
   */
  constructor({ sleepSensor }) {
    this._sleepSensor = sleepSensor;

    this._buildLayout();
    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _buildLayout() {
    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);
  }

  _update() {
    const { text } = getSleepTime(this._sleepSensor);
    const widgetText = text ? gettext('sleep-time').replace('%s', text) : '';

    this._textWidget?.setProperty(hmUI.prop.TEXT, widgetText);
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
