import { getClosestSunEvent } from '../adapters/getClosestSunEvent';
import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class SunDataWidget {
  constructor({ x, y, weatherSensor, timeSensor }) {
    this._weatherSensor = weatherSensor;
    this._timeSensor = timeSensor;

    this._widget = new DataWidget({
      x,
      y,
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const sunEvent = getClosestSunEvent(this._weatherSensor, this._timeSensor);

    if (!sunEvent) {
      this._widget.setSecondaryText(gettext('sun'));
      this._widget.setPrimaryText('-:--');
      return;
    }

    const { type, time } = sunEvent;

    const timePrefix = time.postfix === 'pm' ? 'P ' : '';
    const timeString = timePrefix + time.time;

    this._widget.setSecondaryText(gettext(type));
    this._widget.setPrimaryText(timeString);
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
