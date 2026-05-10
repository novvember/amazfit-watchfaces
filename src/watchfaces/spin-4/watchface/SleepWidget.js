import { getSleepTime } from '../../../adapters/getSleepTime';
import { getDataWidgetProps } from '../utils/getDataWidgetProps';

/**
 * @typedef {Object} SleepWidgetParams
 * @property {'top' | 'bottom'} position
 * @property {HmSensorInstance} sleepSensor
 */

export class SleepWidget {
  /**
   * @param {SleepWidgetParams} params
   */
  constructor({ position, sleepSensor }) {
    this._sleepSensor = sleepSensor;

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...getDataWidgetProps(position),
      text: '',
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { text = '—' } = getSleepTime(this._sleepSensor);
    this._textWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _bindHandlers() {
    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this._update();
        }
      },
    });
  }
}
