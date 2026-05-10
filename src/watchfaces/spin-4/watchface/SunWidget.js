import { getClosestSunEvent } from '../../../adapters/getClosestSunEvent';
import { getDataWidgetProps } from '../utils/getDataWidgetProps';

/**
 * @typedef {Object} SunWidgetParams
 * @property {'top' | 'bottom'} position
 * @property {HmSensorInstance} weatherSensor
 * @property {HmSensorInstance} timeSensor
 */

export class SunWidget {
  /**
   * @param {SunWidgetParams} params
   */
  constructor({ position, weatherSensor, timeSensor }) {
    this._weatherSensor = weatherSensor;
    this._timeSensor = timeSensor;

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...getDataWidgetProps(position),
      text: '',
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const sunEvent = getClosestSunEvent(this._weatherSensor, this._timeSensor);

    let text = '—';

    if (sunEvent) {
      text = `${sunEvent.timeText} ${sunEvent.postfixText}`.trim();
    }

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
