import { getDataWidgetProps } from '../utils/getDataWidgetProps';

/**
 * @typedef {Object} HeartWidgetParams
 * @property {'top' | 'bottom'} position
 * @property {HmSensorInstance} heartSensor
 */

export class HeartWidget {
  /**
   * @param {HeartWidgetParams} params
   */
  constructor({ position, heartSensor }) {
    this._heartSensor = heartSensor;
    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...getDataWidgetProps(position),
      text: '',
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { last = 0 } = this._heartSensor;
    const text = last ? `:${last}` : '—';
    this._textWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _bindHandlers() {
    const heartSensor = this._heartSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener?.(hmSensor.event.LAST, this._update);
          this._update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener?.(hmSensor.event.LAST, this._update);
      },
    });
  }
}
