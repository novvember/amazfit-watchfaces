import * as ui from '@zos/ui';
import { getScene, SCENE_WATCHFACE } from '@zos/app';
import { formatNumber } from '../../../utils/formatNumber';
import { getPluralText } from '../../../adapters2/getPluralText';
import { STEPS_TEXT_PROPS } from './StepsWidget.layout';

/**
 * @typedef {object} StepsWidgetParams
 * @property {import('@zos/sensor').Step} step
 */

export class StepsWidget {
  /** @param {StepsWidgetParams} params */
  constructor({ step }) {
    this._step = step;
    this._prevValue = -1;
    this._textWidget = ui.createWidget(ui.widget.TEXT, STEPS_TEXT_PROPS);
    this._updateHandler = this._update.bind(this);

    this._bindHandlers();
  }

  _update() {
    const current = this._step.getCurrent() ?? 0;
    const target = this._step.getTarget() ?? 10000;

    if (this._prevValue === current) {
      return;
    }

    this._prevValue = current;

    const progressMark = current >= target ? '✓' : '';

    const stepsText = getPluralText('steps', current)
      .replace('{count}', formatNumber(current, ' '));
    const text = `${stepsText} ${progressMark}`.trim();

    this._textWidget.setProperty(ui.prop.TEXT, text);
  }

  _bindHandlers() {
    ui.createWidget(ui.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (getScene() === SCENE_WATCHFACE) {
          this._step.onChange(this._updateHandler);
          this._update();
        }
      },
      pause_call: () => {
        this._step.offChange(this._updateHandler);
      },
    });
  }
}
