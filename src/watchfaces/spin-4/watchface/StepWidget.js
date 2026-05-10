import { formatNumber } from '../../../utils/formatNumber';
import { getDataWidgetProps } from '../utils/getDataWidgetProps';

/**
 * @typedef {Object} StepWidgetParams
 * @property {'top' | 'bottom'} position
 * @property {HmSensorInstance} stepSensor
 */

export class StepWidget {
  /**
   * @param {StepWidgetParams} params
   */
  constructor({ position, stepSensor }) {
    this._stepSensor = stepSensor;

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...getDataWidgetProps(position),
      text: '',
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { current = 0 } = this._stepSensor;
    const text = formatNumber(current, ' ') + '.';
    this._textWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _bindHandlers() {
    const stepSensor = this._stepSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor?.addEventListener?.(hmSensor.event.CHANGE, this._update);
          this._update();
        }
      },
      pause_call: () => {
        stepSensor?.removeEventListener?.(hmSensor.event.CHANGE, this._update);
      },
    });
  }
}
