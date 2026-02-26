import { getSleepTime } from '../adapters/getSleepTime';
import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class SleepDataWidget {
  constructor({ x, y, sleepSensor }) {
    this._sleepSensor = sleepSensor;

    this._widget = new DataWidget({ x, y });
    this._widget.setSecondaryText(gettext('sleep'));

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { time } = getSleepTime(this._sleepSensor);
    this._widget.setPrimaryText(time);
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
