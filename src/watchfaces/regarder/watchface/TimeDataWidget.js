import { getTime } from '../adapters/getTime';
import { DataWidget } from './DataWidget';

export class TimeDataWidget {
  constructor({ x, y, timeSensor }) {
    this._timeSensor = timeSensor;

    this._widget = new DataWidget({ x, y });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { time, postfix } = getTime(this._timeSensor);

    this._widget.setPrimaryText(time);
    this._widget.setSecondaryText(postfix);
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
