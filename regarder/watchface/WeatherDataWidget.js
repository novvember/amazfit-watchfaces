import { getWeatherState } from '../adapters/getWeatherState';
import { DataWidget } from './DataWidget';
import { gettext } from 'i18n';

export class WeatherDataWidget {
  constructor({ x, y, weatherSensor }) {
    this._weatherSensor = weatherSensor;

    this._widget = new DataWidget({
      x,
      y,
      primaryDataType: hmUI.data_type.WEATHER_CURRENT,
      primaryDataUnits: true,
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const state = getWeatherState(this._weatherSensor);

    if (state) {
      this._widget.setSecondaryText(gettext(state));
    } else {
      this._widget.setSecondaryText(gettext('weather'));
    }
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
