import { gettext } from 'i18n';
import { DataWidget } from './DataWidget';
import { getStepsCurrent } from '../adapters/getStepsCurrent';

export class StepsDataWidget {
  constructor({ x, y, stepSensor }) {
    this._stepSensor = stepSensor;

    this._widget = new DataWidget({ x, y });
    this._widget.setSecondaryText(gettext('steps'));

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const stepsCurrent = getStepsCurrent(this._stepSensor, ' ');
    this._widget.setPrimaryText(stepsCurrent);
  }

  _bindHandlers() {
    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this._stepSensor.addEventListener?.(
            hmSensor.event.CHANGE,
            this._update,
          );
          this._update();
        }
      },
      pause_call: () => {
        this._stepSensor.removeEventListener?.(
          hmSensor.event.CHANGE,
          this._update,
        );
      },
    });
  }
}
