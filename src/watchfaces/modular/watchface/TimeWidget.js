import { getTimeTexts } from '../../../adapters/getTimeTexts';
import { COLORS } from './index.const';
import {
  TIME_AOD_TEXT_PROPS,
  TIME_SECONDS_COLON_PROPS,
  TIME_SECONDS_TEXT_PROPS,
  TIME_TEXT_2_PROPS,
  TIME_TEXT_PROPS,
} from './TimeWidget.layout';

/**
 * @typedef {Object} TimeWidgetParams
 * @property {HmSensorInstance} timeSensor
 * @property {'default' | 'seconds'} [mode]
 * @property {string} colorTheme
 */

export class TimeWidget {
  /**
   * @param {TimeWidgetParams} params
   */
  constructor({ timeSensor, mode, colorTheme }) {
    this._timeSensor = timeSensor;
    this._mode = mode || 'default';

    this._textWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      this._mode === 'default' ? TIME_TEXT_PROPS : TIME_TEXT_2_PROPS,
    );

    if (this._mode === 'seconds') {
      hmUI.createWidget(hmUI.widget.TEXT, {
        ...TIME_SECONDS_COLON_PROPS,
        color: COLORS[colorTheme].secondary,
      });
      hmUI.createWidget(hmUI.widget.TEXT_FONT, {
        ...TIME_SECONDS_TEXT_PROPS,
        color: COLORS[colorTheme].secondary,
      });
    }

    this._textAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      TIME_AOD_TEXT_PROPS,
    );

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { hourText, minuteText } = getTimeTexts(this._timeSensor);
    const text = `${hourText}:${minuteText}`;

    this._textWidget?.setProperty(hmUI.prop.TEXT, text);
    this._textAodWidget?.setProperty(hmUI.prop.TEXT, text);
  }

  _bindHandlers() {
    const timeSensor = this._timeSensor;
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
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
