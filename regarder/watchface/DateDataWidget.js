import { getDay } from '../adapters/getDay';
import { getWeekDay } from '../adapters/getWeekDay';
import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class DateDataWidget {
  constructor({ x, y, timeSensor }) {
    this._timeSensor = timeSensor;

    this._widget = new DataWidget({ x, y });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const weekDay = getWeekDay(this._timeSensor);
    const day = getDay(this._timeSensor);

    this._widget.setPrimaryText(day);
    this._widget.setSecondaryText(gettext(weekDay));
  }

  _bindHandlers() {
    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this._timeSensor.addEventListener?.(
            this._timeSensor.event.MINUTEEND,
            this._update,
          );
          this._update();
        }
      },
      pause_call: () => {
        this._timeSensor.removeEventListener?.(
          this._timeSensor.event.MINUTEEND,
          this._update,
        );
      },
    });
  }
}
