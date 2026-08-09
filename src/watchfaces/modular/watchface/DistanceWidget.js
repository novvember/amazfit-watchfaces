import { DISTANCE_TEXT_PROPS } from './DistanceWidget.layout';
import { COLORS } from './index.const';

/**
 * @typedef {Object} DistanceWidgetParams
 * @property {HmSensorInstance} distanceSensor
 * @property {string} colorTheme
 */

export class DistanceWidget {
  /**
   * @param {DistanceWidgetParams} params
   */
  constructor({ distanceSensor, colorTheme }) {
    this._distanceSensor = distanceSensor;

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...DISTANCE_TEXT_PROPS,
      color: COLORS[colorTheme].primary,
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  /**
   *
   * @param {number} meters
   * @returns {string}
   */
  _getText(meters) {
    if (meters < 1000) {
      return `${meters} M`;
    }

    return `${(meters / 1000).toFixed(1)} KM`;
  }

  _update() {
    const { current = 0 } = this._distanceSensor;
    const text = this._getText(current);

    this._textWidget?.setProperty(hmUI.prop.TEXT, text);
  }

  _bindHandlers() {
    const update = this._update;
    const distanceSensor = this._distanceSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          distanceSensor.addEventListener?.(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        distanceSensor.removeEventListener?.(hmSensor.event.LAST, update);
      },
    });
  }
}
