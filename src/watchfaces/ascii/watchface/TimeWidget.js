import { getTimeTexts } from '../../../adapters/getTimeTexts';
import { renderAscii } from '../utils/renderAscii';
import { TIME_TEXT_PROPS } from './TimeWidget.layout';
import { GLYPHS, EXTRA_SPACING } from '../fonts/Big';

/**
 * @typedef {Object} TimeWidgetParams
 * @property {HmSensorInstance} timeSensor
 */

export class TimeWidget {
  /**
   * @param {TimeWidgetParams} Params
   */
  constructor({ timeSensor }) {
    this._timeSensor = timeSensor;
    this._prevText = '';

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);
    this._bindHandlers();
  }

  _update() {
    const { hourText, minuteText } = getTimeTexts(this._timeSensor);
    const text = `${hourText}:${minuteText}`;

    if (this._prevText === text) {
      return;
    }

    this._prevText = text;

    const art = renderAscii(text, GLYPHS, {
      extraSpacing: EXTRA_SPACING,
    });

    this._textWidget.setProperty(hmUI.prop.TEXT, art);
  }

  _bindHandlers() {
    const update = this._update.bind(this);
    const timeSensor = this._timeSensor;

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
