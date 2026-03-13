import { getDay } from '../adapters/getDay';
import { getWeekDay } from '../adapters/getWeekDay';
import { getWorldTime } from '../adapters/getWorldTime';
import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class WorldClockDataWidget {
  constructor({ x, y, timeSensor, worldClockSensor }) {
    this._timeSensor = timeSensor;
    this._worldClockSensor = worldClockSensor;

    this._widget = new DataWidget({ x, y });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const worldTime = getWorldTime(this._worldClockSensor);

    if (!worldTime) {
      this._widget.setSecondaryText(gettext('time'));
      this._widget.setPrimaryText('—');
      return;
    }

    const { time, city } = worldTime;
    const timePrefix = time.postfix === 'pm' ? 'P ' : '';
    const timeString = timePrefix + time.time;

    this._widget.setSecondaryText(city);
    this._widget.setPrimaryText(timeString);
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
