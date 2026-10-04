import * as ui from '@zos/ui';
import { getScene, SCENE_AOD, SCENE_SETTINGS, SCENE_WATCHFACE } from '@zos/app';
import { getTimeTexts } from '../../../adapters2/getTimeTexts';
import { TimeTextWidget } from './TimeTextWidget';

/**
 * @typedef {object} TimeWidgetParams
 * @property {import('@zos/sensor').Time} time
 */

export class TimeWidget {
  /** @param {TimeWidgetParams} params */
  constructor({ time }) {
    this._time = time;
    this._prevTime = '';
    this._textWidget = new TimeTextWidget();

    this._bindHandlers();
  }

  _update() {
    const { hourText, minuteText } = getTimeTexts(this._time);
    const timeText = `${hourText}:${minuteText}`;

    if (this._prevTime === timeText) {
      return;
    }

    this._prevTime = timeText;
    this._textWidget.set(timeText);
  }

  _bindHandlers() {
    const updateIfVisible = () => {
      const scene = getScene();
      if (
        scene === SCENE_WATCHFACE ||
        scene === SCENE_AOD ||
        scene === SCENE_SETTINGS
      ) {
        this._update();
      }
    };

    this._time.onPerMinute(updateIfVisible);

    ui.createWidget(ui.widget.WIDGET_DELEGATE, {
      resume_call: updateIfVisible,
    });
  }
}
