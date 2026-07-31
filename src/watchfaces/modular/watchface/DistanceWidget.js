import { DISTANCE_TEXT_PROPS } from './DistanceWidget.layout';

/**
 * @typedef {Object} DisctanceWidgetParams
 * @property {HmSensorInstance} distanceSensor
 */

export class DisctanceWidget {
  /**
   * @param {DisctanceWidgetParams} params
   */
  constructor({ distanceSensor }) {
    this._distanceSensor = distanceSensor;

    this._buildLayout();
    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _buildLayout() {
    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, DISTANCE_TEXT_PROPS);
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
